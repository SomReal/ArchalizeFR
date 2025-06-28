import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "./firebase";
import { collection, getDocs, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [critiques, setCritiques] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchCritiques = async () => {
      try {
        const q = query(
          collection(db, "users", user.uid, "critiques"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCritiques(data);
      } catch (error) {
        console.error("Error fetching critiques:", error);
      }
    };

    fetchCritiques();
  }, [user, navigate]);

  const handleDelete = async (critiqueId) => {
    if (!user || !critiqueId) return;

    const confirmed = window.confirm("Are you sure you want to delete this critique?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "critiques", critiqueId));
      setCritiques(prev => prev.filter(c => c.id !== critiqueId));
    } catch (err) {
      console.error("Error deleting critique:", err);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#E5E7EB] text-[#1E293B] font-sans overflow-hidden">
      {/* Grid Background */}
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

      <div className="relative z-10 px-6 py-20">
        {/* Header */}
        <nav className="absolute top-4 left-6 z-10">
          <Link
            to="/upload"
            className="flex items-center gap-2 text-[#1E293B] hover:text-yellow-400 transition"
          >
            <span className="text-2xl">←</span>
            <span className="text-sm font-medium">Upload</span>
          </Link>
        </nav>

        <div className="flex flex-col items-center mb-12">
          <img src="/Archalize-SoloNOBG.png" alt="Owl Logo" className="w-[200px] h-[200px] mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-center">
            <span className="block text-[#1E293B]">Your Saved</span>
            <span className="block text-yellow-400">Architectural Critiques</span>
          </h1>
        </div>

        {critiques.length === 0 ? (
          <p className="text-center text-lg text-[#1E293B]/80">No critiques found.</p>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {critiques.map((entry) => (
              <div
                key={entry.id}
                className="bg-white text-[#1E293B] p-6 rounded-lg shadow-lg"
              >
                {entry.image && (
                  <img
                    src={entry.image}
                    alt="Uploaded"
                    className="mb-4 w-full max-w-sm mx-auto rounded shadow"
                  />
                )}
                <p className="whitespace-pre-wrap">{entry.critique}</p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                  <p className="text-sm text-gray-600">
                    {entry.timestamp?.toDate().toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
