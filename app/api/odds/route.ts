export async function GET() {
  const oddsApiKey = process.env.ODDS_API_KEY;

  if (!oddsApiKey) {
    return Response.json(
      { error: "ODDS_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    // Fetch live odds for NBA games
    const response = await fetch(
      `https://api.the-odds-api.com/v4/sports/basketball_nba/odds?apiKey=${oddsApiKey}&markets=spreads,totals&oddsFormat=decimal`,
      { next: { revalidate: 15 } } // Cache for 15 seconds to get fresh odds
    );

    if (!response.ok) {
      throw new Error(`Odds API returned ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching odds data:", error);
    return Response.json(
      { error: "Failed to fetch odds data" },
      { status: 500 }
    );
  }
}
