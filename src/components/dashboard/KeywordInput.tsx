"use client";
import { useState } from "react";

interface KeywordInputProps {
  keyword: string;
  setKeyword: (v: string) => void;
  onAnalyze: () => void;
  history: string[];
  setHistory: (v: string[]) => void;
  loading: boolean;
}

export const KeywordInput: React.FC<KeywordInputProps> = ({
  keyword,
  setKeyword,
  onAnalyze,
  history,
  setHistory,
  loading,
}) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="flex flex-wrap gap-3 relative">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Enter keyword (e.g. TV show, brand, topic)..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onAnalyze();
          }}
          className="border border-gray-300 p-3 rounded-lg w-full"
        />
        {showHistory && history.length > 0 && keyword.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow mt-1 z-10 max-h-40 overflow-auto">
            {history
              .filter((item) =>
                item.toLowerCase().includes(keyword.toLowerCase())
              )
              .map((item, idx) => (
                <li
                  key={idx}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setKeyword(item);
                    setHistory([]);
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>
        )}
      </div>
      <button
        onClick={onAnalyze}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        disabled={loading}
      >
        Analyze
      </button>
    </div>
  );
}
