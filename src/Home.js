import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#E5E7EB] font-sans text-[#1E293B]">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">Archalize</h1>
        <div className="flex gap-6 items-center">
          <Link to="/samples" className="font-medium">
            View Sample Critiques
          </Link>
          <Link to="/about" className="font-medium">
            Our Story
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative bg-[#E5E7EB] overflow-hidden">
        {/* Background SVG */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 2000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1E293B" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="2000" fill="url(#grid)" opacity="0.06" />
            <ellipse cx="500" cy="1000" rx="250" ry="250" stroke="#1E293B" strokeWidth="1" opacity="0.03" />
            <ellipse cx="500" cy="1000" rx="350" ry="350" stroke="#1E293B" strokeWidth="1" opacity="0.02" />
            <ellipse cx="500" cy="1000" rx="450" ry="450" stroke="#1E293B" strokeWidth="1" opacity="0.01" />
          </svg>
        </div>

        {/* Foreground Content */}
        <section className="relative z-10 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-4 m-0 p-0 leading-none">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
            <img
              src="/Archalize-SoloNOBG.png"
              alt="Owl Logo"
              className="w-32 sm:w-48 md:w-60 mb-6 mx-auto"
            />
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              <span className="block text-[#1E293B]">Instant AI-Powered</span>
              <span className="block text-yellow-400">Architectural Critique</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-xl mb-6 mx-auto text-[#1E293B]/90">
              Upload any building photo or floor plan and receive professional-grade architectural
              analysis in seconds. Get insights on style, sustainability, historical influences,
              and design improvements.
            </p>
            <button
              onClick={() => (user ? navigate("/upload") : navigate("/auth"))}
              className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-300 transition inline-flex items-center gap-2"
            >
              <i className={`fas ${user ? "fa-upload" : "fa-sign-in-alt"}`}></i>
              {user ? "Upload & Analyze" : "Sign In to Analyze"}
            </button>
          </div>

          {/* Feature Cards */}
          <section className="w-screen px-6 lg:px-12 mt-16 pb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[
                {
                  icon: "fas fa-brain",
                  title: "AI-Powered Analysis",
                  text: "Professional-grade critique using intelligent architectural evaluation.",
                },
                {
                  icon: "fas fa-stopwatch",
                  title: "Instant Results",
                  text: "Get architectural insights in seconds, not hours or days.",
                },
                {
                  icon: "fas fa-drafting-compass",
                  title: "Style Recognition",
                  text: "Identify architectural styles from Classical to Contemporary.",
                },
                {
                  icon: "fas fa-leaf",
                  title: "Sustainability Check",
                  text: "Evaluate environmental impact and suggest eco-friendly improvements.",
                },
                {
                  icon: "fas fa-landmark",
                  title: "Historical Context",
                  text: "Understand cultural and historical significance in your design.",
                },
                {
                  icon: "fas fa-tools",
                  title: "Design Improvements",
                  text: "Get suggestions to enhance functionality and aesthetic appeal.",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition flex flex-col items-start w-full"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#FBBF24] text-[#1E293B] mb-4 text-2xl">
                    <i className={f.icon}></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2">{f.title}</h3>
                  <p className="text-[#1E293B]/80 text-base">{f.text}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Home;
