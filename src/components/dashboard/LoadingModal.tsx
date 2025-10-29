"use client"

import React from "react";

interface Props {
  loading: boolean;
  progress: { completedBatches: number; totalBatches: number };
}

export const LoadingModal: React.FC<Props> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-8 rounded-lg flex flex-col items-center w-72 space-y-0 m-0 [&>*]:m-0">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium">Analyzing...</p>
      </div>
    </div>
  );
};
