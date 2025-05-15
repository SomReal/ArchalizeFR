import React from "react";
import { Link } from "react-router-dom";


export default function Footer() {
    return (
        <footer className="bg-[#FBBF24] text-white py-10 px-6 mt-20 font-sans text-sm">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

                <div>
                    <h2 className="text-lg font-bold mb-2 text-[#1E293B]">Elevate Your Design.</h2>
                    <div className="flex gap-4 mt-4">
                        <a
                            href="https://www.instagram.com/archalizeofficial/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-instagram text-[#1E293B] text-2xl"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/archalize?trk=public_profile_topcard-current-company" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin text-[#1E293B] text-2xl"></i>
                        </a>
                    </div>
                    <p className="mt-4 text-[#1E293B]">© 2025 Archalize. All rights reserved.</p>
                </div>

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
                    </ul>

                </div>

                <div>
                    <h2 className="text-lg font-bold mb-2 text-[#1E293B]">Contact Us</h2>
                    <p className="text-[#1E293B]">
                        Email us at{" "}
                        <a href="mailto:team@archalize.com" className="underline">
                            soham@archalize.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
