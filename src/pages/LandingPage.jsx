import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import Features from "../Components/Features";
import CTA from "../Components/CTA";
import FooterV2 from "../Components/FooterV2";

const LandingPage = () => {
  return (
    <div className="page-wrapper">
      {" "}
      <Navbar />
      <main className="page-content">
        {" "}
        <Hero />
        <HowItWorks id="how-it-works" />
        <Features />
        <CTA />
      </main>
      <FooterV2 />
    </div>
  );
};

export default LandingPage;
