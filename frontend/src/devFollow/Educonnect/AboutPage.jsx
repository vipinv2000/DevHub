import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-green-100 min-h-screen p-6 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-green-700 mb-4">About Our Platform</h1>
        <p className="mb-4">
          Welcome to our web application, your go-to platform for exploring in-depth
          information about colleges and courses. Whether you are an aspiring student or
          a researcher, our platform provides insights into various academic
          institutions and their offered programs.
        </p>
        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">Our Purpose</h2>
        <p className="mb-4">
          Our goal is to help students make informed decisions by offering detailed
          information on different courses and colleges, covering aspects like faculty,
          placements, infrastructure, and rankings.
        </p>
        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">Courses Offered</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>B.Tech in Computer Science</li>
          <li>M.Tech in Artificial Intelligence</li>
          <li>MCA - Master of Computer Applications</li>
          <li>BCA - Bachelor of Computer Applications</li>
          <li>B.Tech in Electronics & Communication</li>
          <li>M.Sc in Data Science</li>
          <li>MBA in Technology Management</li>
          <li>B.Sc in Computer Science</li>
          <li>M.Tech in Cybersecurity</li>
          <li>Ph.D. in Computer Science</li>
        </ul>
        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">Colleges Covered</h2>
        <p className="mb-4">
          We provide insights into top colleges offering these programs, detailing their
          academic excellence, faculty expertise, placement records, hostel facilities,
          and overall campus atmosphere.
        </p>
        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-2">Why Choose Us?</h2>
        <p>
          - Accurate and Up-to-date Course Details<br />
          - College Rankings Based on Various Criteria<br />
          - User-Friendly Interface with Search & Filters<br />
          - Reliable Information to Make the Right Choice
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
