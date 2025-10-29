export type Platform = "reddit" | "youtube" | "twitter";

export type AnalysisItem = {
  platform: string;
  date: string;      
  sentiment: "Positive" | "Negative" | "Neutral";
  source?: Platform;
  content?: string;
  title: string;
  url: string;
  created_utc: number;
};

export type Post = {
  title: string;
  url: string;
  sentiment: "Positive" | "Negative" | "Neutral" | string;
  source?: string;
  created_utc: number;
};

export type Stats = { 
  positiveRatio: number;
  negativeRatio: number;
  neutralRatio: number;
  topics: string[];
  avgSentiment: number; 
  total: number;
};

export type TrendChartPoint = {
  date: number | string;
  sentiment: "Positive" | "Negative" | "Neutral";
  source?: Platform;
  content?: string; 
};
