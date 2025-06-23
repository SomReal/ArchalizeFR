import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();



  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#E5E7EB] text-white shadow-xl">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-[#fefeff] text-white shadow-xl">
        {/* Left side: logo */}
        <h1 className="text-xl font-bold text-[#1E293B]">Archalize</h1>

        {/* Right side: nav links */}
        <div className="flex gap-6 items-center">
          <Link to="/about" className="font-medium hover:text-yellow-400 text-yellow-400">
            About
          </Link>
          {/*
          <Link to="/floorplan" className="font-medium hover:text-yellow-400 text-yellow-400">
            Render Floor Plan
          </Link>
          */}
        </div>
      </nav>


      {/* Hero Section */}
      <main className="flex-grow bg-[#E5E7EB] text-[#1E293B] font-sans">
        <section className="relative pt-12 pb-20 text-center px-6 bg-[#E5E7EB] overflow-hidden">
          {/* Background graphics */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg
              className="absolute top-0 left-0 w-full h-full"
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

              {/* Ellipses — centered at 500, 1000 (middle of SVG) */}
              <ellipse cx="500" cy="1000" rx="250" ry="250" stroke="#1E293B" strokeWidth="1" opacity="0.03" />
              <ellipse cx="500" cy="1000" rx="350" ry="350" stroke="#1E293B" strokeWidth="1" opacity="0.02" />
              <ellipse cx="500" cy="1000" rx="450" ry="450" stroke="#1E293B" strokeWidth="1" opacity="0.01" />
            </svg>

          </div>
          {/* Main content */}
          <div className="z-10 flex flex-col items-center">
            <img src="/Archalize-SoloNOBG.png" alt="Owl Logo" className="w-[250px] h-[250px] mb-4 -mt-5" />

            <h1 className="text-4xl sm:text-6xl font-bold mb-4 leading-tight text-center">
              <span className="block text-[#1E293B]">Instant AI-Powered</span>
              <span className="block text-yellow-400">Architectural Critique</span>
            </h1>

            <p className="text-lg sm:text-xl max-w-2xl mb-6 text-[#1E293B]/90">
              Upload any building photo or floor plan and receive professional-grade architectural analysis in seconds.
              Get insights on style, sustainability, historical influences, and design improvements.
            </p>

            <button
              onClick={() => (user ? navigate("/upload") : navigate("/auth"))}
              className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-300 transition flex items-center gap-2"
            >
              <i className="fas fa-upload"></i> Upload & Analyze
            </button>
          </div>
        </section>


        {/*<section className="-mt-40 pb-10 bg-[#E5E7EB] text-center text-[#1E293B]">
          <h1 className="text-3xl font-bold text-center text-[#1E293B] mb-8">
            AI Trained By Resources From
          </h1>
          <div className="relative w-full">
            <div className="animate-scroll flex gap-16 items-center whitespace-nowrap">
              {/* Repeat logos twice for infinite feel*/}
        {/*{[...Array(2)].map((_, index) => (
                <React.Fragment key={index}>
                  <img src="/logos/cornell.png" alt="Cornell University" className="h-12 grayscale opacity-70" />
                  <img src="/logos/cmu.png" alt="Carnegie Mellon University" className="h-12 grayscale opacity-70" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>*/}

      </main>


      {/* Footer */}
      <Footer />
    </div>
  );


}

export default Home;
