import { CompanyData } from './types';

export const INITIAL_COMPANY_DATA: CompanyData = {
  name: "NovaTech Solutions",
  industry: "SaaS / AI",
  cashOnHand: 1200000,
  burnRate: 85000,
  runwayMonths: 14,
  history: [
    { month: 'Jan', revenue: 45000, expenses: 80000, users: 1200, churn: 2.5 },
    { month: 'Feb', revenue: 49000, expenses: 82000, users: 1350, churn: 2.4 },
    { month: 'Mar', revenue: 58000, expenses: 85000, users: 1600, churn: 2.1 },
    { month: 'Apr', revenue: 62000, expenses: 83000, users: 1800, churn: 2.0 },
    { month: 'May', revenue: 75000, expenses: 88000, users: 2100, churn: 1.8 },
    { month: 'Jun', revenue: 81000, expenses: 85000, users: 2400, churn: 1.9 },
  ],
  marketingSegments: [
    { name: "Digital Natives", size: 850, growth: 15, clv: 2400, sentiment: 88, topInterest: "Mobile UX" },
    { name: "Eco-Conscious Pros", size: 620, growth: 8, clv: 3100, sentiment: 75, topInterest: "Sustainability" },
    { name: "Legacy Enterprise", size: 300, growth: 2, clv: 15000, sentiment: 60, topInterest: "Security" }
  ],
  brandIndex: {
    physicality: 85,
    intellect: 90,
    sociability: 65,
    emotionality: 55,
    personability: 70,
    morality: 80
  }
};

export const AI_CEO_SYSTEM_PROMPT = `
You are an advanced AI Executive Strategist, combining the role of a CEO with the marketing genius of Philip Kotler (Marketing 5.0).

Your Core Frameworks:
1. **Marketing 5.0**: You focus on Data-driven, Predictive, Contextual, Augmented, and Agile marketing.
2. **Brand Humanity**: You evaluate the company based on Physicality, Intellect, Sociability, Emotionality, Personability, and Morality.
3. **The Next Best Action**: You always suggest the immediate next step to maximize value.

When the user asks you questions:
1. Analyze the financial AND marketing metrics provided.
2. Give advice that balances profitability with "Technology for Humanity".
3. Use terms like "Predictive Segmenting", "Contextual Engagement", "Omnichannel Experience", and "Brand Equity".
4. Be decisive. You are the leader.
`;

export const MARKETING_ANALYSIS_PROMPT = `
Act as a Chief Marketing Officer AI inspired by Marketing 5.0.
Analyze the provided customer segments and Brand Humanity Index.
Generate 3 specific "Next Best Actions" (NBA) for the company.
For each action, specify:
1. The Target Segment.
2. The Channel (e.g., Metaverse, Social, Email, IoT).
3. The Rationale (linking to Predictive or Contextual theory).

Format the output as a JSON array of objects with keys: title, target, action, impact.
Do not include markdown formatting. Just the raw JSON.
`;
