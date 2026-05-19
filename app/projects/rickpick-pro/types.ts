// Market Data Types
export interface MarketAsset {
  symbol: string;
  name: string;
  price: number;
  change: number; // percentage
  changeDirection: "up" | "down" | "neutral";
  category: "nasdaq" | "dow" | "nyse" | "commodities" | "crypto";
}

export interface DataSource {
  id: string;
  category: string;
  count: number;
  icon: string;
  description: string;
}

export interface SentimentHeadline {
  id: string;
  text: string;
  impact: "positive" | "negative" | "neutral";
  category: string;
  timestamp: string;
}

export interface InvestorPersona {
  id: string;
  name: string;
  description: string;
  riskProfile: "low" | "medium" | "high";
  timeHorizon: "short" | "medium" | "long";
  preferredAssets: string[];
}

export interface InvestmentStrategy {
  id: string;
  title: string;
  description: string;
  riskReward: string;
  confidenceScore: number;
  allocations: AllocationBreakdown[];
  topTickers: string[];
  rationale: string;
}

export interface AllocationBreakdown {
  asset: string;
  percentage: number;
  color: string;
}

export interface TradeSignal {
  ticker: string;
  action: "BUY" | "SELL" | "HOLD";
  confidence: number;
  rationale: string;
  targetPrice?: number;
  stopLoss?: number;
}
