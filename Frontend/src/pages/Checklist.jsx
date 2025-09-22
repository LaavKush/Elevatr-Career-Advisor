// src/pages/Checklist.jsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import Sidebar from "./Sidebar";
import { format } from "date-fns";
import { auth } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AISuggestions from "../components/AISuggestions";

const API_URL = import.meta.env.VITE_API_URL;

export default function ChecklistPage() {
  const categories = ["Ongoing Courses", "Portfolio Projects", "Certifications"];

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [newTask, setNewTask] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newCategory, setNewCategory] = useState(categories[0]);

  const [userContext, setUserContext] = useState("Student interested in Web Development and DSA");


  // const [aiSuggestions] = useState([
  //   "Start coding small DSA problems daily",
  //   "Update your resume this week",
  //   "Prepare for at least 1 hackathon",
  // ]);

  // --- Helper: Get Firebase token ---
  const getToken = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("User not logged in");
      return null;
    }
    return await user.getIdToken();
  };

  // --- Fetch all tasks ---
  const fetchTasks = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await fetch(`${API_URL}/tasks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to fetch tasks:", res.status, text);
        toast.error("Failed to load tasks");
        return;
      }

      const data = await res.json();
      const tasksWithId = data.map((t, idx) => ({
        id: t.id || t.task_id || idx,
        ...t,
      }));
      setTasks(tasksWithId);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      toast.error("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // --- Add a new task ---
  const handleAdd = async () => {
    if (!newTask.trim()) return;

    try {
      const token = await getToken();
      if (!token) return;

      const taskData = {
        title: newTask,
        category: newCategory,
        deadline: newDeadline,
        priority: newPriority,
        completed: false,
      };

      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to add task:", res.status, text);
        toast.error("Failed to add task");
        return;
      }

      const data = await res.json();
      const newTaskWithId = { id: data.task_id || data.id, ...taskData };
      setTasks([...tasks, newTaskWithId]);

      setNewTask("");
      setNewDeadline("");
      setNewPriority("Medium");
      setNewCategory(categories[0]);
      toast.success("Task added successfully");
    } catch (err) {
      console.error("Error adding task:", err);
      toast.error("Error adding task");
    }
  };

 // --- Toggle task completion ---
const handleToggle = async (task) => {
  const updatedTask = { ...task, completed: !task.completed };
  setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t))); // optimistic UI

  try {
    const token = await getToken();
    if (!token) return;

    const res = await fetch(`${API_URL}/tasks/${task.id}`, {
      method: "PATCH", // Changed from PUT to PATCH
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTask),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to update task:", res.status, text);
      toast.error("Failed to update task");
      fetchTasks(); // fallback: reload tasks from server
    }
  } catch (err) {
    console.error("Error updating task:", err);
    toast.error("Error updating task");
    fetchTasks();
  }
};


  // --- Delete a task ---
  const handleDelete = async (taskId) => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to delete task:", res.status, text);
        toast.error("Failed to delete task");
        return;
      }

      setTasks(tasks.filter((t) => t.id !== taskId));
      toast.success("Task deleted");
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Error deleting task");
    }
  };

  // --- Filter tasks ---
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Ongoing") return !task.completed;
    return true;
  });

  const completionRate = tasks.length
    ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100)
    : 0;

  return (
    <div className="flex min-h-screen bg-blue-50 text-slate-900">
      <Sidebar className="flex-shrink-0 w-64 bg-blue-900 text-white" />
      <div className="flex-1 p-6 overflow-x-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Checklist ✅</h1>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {completionRate}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-blue-200 rounded-full h-4 mb-6">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>

        {/* AI Suggestions */}
        {/* <div className="mb-6 p-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow text-white">
          <h2 className="font-semibold mb-3 text-lg">AI Mentor Suggestions 💡</h2>
          <ul className="list-disc list-inside space-y-1">
            {aiSuggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div> */}

        <AISuggestions context={userContext} />


        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {["All", "Ongoing", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-blue-400 text-white/80 hover:bg-blue-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        {categories.map((cat) => (
          <div key={cat} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#01497C]">{cat}</h2>
            <div className="grid gap-4">
              {filteredTasks
                .filter(
                  (t) =>
                    t.category?.trim().toLowerCase() === cat.trim().toLowerCase()
                )
                .map((task, idx) => {
                  const isNearDeadline =
                    task.deadline &&
                    (new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24) <=
                      3;
                  return (
                    <div
                      key={task.id || task.title + idx}
                      className={`flex flex-wrap items-center justify-between p-4 rounded-xl shadow border border-blue-300 hover:shadow-lg ${
                        task.completed ? "bg-blue-100" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggle(task)}
                          className="h-5 w-5 accent-blue-600"
                        />
                        <span
                          className={`font-medium ${
                            task.completed
                              ? "line-through text-gray-500"
                              : "text-slate-900"
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>

                      <div className="text-center min-w-[120px]">
                        <span
                          className={`text-sm ${
                            isNearDeadline
                              ? "text-red-600 font-semibold"
                              : "text-gray-600"
                          }`}
                        >
                          {task.deadline
                            ? format(new Date(task.deadline), "yyyy-MM-dd")
                            : "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 min-w-[120px] justify-end">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-600"
                              : task.priority === "Medium"
                              ? "bg-blue-400 text-white"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {task.priority}
                        </span>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="p-1 hover:bg-blue-200 rounded-full"
                        >
                          <Trash2 className="w-5 h-5 text-slate-800" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        {/* Add Task */}
        <div className="flex flex-col gap-3 mt-8">
          <input
            type="text"
            placeholder="Task title..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border rounded-lg px-3 py-2 border-blue-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
          <div className="flex gap-3 flex-wrap">
            <input
              type="date"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              className="border rounded-lg px-3 py-2 border-blue-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="border rounded-lg px-3 py-2 border-blue-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 border-blue-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" /> Add
            </button>
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </div>
    </div>
  );
}