// src/pages/Settings.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Trash2, User, Settings as SettingsIcon, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase";
import Sidebar from "./Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [showDeleteModal, setShowDeleteModal] = useState(false); // modal state

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("User not logged in");
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (result.status === "success") {
        toast.success("Account deleted successfully");
        await auth.signOut();
        navigate("/");
      } else {
        toast.error(result.message || "Failed to delete account");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      toast.error(err.message || "Failed to delete account");
    }
  };

  const pageBg = theme === "light" ? "bg-[#E5F1F7] text-gray-900" : "bg-gray-900 text-white";
  const cardBg = theme === "light" ? "bg-white" : "bg-gray-800";
  const textColor = theme === "light" ? "text-gray-900" : "text-gray-100";
  const subTextColor = theme === "light" ? "text-gray-600" : "text-gray-300";

  return (
    <div className={`flex min-h-screen ${pageBg} transition-colors duration-300`}>
      <Sidebar theme={theme} />

      <main className="flex-1 p-8 md:p-12 pt-24 md:pt-20">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Page Header */}
          <div className="flex items-center gap-3">
            <SettingsIcon size={32} className={textColor} />
            <h1 className={`text-3xl md:text-5xl font-bold ${textColor}`}>
              Settings
            </h1>
          </div>
          <p className={`${subTextColor} mb-8`}>
            Manage your account, appearance, and preferences.
          </p>

          {/* Appearance Section */}
          <section className={`${cardBg} p-8 rounded-3xl shadow-md transition-colors duration-300`}>
            <h2 className={`text-2xl font-semibold mb-6 ${textColor}`}>Appearance</h2>
            <div
              onClick={toggleTheme}
              className="flex items-center justify-between p-5 rounded-2xl shadow hover:scale-105 transition-transform duration-300 cursor-pointer bg-gradient-to-r from-[#2C7DA0] to-[#61A5C2]"
            >
              <div className="flex items-center gap-4">
                {theme === "light" ? <Sun size={28} /> : <Moon size={28} />}
                <span className="font-semibold text-white text-lg">
                  {theme === "light" ? "Light Mode" : "Dark Mode"}
                </span>
              </div>
            </div>
          </section>

          {/* Account Section */}
          <section className={`${cardBg} p-8 rounded-3xl shadow-md transition-colors duration-300`}>
            <h2 className={`text-2xl font-semibold mb-6 ${textColor}`}>Account</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <button
                onClick={() => navigate("/profile")}
                className="flex-1 py-4 bg-[#01497C] hover:bg-[#013A63] text-white font-semibold rounded-2xl shadow transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <User size={22} />
                My Profile
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl shadow transition-all duration-300 flex items-center justify-center gap-3 text-lg"
              >
                <Trash2 size={22} />
                Delete Account
              </button>
            </div>
          </section>

        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred background */}
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}></div>

            {/* Modal content */}
            <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl max-w-md w-full z-10">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={() => setShowDeleteModal(false)}
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">Confirm Account Deletion</h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-5 py-2 rounded-2xl bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-semibold transition"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                  onClick={() => {
                    handleDeleteAccount();
                    setShowDeleteModal(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={2000} />
      </main>
    </div>
  );
};

export default Settings;
