import { useEffect } from "react";
import { connectWS, onWS, closeWS } from "@/utils/ws";
import { AnalysisItem, Stats, TrendChartPoint } from "@/types/types";

interface WSInsightPayload {
  insight: string;
  posts?: Partial<AnalysisItem>[]; 
  stats?: Stats;
  trend?: TrendChartPoint[];
  progress?: { completedBatches: number; totalBatches: number };
}

export function useDashboardWS(
  setData: React.Dispatch<React.SetStateAction<AnalysisItem[]>>,
  setChartData: React.Dispatch<React.SetStateAction<TrendChartPoint[]>>,
  setStats: React.Dispatch<React.SetStateAction<Stats>>,
  setInsight: React.Dispatch<React.SetStateAction<string | null>>,
  setProgress: React.Dispatch<React.SetStateAction<{ completedBatches: number; totalBatches: number }>>,
) {
  useEffect(() => {
    // establish WebSocket connection
    connectWS();

    // listen for batch completion updates
    const unsubBatch = onWS("batch_completed", (payload: { [key: string]: unknown }) => {
      console.log("WS batch_completed", payload);
      setProgress((p) => ({ ...p, completedBatches: p.completedBatches + 1 }));
    });

    // listen for insight completion
    const unsubInsight = onWS("insight_completed", (payload: WSInsightPayload) => {
      console.log("WS insight_completed payload", payload);
      if (!payload?.insight) return console.error("Missing insight in payload", payload);

      // normalize posts to ensure all required fields exist
      const normalizedPosts: AnalysisItem[] = (payload.posts || []).map((p) => ({
        platform: p.platform || "unknown",
        date: p.date || new Date((p.created_utc ?? 0) * 1000).toISOString(),
        sentiment: p.sentiment || "Neutral",
        source: p.source || "reddit",
        content: p.content || "",
        title: p.title || "No title",
        url: p.url || "#",
        created_utc: p.created_utc || 0,
      }));

      setData(normalizedPosts);
      setInsight(payload.insight);
      setStats(
        payload.stats || {
          positiveRatio: 0,
          negativeRatio: 0,
          neutralRatio: 0,
          topics: [],
          avgSentiment: 0,
          total: 0,
        }
      );      
      setChartData(payload.trend || []);
      setProgress(payload.progress || { completedBatches: 0, totalBatches: 0 });
    });

    return () => {
      unsubBatch && unsubBatch();
      unsubInsight && unsubInsight();
      closeWS();
    };
  }, [setData, setChartData, setStats, setInsight, setProgress]);
}
