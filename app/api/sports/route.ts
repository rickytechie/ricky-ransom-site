export async function GET() {
  const oddsApiKey = process.env.ODDS_API_KEY;

  if (!oddsApiKey) {
    return Response.json(
      { error: "ODDS_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    // Fetch live sports events with odds from multiple sportsbooks
    const response = await fetch(
      `https://api.the-odds-api.com/v4/sports/basketball_nba/events?apiKey=${oddsApiKey}`,
      { next: { revalidate: 30 } } // Cache for 30 seconds
    );

    if (!response.ok) {
      throw new Error(`Odds API returned ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching sports data:", error);
    return Response.json(
      { error: "Failed to fetch sports data" },
      { status: 500 }
    );
  }
}
