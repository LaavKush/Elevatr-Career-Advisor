import React from "react";

export const ChecklistCard = ({ task, progress, category }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-[#A9D6E5]">
    <h3 className="font-semibold text-[#012A4A] mb-2">{task}</h3>
    <p className="text-sm text-gray-500 mb-2">{category}</p>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-gradient-to-r from-[#2C7DA0] to-[#61A5C2] h-3 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <p className="mt-2 text-sm text-gray-600">{progress}% Completed</p>
  </div>
);