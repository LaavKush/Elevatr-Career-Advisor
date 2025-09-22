import { Sparkles, Calendar, BookOpen, Bot, Menu, X, User } from "lucide-react"; 
import Lottie from "lottie-react";
import { useState } from "react";
import aiAvatar from "../assets/mentor/ai-avatar.json";
import { Link } from "react-router-dom"; 
import { Link as ScrollLink, Element } from "react-scroll";

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <div className="font-sans text-white bg-[#012A4A]">
      {/* 🌐 Navbar */}
      <header className="fixed top-0 left-0 w-full bg-[#01497C]/90 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-[#A9D6E5]">
            CareerAdvisor
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-[#89C2D9]">
            <ScrollLink
              to="home"
              smooth={true}
              duration={600}
              offset={-80}
              className="hover:text-[#A9D6E5] transition cursor-pointer"
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="features"
              smooth={true}
              duration={600}
              offset={-80}
              className="hover:text-[#A9D6E5] transition cursor-pointer"
            >
              Features
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth={true}
              duration={600}
              offset={-80}
              className="hover:text-[#A9D6E5] transition cursor-pointer"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={600}
              offset={-80}
              className="hover:text-[#A9D6E5] transition cursor-pointer"
            >
              Contact
            </ScrollLink>
          </nav>

          {/* CTA Buttons or Profile Icon */}
          <div className="hidden md:flex space-x-4">
            {!isLoggedIn ? (
              <a
                href="/auth"
                className="px-4 py-2 text-[#012A4A] bg-[#A9D6E5] rounded-lg font-semibold hover:bg-[#89C2D9] transition"
                onClick={toggleLoginState}
              >
                Sign In / Sign Up
              </a>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center text-[#A9D6E5] hover:text-white transition"
                  onClick={toggleProfileMenu}
                >
                  <User className="w-6 h-6" style={{ color: "#A9D6E5" }} />
                  <span className="ml-2">Profile</span>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#01497C] rounded-lg shadow-lg text-[#A9D6E5]">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-[#2C7DA0]">My Profile</Link>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-[#2C7DA0]"
                      onClick={() => {
                        toggleLoginState();
                        setProfileMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[#A9D6E5] hover:bg-[#014F86] transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#01497C] shadow-md">
            <nav className="flex flex-col px-6 py-4 space-y-4">
              <ScrollLink
                to="home"
                smooth={true}
                duration={600}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#A9D6E5] transition cursor-pointer"
              >
                Home
              </ScrollLink>
              <ScrollLink
                to="features"
                smooth={true}
                duration={600}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#A9D6E5] transition cursor-pointer"
              >
                Features
              </ScrollLink>
              <ScrollLink
                to="about"
                smooth={true}
                duration={600}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#A9D6E5] transition cursor-pointer"
              >
                About
              </ScrollLink>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={600}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#A9D6E5] transition cursor-pointer"
              >
                Contact
              </ScrollLink>

              {!isLoggedIn ? (
                <>
                  <a href="/login" className="hover:text-[#A9D6E5] transition" onClick={() => setMenuOpen(false)}>Sign In</a>
                  <a href="/signup" className="hover:text-[#A9D6E5] transition" onClick={() => setMenuOpen(false)}>Sign Up</a>
                </>
              ) : (
                <a
                  href="#"
                  className="hover:text-[#A9D6E5] transition"
                  onClick={() => {
                    toggleLoginState();
                    setMenuOpen(false);
                  }}
                >
                  Sign Out
                </a>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* 🌟 Hero Section */}
      <Element name="home">
        <section className="relative bg-gradient-to-r from-[#014F86] via-[#2A6F97] to-[#468FAF] text-white min-h-screen flex items-center pt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
                Your Personalized <br /> <span className="text-[#A9D6E5]">AI Career Mentor</span>
              </h1>
              <p className="mt-6 text-lg text-[#A9D6E5]">
                Tailored paths, internships & skills curated just for <b>YOU</b>.
              </p>
              <a
                href="/auth"
                className="mt-8 inline-block px-8 py-4 bg-[#A9D6E5] text-[#012A4A] font-semibold rounded-2xl shadow-lg hover:bg-[#89C2D9] transition-transform transform hover:scale-105"
              >
                Get Started
              </a>
            </div>

            <div className="w-full h-[400px] lg:h-[500px]">
              <Lottie animationData={aiAvatar} loop />
            </div>
          </div>
        </section>
      </Element>

      {/* 🚀 Features Section */}
      <Element name="features">
        <section className="py-20 bg-[#2A6F97]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-[#A9D6E5] mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 bg-[#01497C] rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
                <Sparkles className="w-12 h-12 text-[#A9D6E5] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white">Skill Recommendations</h3>
                <p className="text-[#A9D6E5] mt-2">
                  AI-powered personalized learning paths to boost your career.
                </p>
              </div>
              <div className="p-6 bg-[#01497C] rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
                <Calendar className="w-12 h-12 text-[#A9D6E5] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white">Internship Calendar</h3>
                <p className="text-[#A9D6E5] mt-2">
                  Track upcoming workshops, webinars & placement drives.
                </p>
              </div>
              <div className="p-6 bg-[#01497C] rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
                <BookOpen className="w-12 h-12 text-[#A9D6E5] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white">Interactive Flashcards</h3>
                <p className="text-[#A9D6E5] mt-2">
                  Revise concepts with gamified, easy-to-use flashcards.
                </p>
              </div>
              <div className="p-6 bg-[#01497C] rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
                <Bot className="w-12 h-12 text-[#A9D6E5] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white">AI Mentor</h3>
                <p className="text-[#A9D6E5] mt-2">
                  Get instant guidance and resume feedback from your AI mentor.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* 📖 About Section */}
      <Element name="about">
        <section className="py-20 bg-[#014F86] text-center">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-[#A9D6E5] mb-6">About Us</h2>
            <p className="text-lg text-[#A9D6E5] leading-relaxed">
              CareerAdvisor is your personalized career companion. We leverage{" "}
              <span className="font-semibold text-white">AI technology</span> to
              recommend skills, internships, and resources tailored to your journey.
              Whether you’re a student, fresher, or professional, our goal is to
              make your career path simpler, smarter, and more successful.
            </p>
          </div>
        </section>
      </Element>

      {/* ✉️ Contact Section */}
      <Element name="contact">
        <section className="py-20 bg-[#468FAF]">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-lg text-[#A9D6E5] mb-12">
              Have questions or suggestions? Reach out to us directly!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Email */}
              <div className="p-6 bg-[#01497C] rounded-2xl shadow-lg hover:shadow-2xl transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#A9D6E5] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8-4H8m-2 8h12M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                </svg>
                <h3 className="text-xl font-semibold text-white">Email</h3>
                <p className="text-[#A9D6E5] mt-2">support@careeradvisor.com</p>
              </div>
              {/* Phone */}
              <div className="p-6 bg-[#01497C] rounded-2xl shadow-lg hover:shadow-2xl transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#A9D6E5] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l3.6 7.59-1.35 2.45A1 1 0 008 17h12a1 1 0 00.92-.62l3-7a1 1 0 00-.08-.92A1 1 0 0023 8H6.21l-.94-2H3z" />
                </svg>
                <h3 className="text-xl font-semibold text-white">Phone</h3>
                <p className="text-[#A9D6E5] mt-2">+91 98765 XXXXX</p>
              </div>
              {/* Socials */}
              <div className="p-6 bg-[#01497C] rounded-2xl shadow-lg hover:shadow-2xl transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#A9D6E5] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z" />
                </svg>
                <h3 className="text-xl font-semibold text-white">Social Media</h3>
                <div className="flex justify-center gap-4 mt-2">
                  <a href="https://twitter.com" target="_blank" className="hover:text-white text-[#A9D6E5]">Twitter</a>
                  <a href="https://linkedin.com" target="_blank" className="hover:text-white text-[#A9D6E5]">LinkedIn</a>
                  <a href="https://instagram.com" target="_blank" className="hover:text-white text-[#A9D6E5]">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* ⚓ Footer */}
      <footer className="bg-[#01497C] text-[#A9D6E5] py-6 text-center">
        <p>© {new Date().getFullYear()} Career Advisor. All rights reserved.</p>
      </footer>
    </div>
  );
}
