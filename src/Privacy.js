import React from "react";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans text-[#1E293B] bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Privacy Policy</h1>
      <p className="mb-4">
        At Archalize, we respect your privacy. This policy outlines the information we collect and how we use it.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">1. Information We Collect</h2>
      <p className="mb-4">
        We collect your email address upon account registration. We also store any critiques you choose to save, along with the associated image preview.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">2. How We Use Your Data</h2>
      <p className="mb-4">
        Your data is used solely to provide architectural critiques and maintain your saved history. We do not sell or share your data with third parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">3. Data Security</h2>
      <p className="mb-4">
        We use Firebase Authentication and Firestore, which implement secure, encrypted protocols to protect user data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">4. Cookies</h2>
      <p className="mb-4">
        Archalize does not use cookies to track or advertise. Session data may be stored temporarily for login purposes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">5. Contact</h2>
      <p className="mb-4">
        If you have any privacy concerns, contact us at <a className="text-blue-700 underline" href="mailto:soham@archalize.com">soham@archalize.com</a>.
      </p>
      <nav className="absolute top-4 left-6 z-10">
        <Link to="/" className="flex items-center gap-2 text-[#1E293B] hover:text-yellow-400 transition">
          <span className="text-2xl">←</span>
          <span className="text-sm font-medium">Home</span>
        </Link>
      </nav>
    </div>
  );
}
