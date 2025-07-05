import React from "react";
import { Link } from "react-router-dom";

export default function Samples() {
    return (
        <div className="relative min-h-screen bg-[#E5E7EB] text-[#1E293B] font-sans overflow-hidden">
            {/* Grid Background */}
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
                    <ellipse cx="500" cy="1000" rx="250" ry="250" stroke="#1E293B" strokeWidth="1" opacity="0.03" />
                    <ellipse cx="500" cy="1000" rx="350" ry="350" stroke="#1E293B" strokeWidth="1" opacity="0.02" />
                    <ellipse cx="500" cy="1000" rx="450" ry="450" stroke="#1E293B" strokeWidth="1" opacity="0.01" />
                </svg>
            </div>

            {/* Main Content */}
            <div className="relative z-10 px-6 py-20">
                {/* Back Link */}
                <nav className="absolute top-4 left-6 z-10">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-[#1E293B] hover:text-yellow-400 transition"
                    >
                        <span className="text-2xl">←</span>
                        <span className="text-sm font-medium">Home</span>
                    </Link>
                </nav>

                {/* Header */}
                <div className="flex flex-col items-center mb-12">
                    <img src="/Archalize-SoloNOBG.png" alt="Owl Logo" className="w-[200px] h-[200px] mb-4" />
                    <h1 className="text-4xl sm:text-5xl font-bold text-center">
                        <span className="block text-[#1E293B]">Sample</span>
                        <span className="block text-yellow-400">AI Critiques</span>
                    </h1>
                    <p className="mt-4 text-lg max-w-2xl text-center text-[#1E293B]/80">
                        Here's what an Archalize critique looks like — insightful, intelligent, and tailored to design.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div
                        onClick={() => document.getElementById("modal1").showModal()}
                        className="cursor-pointer transition hover:scale-[1.02]"
                    >
                        <img src="/Sample1.JPEG" alt="Sample 1" className="w-full h-auto object-cover" />
                    </div>

                    <dialog
                        id="modal1"
                        className="backdrop:bg-black/80 p-0 m-0 rounded-lg max-w-5xl w-[90%]"
                        style={{ margin: "auto" }}
                    >
                        <div className="relative bg-white max-h-[90vh] overflow-auto rounded-lg">
                            <img src="/Sample1.JPEG" alt="Sample 1 Fullscreen" className="w-full h-auto" />
                            <form method="dialog" className="absolute top-4 right-4">
                                <button className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600">Close</button>
                            </form>
                        </div>
                    </dialog>



                    <div
                        onClick={() => document.getElementById("modal2").showModal()}
                        className="cursor-pointer transition hover:scale-[1.02]"
                    >
                        <img src="/Sample2.JPEG" alt="Sample 2" className="w-full h-auto object-cover" />
                    </div>

                    <dialog
                        id="modal2"
                        className="backdrop:bg-black/80 p-0 m-0 rounded-lg max-w-5xl w-[90%]"
                        style={{ margin: "auto" }}
                    >
                        <div className="relative bg-white max-h-[90vh] overflow-auto rounded-lg">
                            <img src="/Sample2.JPEG" alt="Sample 2 Fullscreen" className="w-full h-auto" />
                            <form method="dialog" className="absolute top-4 right-4">
                                <button className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600">Close</button>
                            </form>
                        </div>
                    </dialog>


                </div>

            </div>
        </div>
    );
}
