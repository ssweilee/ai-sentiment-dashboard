import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TrendItem {
  date: string;
  Positive: number;
  Negative: number;
  Neutral: number;
  total: number;
}

interface Props {
  data: TrendItem[];
}

export const TrendChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Sentiment Trend</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="date" />
            <YAxis unit="%" />
            <Tooltip formatter={(value: number | string) => [`${value}%`]} />
            <Legend />
            <Line type="monotone" dataKey="Positive" stroke="#22c55e" strokeWidth={2} />
            <Line type="monotone" dataKey="Negative" stroke="#ef4444" strokeWidth={2} />
            <Line type="monotone" dataKey="Neutral" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No trend data yet. Trigger analysis to see trends.</p>
      )}
    </div>
  );
};
