"use client";

import { useState, useMemo, useEffect } from "react";
import { useDashboardWS } from "@/hooks/useDashboardWS";
import { AnalysisItem } from "@/types/types";
import { KeywordInput } from "./KeywordInput";
import { KpiCards } from "./KpiCards";
import { TrendChart } from "./TrendChart";
import { PopularPosts } from "./PopularPosts";
import { Insight } from "./Insight";
import { LoadingModal } from "./LoadingModal";

export default function DashboardPage() {
  const [keyword, setKeyword] = useState("");
  const [posts, setPosts] = useState<AnalysisItem[]>([]);
  const [insight, setInsight] = useState<string | null>(null);
  const [progress, setProgress] = useState({ completedBatches: 0, totalBatches: 0 });
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

   // WebSocket
   useDashboardWS(
      setPosts,
      () => {},
      () => {},
      setInsight,
      setProgress,
   );
 

   // trigger lambda 
   const handleAnalyze = async () => {
      if (!keyword) return;
      saveHistory(keyword);
      setLoading(true);
      try {
         const url = `/api/fetchSentiment${
         keyword ? `?keyword=${encodeURIComponent(keyword)}` : ""
         }`;
         const res = await fetch(url);
         const json = await res.json();
         setProgress({ completedBatches: 0, totalBatches: json.batches || 0 });
      } catch (err) {
         console.error(err);
         setLoading(false);
      }
   };

   useEffect(() => {
      if (posts.length > 0 || insight) {
         setLoading(false);
      }
   }, [posts, insight]);

   // save search history to localStorage
   const saveHistory = (keyword: string) => {
      if (!keyword) return;
      const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      if (!history.includes(keyword)) {
         history.unshift(keyword); // the latest at the front
         if (history.length > 10) history.pop(); // maximum 10
         localStorage.setItem("searchHistory", JSON.stringify(history));
      }
   };

   useEffect(() => {
      const saved = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      setHistory(saved);
   }, []);

   // trend data for chart
   const trendData = useMemo(() => {
      const map: Record<
         string,
         { Positive: number; Negative: number; Neutral: number; total: number }
      > = {};
      const now = new Date();
      const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), 1);

      posts.forEach((p) => {
         const postDate = new Date(p.created_utc * 1000);
         if (postDate < twoYearsAgo) return;
         const dateKey = `${postDate.getFullYear()}-${String(
         postDate.getMonth() + 1
         ).padStart(2, "0")}`;
         if (!map[dateKey])
         map[dateKey] = { Positive: 0, Negative: 0, Neutral: 0, total: 0 };
         const s = p.sentiment as "Positive" | "Negative" | "Neutral";
         map[dateKey][s] = (map[dateKey][s] || 0) + 1;
         map[dateKey].total++;
      });

      return Object.entries(map)
         .sort(([a], [b]) => a.localeCompare(b))
         .map(([date, counts]) => ({
         date,
         Positive: parseFloat(
            ((counts.Positive / counts.total) * 100).toFixed(2)
         ),
         Negative: parseFloat(
            ((counts.Negative / counts.total) * 100).toFixed(2)
         ),
         Neutral: parseFloat(((counts.Neutral / counts.total) * 100).toFixed(2)),
         total: counts.total,
         }));
   }, [posts]);

   const formattedInsight = useMemo(() => {
      if (!insight) return [];
         // convert ... / e.g. / i.e. to temporary placeholders, to avoid being split
         const text = insight
           .replace(/\.\.\./g, '<<<ELLIPSIS>>>')
           .replace(/e\.g\./gi, '<<<EG>>>')
           .replace(/i\.e\./gi, '<<<IE>>>');
       
         // period, question mark, exclamation mark
         let sentences = text.split(/(?<=[.?!])\s+/);
       
         sentences = sentences.map(s =>
           s.replace(/<<<ELLIPSIS>>>/g, '...')
            .replace(/<<<EG>>>/gi, 'e.g.')
            .replace(/<<<IE>>>/gi, 'i.e.')
            .trim()
         );
       
         return sentences.filter(Boolean);
      }, [insight]);

  return (
   <>
      <div className="p-8 max-w-6xl mx-auto space-y-8">
         <h1 className="text-3xl font-bold text-gray-900">
         Audience Sentiment & Trend Dashboard
         </h1>
         <KeywordInput
            keyword={keyword}
            setKeyword={setKeyword}
            onAnalyze={handleAnalyze}
            history={history}
            setHistory={setHistory}
            loading={loading}
         />
         <KpiCards
            positive={posts.length ? posts.filter(p => p.sentiment === "Positive").length / posts.length : 0}
            negative={posts.length ? posts.filter(p => p.sentiment === "Negative").length / posts.length : 0}
            neutral={posts.length ? posts.filter(p => p.sentiment === "Neutral").length / posts.length : 0}
         />
         <TrendChart data={trendData} />
         <PopularPosts posts={posts} />
         <Insight insight={formattedInsight} />
      </div>
      <LoadingModal loading={loading} progress={progress} />
   </>
 );
}