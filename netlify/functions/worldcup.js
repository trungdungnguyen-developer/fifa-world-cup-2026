const WORLD_CUP_LEAGUE_ID = process.env.API_FOOTBALL_LEAGUE_ID || "1";
const WORLD_CUP_SEASON = process.env.API_FOOTBALL_SEASON || "2026";
const WORLD_CUP_FALLBACK_LEAGUE_IDS = ["1", "37", "31", "33", "34", "30", "587", "927", "950", "1213"];
const API_CACHE_SECONDS = process.env.API_CACHE_SECONDS ? Number(process.env.API_CACHE_SECONDS) : null;
const API_ACTIVE_CACHE_SECONDS = Number(process.env.API_ACTIVE_CACHE_SECONDS || 1800);
const API_IDLE_CACHE_SECONDS = Number(process.env.API_IDLE_CACHE_SECONDS || 21600);
const API_DETAIL_CACHE_SECONDS = Number(process.env.API_DETAIL_CACHE_SECONDS || 1800);
const API_STALE_SECONDS = Number(process.env.API_STALE_SECONDS || 86400);
const FALLBACK_CACHE_SECONDS = Number(process.env.API_FALLBACK_CACHE_SECONDS || 3600);
const AUTO_DISCOVER_LEAGUES = process.env.API_FOOTBALL_AUTO_DISCOVER === "true";
const TRY_FALLBACK_LEAGUE_IDS = process.env.API_FOOTBALL_TRY_FALLBACK_IDS === "true";
const NEWS_CACHE_SECONDS = Number(process.env.NEWS_CACHE_SECONDS || 3600);
const NEWS_SOURCES = [
  { name: "VnExpress", url: "https://vnexpress.net/rss/the-thao.rss" },
  { name: "Tuổi Trẻ", url: "https://tuoitre.vn/rss/the-thao.rss" },
  { name: "Thanh Niên", url: "https://thanhnien.vn/rss/the-thao.rss" },
  { name: "VietnamNet", url: "https://vietnamnet.vn/rss/the-thao.rss" }
];
const NEWS_KEYWORDS = [
  "world cup 2026",
  "world cup",
  "fifa",
  "cúp thế giới",
  "cup thế giới",
  "cúp bóng đá thế giới"
];

exports.handler = async (event = {}) => {
  if (event.queryStringParameters?.news) {
    return getNewsResponse();
  }

  const fixtureId = event.queryStringParameters?.fixture;
  if (fixtureId) {
    return getFixtureDetailResponse(fixtureId);
  }

  if (process.env.API_FOOTBALL_KEY) {
    try {
      const data = await getApiFootballData();
      return json(data, 200);
    } catch (apiFootballError) {
      if (process.env.FOOTBALL_DATA_TOKEN) {
        try {
          const data = await getFootballDataOrgData();
          return json(data, 200);
        } catch (footballDataError) {
          return json(fallbackBody(apiFootballError, footballDataError), 200, fallbackCacheControl());
        }
      }

      return json(fallbackBody(apiFootballError), 200, fallbackCacheControl());
    }
  }

  if (process.env.FOOTBALL_DATA_TOKEN) {
    try {
      const data = await getFootballDataOrgData();
      return json(data, 200);
    } catch (footballDataError) {
      return json(fallbackBody(footballDataError), 200, fallbackCacheControl());
    }
  }

  return json({
    fallback: true,
    source: "Live data unavailable",
    updatedAt: new Date().toISOString(),
    message: "Set API_FOOTBALL_KEY or FOOTBALL_DATA_TOKEN in Netlify environment variables.",
    teams: [],
    matches: []
  }, 200, fallbackCacheControl());
};

async function getApiFootballData() {
  const candidateLeagueIds = await getWorldCupLeagueCandidates();
  const attempts = [];

  for (const leagueId of candidateLeagueIds) {
    const data = await getApiFootballDataForLeague(leagueId);
    attempts.push(data.debug);

    if (data.teams.length >= 2 && data.matches.length) {
      return {
        source: `API-FOOTBALL / API-SPORTS · league ${leagueId}`,
        updatedAt: new Date().toISOString(),
        teams: data.teams,
        matches: data.matches,
        scorers: data.scorers,
        debug: { attempts }
      };
    }
  }

  throw new Error(`API-Football returned incomplete World Cup data. Tried league ids: ${candidateLeagueIds.join(", ")}`);
}

async function getNewsResponse() {
  try {
    const results = await Promise.allSettled(NEWS_SOURCES.map(loadNewsSource));
    const articles = results
      .flatMap((result) => result.status === "fulfilled" ? result.value : [])
      .filter(isWorldCupNews)
      .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
      .filter((article, index, list) => list.findIndex((item) => item.url === article.url) === index)
      .slice(0, 24);

    return json({
      source: "RSS báo Việt Nam",
      updatedAt: new Date().toISOString(),
      articles
    }, 200, newsCacheControl());
  } catch (error) {
    return json({
      source: "RSS báo Việt Nam",
      updatedAt: new Date().toISOString(),
      articles: [],
      message: error.message
    }, 200, newsCacheControl());
  }
}

async function loadNewsSource(source) {
  const response = await fetch(source.url, {
    headers: { "User-Agent": "WorldCup2026ScheduleApp/1.0" }
  });
  if (!response.ok) throw new Error(`${source.name} RSS ${response.status}`);
  const xml = await response.text();
  return parseRssItems(xml, source.name);
}

function parseRssItems(xml, sourceName) {
  return [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((match) => {
    const item = match[0];
    const description = decodeXml(getTag(item, "description"));
    return {
      title: decodeXml(getTag(item, "title")),
      url: decodeXml(getTag(item, "link")),
      summary: stripHtml(description).slice(0, 220),
      image: extractNewsImage(item, description),
      source: sourceName,
      publishedAt: new Date(decodeXml(getTag(item, "pubDate")) || Date.now()).toISOString()
    };
  }).filter((article) => article.title && article.url);
}

function getTag(xml, tagName) {
  const match = xml.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? match[1].replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim() : "";
}

function extractNewsImage(itemXml, description) {
  const media = itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/i)
    || itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i)
    || itemXml.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
  if (media?.[1]) return decodeXml(media[1]);
  const image = description.match(/<img[^>]+src=["']([^"']+)["']/i);
  return image?.[1] ? decodeXml(image[1]) : "";
}

function isWorldCupNews(article) {
  const haystack = normalizeText(`${article.title} ${article.summary}`);
  return NEWS_KEYWORDS.some((keyword) => haystack.includes(normalizeText(keyword)));
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function stripHtml(value) {
  return decodeXml(String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function decodeXml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

async function getFixtureDetailResponse(fixtureId) {
  if (!process.env.API_FOOTBALL_KEY) {
    return json({
      fallback: true,
      message: "Set API_FOOTBALL_KEY in Netlify environment variables to load match details."
    }, 200, fallbackCacheControl());
  }

  try {
    const detail = await getApiFootballFixtureDetail(fixtureId);
    return json(detail, 200, shortCacheControl());
  } catch (error) {
    return json({
      fallback: true,
      message: "Could not load live match detail from API-FOOTBALL.",
      apiError: error.message
    }, 200, fallbackCacheControl());
  }
}

async function getWorldCupLeagueCandidates() {
  const configuredIds = (process.env.API_FOOTBALL_LEAGUE_IDS || WORLD_CUP_LEAGUE_ID)
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  const candidates = new Set(configuredIds.length ? configuredIds : [String(WORLD_CUP_LEAGUE_ID)]);

  if (TRY_FALLBACK_LEAGUE_IDS) {
    WORLD_CUP_FALLBACK_LEAGUE_IDS.forEach((id) => candidates.add(id));
  }

  if (!AUTO_DISCOVER_LEAGUES) return [...candidates];

  try {
    const data = await apiFootball("/leagues?search=world%20cup");
    for (const item of data.response || []) {
      const name = String(item.league?.name || "").toLowerCase();
      if (name.includes("world cup") && item.league?.id) {
        candidates.add(String(item.league.id));
      }
    }
  } catch (error) {
    console.warn("Could not auto-discover World Cup league id:", error);
  }

  return [...candidates];
}

async function getApiFootballDataForLeague(leagueId) {
  const fixturesData = await apiFootball(`/fixtures?league=${leagueId}&season=${WORLD_CUP_SEASON}`);
  let standingsData = null;

  try {
    standingsData = await apiFootball(`/standings?league=${leagueId}&season=${WORLD_CUP_SEASON}`);
  } catch (error) {
    console.warn("Could not load API-FOOTBALL standings, deriving table from fixtures:", error);
  }
  const scorers = await getApiFootballTopScorers(leagueId);

  const standings = standingsData?.response?.[0]?.league?.standings || [];
  let teams = standings.flatMap((groupRows) => groupRows.map((row) => {
    const group = cleanGroupName(row.group);
    return {
      id: String(row.team.id),
      name: normalizeTeamName(row.team.name),
      short: makeShort(row.team.name),
      logo: row.team.logo,
      group,
      played: row.all.played || 0,
      won: row.all.win || 0,
      drawn: row.all.draw || 0,
      lost: row.all.lose || 0,
      gf: row.all.goals?.for || 0,
      ga: row.all.goals?.against || 0,
      points: row.points || 0
    };
  }));

  const matches = (fixturesData.response || []).map((item) => {
    const status = normalizeApiFootballStatus(item.fixture.status?.short);
    return {
      id: item.fixture.id,
      group: cleanGroupName(item.league.round || item.league.name || ""),
      status,
      date: item.fixture.date,
      venue: [item.fixture.venue?.name, item.fixture.venue?.city].filter(Boolean).join(", "),
      home: normalizeTeamName(item.teams.home.name),
      away: normalizeTeamName(item.teams.away.name),
      homeScore: status === "finished" || status === "live" ? item.goals.home : undefined,
      awayScore: status === "finished" || status === "live" ? item.goals.away : undefined,
      events: []
    };
  }).filter((match) => match.home && match.away);

  if (!teams.length && matches.length) {
    teams = deriveTeamsFromMatches(fixturesData.response || []);
  }

  return {
    teams,
    matches,
    scorers,
    debug: {
      leagueId,
      standingsGroups: standings.length,
      teams: teams.length,
      matches: matches.length,
      scorers: scorers.length
    }
  };
}

function deriveTeamsFromMatches(fixtures) {
  const byName = new Map();

  const ensureTeam = (apiTeam, group) => {
    if (!apiTeam?.name) return null;
    const name = normalizeTeamName(apiTeam.name);
    if (!byName.has(name)) {
      byName.set(name, {
        id: String(apiTeam.id || name),
        name,
        short: makeShort(name),
        logo: apiTeam.logo,
        group,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        points: 0
      });
    }

    const team = byName.get(name);
    if (!team.group && group) team.group = group;
    if (!team.logo && apiTeam.logo) team.logo = apiTeam.logo;
    return team;
  };

  for (const item of fixtures) {
    const group = cleanGroupName(item.league?.round || item.league?.name || "");
    const home = ensureTeam(item.teams?.home, group);
    const away = ensureTeam(item.teams?.away, group);
    const status = normalizeApiFootballStatus(item.fixture?.status?.short);
    const homeGoals = Number(item.goals?.home);
    const awayGoals = Number(item.goals?.away);

    if (status !== "finished" || !home || !away || Number.isNaN(homeGoals) || Number.isNaN(awayGoals)) {
      continue;
    }

    home.played += 1;
    away.played += 1;
    home.gf += homeGoals;
    home.ga += awayGoals;
    away.gf += awayGoals;
    away.ga += homeGoals;

    if (homeGoals > awayGoals) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else if (homeGoals < awayGoals) {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }
  }

  return [...byName.values()].sort((a, b) => {
    const groupCompare = (a.group || "").localeCompare(b.group || "");
    if (groupCompare) return groupCompare;
    const pointCompare = b.points - a.points;
    if (pointCompare) return pointCompare;
    const gdCompare = (b.gf - b.ga) - (a.gf - a.ga);
    if (gdCompare) return gdCompare;
    const gfCompare = b.gf - a.gf;
    if (gfCompare) return gfCompare;
    return a.name.localeCompare(b.name);
  });
}

async function getApiFootballTopScorers(leagueId) {
  try {
    const data = await apiFootball(`/players/topscorers?league=${leagueId}&season=${WORLD_CUP_SEASON}`);
    return (data.response || []).map((item, index) => {
      const goals = item.statistics?.[0]?.goals || {};
      const games = item.statistics?.[0]?.games || {};
      const team = item.statistics?.[0]?.team || {};
      return {
        rank: index + 1,
        name: item.player?.name || "",
        photo: item.player?.photo || "",
        team: normalizeTeamName(team.name || ""),
        teamLogo: team.logo || "",
        goals: goals.total || 0,
        assists: goals.assists || 0,
        penalties: goals.penalty || 0,
        minutes: games.minutes || 0
      };
    }).filter((player) => player.name);
  } catch (error) {
    console.warn("Could not load API-FOOTBALL top scorers:", error);
    return [];
  }
}

async function getApiFootballFixtureDetail(fixtureId) {
  const [fixtureResult, eventsResult, statisticsResult] = await Promise.allSettled([
    apiFootball(`/fixtures?id=${encodeURIComponent(fixtureId)}`),
    apiFootball(`/fixtures/events?fixture=${encodeURIComponent(fixtureId)}`),
    apiFootball(`/fixtures/statistics?fixture=${encodeURIComponent(fixtureId)}`)
  ]);

  if (fixtureResult.status === "rejected") throw fixtureResult.reason;
  const item = fixtureResult.value.response?.[0];
  if (!item) throw new Error(`Fixture ${fixtureId} was not found.`);

  const status = normalizeApiFootballStatus(item.fixture?.status?.short);
  const events = eventsResult.status === "fulfilled" ? normalizeFixtureEvents(eventsResult.value.response || []) : [];
  const statistics = statisticsResult.status === "fulfilled" ? normalizeFixtureStatistics(statisticsResult.value.response || []) : {};

  return {
    id: item.fixture.id,
    group: cleanGroupName(item.league?.round || item.league?.name || ""),
    status,
    date: item.fixture.date,
    venue: [item.fixture.venue?.name, item.fixture.venue?.city].filter(Boolean).join(", "),
    home: normalizeTeamName(item.teams?.home?.name),
    away: normalizeTeamName(item.teams?.away?.name),
    homeScore: status === "finished" || status === "live" ? item.goals?.home : undefined,
    awayScore: status === "finished" || status === "live" ? item.goals?.away : undefined,
    events,
    statistics,
    updatedAt: new Date().toISOString(),
    source: "API-FOOTBALL / API-SPORTS match detail"
  };
}

function normalizeFixtureEvents(events) {
  return events.map((event) => ({
    type: String(event.type || "").toLowerCase(),
    detail: event.detail || "",
    minute: [event.time?.elapsed, event.time?.extra ? `+${event.time.extra}` : ""].filter(Boolean).join(""),
    team: normalizeTeamName(event.team?.name || ""),
    player: event.player?.name || "",
    assist: event.assist?.name || "",
    text: formatEventText(event)
  }));
}

function formatEventText(event) {
  const minute = [event.time?.elapsed, event.time?.extra ? `+${event.time.extra}` : ""].filter(Boolean).join("");
  const player = event.player?.name || "Unknown player";
  const team = normalizeTeamName(event.team?.name || "");
  const detail = event.detail ? ` · ${event.detail}` : "";
  const assist = event.assist?.name ? ` · kiến tạo: ${event.assist.name}` : "";
  return `${minute ? `${minute}' ` : ""}${player}${team ? ` (${team})` : ""}${detail}${assist}`;
}

function normalizeFixtureStatistics(rows) {
  const result = {};
  for (const row of rows) {
    const teamName = normalizeTeamName(row.team?.name || "");
    if (!teamName) continue;
    result[teamName] = {};
    for (const stat of row.statistics || []) {
      result[teamName][stat.type] = stat.value ?? "";
    }
  }
  return result;
}

async function apiFootball(path) {
  const response = await fetch(`https://v3.football.api-sports.io${path}`, {
    headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY }
  });
  if (!response.ok) throw new Error(`API-FOOTBALL ${response.status}`);
  return response.json();
}

async function getFootballDataOrgData() {
  const [standingsData, matchesData] = await Promise.all([
    footballData("/competitions/WC/standings?season=2026"),
    footballData("/competitions/WC/matches?season=2026")
  ]);

  const teams = (standingsData.standings || []).flatMap((standing) => {
    const group = cleanGroupName(standing.group || standing.stage || "");
    return (standing.table || []).map((row) => ({
      id: String(row.team.id),
      name: normalizeTeamName(row.team.name),
      short: row.team.tla || makeShort(row.team.name),
      logo: row.team.crest,
      group,
      played: row.playedGames || 0,
      won: row.won || 0,
      drawn: row.draw || 0,
      lost: row.lost || 0,
      gf: row.goalsFor || 0,
      ga: row.goalsAgainst || 0,
      points: row.points || 0
    }));
  });

  const matches = (matchesData.matches || []).map((match) => {
    const isFinished = match.status === "FINISHED";
    return {
      id: match.id,
      group: cleanGroupName(match.group || match.stage || ""),
      status: isFinished ? "finished" : match.status === "IN_PLAY" || match.status === "PAUSED" ? "live" : "upcoming",
      date: match.utcDate,
      venue: match.venue || "",
      home: normalizeTeamName(match.homeTeam.name),
      away: normalizeTeamName(match.awayTeam.name),
      homeScore: isFinished ? match.score.fullTime.home : undefined,
      awayScore: isFinished ? match.score.fullTime.away : undefined,
      events: []
    };
  });

  if (!teams.length || !matches.length) throw new Error("football-data.org returned incomplete World Cup data.");

  return {
    source: "football-data.org",
    updatedAt: new Date().toISOString(),
    teams,
    matches
  };
}

async function footballData(path) {
  const response = await fetch(`https://api.football-data.org/v4${path}`, {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN }
  });
  if (!response.ok) throw new Error(`football-data.org ${response.status}`);
  return response.json();
}

function cleanGroupName(value) {
  const text = String(value || "").toUpperCase();
  const groupMatch = text.match(/GROUP[\s_-]+([A-L])/);
  if (groupMatch) return groupMatch[1];
  const singleMatch = text.match(/\b([A-L])\b/);
  return singleMatch ? singleMatch[1] : "";
}

function normalizeTeamName(name) {
  return String(name || "")
    .replace("USA", "Hoa Kỳ")
    .replace("Korea Republic", "Hàn Quốc")
    .replace("Côte d'Ivoire", "Bờ Biển Ngà")
    .replace("Czech Republic", "Czechia")
    .replace("IR Iran", "Iran");
}

function makeShort(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 3)
    .toUpperCase();
}

function normalizeApiFootballStatus(status) {
  if (["FT", "AET", "PEN"].includes(status)) return "finished";
  if (["1H", "HT", "2H", "ET", "BT", "P", "LIVE"].includes(status)) return "live";
  return "upcoming";
}

function fallbackBody(primaryError, secondaryError) {
  const messages = [primaryError, secondaryError].filter(Boolean).map((error) => error.message);
  return {
    fallback: true,
    source: "Live data unavailable",
    updatedAt: new Date().toISOString(),
    message: "Live World Cup API is temporarily unavailable or has incomplete data. The app will not show unverified fallback scores.",
    apiError: messages.join(" | "),
    teams: [],
    matches: []
  };
}

function cacheControl() {
  const cacheSeconds = API_CACHE_SECONDS || timeAwareCacheSeconds();
  return `public, max-age=300, s-maxage=${cacheSeconds}, stale-while-revalidate=${API_STALE_SECONDS}`;
}

function shortCacheControl() {
  const cacheSeconds = API_CACHE_SECONDS || API_DETAIL_CACHE_SECONDS;
  return `public, max-age=300, s-maxage=${cacheSeconds}, stale-while-revalidate=3600`;
}

function fallbackCacheControl() {
  return `public, max-age=300, s-maxage=${FALLBACK_CACHE_SECONDS}, stale-while-revalidate=${API_STALE_SECONDS}`;
}

function newsCacheControl() {
  return `public, max-age=300, s-maxage=${NEWS_CACHE_SECONDS}, stale-while-revalidate=21600`;
}

function timeAwareCacheSeconds(now = new Date()) {
  const vietnamHour = Number(new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    hour12: false,
    hourCycle: "h23"
  }).format(now));

  return vietnamHour >= 0 && vietnamHour < 9 ? API_ACTIVE_CACHE_SECONDS : API_IDLE_CACHE_SECONDS;
}

function json(body, statusCode, cacheHeader = cacheControl()) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cacheHeader,
      "Netlify-CDN-Cache-Control": cacheHeader
    },
    body: JSON.stringify(body)
  };
}
