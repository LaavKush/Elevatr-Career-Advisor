// src/pages/Profile.jsx
import React, { Component } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase";
import Sidebar from "./Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      userProfile: null,
      skillsOptions: [
        { value: "React", label: "React" },
        { value: "Python", label: "Python" },
        { value: "Machine Learning", label: "Machine Learning" },
        { value: "Web Development", label: "Web Development" },
        { value: "Node.js", label: "Node.js" },
        { value: "Django", label: "Django" },
        { value: "AWS", label: "AWS" },
      ],
      interestsOptions: [
        { value: "AI", label: "AI" },
        { value: "Blockchain", label: "Blockchain" },
        { value: "Frontend", label: "Frontend" },
        { value: "Cybersecurity", label: "Cybersecurity" },
      ],
    };
    this.formRefs = {};
  }

  componentDidMount() {
    this.loadProfile();
  }

  async getToken() {
    const user = auth.currentUser;
    if (!user) {
      toast.error("User not logged in");
      return null;
    }
    return await user.getIdToken();
  }

  async loadProfile() {
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("User not logged in");
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      this.setState({ userProfile: data });
    } catch (err) {
      console.error("Error loading profile:", err);
      toast.error(err.message || "Could not load profile");
    }
  }

  toggleEdit = () => {
    this.setState(prev => ({ isEditing: !prev.isEditing }));
  }

  handleChange = (field, value) => {
    this.setState(prev => ({
      userProfile: {
        ...prev.userProfile,
        [field]: value
      }
    }));
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await this.getToken();
      if (!token) return;

      const profileData = {
        name: this.formRefs.name.value,
        email: this.state.userProfile.email,
        college: this.formRefs.college.value,
        cgpa: parseFloat(this.formRefs.cgpa.value),
        cgpaScale: "Out of 10",
        skills: this.state.userProfile.skills || [],
        interests: this.state.userProfile.interests || [],
        resume_summary: this.state.userProfile.resume_summary || "",
      };

      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const result = await res.json();
      if (result.status === "success") {
        toast.success("Profile updated");
        this.setState({ isEditing: false, userProfile: profileData });
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(err.message || "Update failed");
    }
  }

  handleSelectChange = (field, selectedOptions) => {
    this.setState(prev => ({
      userProfile: {
        ...prev.userProfile,
        [field]: selectedOptions ? selectedOptions.map(opt => opt.value) : []
      }
    }));
  }

  render() {
    const { isEditing, userProfile, skillsOptions, interestsOptions } = this.state;

    if (!userProfile) return <p className="text-center text-white mt-20">Loading...</p>;

    return (
      <div className="flex min-h-screen bg-gradient-to-r from-[#01497C] to-[#468FAF]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-[#01497C] flex items-center justify-center text-white text-3xl font-semibold">
                  {userProfile.name.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-[#01497C]">{userProfile.name}</h2>
                  <p className="text-gray-700">{userProfile.email}</p>
                  <p className="text-gray-700">{userProfile.college}</p>
                </div>
              </div>
              <button
                onClick={this.toggleEdit}
                className="text-white bg-[#014F86] py-3 px-8 rounded-full hover:bg-[#01497C] transition duration-300"
                type="button"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            <form onSubmit={this.handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-[#01497C]">Name</label>
                  <input
                    ref={ref => (this.formRefs.name = ref)}
                    type="text"
                    defaultValue={userProfile.name}
                    disabled={!isEditing}
                    className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-[#01497C]">Email</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    disabled
                    className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-[#01497C]">College</label>
                  <input
                    ref={ref => (this.formRefs.college = ref)}
                    type="text"
                    defaultValue={userProfile.college}
                    disabled={!isEditing}
                    className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-[#01497C]">CGPA</label>
                  <input
                    ref={ref => (this.formRefs.cgpa = ref)}
                    type="text"
                    defaultValue={userProfile.cgpa}
                    disabled={!isEditing}
                    className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
                    pattern="[0-9.]+"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#01497C]">Skills</label>
                <Select
                  isMulti
                  options={skillsOptions}
                  value={userProfile.skills.map(s => ({ value: s, label: s }))}
                  onChange={opts => this.handleSelectChange("skills", opts)}
                  isDisabled={!isEditing}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#01497C]">Interests</label>
                <Select
                  isMulti
                  options={interestsOptions}
                  value={userProfile.interests.map(i => ({ value: i, label: i }))}
                  onChange={opts => this.handleSelectChange("interests", opts)}
                  isDisabled={!isEditing}
                  className="w-full"
                />
              </div>

              {isEditing && (
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-[#014F86] text-white py-3 px-8 rounded-full hover:bg-[#01497C] transition duration-300"
                  >
                    Save
                  </button>
                </div>
              )}
            </form>

            <ToastContainer />
          </div>
        </main>
      </div>
    );
  }
}