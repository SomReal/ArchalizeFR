import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Make sure storage is exported from firebase.js


function UploadPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const [imagePreview, setImagePreview] = useState(null);
  const [critique, setCritique] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setCritique("");
    setImagePreview(URL.createObjectURL(file));
    setLoading(true);
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await axios.post("https://ai.archalize.com/api/critique", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      const critiqueText = res.data.result || "No critique returned.";
      setCritique(critiqueText);
  
      if (user) {
        // Upload image to Firebase Storage
        const imageRef = ref(storage, `uploads/${user.uid}/${Date.now()}-${file.name}`);
        await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(imageRef);
  
        // Save to Firestore
        await addDoc(collection(db, "users", user.uid, "critiques"), {
          critique: critiqueText,
          imageUrl,
          timestamp: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setCritique("An error occurred while getting AI critique.");
    }
  
    setLoading(false);
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

        {imagePreview && (
          <div className="mt-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2 text-white">Preview:</h2>
            <img src={imagePreview} alt="Uploaded Preview" className="w-80 rounded-lg shadow-lg mb-6" />
          </div>
        )}

        {loading && (
          <p className="text-yellow-400 text-lg font-semibold animate-pulse">Analyzing with AI...</p>
        )}

        {critique && (
          <div className="mt-6 bg-white text-[#1E293B] p-6 rounded-lg shadow-lg max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Architectural Critique</h2>
            <p className="text-lg whitespace-pre-wrap">{critique}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default UploadPage;
