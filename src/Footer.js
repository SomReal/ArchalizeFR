import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#FBBF24] text-white font-sans text-sm mt-0">
      <div className="max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div>
          <h2 className="text-lg font-bold mb-2 text-[#1E293B]">Elevate Your Design.</h2>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/archalizeoffical"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram text-[#1E293B] text-2xl"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/archalize"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin text-[#1E293B] text-2xl"></i>
            </a>
          </div>
          <p className="mt-4 text-[#1E293B]">© 2025 Archalize. All rights reserved.</p>
        </div>

        {/* Middle */}
        <div>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="text-[#1E293B]">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-[#1E293B]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <a
                href="https://statuspage.incident.io/archalize"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E293B]"
              >
                Status
              </a>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <h2 className="text-lg font-bold mb-2 text-[#1E293B]">Contact Us</h2>
          <p className="text-[#1E293B]">
            Email us at{" "}
            <a href="mailto:soham@archalize.com" className="underline">
              soham@archalize.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
