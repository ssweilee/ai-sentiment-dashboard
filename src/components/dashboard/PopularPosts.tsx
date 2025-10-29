import React from "react";
import { AnalysisItem } from "@/types/types";

interface Props {
  posts: AnalysisItem[];
}

export const PopularPosts: React.FC<Props> = ({ posts }) => (
  <div className="bg-white border rounded-lg p-5 shadow-sm">
    <h2 className="text-lg font-semibold mb-3">Popular Posts</h2>
    {posts.length > 0 ? (
      <ul className="list-disc pl-5 space-y-2 max-h-64 overflow-auto text-gray-700">
        {posts.slice(0, 10).map((p, idx) => (
          <li key={idx}>
            <span className="font-medium text-gray-900">[{p.sentiment}]</span>{" "}
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {p.title}
            </a>{" "}
            <span className="text-gray-500 text-sm">({p.source})</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No posts yet. Trigger analysis to see popular posts.</p>
    )}
  </div>
);
