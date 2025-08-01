import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen relative bg-[#E5E7EB] text-[#1E293B] font-sans px-6 py-20 overflow-hidden">

      {/* Background Logo 
      <img
        src="/Archalize-SoloNOBGLO.png"
        alt="Background Owl Logo"
        className="absolute inset-0 w-[1200px] opacity-[0.8] mx-auto pointer-events-none select-none"
        style={{ top: "5%", left: "0", right: "0", margin: "0 auto", zIndex: 0 }}
      />*/}

      {/* Back to Home */}
      <nav className="absolute top-4 left-6 z-10">
        <Link to="/" className="flex items-center gap-2 text-[#1E293B] hover:text-yellow-400 transition">
          <span className="text-2xl">←</span>
          <span className="text-sm font-medium">Home</span>
        </Link>
      </nav>

      {/* Page Content */}
      <div className="min-h-screen bg-[#E5E7EB] text-[#1E293B] font-sans">
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
        <div className="relative z-10 px-6 py-20 max-w-4xl mx-auto space-y-12 text-lg text-left">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Our Mission</h2>
            <p>
              Architecture isn’t just about buildings. It’s about <strong>ideas</strong>, <strong>intention</strong>, and <strong>impact</strong>.
              At <span className="font-semibold">Archalize</span>, we believe that great design deserves great critique, and we’re building the world’s first AI-powered architecture mentor to make that happen.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">What We Do</h2>
            <p>Archalize lets you upload images of buildings, blueprints, or sketches, and in return, delivers insightful, intelligent feedback powered by AI.</p>
            <ul className="list-disc mt-2 pl-6">
              <li>Understand the style and historical context of your work</li>
              <li>Explore how sustainable and functional your design really is</li>
              <li>Receive clear, constructive suggestions, just like a real studio critique</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Why I Built It</h2>
            <p className="italic mb-2">“What if there was an AI that could actually speak the language of architecture?”</p>
            <p>
              As a student passionate about both design and technology, I wanted more than just generic analysis.
              I wanted an intelligent companion that could understand <strong>Deconstructivism</strong>, <strong>Brutalism</strong>, <strong>biomimicry</strong>, and <strong>biophilic design</strong> — not just shapes and colors.
            </p>
            <p className="mt-2">
              So I built <span className="font-semibold">Archalize</span>, a tool that merges architectural theory with AI precision,
              and helps you see your own work in a whole new light.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">What Makes Archalize Different</h2>
            <ul className="list-disc mt-2 pl-6">
              <li><strong>AI, but cultured</strong> — Trained on real architectural principles, styles, and history</li>
              <li><strong>Designed for designers</strong> — Made for students, architects, and dreamers</li>
              <li><strong>A tool that grows with you</strong> — From your first sketch to your thesis portfolio</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">The Owl</h2>
            <p>Our owl isn’t just a logo, it’s a symbol of clarity, of wisdom, and of seeing what others miss.</p>
            <p className="mt-2">
              <span className="font-semibold">Archalize</span> is your wise, quiet guide — one that critiques with precision, suggests with care,
              and helps you evolve your creative vision.
            </p>
            <p className="mt-4 italic">
              Built by Soham Patel — a high school student, architecture fanatic, and the future mind behind the world’s next great skyline.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
