const WORLD_CUP_LEAGUE_ID = process.env.API_FOOTBALL_LEAGUE_ID || "1";
const WORLD_CUP_SEASON = process.env.API_FOOTBALL_SEASON || "2026";

exports.handler = async () => {
  try {
    if (process.env.API_FOOTBALL_KEY) {
      const data = await getApiFootballData();
      return json(data, 200, "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400");
    }

    if (process.env.FOOTBALL_DATA_TOKEN) {
      const data = await getFootballDataOrgData();
      return json(data, 200, "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400");
    }

    return json({
      error: "Missing API key",
      message: "Set API_FOOTBALL_KEY or FOOTBALL_DATA_TOKEN in Netlify environment variables."
    }, 503, "public, max-age=60");
  } catch (error) {
    return json({
      error: "World Cup API failed",
      message: error.message
    }, 502, "public, max-age=60");
  }
};

async function getApiFootballData() {
  const [standingsData, fixturesData] = await Promise.all([
    apiFootball(`/standings?league=${WORLD_CUP_LEAGUE_ID}&season=${WORLD_CUP_SEASON}`),
    apiFootball(`/fixtures?league=${WORLD_CUP_LEAGUE_ID}&season=${WORLD_CUP_SEASON}`)
  ]);

  const standings = standingsData.response?.[0]?.league?.standings || [];
  const teams = standings.flatMap((groupRows) => groupRows.map((row) => {
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
    const isFinished = ["FT", "AET", "PEN"].includes(item.fixture.status?.short);
    return {
      id: item.fixture.id,
      group: cleanGroupName(item.league.round || item.league.name || ""),
      status: isFinished ? "finished" : "upcoming",
      date: item.fixture.date,
      venue: [item.fixture.venue?.name, item.fixture.venue?.city].filter(Boolean).join(", "),
      home: normalizeTeamName(item.teams.home.name),
      away: normalizeTeamName(item.teams.away.name),
      homeScore: isFinished ? item.goals.home : undefined,
      awayScore: isFinished ? item.goals.away : undefined,
      events: []
    };
  }).filter((match) => match.home && match.away);

  if (!teams.length || !matches.length) throw new Error("API-Football returned incomplete World Cup data.");

  return {
    source: "API-FOOTBALL / API-SPORTS",
    updatedAt: new Date().toISOString(),
    teams,
    matches
  };
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
      status: isFinished ? "finished" : "upcoming",
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

function json(body, statusCode, cacheControl) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cacheControl
    },
    body: JSON.stringify(body)
  };
}
