import React from "react";

interface Props {
  positive: number;
  negative: number;
  neutral: number;
}

export const KpiCards: React.FC<Props> = ({ positive, negative, neutral }) => {
  const formatPercentage = (value: number) => (value * 100).toFixed(2) + "%";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      <div className="bg-white border rounded-lg p-4 shadow-sm text-center h-full">
        <p className="text-gray-500 text-sm">Positive</p>
        <p className="text-2xl font-semibold text-green-600">{formatPercentage(positive)}</p>
      </div>
      <div className="bg-white border rounded-lg p-4 shadow-sm text-center h-full">
        <p className="text-gray-500 text-sm">Negative</p>
        <p className="text-2xl font-semibold text-red-500">{formatPercentage(negative)}</p>
      </div>
      <div className="bg-white border rounded-lg p-4 shadow-sm text-center h-full">
        <p className="text-gray-500 text-sm">Neutral</p>
        <p className="text-2xl font-semibold text-yellow-500">{formatPercentage(neutral)}</p>
      </div>
    </div>
  );
};
