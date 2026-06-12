const SPORTSDB_LEAGUE = "NBA";
const SPORTSDB_BASE_URL = "https://www.thesportsdb.com/api/v1/json";
const API_SPORTS_BASE_URL = "https://v1.basketball.api-sports.io/games";
const ODDS_MARKETS = "spreads,totals,moneyline";

function normalizeTeamName(team?: string) {
  return team?.toLowerCase().replace(/[\s.]+/g, " ").trim() || "";
}

function formatOutcomeLabel(outcome: any) {
  if (!outcome) return null;
  const price = Number(outcome.price);
  return `${outcome.name} @ ${Number.isFinite(price) ? price.toFixed(2) : outcome.price}`;
}

function buildBestBet(events: any[], marketKeys: string[]) {
  const candidates: Array<{ event: any; outcome: any; market: any }> = [];

  for (const event of events) {
    for (const bookmaker of event.bookmakers ?? []) {
      for (const market of bookmaker.markets ?? []) {
        if (!marketKeys.includes(market.key)) continue;
        for (const outcome of market.outcomes ?? []) {
          const price = Number(outcome.price);
          if (!Number.isFinite(price)) continue;
          candidates.push({ event, outcome, market });
        }
      }
    }
  }

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort((a, b) => Number(a.outcome.price) - Number(b.outcome.price));
  const winner = candidates[0];
  return {
    label: formatOutcomeLabel(winner.outcome),
    event: `${winner.event.away_team} @ ${winner.event.home_team}`,
  };
}

async function fetchJson(url: string, init?: RequestInit) {
  try {
    const response = await fetch(url, init);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    return null;
  }
}

export async function GET() {
  const oddsApiKey = process.env.ODDS_API_KEY;
  const apiSportsKey = process.env.API_SPORTS_KEY;
  const sportsDbKey = process.env.SPORTSDB_API_KEY || "1";

  if (!oddsApiKey) {
    return Response.json(
      { error: "ODDS_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const oddsUrl = `https://api.the-odds-api.com/v4/sports/basketball_nba/odds?apiKey=${oddsApiKey}&markets=${ODDS_MARKETS}&oddsFormat=decimal`;
  const sportsDbUrl = `${SPORTSDB_BASE_URL}/${sportsDbKey}/livescore.php?l=${encodeURIComponent(
    SPORTSDB_LEAGUE
  )}`;
  const apiSportsUrl = `${API_SPORTS_BASE_URL}?date=${today}`;

  const fetchPromises = [
    fetchJson(oddsUrl, { next: { revalidate: 15 } }),
    fetchJson(sportsDbUrl, { next: { revalidate: 30 } }),
  ];

  if (apiSportsKey) {
    fetchPromises.push(
      fetchJson(apiSportsUrl, {
        headers: {
          "x-apisports-key": apiSportsKey,
        },
        next: { revalidate: 30 },
      })
    );
  }

  const [oddsData, sportsDbData, apiSportsData] = await Promise.all(fetchPromises);
  const rawEvents = Array.isArray(oddsData) ? oddsData : [];
  const sportsDbEvents = sportsDbData?.events ?? [];

  const sportsDbMap = new Map<string, any>();
  for (const event of sportsDbEvents) {
    const home = normalizeTeamName(event.strHomeTeam);
    const away = normalizeTeamName(event.strAwayTeam);
    if (home && away) {
      sportsDbMap.set(`${away}|${home}`, event);
      sportsDbMap.set(`${home}|${away}`, event);
    }
  }

  const combinedEvents = rawEvents.map((event: any) => {
    const normalizedKey = `${normalizeTeamName(event.away_team)}|${normalizeTeamName(event.home_team)}`;
    return {
      ...event,
      source: "odds-api",
      sportsDb: sportsDbMap.get(normalizedKey) || null,
    };
  });

  const bestMoneyline = buildBestBet(rawEvents, ["h2h", "moneyline"]);
  const bestSpread = buildBestBet(rawEvents, ["spreads"]);
  const bestPickWinner = bestMoneyline;

  const bestBets = {
    moneyline: bestMoneyline
      ? `${bestMoneyline.label} · ${bestMoneyline.event}`
      : "No moneyline recommendation available",
    pickWinner: bestPickWinner
      ? `${bestPickWinner.label} · ${bestPickWinner.event}`
      : "No pick winner available",
    spread: bestSpread
      ? `${bestSpread.label} · ${bestSpread.event}`
      : "No spread recommendation available",
  };

  return Response.json({
    combinedEvents,
    bestBets,
    sportsDbData,
    apiSportsData,
    oddsData: rawEvents,
  });
}
