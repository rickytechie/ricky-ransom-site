import {
  MarketAsset,
  DataSource,
  SentimentHeadline,
  InvestorPersona,
  InvestmentStrategy,
} from "./types";

// Market Assets across all categories
export const marketAssets: MarketAsset[] = [
  // NASDAQ
  { symbol: "NVDA", name: "NVIDIA", price: 847.32, change: 4.2, changeDirection: "up", category: "nasdaq" },
  { symbol: "MSFT", name: "Microsoft", price: 425.18, change: 2.1, changeDirection: "up", category: "nasdaq" },
  { symbol: "TSLA", name: "Tesla", price: 242.56, change: -1.3, changeDirection: "down", category: "nasdaq" },
  { symbol: "META", name: "Meta", price: 534.21, change: 3.5, changeDirection: "up", category: "nasdaq" },
  { symbol: "GOOGL", name: "Google", price: 186.45, change: 0.8, changeDirection: "up", category: "nasdaq" },

  // DOW
  { symbol: "JPM", name: "JP Morgan", price: 189.32, change: 1.2, changeDirection: "up", category: "dow" },
  { symbol: "WMT", name: "Walmart", price: 98.76, change: 2.3, changeDirection: "up", category: "dow" },
  { symbol: "JNJ", name: "Johnson & Johnson", price: 153.21, change: 0.5, changeDirection: "up", category: "dow" },
  { symbol: "PG", name: "Procter & Gamble", price: 167.89, change: 1.1, changeDirection: "up", category: "dow" },
  { symbol: "KO", name: "Coca-Cola", price: 71.42, change: -0.3, changeDirection: "down", category: "dow" },

  // NYSE
  { symbol: "F", name: "Ford", price: 11.23, change: 2.8, changeDirection: "up", category: "nyse" },
  { symbol: "GE", name: "General Electric", price: 178.94, change: 1.9, changeDirection: "up", category: "nyse" },
  { symbol: "IBM", name: "IBM", price: 201.45, change: 0.3, changeDirection: "neutral", category: "nyse" },
  { symbol: "BA", name: "Boeing", price: 156.78, change: 3.2, changeDirection: "up", category: "nyse" },
  { symbol: "XOM", name: "ExxonMobil", price: 109.87, change: 2.1, changeDirection: "up", category: "nyse" },

  // Commodities
  { symbol: "GC=F", name: "Gold Futures", price: 2087.50, change: 1.8, changeDirection: "up", category: "commodities" },
  { symbol: "CL=F", name: "Crude Oil WTI", price: 78.34, change: -0.5, changeDirection: "down", category: "commodities" },
  { symbol: "NG=F", name: "Natural Gas", price: 2.456, change: 4.3, changeDirection: "up", category: "commodities" },
  { symbol: "SI=F", name: "Silver Futures", price: 29.87, change: 2.1, changeDirection: "up", category: "commodities" },

  // Crypto
  { symbol: "BTC", name: "Bitcoin", price: 68420.50, change: 5.2, changeDirection: "up", category: "crypto" },
  { symbol: "ETH", name: "Ethereum", price: 3842.15, change: 3.8, changeDirection: "up", category: "crypto" },
  { symbol: "SOL", name: "Solana", price: 142.56, change: 6.1, changeDirection: "up", category: "crypto" },
  { symbol: "XRP", name: "Ripple", price: 2.34, change: -0.8, changeDirection: "down", category: "crypto" },
];

// 100+ Data Sources across categories
export const dataSources: DataSource[] = [
  // Finance & Stock Analysis (25 sources)
  { id: "1", category: "Finance & Stocks", count: 25, icon: "📊", description: "Top financial analysis blogs and stock research platforms" },

  // Geopolitical News (20 sources)
  { id: "2", category: "Geopolitics", count: 20, icon: "🌍", description: "Global political news portals and breaking geopolitical feeds" },

  // Tech Innovation (18 sources)
  { id: "3", category: "Tech Innovation", count: 18, icon: "💡", description: "Core tech innovation channels and research indexes" },

  // Medical & Scientific (17 sources)
  { id: "4", category: "Medical Research", count: 17, icon: "🔬", description: "Medical and scientific research indexes and journals" },

  // Market Data (15 sources)
  { id: "5", category: "Market Data", count: 15, icon: "📈", description: "Real-time market data feeds and exchange APIs" },
];

export const totalDataSources = dataSources.reduce((sum, src) => sum + src.count, 0);

// Sentiment Headlines that cycle
export const sentimentHeadlines: SentimentHeadline[] = [
  {
    id: "1",
    text: "Tech Regulation Shift Detected → Reallocating Equities",
    impact: "negative",
    category: "Regulation",
    timestamp: "2 mins ago",
  },
  {
    id: "2",
    text: "Medical Breakthrough in Gene Therapy Announced → MRNA, BNTX Flagged",
    impact: "positive",
    category: "Healthcare",
    timestamp: "5 mins ago",
  },
  {
    id: "3",
    text: "Geopolitical Tension in South China Sea → Defense Stocks Surge",
    impact: "positive",
    category: "Geopolitics",
    timestamp: "8 mins ago",
  },
  {
    id: "4",
    text: "Fed Signals Potential Rate Pause → Bond Markets Stabilize",
    impact: "positive",
    category: "Macro",
    timestamp: "12 mins ago",
  },
  {
    id: "5",
    text: "AI Chip Shortage Easing → Supply Chain Normalization Signal",
    impact: "positive",
    category: "Tech",
    timestamp: "15 mins ago",
  },
  {
    id: "6",
    text: "Rare Earth Mining Expansion → Commodity Prices Pressured",
    impact: "negative",
    category: "Commodities",
    timestamp: "18 mins ago",
  },
  {
    id: "7",
    text: "Aerospace Contract Award → $2B Defense Supplier Win",
    impact: "positive",
    category: "Aerospace",
    timestamp: "22 mins ago",
  },
  {
    id: "8",
    text: "Crypto Regulatory Framework Clarified → Bitcoin Stabilizes Above $68K",
    impact: "positive",
    category: "Crypto",
    timestamp: "25 mins ago",
  },
];

// Investor Personas
export const investorPersonas: InvestorPersona[] = [
  {
    id: "retail-day-trader",
    name: "Retail Day Trader",
    description: "Active trader making 5-10 trades daily with focus on technical setups and volatility",
    riskProfile: "high",
    timeHorizon: "short",
    preferredAssets: ["NVDA", "TSLA", "SPY", "QQQ"],
  },
  {
    id: "momentum-swing-trader",
    name: "Momentum Swing Trader",
    description: "Captures multi-day to multi-week trends with fundamental + technical analysis",
    riskProfile: "medium",
    timeHorizon: "medium",
    preferredAssets: ["MSFT", "META", "JPMC", "SNPS"],
  },
  {
    id: "options-broker",
    name: "Options Broker",
    description: "Sophisticated options trader using spreads, straddles, and earnings plays",
    riskProfile: "high",
    timeHorizon: "short",
    preferredAssets: ["XSP", "SPY", "QQQ", "IWM"],
  },
  {
    id: "institutional-wealth",
    name: "Institutional Wealth Manager",
    description: "Multi-billion AUM manager focused on diversification and long-term alpha",
    riskProfile: "low",
    timeHorizon: "long",
    preferredAssets: ["SPY", "AGG", "VTI", "BND"],
  },
  {
    id: "defi-hodler",
    name: "Long-Term DeFi HODLer",
    description: "Crypto native focused on fundamental blockchain adoption and ecosystem play",
    riskProfile: "high",
    timeHorizon: "long",
    preferredAssets: ["BTC", "ETH", "SOL", "AAVE"],
  },
];

// Customized Strategies by Persona
export const strategiesByPersona: Record<string, InvestmentStrategy[]> = {
  "retail-day-trader": [
    {
      id: "rdt-1",
      title: "High-Volatility Momentum Play",
      description: "Capture intraday moves in mega-cap tech with tight stops and high conviction",
      riskReward: "1:2.5",
      confidenceScore: 87,
      allocations: [
        { asset: "NVDA (40%)", percentage: 40, color: "bg-green-500" },
        { asset: "TSLA (35%)", percentage: 35, color: "bg-blue-500" },
        { asset: "META (25%)", percentage: 25, color: "bg-purple-500" },
      ],
      topTickers: ["NVDA", "TSLA", "META"],
      rationale: "AI compute boom + Tesla's volatility + Meta's rebound create 3-5% daily swings",
    },
    {
      id: "rdt-2",
      title: "Technical Breakout Strategy",
      description: "Trade above key resistance levels with volume confirmation signals",
      riskReward: "1:2",
      confidenceScore: 82,
      allocations: [
        { asset: "GOOGL (35%)", percentage: 35, color: "bg-red-500" },
        { asset: "MSFT (40%)", percentage: 40, color: "bg-cyan-500" },
        { asset: "NVDA (25%)", percentage: 25, color: "bg-green-500" },
      ],
      topTickers: ["GOOGL", "MSFT", "NVDA"],
      rationale: "All three breaking above 200-day moving averages with institutional buying",
    },
    {
      id: "rdt-3",
      title: "Earnings Surprise Scalp",
      description: "Trade pre/post earnings gaps with defined risk around key support",
      riskReward: "1:3",
      confidenceScore: 91,
      allocations: [
        { asset: "NVDA (50%)", percentage: 50, color: "bg-green-500" },
        { asset: "JPM (50%)", percentage: 50, color: "bg-blue-500" },
      ],
      topTickers: ["NVDA", "JPM"],
      rationale: "Next earnings catalyst window with 85%+ probability of surprise move",
    },
    {
      id: "rdt-4",
      title: "Volume Climax Reversal",
      description: "Mean-reversion play when volume reaches extreme readings",
      riskReward: "1:2.2",
      confidenceScore: 79,
      allocations: [
        { asset: "SPY (40%)", percentage: 40, color: "bg-indigo-500" },
        { asset: "TSLA (60%)", percentage: 60, color: "bg-blue-500" },
      ],
      topTickers: ["SPY", "TSLA"],
      rationale: "Extreme volume on down days historically precedes sharp reversals",
    },
    {
      id: "rdt-5",
      title: "Crypto Volatility Capture",
      description: "Trade BTC/ETH pairs during US market hours for maximum liquidity",
      riskReward: "1:3",
      confidenceScore: 88,
      allocations: [
        { asset: "BTC (60%)", percentage: 60, color: "bg-yellow-600" },
        { asset: "ETH (40%)", percentage: 40, color: "bg-slate-500" },
      ],
      topTickers: ["BTC", "ETH"],
      rationale: "Crypto regaining institutional adoption with lower correlation to equities",
    },
  ],
  "momentum-swing-trader": [
    {
      id: "mst-1",
      title: "Multi-Day Momentum Consolidation",
      description: "Hold winners that break above consolidation patterns over 3-5 days",
      riskReward: "1:2.8",
      confidenceScore: 86,
      allocations: [
        { asset: "MSFT (35%)", percentage: 35, color: "bg-cyan-500" },
        { asset: "META (35%)", percentage: 35, color: "bg-purple-500" },
        { asset: "JPMC (30%)", percentage: 30, color: "bg-blue-500" },
      ],
      topTickers: ["MSFT", "META", "JPMC"],
      rationale: "Enterprise spending and financial sector momentum accelerating into Q2",
    },
    {
      id: "mst-2",
      title: "Sector Rotation Play",
      description: "Capture flows from defensive to growth sectors during risk-on periods",
      riskReward: "1:2.5",
      confidenceScore: 84,
      allocations: [
        { asset: "IWM (40%)", percentage: 40, color: "bg-green-500" },
        { asset: "NVDA (30%)", percentage: 30, color: "bg-green-500" },
        { asset: "XLF (30%)", percentage: 30, color: "bg-orange-500" },
      ],
      topTickers: ["IWM", "NVDA", "XLF"],
      rationale: "Small cap and tech outperforming on Fed pause narrative",
    },
    {
      id: "mst-3",
      title: "Earnings Season Alpha",
      description: "Build positions 3-4 weeks before earnings, exit into strength",
      riskReward: "1:2.2",
      confidenceScore: 89,
      allocations: [
        { asset: "BA (35%)", percentage: 35, color: "bg-gray-500" },
        { asset: "GE (35%)", percentage: 35, color: "bg-blue-600" },
        { asset: "SNPS (30%)", percentage: 30, color: "bg-red-500" },
      ],
      topTickers: ["BA", "GE", "SNPS"],
      rationale: "Defense and semiconductor earnings setting up for major beats",
    },
    {
      id: "mst-4",
      title: "Geopolitical Hedge Trade",
      description: "Long defense/aerospace on heightened global tensions with ETF hedge",
      riskReward: "1:2",
      confidenceScore: 81,
      allocations: [
        { asset: "XLI (50%)", percentage: 50, color: "bg-blue-500" },
        { asset: "BA (50%)", percentage: 50, color: "bg-gray-500" },
      ],
      topTickers: ["XLI", "BA"],
      rationale: "South China Sea tensions driving defense spending tailwinds",
    },
    {
      id: "mst-5",
      title: "Commodity Mean Reversion",
      description: "Trade oil and precious metals on extreme deviation from moving averages",
      riskReward: "1:2.3",
      confidenceScore: 78,
      allocations: [
        { asset: "GC (50%)", percentage: 50, color: "bg-yellow-500" },
        { asset: "CL (50%)", percentage: 50, color: "bg-orange-600" },
      ],
      topTickers: ["GC=F", "CL=F"],
      rationale: "Gold near all-time highs but crude oil showing weakness - asymmetric setup",
    },
  ],
  "options-broker": [
    {
      id: "ob-1",
      title: "Iron Condor Income Strategy",
      description: "Sell strangles on high IV assets, collect premium with defined risk",
      riskReward: "1:1.5",
      confidenceScore: 85,
      allocations: [
        { asset: "SPY Strangles (50%)", percentage: 50, color: "bg-indigo-500" },
        { asset: "QQQ Strangles (50%)", percentage: 50, color: "bg-blue-500" },
      ],
      topTickers: ["SPY", "QQQ"],
      rationale: "IV Rank at 65th percentile - optimal for premium selling",
    },
    {
      id: "ob-2",
      title: "Earnings Straddle Play",
      description: "Long straddles on mega-cap earnings with 50+ IV crush resistance",
      riskReward: "1:3.2",
      confidenceScore: 88,
      allocations: [
        { asset: "NVDA Straddles (40%)", percentage: 40, color: "bg-green-500" },
        { asset: "MSFT Straddles (35%)", percentage: 35, color: "bg-cyan-500" },
        { asset: "GOOGL Straddles (25%)", percentage: 25, color: "bg-red-500" },
      ],
      topTickers: ["NVDA", "MSFT", "GOOGL"],
      rationale: "Earnings expected to move 8-15% - straddle captures both directions",
    },
    {
      id: "ob-3",
      title: "Volatility Expansion Strategy",
      description: "Buy call spreads when IV is compressed, sell when expanded",
      riskReward: "1:2.5",
      confidenceScore: 82,
      allocations: [
        { asset: "XSP Call Spreads (60%)", percentage: 60, color: "bg-purple-500" },
        { asset: "RUT Call Spreads (40%)", percentage: 40, color: "bg-green-600" },
      ],
      topTickers: ["SPX", "IWM"],
      rationale: "Historical IV mean reversion suggests 35% move up likely",
    },
    {
      id: "ob-4",
      title: "Dividend Roll Strategy",
      description: "Write covered calls on dividend-paying stocks, roll for credit",
      riskReward: "1:1.8",
      confidenceScore: 79,
      allocations: [
        { asset: "JNJ Calls (35%)", percentage: 35, color: "bg-red-500" },
        { asset: "PG Calls (35%)", percentage: 35, color: "bg-blue-500" },
        { asset: "KO Calls (30%)", percentage: 30, color: "bg-red-600" },
      ],
      topTickers: ["JNJ", "PG", "KO"],
      rationale: "3-4% yields + option premium = 8-10% total annual return",
    },
    {
      id: "ob-5",
      title: "Tail Risk Hedge Portfolio",
      description: "OTM put protection on portfolio with long volatility exposure",
      riskReward: "1:8+",
      confidenceScore: 91,
      allocations: [
        { asset: "SPY Put Spreads (70%)", percentage: 70, color: "bg-indigo-500" },
        { asset: "VXX Long (30%)", percentage: 30, color: "bg-red-500" },
      ],
      topTickers: ["SPY", "VXX"],
      rationale: "Geopolitical risks warrant 2-3% portfolio insurance premium",
    },
  ],
  "institutional-wealth": [
    {
      id: "iw-1",
      title: "Diversified Growth & Value Blend",
      description: "60% equities (40% US/20% intl), 35% bonds, 5% alternatives",
      riskReward: "1:1.8",
      confidenceScore: 94,
      allocations: [
        { asset: "US Equities (40%)", percentage: 40, color: "bg-blue-500" },
        { asset: "Intl Equities (20%)", percentage: 20, color: "bg-green-500" },
        { asset: "Bonds (35%)", percentage: 35, color: "bg-slate-500" },
        { asset: "Alternatives (5%)", percentage: 5, color: "bg-yellow-500" },
      ],
      topTickers: ["VTI", "VXUS", "BND"],
      rationale: "Time-tested allocation with rebalancing discipline delivers 7-8% CAGR",
    },
    {
      id: "iw-2",
      title: "ESG & Sustainability Focus",
      description: "Allocate to climate, renewable energy, and impact-focused funds",
      riskReward: "1:2.1",
      confidenceScore: 87,
      allocations: [
        { asset: "ESG Equities (45%)", percentage: 45, color: "bg-green-500" },
        { asset: "Green Bonds (35%)", percentage: 35, color: "bg-cyan-500" },
        { asset: "Impact Funds (20%)", percentage: 20, color: "bg-teal-500" },
      ],
      topTickers: ["VCNS", "ICLN", "NUSA"],
      rationale: "Regulatory tailwinds + institutional flows into sustainable assets",
    },
    {
      id: "iw-3",
      title: "Multi-Asset Income Generation",
      description: "Target 3-4% yield across equities, REITs, bonds, and MLPs",
      riskReward: "1:1.6",
      confidenceScore: 89,
      allocations: [
        { asset: "Dividend Stocks (30%)", percentage: 30, color: "bg-blue-500" },
        { asset: "REITs (20%)", percentage: 20, color: "bg-orange-500" },
        { asset: "Bonds (35%)", percentage: 35, color: "bg-slate-500" },
        { asset: "MLPs (15%)", percentage: 15, color: "bg-green-600" },
      ],
      topTickers: ["VYM", "VNQ", "BND", "AMLP"],
      rationale: "Rising rates support yield strategies; inflation-protected income streams",
    },
    {
      id: "iw-4",
      title: "Global Macro Hedge Fund Allocation",
      description: "50% long equities, 20% macro hedge funds, 30% liquid alts",
      riskReward: "1:2.5",
      confidenceScore: 91,
      allocations: [
        { asset: "Global Equities (50%)", percentage: 50, color: "bg-blue-500" },
        { asset: "Macro Hedge Funds (20%)", percentage: 20, color: "bg-purple-500" },
        { asset: "Liquid Alts (30%)", percentage: 30, color: "bg-pink-500" },
      ],
      topTickers: ["VTIAX", "DBMF", "QRVO"],
      rationale: "Central bank divergence + geopolitical risks favor defensive positioning",
    },
    {
      id: "iw-5",
      title: "Intergenerational Wealth Transfer Plan",
      description: "Conservative growth with tax-efficient, buy-and-hold framework",
      riskReward: "1:1.9",
      confidenceScore: 96,
      allocations: [
        { asset: "Index Funds (50%)", percentage: 50, color: "bg-blue-500" },
        { asset: "Dividend Aristocrats (25%)", percentage: 25, color: "bg-green-500" },
        { asset: "Bonds (20%)", percentage: 20, color: "bg-slate-500" },
        { asset: "Tax-Exempt Bonds (5%)", percentage: 5, color: "bg-yellow-500" },
      ],
      topTickers: ["VOO", "NOBL", "BND"],
      rationale: "Proven 50-year strategies with minimal turnover maximize after-tax returns",
    },
  ],
  "defi-hodler": [
    {
      id: "dh-1",
      title: "Bitcoin Core Position + Ethereum Upside",
      description: "70% BTC, 30% ETH with 5-year hold minimum and dollar-cost-averaging",
      riskReward: "1:4.2",
      confidenceScore: 93,
      allocations: [
        { asset: "BTC (70%)", percentage: 70, color: "bg-yellow-600" },
        { asset: "ETH (30%)", percentage: 30, color: "bg-slate-500" },
      ],
      topTickers: ["BTC", "ETH"],
      rationale: "Institutional adoption curve still in early innings; $1M+ per BTC possible by 2030",
    },
    {
      id: "dh-2",
      title: "Smart Contract Layer 1 & 2 Diversification",
      description: "Diversify across Solana, Avalanche, Polygon with focus on real TVL",
      riskReward: "1:5",
      confidenceScore: 85,
      allocations: [
        { asset: "BTC (40%)", percentage: 40, color: "bg-yellow-600" },
        { asset: "ETH (30%)", percentage: 30, color: "bg-slate-500" },
        { asset: "SOL (15%)", percentage: 15, color: "bg-purple-500" },
        { asset: "AVAX (15%)", percentage: 15, color: "bg-red-500" },
      ],
      topTickers: ["BTC", "ETH", "SOL", "AVAX"],
      rationale: "L1 competition drives 100x innovations; early-stage believers capture asymmetric upside",
    },
    {
      id: "dh-3",
      title: "DeFi Yield Farming Treasury",
      description: "Earn 8-12% APY on stablecoins via Aave, Compound, Lido in neutral market",
      riskReward: "1:1.5",
      confidenceScore: 88,
      allocations: [
        { asset: "USDC Farming (40%)", percentage: 40, color: "bg-blue-600" },
        { asset: "ETH Staking (35%)", percentage: 35, color: "bg-slate-500" },
        { asset: "LP Positions (25%)", percentage: 25, color: "bg-purple-500" },
      ],
      topTickers: ["USDC", "ETH", "AAVE"],
      rationale: "Post-merge ETH staking + refined DeFi protocols unlock sustainable yields",
    },
    {
      id: "dh-4",
      title: "Venture Crypto Bet - Emerging Ecosystems",
      description: "10% allocation to moonshot Layer 1s and narrative tokens",
      riskReward: "1:10+",
      confidenceScore: 78,
      allocations: [
        { asset: "BTC (45%)", percentage: 45, color: "bg-yellow-600" },
        { asset: "ETH (35%)", percentage: 35, color: "bg-slate-500" },
        { asset: "Altcoins (20%)", percentage: 20, color: "bg-red-500" },
      ],
      topTickers: ["BTC", "ETH", "DOGE"],
      rationale: "History shows 2-3 new Layer 1s emerge every 4-year cycle with 50-100x returns",
    },
    {
      id: "dh-5",
      title: "Self-Custodied, Privacy-First HODLing",
      description: "Migrate to hardware wallets, utilize Monero/Zcash for anonymity, tax-loss harvest",
      riskReward: "1:3.8",
      confidenceScore: 91,
      allocations: [
        { asset: "BTC (55%)", percentage: 55, color: "bg-yellow-600" },
        { asset: "ETH (30%)", percentage: 30, color: "bg-slate-500" },
        { asset: "Privacy Coins (15%)", percentage: 15, color: "bg-gray-700" },
      ],
      topTickers: ["BTC", "ETH", "XMR"],
      rationale: "On-chain sovereignty eliminates counterparty risk; privacy regulation tailwind incoming",
    },
  ],
};
