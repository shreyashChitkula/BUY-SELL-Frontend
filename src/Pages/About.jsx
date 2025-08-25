import React from "react";
import { Link } from "react-router-dom";
function About() {
  return (
    <div className="opacity-90">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden w-full max-w-4xl">
        {/* Banner Section */}
        <div className="h-48 bg-gradient-to-r from-rose-500 to-red-400 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white tracking-wide">About Us</h1>
        </div>

        {/* Content Section */}
        <div className="px-8 py-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to BUY & SELL @IIITH
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At <span className="font-semibold text-rose-500">BUY & SELL @IIITH</span>, 
            we believe in making it easier for the IIIT-H community to trade items securely and conveniently. 
            Whether you're a student looking to sell unused items, purchase second-hand goods, or find great deals, 
            our platform connects you with fellow students in a safe, localized environment.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Why Choose Us?
          </h3>
          <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
            <li>Quickly list and sell your items with ease.</li>
            <li>Discover a wide range of pre-loved and affordable products.</li>
            <li>Connect with trusted members of the IIIT-H community.</li>
            <li>Experience a secure platform for safe transactions.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Our Mission
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our goal is to foster a sustainable and resourceful environment where students can reduce waste, save money, 
            and make meaningful connections through trade. With <span className="font-semibold text-rose-500">BUY & SELL @IIITH</span>, 
            we aim to promote responsible consumption and create a community-focused platform for seamless buying and selling.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="bg-rose-500 hover:bg-rose-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;
