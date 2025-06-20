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
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <Link
          to="/history"
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 font-semibold"
        >
          View History
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <nav className="absolute top-4 left-6 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-yellow-400 transition"
        >
          <span className="text-2xl">←</span>
          <span className="text-sm font-medium">Home</span>
        </Link>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1E293B] font-sans px-6 text-white">
        <h1 className="text-3xl font-bold mb-6">Upload a Building Photo</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-6 block w-full max-w-sm text-sm text-white file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-yellow-400 file:text-black
            hover:file:bg-yellow-300"
        />

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
            <div className="mt-12 w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start">
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
                <div className="flex-1 bg-gray-800 rounded-md p-4 text-white flex flex-col justify-between">
                  <div className="overflow-y-auto mb-4">
                    <h2 className="text-lg font-semibold mb-2">Talk to Archalize</h2>
                    {chatHistory.map((chat, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-blue-400 font-semibold">You: <span className="text-white">{chat.user}</span></p>
                        <p className="text-green-400 font-semibold">Archalize: <span className="text-white">{chat.bot}</span></p>
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
