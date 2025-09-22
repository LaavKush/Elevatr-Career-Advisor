import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth, getUserPhotoOrInitials } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    cgpa: "",
        skills: [],
    interests: [],
  });

  const [userEmail, setUserEmail] = useState(""); 
  const [userPhoto, setUserPhoto] = useState(""); 
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [stepCompleted, setStepCompleted] = useState({
    basicInfo: false,
    skills: false,
    interests: false,
    submit: false
  });

  const steps = [
    { key: "basicInfo", label: "Basic Info Completed" },
    { key: "skills", label: "Skills Selected" },
    { key: "interests", label: "Interests Selected" },
    { key: "submit", label: "Ready to Submit" },
  ];

  const skillsOptions = [
    { value: "React", label: "React" }, { value: "Python", label: "Python" }, { value: "Machine Learning", label: "Machine Learning" },
    { value: "Web Development", label: "Web Development" }, { value: "Node.js", label: "Node.js" }, { value: "Django", label: "Django" },
    { value: "AWS", label: "AWS" }, { value: "JavaScript", label: "JavaScript" }, { value: "TypeScript", label: "TypeScript" },
    { value: "SQL", label: "SQL" }, { value: "NoSQL", label: "NoSQL" }, { value: "Java", label: "Java" }, { value: "C++", label: "C++" },
    { value: "Android", label: "Android Development" }, { value: "iOS", label: "iOS Development" }, { value: "Flutter", label: "Flutter" },
    { value: "Docker", label: "Docker" }, { value: "Kubernetes", label: "Kubernetes" }, { value: "GraphQL", label: "GraphQL" },
    { value: "Blockchain", label: "Blockchain" }, { value: "Cybersecurity", label: "Cybersecurity" }, { value: "DevOps", label: "DevOps" }
  ];

  const interestsOptions = [
    { value: "AI", label: "Artificial Intelligence" }, { value: "Blockchain", label: "Blockchain" },
    { value: "Frontend", label: "Frontend Development" }, { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Data Science", label: "Data Science" }, { value: "Machine Learning", label: "Machine Learning" },
    { value: "Cloud Computing", label: "Cloud Computing" }, { value: "Mobile Development", label: "Mobile App Development" },
    { value: "Game Development", label: "Game Development" }, { value: "UX/UI Design", label: "UX/UI Design" },
    { value: "Product Management", label: "Product Management" }, { value: "Research", label: "Research & Development" },
    { value: "Entrepreneurship", label: "Entrepreneurship" }, { value: "Startups", label: "Startups" }, { value: "Tech Blogging", label: "Tech Blogging" },
    { value: "Robotics", label: "Robotics" }, { value: "IoT", label: "Internet of Things" }, { value: "Sustainability", label: "Sustainability" }
  ];

  const cgpaOptions = [
    { value: "10", label: "Out of 10" }, { value: "5", label: "Out of 5" }, { value: "4", label: "Out of 4" },
    { value: "7", label: "Out of 7" }, { value: "100", label: "Percentage (Out of 100)" }
  ];

  // Get logged-in user email & photo
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserEmail(user.email);
      setUserPhoto(user.photoURL);   // <-- direct Google photoURL use karo
      setFormData(prev => ({ ...prev, name: user.displayName || "" }));
    }
  });
  return () => unsubscribe();
}, []);


  // Run validation and progress update whenever formData changes
  useEffect(() => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.college) newErrors.college = "College is required";
    if (!formData.cgpa) newErrors.cgpa = "CGPA is required";
    if (!formData.cgpaScale) newErrors.cgpaScale = "CGPA scale is required";
    if (formData.skills.length === 0) newErrors.skills = "Select at least one skill";
    if (formData.interests.length === 0) newErrors.interests = "Select at least one interest";
    setErrors(newErrors);

    const basicInfoDone = formData.name && formData.college && formData.cgpa && formData.cgpaScale;
    const skillsDone = formData.skills.length > 0;
    const interestsDone = formData.interests.length > 0;
    const noErrors = Object.keys(newErrors).length === 0;

    setStepCompleted({
      basicInfo: basicInfoDone && noErrors,
      skills: skillsDone && noErrors,
      interests: interestsDone && noErrors,
      submit: basicInfoDone && skillsDone && interestsDone && noErrors
    });

    const completedCount = [
      basicInfoDone && noErrors,
      skillsDone && noErrors,
      interestsDone && noErrors,
      basicInfoDone && skillsDone && interestsDone && noErrors
    ].filter(Boolean).length;

    setProgress((completedCount / steps.length) * 100);

  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;

    try {
      const token = await auth.currentUser.getIdToken();

      const profileData = {
        name: formData.name,
        email: userEmail,
        photoURL: userPhoto,
        college: formData.college,
        cgpa: parseFloat(formData.cgpa),
        skills: formData.skills.map(item => item.value),
        interests: formData.interests.map(item => item.value),
      };

      const rootURL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${rootURL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      const result = await response.json();

      if (result.status === "success") {
        toast.success("Profile created successfully!");
        navigate("/dashboard", { state: { profile: profileData } });
      } else {
        toast.error(result.message || "Failed to create profile");
      }
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gradient-to-r from-[#01497C] to-[#468FAF] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            {userPhoto ? (
              <img src={userPhoto} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#01497C] flex items-center justify-center text-white text-3xl font-semibold">
                {formData.name ? formData.name[0].toUpperCase() : "U"}
              </div>
            )}
            <div>
              <h2 className="text-3xl font-semibold text-[#01497C]">Register</h2>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="relative mb-6">
          <div className="w-full h-2 bg-gray-300 rounded-full">
            <div className="h-2 bg-gradient-to-r from-[#00B4D8] to-[#01497C] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="absolute top-0 left-0 w-full flex justify-between items-center -mt-5">
            {steps.map((step, idx) => (
              <div key={step.key} className="flex flex-col items-center">
               <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${stepCompleted[step.key] ? 'bg-[#01497C]' : 'bg-gray-300'} transition duration-300 mb-2`}>
                  {idx+1}
               </span>
               <span className="text-xs mt-1 font-semibold">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
<br></br>
        <form onSubmit={onSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-semibold text-[#01497C]">Email</label>
            <input type="email" value={userEmail} disabled className="w-full p-4 border border-[#2C7DA0] bg-gray-100 rounded-lg shadow-md" />
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200" />
            {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">College</label>
            <input type="text" name="college" value={formData.college} onChange={handleChange} placeholder="Enter your college" className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200" />
            {errors.college && <p className="text-red-500 text-xs mt-2">{errors.college}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">CGPA</label>
            <input type="text" name="cgpa" value={formData.cgpa} onChange={(e) => handleSelectChange("cgpa", e.target.value)} placeholder="Enter CGPA" className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200" />
            {errors.cgpa && <p className="text-red-500 text-xs mt-2">{errors.cgpa}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">CGPA Scale</label>
            <Select options={cgpaOptions} value={formData.cgpaScale} onChange={(val) => handleSelectChange("cgpaScale", val)} placeholder="Select scale" />
            {errors.cgpaScale && <p className="text-red-500 text-xs mt-2">{errors.cgpaScale}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">Skills</label>
            <Select options={skillsOptions} value={formData.skills} isMulti onChange={(val) => handleSelectChange("skills", val)} placeholder="Select your skills" />
            {errors.skills && <p className="text-red-500 text-xs mt-2">{errors.skills}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">Interests</label>
            <Select options={interestsOptions} value={formData.interests} isMulti onChange={(val) => handleSelectChange("interests", val)} placeholder="Select your interests" />
            {errors.interests && <p className="text-red-500 text-xs mt-2">{errors.interests}</p>}
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="bg-[#014F86] text-white py-3 px-8 rounded-full hover:bg-[#01497C] transition duration-300">Register</button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
