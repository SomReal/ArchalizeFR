import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


function UploadPage() {
  const [critiqueSaved, setCritiqueSaved] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [critique, setCritique] = useState("");
  const [loading, setLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState("");


  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setCritique("");
    setChatHistory([]);
    setImagePreview(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const imageBase64 = await toBase64(file);

    try {
      const res = await axios.post("https://ai.archalize.com/api/critique", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const critiqueText = res.data.result || "No critique returned.";
      setCritique(critiqueText);

      if (user && !critiqueSaved) {
        await addDoc(collection(db, "users", user.uid, "critiques"), {
          critique: critiqueText,
          image: imageBase64,
          timestamp: serverTimestamp(),
        });
        setCritiqueSaved(true);
      }

    } catch (err) {
      console.error("Upload failed:", err);
      setCritique("An error occurred while getting AI critique.");
    }

    setLoading(false);
  };

  const handleSendFollowUp = async () => {
    if (!userMessage.trim()) return;

    try {
      const res = await axios.post("https://ai.archalize.com/api/followup", {
        critique,
        question: userMessage,
      });

      const reply = res.data.reply || "No response.";

      setChatHistory((prev) => [...prev, { user: userMessage, bot: reply }]);
      setUserMessage("");
    } catch (err) {
      console.error("Follow-up failed:", err);
      setChatHistory((prev) => [...prev, { user: userMessage, bot: "Error getting response." }]);
      setUserMessage("");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/"; // full reset to clear everything
    } catch (err) {
      console.error("Logout failed", err);
    }
  };


  return (
    <>
      <nav className="absolute top-4 left-6 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-yellow-400 transition"
        >
          <span className="text-2xl text-[#1E293B]">←</span>
          <span className="text-sm font-medium text-[#1E293B]">Home</span>
        </Link>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E5E7EB] font-sans px-6 text-[#1E293B] relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 2000" preserveAspectRatio="xMidYMid slice">
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
        <div className="absolute top-4 right-4 flex items-center gap-4 z-50">
          <Link
            to="/history"
            className="bg-yellow-400 text-[#1E293B] px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
          >
            View History
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-500 transition"
          >
            Logout
          </button>
        </div>
        <img src="/Archalize-SoloNOBG.png" alt="Owl Logo" className="w-[200px] h-[200px] mb-4 z-10" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight text-center z-10">
          <span className="block text-[#1E293B]">Upload Your</span>
          <span className="block text-yellow-400">Building or Blueprint</span>
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mb-6 text-[#1E293B]/90 text-center z-10">
          Upload any building photo or floor plan and receive professional-grade architectural analysis in seconds.
        </p>

        <div className="relative z-10">
          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="fileUpload"
            className="inline-block bg-yellow-400 text-[#1E293B] font-semibold px-6 py-2 rounded-full cursor-pointer hover:bg-blue-500 transition"
          >
            Upload Image
          </label>
        </div>


        {imagePreview && !critique && (
          <div className="mt-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2 text-white">Preview:</h2>
            <img src={imagePreview} alt="Uploaded Preview" className="w-80 rounded-lg shadow-lg mb-6" />
          </div>
        )}


        {loading && (
          <p className="text-yellow-400 text-lg font-semibold animate-pulse">Analyzing with AI...</p>
        )}

        {critique && (
          <>
            <div className="mt-12 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start px-4">
              {/* LEFT COLUMN: Image + Chat */}
              <div className="flex-1 flex flex-col h-full">
                {/* Image */}
                <div className="mb-6">
                  <img
                    src={imagePreview}
                    alt="Uploaded Preview"
                    className="w-full max-w-md rounded-lg shadow"
                  />
                </div>

                {/* Chat Box (stretches to match critique height) */}
                <div className="flex-1 bg-[##1E293B] rounded-md p-4 text-white flex flex-col justify-between">
                  <div className="overflow-y-auto mb-4">
                    <h2 className="text-lg font-semibold mb-2 text-[#1E293B]">Talk to Archalize</h2>
                    {chatHistory.map((chat, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-blue-400 font-semibold">You: <span className="text-black">{chat.user}</span></p>
                        <p className="text-green-400 font-semibold">Archalize: <span className="text-black">{chat.bot}</span></p>
                      </div>
                    ))}
                  </div>

                  <div className="flex mt-auto">
                    <input
                      type="text"
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="Ask a follow-up..."
                      className="flex-grow px-4 py-2 rounded-l-md text-black"
                    />
                    <button
                      onClick={handleSendFollowUp}
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Critique */}
              <div className="flex-1 bg-white text-[#1E293B] p-6 rounded-lg shadow-lg h-full">
                <h2 className="text-2xl font-bold mb-4">Architectural Critique</h2>
                <p className="whitespace-pre-wrap text-base leading-relaxed">{critique}</p>
              </div>
            </div>

          </>
        )}
      </div>
    </>
  );
}

export default UploadPage;
