// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import aiMentorImg from "../assets/ai-mentor.png";
// import ReactMarkdown from "react-markdown";

// export default function AIMentor() {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [resumeSummary, setResumeSummary] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleResumeUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setResumeFile(file);
//     setResumeSummary("");
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("resume", file);

//       const response = await fetch("http://localhost:5000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setResumeSummary(data.summary);
//       } else {
//         setResumeSummary("Failed to generate summary. Please try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       setResumeSummary("Error connecting to server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const profile = { name: "Only For You :)", headline: "AI Mentor" };
//   const aiResponse = {
//     career_paths: ["Software Engineer", "Data Scientist", "Product Manager"],
//     skills: [
//       { name: "Python", learned: true },
//       { name: "Machine Learning", learned: false },
//       { name: "Project Management", learned: false },
//       { name: "SQL", learned: false },
//     ],
//     relevant_skills: ["Data Analysis", "Model Deployment", "Communication"],
//   };

//   const chat = [
//     { from: "user", text: "What after B.Tech IT with CGPA 8?" },
//     {
//       from: "ai",
//       text:
//         "You can pursue Data Science or Software Engineering. Start with Python, SQL and small projects. Build a 6-month roadmap.",
//     },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
//       <Sidebar />
//       <main className="flex-1 p-4 md:p-10 flex flex-col items-center justify-start">
//         <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-12 grid-cols-1 gap-6">
          
//           {/* LEFT: Chat Column */}
//           <div className="md:col-span-7 p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col">
//             <div className="flex items-center gap-4 mb-6 border-b pb-4">
//               <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
//                 <img src={aiMentorImg} alt="AI Mentor" className="w-full h-full object-cover" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold">{profile.headline}</h3>
//                 <p className="text-sm text-gray-500">{profile.name}</p>
//               </div>
//             </div>

//             <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[60vh]">
//               {chat.map((m, i) => (
//                 <div
//                   key={i}
//                   className={`p-4 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
//                     m.from === "user"
//                       ? "bg-indigo-600 text-white ml-auto rounded-br-none"
//                       : "bg-gray-100 text-gray-800 mr-auto rounded-bl-none"
//                   }`}
//                 >
//                   {m.text}
//                 </div>
//               ))}
//             </div>

//             <div className="mt-4">
//               <div className="bg-white border rounded-full shadow-md px-4 py-2 flex items-center gap-3">
//                 <input placeholder="Ask your mentor..." className="flex-1 outline-none text-sm placeholder-gray-400" />
//                 <button className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 transition">
//                   ➤
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Cards Column */}
//           <div className="md:col-span-5 p-6 bg-gray-50 border-l flex flex-col gap-6">

//             {/* AI Bot Profile */}
//             <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
//               <img src={aiMentorImg} alt="AI Bot" className="w-20 h-20 rounded-full mb-3 object-cover" />
//               <h4 className="font-semibold text-lg">AI Mentor</h4>
//               <p className="text-sm text-gray-500">Your personal career assistant</p>
//             </div>

//             {/* Resume Upload */}
//             <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-3">
//               <h5 className="text-sm font-semibold">Upload Your Resume</h5>
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleResumeUpload}
//                 className="border p-2 rounded text-sm"
//               />
//               {resumeFile && <p className="text-xs text-gray-500 mt-2">File: {resumeFile.name}</p>}
//               {loading ? (
//                 <div className="mt-2 text-sm text-gray-500">Processing resume...</div>
//               ) : (
//                resumeSummary && (
//   <div className="mt-2 p-3 bg-gray-100 rounded text-sm text-gray-700 overflow-auto max-h-60">
//     <ReactMarkdown>{resumeSummary}</ReactMarkdown>
//   </div>
//                 )
//               )}
//             </div>

//             {/* Career Paths */}
//             <div className="bg-white rounded-2xl p-5 shadow-sm">
//               <h4 className="text-sm font-semibold mb-4">Suggested Career Paths</h4>
//               <div className="flex flex-wrap gap-3">
//                 {aiResponse.career_paths.map((p, idx) => (
//                   <button
//                     key={p}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//                       idx === 0
//                         ? "bg-gradient-to-r from-indigo-600 to-indigo-400 text-white shadow-md"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Skills */}
//             <div className="grid grid-cols-2 gap-6">
//               <div className="bg-white rounded-2xl p-5 shadow-sm">
//                 <h5 className="text-sm font-semibold mb-3">Career Skills</h5>
//                 <ul className="space-y-3">
//                   {aiResponse.skills.map((s) => (
//                     <li key={s.name} className="flex items-center gap-2 text-sm">
//                       <input type="checkbox" checked={s.learned} readOnly className="w-4 h-4 accent-indigo-600" />
//                       <span>{s.name}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="mt-3 text-xs text-gray-400">
//                   {aiResponse.skills.filter((s) => s.learned).length}/{aiResponse.skills.length} learned
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl p-5 shadow-sm">
//                 <h5 className="text-sm font-semibold mb-3">Relevant Skills</h5>
//                 <ul className="space-y-2 text-sm text-gray-700">
//                   {aiResponse.relevant_skills.map((s) => (
//                     <li key={s}>• {s}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
            
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import aiMentorImg from "../assets/ai-mentor.png";
import ReactMarkdown from "react-markdown";

export default function AIMentor() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeSummary, setResumeSummary] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [chat, setChat] = useState([]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showResumeSummary, setShowResumeSummary] = useState(false);

  const profile = { name: "Only For You :)", headline: "AI Mentor" };

  const cleanText = (text) => {
    if (!text) return "";
    return text
      .trim()
      .replace(/\r\n/g, "\n")
      .replace(/\n{2,}/g, "\n\n")
      .replace(/•/g, "-");
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);
    setResumeSummary("");
    setRecommendations("");
    setSuggestedQuestions([]);
    setChat([]);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResumeSummary(data.summary || "No summary available.");
        setRecommendations(data.recommendations || "No recommendations.");
        setSuggestedQuestions(data.suggestedQuestions || []);
        // Only keep initial AI greeting, not the summary
        setChat([{ from: "ai", text: "Hello! I'm your AI mentor. Ask me anything about your resume." }]);
      } else {
        setResumeSummary("Failed to generate summary. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setResumeSummary("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async (question) => {
    if (!resumeSummary || !question) return;

    setLoading(true);
    setChat((prev) => [...prev, { from: "user", text: question }]);
    setCustomQuestion("");
    setSuggestedQuestions([]);

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: resumeSummary, question }),
      });
      const data = await response.json();

      if (response.ok) {
        setChat((prev) => [
          ...prev,
          { from: "ai", text: data.answer || "No answer returned." },
        ]);
      } else {
        setChat((prev) => [...prev, { from: "ai", text: "Failed to get response from AI." }]);
      }
    } catch (err) {
      console.error(err);
      setChat((prev) => [...prev, { from: "ai", text: "Error connecting to server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 md:p-10 flex flex-col items-center justify-start">
        <div className="w-full max-w-7xl grid md:grid-cols-12 grid-cols-1 gap-6">

          {/* LEFT: Chat */}
          <div className="md:col-span-7 p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col rounded-3xl shadow-2xl">

            {/* Chat Header */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#2C7DA0] shadow-md">
                <img src={aiMentorImg} alt="AI Mentor" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#012A4A]">{profile.headline}</h3>
                <p className="text-sm text-[#468FAF]">{profile.name}</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto pr-2 max-h-[60vh]">
              {chat.map((m, i) => {
                const isFirstAI = m.from !== "user" && i === chat.findIndex(c => c.from !== "user");
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl max-w-[75%] text-sm leading-relaxed break-words shadow-sm ${
                      m.from === "user"
                        ? "bg-[#012A4A] text-white ml-auto rounded-br-lg rounded-tl-lg rounded-tr-2xl rounded-bl-2xl"
                        : isFirstAI
                        ? "bg-gradient-to-r from-[#E0F2F1] to-[#B2DFDB] text-[#012A4A] ml-auto mr-auto rounded-3xl shadow-md max-w-[90%]"
                        : "bg-[#A9D6E5] text-[#012A4A] mr-auto rounded-bl-lg rounded-tr-lg rounded-tl-2xl rounded-br-2xl"
                    }`}
                  >
                    {isFirstAI && (
                      <div className="mb-3 text-lg font-semibold">
                        💬 AI Mentor
                      </div>
                    )}
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested Questions */}
            {suggestedQuestions.length > 0 && !chat.some(m => m.from === "user") && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => askQuestion(q)}
                    className="cursor-pointer p-5 rounded-2xl bg-gradient-to-tr from-[#012A4A] to-[#2C7DA0] text-white text-sm font-medium shadow-md text-left overflow-hidden min-h-[5rem] max-h-[12rem] flex items-start"
                  >
                    <p className="break-words">{q}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Custom Question Input */}
            <div className="mt-4">
              <div className="bg-white border rounded-full shadow-md px-4 py-2 flex items-center gap-3 focus-within:ring-2 focus-within:ring-indigo-400">
                <input
                  placeholder="Ask your mentor..."
                  className="flex-1 outline-none text-sm placeholder-gray-400"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && askQuestion(customQuestion)}
                />
                <button
                  onClick={() => askQuestion(customQuestion)}
                  className="w-10 h-10 rounded-full text-white flex items-center justify-center shadow-md"
                  style={{ background: "linear-gradient(135deg, #012A4A, #2C7DA0)" }}
                >
                  ➤
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: AI Profile + Resume Upload + Resume Summary + Recommendations */}
          <div className="md:col-span-5 p-6 flex flex-col gap-6">

            {/* Resume Upload */}
            <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-4">
              <h5 className="text-sm font-semibold text-gray-800">Upload Your Resume</h5>
              {!resumeFile && (
                <label
                  htmlFor="resume-upload"
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl h-32 cursor-pointer 
                             hover:border-[#014F86] hover:bg-[#012A4A] hover:text-white transition relative text-gray-500"
                >
                  <svg className="w-10 h-10 mb-2 text-[#014F86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 014-4h1.26a4 4 0 017.48 0H17a4 4 0 010 8H7a4 4 0 01-4-4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v8m0 0l-3-3m3 3l3-3" />
                  </svg>
                  <p className="text-sm text-center">Click to select your resume</p>
                  <p className="text-xs mt-1">(PDF only)</p>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
              )}
              {resumeFile && (
                <div className="flex items-center justify-between bg-[#2C7DA0] text-white p-3 rounded-md shadow-md">
                  <p className="text-xs truncate">📄 {resumeFile.name}</p>
                  <button
                    onClick={() => setResumeFile(null)}
                    className="text-xs font-semibold hover:text-[#A9D6E5]"
                  >
                    Clear
                  </button>
                </div>
              )}
              {loading && (
                <div className="flex items-center gap-2 text-sm text-[#014F86] animate-pulse">
                  <svg className="w-4 h-4 text-[#014F86] animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Processing resume...
                </div>
              )}
            </div>

            {/* Collapsible Resume Summary */}
            {resumeSummary && (
              <div className="my-4">
                <button
                  onClick={() => setShowResumeSummary(!showResumeSummary)}
                  className="w-full bg-gradient-to-tr from-[#E0F2F1] to-[#B2DFDB] text-[#012A4A] p-3 rounded-2xl font-semibold shadow-md text-left"
                >
                  {showResumeSummary ? "Hide Resume Summary ▲" : "Show Resume Summary ▼"}
                </button>
                {showResumeSummary && (
                  <div className="bg-gradient-to-tr from-[#E0F2F1] to-[#B2DFDB] rounded-2xl p-5 mt-2 shadow-md max-h-[60vh] overflow-y-auto text-sm text-[#012A4A]">
                    <ReactMarkdown>{cleanText(resumeSummary)}</ReactMarkdown>
                  </div>
                )}
              </div>
            )}

            {/* Collapsible AI Recommendations */}
            {recommendations && (
              <div className="my-4">
                <button
                  onClick={() => setShowRecommendations(!showRecommendations)}
                  className="w-full bg-gradient-to-tr from-[#E0F2F1] to-[#B2DFDB] text-[#012A4A] p-3 rounded-2xl font-semibold shadow-md text-left"
                >
                  {showRecommendations ? "Hide AI Recommendations ▲" : "Show AI Recommendations ▼"}
                </button>
                {showRecommendations && (
                  <div className="bg-gradient-to-tr from-[#E0F2F1] to-[#B2DFDB] rounded-2xl p-5 mt-2 shadow-md max-h-[60vh] overflow-y-auto text-sm text-[#012A4A]">
                    <ReactMarkdown>{cleanText(recommendations)}</ReactMarkdown>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
