import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="font-sans bg-[#1E293B] text-white min-h-screen">
      {/* Navbar */}
      <nav className="px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Archalize</h1>
        <Link to="/about" className="text-yellow-400 hover:underline font-medium">
          About
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="h-[100dvh] flex flex-col items-center justify-center text-center px-6">
        <img
          src="/Archalize-SoloNOBGLO.png"
          alt="Archalize Logo"
          className="w-[300px] h-[300px] mb-4"
        />
        <h1 className="text-4xl sm:text-6xl font-bold mb-3 flex items-center gap-2">
          Archalize
          <span className="text-sm bg-yellow-400 text-black px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
            Beta
          </span>
        </h1>
        <p className="text-lg sm:text-2xl max-w-xl mb-4">
          Upload a building. Get architectural insight.
        </p>
        <Link
          to="/upload"
          className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-yellow-300 transition"
        >
          Try It Now
        </Link>
      </section>
    </div>
  );
}

export default Home;
