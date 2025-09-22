import React, { useEffect, useState } from "react";
import { Home, BookOpen, Calendar, Settings as SettingsIcon, MessageSquare, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", photoURL: "", role: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData({
            name: data.name || user.displayName || "User",
            photoURL: data.photoURL || user.photoURL || "",
            role: data.role || "Student",
          });
        } else {
          setUserData({
            name: user.displayName || "User",
            photoURL: user.photoURL || "",
            role: "Student",
          });
        }
      } catch (err) {
        console.error("❌ Failed to fetch user for sidebar:", err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {/* Hamburger / Cross Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-6 left-6 z-30 md:hidden p-2 rounded-md bg-[#012A4A] text-white shadow-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-20 w-72 bg-[#012A4A] text-white p-6 flex flex-col justify-between rounded-r-2xl shadow-2xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div>
          {/* Avatar + Name */}
          <div className="flex items-center space-x-4 mb-12">
            {userData.photoURL ? (
              <img
                src={userData.photoURL}
                alt="Avatar"
                className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-[#61A5C2]"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#01497C] flex items-center justify-center text-white text-xl font-semibold">
                {userData.name ? userData.name[0].toUpperCase() : "U"}
              </div>
            )}
            <div>
              <h2 className="font-semibold text-lg">{userData.name}</h2>
              <p className="text-sm text-[#A9D6E5]">{userData.role}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-3">
            <SidebarItem icon={<Home size={20} />} text="Home" onClick={() => navigate("/dashboard")} />
            <SidebarItem icon={<BookOpen size={20} />} text="Tech Career Guides" onClick={() => navigate("/resources")} />
            <SidebarItem icon={<Calendar size={20} />} text="Calendar" onClick={() => navigate("/calendar")} />
            <SidebarItem icon={<BookOpen size={20} />} text="Checklist" onClick={() => navigate("/checklist")} />
            <SidebarItem icon={<MessageSquare size={20} />} text="AI Mentor" onClick={() => navigate("/ai-mentor")} />
            <SidebarItem icon={<SettingsIcon size={20} />} text="Settings" onClick={() => navigate("/settings")} />
          </nav>
        </div>
      </aside>
    </>
  );
};

const SidebarItem = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition text-[#A9D6E5] hover:bg-[#013A63] hover:text-white"
  >
    {icon}
    <span className="font-medium">{text}</span>
  </div>
);

export default Sidebar;
