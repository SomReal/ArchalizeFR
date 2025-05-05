import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
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

  return (
    <div className="bg-[#1E293B] min-h-screen text-white font-sans px-6 py-10">
      <nav className="mb-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-yellow-400 transition"
        >
          <span className="text-2xl">←</span>
          <span className="text-sm font-medium">Home</span>
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-6 text-center">Your Saved Critiques</h1>

      {critiques.length === 0 ? (
        <p className="text-center text-lg">No critiques found.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {critiques.map((entry) => (
            <div
              key={entry.id}
              className="bg-white text-[#1E293B] p-6 rounded-lg shadow-lg"
            >
              {entry.imageUrl && (
                <img
                  src={entry.imageUrl}
                  alt="Uploaded"
                  className="w-full max-w-sm mx-auto mb-4 rounded-lg shadow"
                />
              )}
              <p className="whitespace-pre-wrap">{entry.critique}</p>
              <p className="text-right text-sm text-gray-600 mt-2">
                {entry.timestamp?.toDate().toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
