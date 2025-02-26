import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import ShowCase from "../components/ShowCase";
import Services from "../components/Services";

function Home() {
  return (
    <div>
      <Navbar />
      <ShowCase />
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
