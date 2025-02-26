import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section: Social Media & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Smart Hyperion</h2>
            <p className="text-gray-400">
              Empowering businesses with modern web solutions.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-2xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-2xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-between text-gray-400 space-x-4 md:space-x-8 mb-6">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/about" className="hover:text-white">
            About
          </Link>
          <Link to="/services" className="hover:text-white">
            Services
          </Link>
          <Link to="/faq" className="hover:text-white">
            FAQ
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
          <a href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:text-white">
            Terms of Service
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 border-t border-gray-700 pt-4">
          <p>
            &copy; {new Date().getFullYear()} Smart Hyperion. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
