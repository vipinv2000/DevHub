import React, { useState } from "react";
import { Search, BookOpen, Clock, TrendingUp } from "lucide-react";

const courses = [
  { name: "B.Tech in Computer Science", code: "BTECH-CSE", duration: "4 years", level: "Undergraduate", department: "Engineering", description: "Software engineering, AI, emerging tech.", seats: 120 },
  { name: "M.Tech in AI", code: "MTECH-AI", duration: "2 years", level: "Postgraduate", department: "Computer Applications", description: "Machine learning, deep learning, AI research.", seats: 60 },
  { name: "MCA - Master of Computer Applications", code: "MCA", duration: "3 years", level: "Postgraduate", department: "Computer Applications", description: "Software development, IT management.", seats: 90 },
  { name: "BCA - Bachelor of Computer Applications", code: "BCA", duration: "3 years", level: "Undergraduate", department: "Computer Applications", description: "Programming, web development.", seats: 100 },
  { name: "B.Tech in Electronics & Communication", code: "BTECH-ECE", duration: "4 years", level: "Undergraduate", department: "Engineering", description: "Electronic systems, embedded systems.", seats: 80 },
  { name: "M.Sc in Data Science", code: "MSC-DS", duration: "2 years", level: "Postgraduate", department: "Computer Science", description: "Statistical analysis, machine learning.", seats: 50 },
  { name: "MBA in Tech Management", code: "MBA-TECH", duration: "2 years", level: "Postgraduate", department: "Management", description: "Technology leadership, innovation.", seats: 70 },
  { name: "B.Sc in Computer Science", code: "BSC-CS", duration: "3 years", level: "Undergraduate", department: "Science", description: "Computer science fundamentals.", seats: 90 },
  { name: "M.Tech in Cybersecurity", code: "MTECH-CYBER", duration: "2 years", level: "Postgraduate", department: "Cybersecurity", description: "Network security, ethical hacking.", seats: 40 },
  { name: "Ph.D. in Computer Science", code: "PHD-CS", duration: "3-5 years", level: "Doctoral", department: "Research", description: "Advanced research in CS.", seats: 20 },
  { name: "BBA - Bachelor of Business Administration", code: "BBA", duration: "3 years", level: "Undergraduate", department: "Management", description: "Business strategies, management.", seats: 80 },
  { name: "MBA in Finance", code: "MBA-FIN", duration: "2 years", level: "Postgraduate", department: "Management", description: "Financial analysis, investment.", seats: 50 },
  { name: "B.Tech in Mechanical Engineering", code: "BTECH-ME", duration: "4 years", level: "Undergraduate", department: "Engineering", description: "Thermodynamics, robotics.", seats: 90 },
  { name: "M.Tech in Robotics", code: "MTECH-ROBO", duration: "2 years", level: "Postgraduate", department: "Engineering", description: "AI-driven robotics, automation.", seats: 40 },
  { name: "B.Sc in Data Science", code: "BSC-DS", duration: "3 years", level: "Undergraduate", department: "Science", description: "Data analytics, visualization.", seats: 75 },
  { name: "M.Tech in Cloud Computing", code: "MTECH-CC", duration: "2 years", level: "Postgraduate", department: "Computer Science", description: "Cloud storage, virtualization.", seats: 60 },
  { name: "B.Tech in Civil Engineering", code: "BTECH-CIVIL", duration: "4 years", level: "Undergraduate", department: "Engineering", description: "Structural design, construction.", seats: 100 },
  { name: "M.Sc in Cyber Forensics", code: "MSC-CF", duration: "2 years", level: "Postgraduate", department: "Cybersecurity", description: "Digital forensics, crime analysis.", seats: 30 },
  { name: "B.Sc in Artificial Intelligence", code: "BSC-AI", duration: "3 years", level: "Undergraduate", department: "Science", description: "AI, deep learning fundamentals.", seats: 80 },
  { name: "M.Tech in Blockchain", code: "MTECH-BC", duration: "2 years", level: "Postgraduate", department: "Computer Science", description: "Cryptography, blockchain security.", seats: 45 }
];

function CoursesPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Courses Offered</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-1/2 p-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses
          .filter((course) =>
            course.name.toLowerCase().includes(search) ||
            course.code.toLowerCase().includes(search)
          )
          .map((course, index) => (
            <div
              key={index}
              className="bg-white border border-green-300 p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-green-700">{course.name}</h2>
              <p className="text-sm text-gray-600">{course.department}</p>
              <p className="text-sm text-gray-600"><Clock className="inline w-4 h-4" /> {course.duration}</p>
              <p className="text-sm text-gray-600"><BookOpen className="inline w-4 h-4" /> {course.level}</p>
              <p className="text-sm text-gray-600"><TrendingUp className="inline w-4 h-4" /> {course.seats} seats</p>
              <p className="text-sm text-gray-700 mt-2">{course.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CoursesPage;
