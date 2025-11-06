import React from "react";
import { FaMapMarkedAlt, FaUsers, FaCompass } from "react-icons/fa";

const AboutPage = () => {
  return (
    <section className="min-h-screen text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-40 flex flex-col items-center text-center">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
          About Adventure Time
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
          Adventure Time is your all-in-one student guide to exploring Cape Town —
          from vibey cafés and hidden thrift stores to local events and scenic
          getaways. Discover new spots, plan adventures, and make every weekend
          unforgettable.
        </p>

        {/* Icons Section */}
        <div className="grid md:grid-cols-3 gap-10 mt-16 w-full">
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <FaCompass className="text-black text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Explore the City</h3>
            <p className="text-gray-600">
              Find restaurants, events, thrift stores, and hidden gems curated
              just for students across Cape Town.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <FaMapMarkedAlt className="text-green-500 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Plan Adventures</h3>
            <p className="text-gray-600">
              Build your own adventure plans, track your favorite places, and
              share them with friends.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <FaUsers className="text-[#FF0000] text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Support Local</h3>
            <p className="text-gray-600">
              Discover and uplift small local businesses that make Cape Town
              vibrant and student-friendly.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 max-w-2xl">
          <h2 className="text-3xl font-bold text-black mb-4">
            Live Your Best Student Life
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Adventure Time isn’t just about finding places — it’s about creating
            memories, building connections, and discovering what makes Cape Town
            one of the most exciting cities for students. Let’s make every moment
            an adventure.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;