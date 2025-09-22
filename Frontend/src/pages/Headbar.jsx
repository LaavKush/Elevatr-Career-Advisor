// src/components/Headerbar.jsx
import React from "react";
import { auth } from "../firebase";

const Header = ({ user }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-[#01497C]">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-semibold">{user?.name}</span>
        <div className="w-10 h-10 rounded-full bg-[#01497C] flex items-center justify-center text-white font-bold">
          {user?.name?.[0].toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Header;