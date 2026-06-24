const WORLD_CUP_LEAGUE_ID = process.env.API_FOOTBALL_LEAGUE_ID || "1";
const WORLD_CUP_SEASON = process.env.API_FOOTBALL_SEASON || "2026";
const WORLD_CUP_FALLBACK_LEAGUE_IDS = ["1", "37", "31", "33", "34", "30", "587", "927", "950", "1213"];
const API_CACHE_SECONDS = Number(process.env.API_CACHE_SECONDS || 21600);
const API_STALE_SECONDS = Number(process.env.API_STALE_SECONDS || 86400);
const FALLBACK_CACHE_SECONDS = Number(process.env.API_FALLBACK_CACHE_SECONDS || 3600);

exports.handler = async () => {
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
    source: "Fallback data in app.js",
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

    if (data.teams.length >= 12 && data.matches.length) {
      return {
        source: `API-FOOTBALL / API-SPORTS · league ${leagueId}`,
        updatedAt: new Date().toISOString(),
        teams: data.teams,
        matches: data.matches,
        debug: { attempts }
      };
    }
  }

  throw new Error(`API-Football returned incomplete World Cup data. Tried league ids: ${candidateLeagueIds.join(", ")}`);
}

async function getWorldCupLeagueCandidates() {
  const candidates = new Set([String(WORLD_CUP_LEAGUE_ID)]);
  WORLD_CUP_FALLBACK_LEAGUE_IDS.forEach((id) => candidates.add(id));

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
  const [standingsData, fixturesData] = await Promise.all([
    apiFootball(`/standings?league=${leagueId}&season=${WORLD_CUP_SEASON}`),
    apiFootball(`/fixtures?league=${leagueId}&season=${WORLD_CUP_SEASON}`)
  ]);

  const standings = standingsData.response?.[0]?.league?.standings || [];
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
      homeScore: status === "finished" ? item.goals.home : undefined,
      awayScore: status === "finished" ? item.goals.away : undefined,
      events: []
    };
  }).filter((match) => match.home && match.away);

  if (!teams.length && matches.length) {
    teams = deriveTeamsFromMatches(fixturesData.response || []);
  }

  return {
    teams,
    matches,
    debug: {
      leagueId,
      standingsGroups: standings.length,
      teams: teams.length,
      matches: matches.length
    }
  };
}

function deriveTeamsFromMatches(fixtures) {
  const byName = new Map();

  for (const item of fixtures) {
    const group = cleanGroupName(item.league?.round || item.league?.name || "");
    for (const side of ["home", "away"]) {
      const apiTeam = item.teams?.[side];
      if (!apiTeam?.name) continue;
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
    }
  }

  return [...byName.values()];
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
    source: "Fallback data in app.js",
    updatedAt: new Date().toISOString(),
    message: "Live World Cup API is temporarily unavailable or has incomplete data. The app will use its local fallback data.",
    apiError: messages.join(" | "),
    teams: [],
    matches: []
  };
}

function cacheControl() {
  return `public, max-age=300, s-maxage=${API_CACHE_SECONDS}, stale-while-revalidate=${API_STALE_SECONDS}`;
}

function fallbackCacheControl() {
  return `public, max-age=300, s-maxage=${FALLBACK_CACHE_SECONDS}, stale-while-revalidate=${API_STALE_SECONDS}`;
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
