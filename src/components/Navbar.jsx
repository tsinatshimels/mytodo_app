import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSmoothScroll = (e, target) => {
    e.preventDefault();
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Smart Hyperion
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        <div
          className={`md:flex md:space-x-6 absolute md:static bg-gray-800 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 p-4 md:p-0 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <a
            href="#home"
            className="block md:inline-block py-2 px-4 hover:underline"
            onClick={(e) => handleSmoothScroll(e, "home")}
          >
            Home
          </a>
          <a
            href="#about"
            className="block md:inline-block py-2 px-4 hover:underline"
            onClick={(e) => handleSmoothScroll(e, "about")}
          >
            About
          </a>
          <a
            href="#services"
            className="block md:inline-block py-2 px-4 hover:underline"
            onClick={(e) => handleSmoothScroll(e, "services")}
          >
            Services
          </a>
          <a
            href="#faq"
            className="block md:inline-block py-2 px-4 hover:underline"
            onClick={(e) => handleSmoothScroll(e, "faq")}
          >
            FAQ
          </a>
          <a
            href="#contact"
            className="block md:inline-block py-2 px-4 hover:underline"
            onClick={(e) => handleSmoothScroll(e, "contact")}
          >
            Contact
          </a>
        </div>

        <div>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
