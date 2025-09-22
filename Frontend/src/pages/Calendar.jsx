// src/pages/Calendar.jsx
import { useState } from "react";
import { format, parseISO, addMonths, startOfDay, endOfMonth } from "date-fns";
import {
  Search,
  CalendarDays,
  Briefcase,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Bell,
  ExternalLink,
} from "lucide-react";
import Sidebar from "./Sidebar"; // Make sure Sidebar.jsx exists

export default function Calendar() {
  const today = format(startOfDay(new Date()), "yyyy-MM-dd");

  const dummyEvents = [
    {
      title: "AI Internship",
      type: "internship",
      date: "2025-10-14",
      link: "https://internship.example.com",
      reminders: [
        { label: "Application Deadline", date: "2025-10-10" },
        { label: "Interview Round", date: "2025-10-12" },
      ],
    },
    {
      title: "Hackathon X",
      type: "hackathon",
      date: "2025-10-16",
      link: "https://hackathon.example.com",
      reminders: [
        { label: "Team Registration", date: "2025-10-08" },
        { label: "Prototype Submission", date: "2025-10-14" },
        { label: "Final Pitch", date: "2025-10-16" },
      ],
    },
    {
      title: "AI & Web3 Hackathon",
      type: "hackathon",
      date: today,
      link: "https://today-event.example.com",
      reminders: [
        { label: "Team Registration Deadline", date: today },
        { label: "Kick-off Briefing", date: today },
      ],
    },
    {
      title: "Web Dev Internship",
      type: "internship",
      date: "2025-10-21",
      link: "https://internship2.example.com",
      reminders: [{ label: "Application Deadline", date: "2025-10-18" }],
    },
    {
      title: "Blockchain Hackathon",
      type: "hackathon",
      date: "2025-10-25",
      link: "https://hackathon2.example.com",
      reminders: [
        { label: "Idea Submission", date: "2025-10-20" },
        { label: "Prototype Round", date: "2025-10-23" },
        { label: "Final Demo", date: "2025-10-25" },
      ],
    },
  ];

  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(new Date(2025, 9)); // October 2025
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 2;

  const events = filter === "all" ? dummyEvents : dummyEvents.filter((e) => e.type === filter);
  const filteredEvents = events.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));

  const eventsForDate = selectedDate
    ? filteredEvents.filter(
        (e) => e.date === selectedDate || e.reminders?.some((r) => r.date === selectedDate)
      )
    : filteredEvents;

  const todayEvents = filteredEvents.filter(
    (e) => e.date === today || e.reminders?.some((r) => r.date === today)
  );

  const daysInMonth = endOfMonth(month).getDate();
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = eventsForDate.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(eventsForDate.length / cardsPerPage);

  const prevMonth = () => setMonth(addMonths(month, -1));
  const nextMonth = () => setMonth(addMonths(month, 1));
  const handleDateClick = (date) => setSelectedDate(date);

  const getReminderColor = (label) => {
    const lower = label.toLowerCase();
    if (lower.includes("deadline")) return "bg-red-500";
    if (lower.includes("registration")) return "bg-orange-400";
    if (lower.includes("prototype")) return "bg-yellow-400";
    if (lower.includes("idea")) return "bg-purple-500";
    if (lower.includes("pitch") || lower.includes("interview") || lower.includes("demo")) return "bg-green-500";
    return "bg-blue-400";
  };

  return (
    <div className="min-h-screen flex gap-8 bg-gradient-to-b from-blue-50 to-blue-100 pr-6 pb-2">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="mt-10 text-4xl md:text-5xl font-extrabold text-blue-950 flex items-center gap-4">
            <Rocket className="w-10 h-10 text-blue-800 mt-5" /> Explore Opportunities
          </h1>
          <p className="text-blue-800 text-base md:text-lg text-center max-w-2xl leading-relaxed">
            Stay ahead with upcoming internships and hackathons. Track them efficiently with smart, interactive reminders.
          </p>
        </div>

        {/* Today's Alerts */}
        {todayEvents.length > 0 && (
          <div className="flex flex-col gap-3">
            {todayEvents.map((event, idx) => (
              <div key={idx} className="bg-red-100 border-l-4 border-red-500 p-4 rounded-2xl flex justify-between items-center shadow hover:shadow-lg">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-red-600">{event.title} - Today!</span>
                  {event.reminders?.filter((r) => r.date === today).map((r, i) => (
                    <span key={i} className="text-purple-600 text-sm">{r.label}</span>
                  ))}
                </div>
                <span className="inline-flex items-center bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded-full shadow">
                  <Bell className="w-4 h-4 mr-1" /> Now
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-3 flex-wrap">
            {["all", "internship", "hackathon"].map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all ${
                  filter === opt ? "bg-blue-800 text-white shadow-lg" : "bg-blue-200 hover:bg-blue-300 text-blue-800"
                }`}
              >
                {opt === "all" ? "All" : opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-blue-700" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-blue-300 w-full shadow focus:ring-2 focus:ring-blue-700"
            />
          </div>
        </div>

        {/* Reset Button */}
        {selectedDate && (
          <div className="text-right">
            <button
              onClick={() => setSelectedDate(null)}
              className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-full shadow-sm hover:bg-blue-200 hover:text-blue-900 transition-all duration-300 ease-in-out"
            >
              Show All Events
            </button>
          </div>
        )}

        {/* Calendar & Event Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Calendar */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-2xl p-6 flex flex-col gap-6">
            {/* Month Navigation */}
            <div className="flex justify-between items-center">
              <button onClick={prevMonth} className="p-3 rounded-full bg-blue-200 hover:bg-blue-300 text-blue-800 shadow-md">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-blue-700" /> {format(month, "MMMM yyyy")}
              </h2>
              <button onClick={nextMonth} className="p-3 rounded-full bg-blue-200 hover:bg-blue-300 text-blue-800 shadow-md">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-2 text-center font-medium mt-4 text-blue-600 uppercase text-sm">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-2 mt-2">
              {Array.from({ length: daysInMonth }, (_, i) => {
                const date = `${month.getFullYear()}-${String(month.getMonth()+1).padStart(2,"0")}-${String(i+1).padStart(2,"0")}`;
                const eventsOnDate = filteredEvents.filter(e => e.date === date || e.reminders?.some(r=>r.date===date));
                const isSelected = selectedDate === date;
                const isTodayDate = date === today;

                return (
                  <button key={date} onClick={()=>handleDateClick(date)}
                    className={`relative h-12 flex items-center justify-center rounded-full text-sm transition-all
                      ${eventsOnDate.length>0 ? "bg-blue-100 hover:bg-blue-200 text-blue-900" : "hover:bg-blue-50 text-blue-700"}
                      ${isSelected ? "ring-2 ring-blue-700" : ""}
                      ${isTodayDate ? "ring-4 ring-red-500 animate-pulse" : ""}
                    `}
                  >
                    {i+1}
                    {eventsOnDate.length>0 && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {eventsOnDate.map((e, idx) => {
                          const isMain = e.date===date;
                          if(isMain) return <span key={idx} className={`w-2 h-2 rounded-full ${e.type==="internship"?"bg-blue-800":"bg-blue-500"} animate-pulse`} />;
                          const reminder = e.reminders.find(r=>r.date===date);
                          return <span key={idx} className={`w-2 h-2 rounded-full ${getReminderColor(reminder?.label||"")} animate-bounce`} />;
                        })}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Event Cards with Pagination */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-6 overflow-x-auto pb-4 pt-2">
                {currentCards.length > 0 ? currentCards.map((event, idx) => (
                  <div key={idx} className="min-w-[280px] bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-3xl shadow-lg flex flex-col gap-4 hover:scale-105 transition-transform hover:shadow-2xl border border-transparent">
                    <h2 className="font-bold text-xl text-blue-900">{event.title}</h2>
                    <p className="text-sm text-blue-700 flex items-center gap-2">
                      {event.type==="internship" ? <Briefcase className="w-5 h-5 text-blue-800" /> : <Rocket className="w-5 h-5 text-blue-500" />}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.type==="internship"?"bg-blue-200 text-blue-800":"bg-blue-100 text-blue-500"}`}>{event.type}</span>
                      • {format(parseISO(event.date),"dd MMM yyyy")}
                    </p>
                    {event.reminders?.length > 0 && (
                      <div className="bg-white rounded-2xl shadow-md p-4 border border-blue-100 flex flex-col gap-3">
                        <p className="font-semibold text-blue-700 flex items-center gap-2 text-lg"><Bell className="w-5 h-5 animate-bounce" /> Reminders</p>
                        {event.reminders.map((rem, rIdx) => (
                          <div key={rIdx} className="flex justify-between items-center p-3 rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer border-l-4 border-transparent hover:border-blue-700 bg-gradient-to-r from-blue-50 to-blue-100">
                            <div className="flex items-center gap-4 flex-grow">
                              <span className={`w-4 h-4 rounded-full ${getReminderColor(rem.label)} animate-pulse`} />
                              <span className="text-blue-900 font-medium">{rem.label}</span>
                            </div>
                            <span className="text-sm text-blue-700 font-semibold ml-4">{format(parseISO(rem.date), "dd MMM")}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <button className="mt-2 px-4 py-2 rounded-xl bg-blue-800 text-white hover:bg-blue-900 flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg" onClick={()=>window.open(event.link,"_blank")}>
                      Apply <ExternalLink className="w-4 h-4"/>
                    </button>
                  </div>
                )) : <div className="text-center w-full text-blue-600 py-6">🚫 No events found</div>}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev-1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-lg bg-blue-200 text-blue-800 hover:bg-blue-300 disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="text-blue-700 font-medium">{currentPage} / {totalPages}</span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev+1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-lg bg-blue-200 text-blue-800 hover:bg-blue-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Section inside Calendar Grid (optional extra info) */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col gap-6 border border-blue-100">
            <h2 className="text-lg font-bold text-blue-900">📌 Upcoming Events</h2>
            <div className="flex flex-col gap-3">
              {filteredEvents.slice(0,5).map((event,idx)=>(
                <div key={idx} className="p-3 border rounded-xl hover:bg-blue-50 cursor-pointer transition-all shadow-sm hover:shadow-md">
                  <p className="font-medium text-blue-800">{event.title}</p>
                  <p className="text-xs text-blue-500">{format(parseISO(event.date),"dd MMM yyyy")}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
