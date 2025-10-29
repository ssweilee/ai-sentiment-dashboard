import React from "react";

export const Insight: React.FC<{ insight: string[] }> = ({ insight }) => (
   <div className="bg-white border rounded-lg p-5 shadow-sm">
     <h2 className="text-lg font-semibold mb-3">Insight</h2>
     <div className="mt-2 space-y-3 leading-relaxed break-words">
       {insight.length ? (
         insight.map((p, idx) => <p key={idx}>{p}</p>)
       ) : (
         <p className="text-gray-500">No insight available yet.</p>
       )}
     </div>
   </div>
 );
