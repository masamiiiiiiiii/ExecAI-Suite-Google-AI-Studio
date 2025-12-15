export interface MonthlyMetric {
  month: string;
  revenue: number;
  expenses: number;
  users: number;
  churn: number;
}

export interface MarketingSegment {
  name: string;
  size: number;
  growth: number;
  clv: number; // Customer Lifetime Value
  sentiment: number; // 0-100
  topInterest: string;
}

export interface BrandHumanityIndex {
  physicality: number; // Visuals/Design
  intellect: number; // Innovation/Thought Leadership
  sociability: number; // Engagement/Community
  emotionality: number; // Storytelling/Empathy
  personability: number; // Customer Service/Self-awareness
  morality: number; // Sustainability/Ethics
}

export interface CompanyData {
  name: string;
  industry: string;
  cashOnHand: number;
  burnRate: number;
  runwayMonths: number;
  history: MonthlyMetric[];
  marketingSegments: MarketingSegment[];
  brandIndex: BrandHumanityIndex;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  MARKETING_COMMAND = 'MARKETING_COMMAND', // New Marketing 5.0 View
  STRATEGY_CHAT = 'STRATEGY_CHAT',
  SCENARIO_SIMULATOR = 'SCENARIO_SIMULATOR'
}
