import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();



  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#1E293B] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-[#1E293B] text-white shadow-md">
        {/* Left side: logo */}
        <h1 className="text-xl font-bold">Archalize</h1>

        {/* Right side: nav links */}
        <div className="flex gap-6 items-center">
          <Link to="/about" className="font-medium hover:text-yellow-400 text-yellow-400">
            About
          </Link>
          <Link to="/floorplan" className="font-medium hover:text-yellow-400 text-yellow-400">
            Render Floor Plan
          </Link>
        </div>
      </nav>


      {/* Hero Section */}
      <main className="flex-grow">
        <section className="h-[100dvh] flex flex-col items-center justify-center text-center px-6">
          <img
            src="/Archalize-SoloNOBG.png"
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
            Upload a building. Get architectural insight. Evolve Your Design!
          </p>
          <button
            onClick={() => {
              if (user) {
                navigate("/upload");
              } else {
                navigate("/auth");
              }
            }}
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-yellow-300 transition"
          >
            Try It Now
          </button>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );


}

export default Home;
