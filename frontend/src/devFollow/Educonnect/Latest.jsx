import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Latest() {
  const navigate = useNavigate();
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      {/* Header */}
      <header className="fixed w-full px-6 lg:px-16 py-4 flex flex-wrap items-center justify-between bg-black/30 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
            EDU<span className="text-white">Connect</span>
          </Link>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-1 text-base">
            <li><Link to="/devFlow/" className="px-4 py-2 text-rose-500 font-medium hover:text-rose-400">Home</Link></li>
            <li><Link to="/devFlow/about" className="px-4 py-2 hover:text-rose-500 transition-colors duration-300">About</Link></li>
            <li><Link to="/devFlow/colleges" className="px-4 py-2 hover:text-rose-500 transition-colors duration-300">Colleges</Link></li>
            <li><Link to="/devFlow/coursespage" className="px-4 py-2 hover:text-rose-500 transition-colors duration-300">Courses</Link></li>
            <li><Link to="/devFlow/pathways" className="px-4 py-2 hover:text-rose-500 transition-colors duration-300">Pathways</Link></li>
          </ul>
        </nav>
        
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>
      
      {/* Hero Section */}
      <section id="hero" className="pt-24 px-6 lg:px-16 py-16 grid md:grid-cols-2 gap-12 min-h-screen scroll-mt-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Find Your <span className="text-rose-500">Perfect</span> College
          </h1>
          <p className="mt-6 text-gray-300 text-lg">
            Make informed decisions about your education with comprehensive insights on placements, faculty, campus life, and more.
          </p>
          <div className="mt-8">
            <Link 
              to="/colleges" 
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Explore Colleges
            </Link>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-center">How We Help You</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-rose-500 p-2 rounded-full mr-4 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg text-rose-400">Rank Search</h3>
                <p className="text-gray-400">Find colleges that match your ranking and preferences</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-rose-500 p-2 rounded-full mr-4 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg text-rose-400">Path Finder</h3>
                <p className="text-gray-400">Discover career paths based on your interests and skills</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-rose-500 p-2 rounded-full mr-4 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg text-rose-400">Forum Access</h3>
                <p className="text-gray-400">Connect with peers and get advice from seniors</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 lg:px-16 py-16 scroll-mt-24 min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700 hover:border-rose-500/50 transition-colors duration-300">
            <div className="w-12 h-12 bg-rose-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Verified Information</h3>
            <p className="text-gray-400">All college data is verified and updated regularly for accuracy</p>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700 hover:border-rose-500/50 transition-colors duration-300">
            <div className="w-12 h-12 bg-rose-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Interactive Analytics</h3>
            <p className="text-gray-400">Visual comparison tools to evaluate colleges side by side</p>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700 hover:border-rose-500/50 transition-colors duration-300">
            <div className="w-12 h-12 bg-rose-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Community Insights</h3>
            <p className="text-gray-400">Real reviews and experiences shared by current and past students</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="bg-black/20 py-16 scroll-mt-24 min-h-screen">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold flex justify-center items-baseline">
                <span>30</span>
                <span className="text-rose-500 font-extrabold">+</span>
              </div>
              <p className="mt-2 text-gray-400">Career Paths Mapped</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold flex justify-center items-baseline">
                <span>50</span>
                <span className="text-rose-500 font-extrabold">+</span>
              </div>
              <p className="mt-2 text-gray-400">Colleges Evaluated</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold flex justify-center items-baseline">
                <span>100</span>
                <span className="text-rose-500 font-extrabold">+</span>
              </div>
              <p className="mt-2 text-gray-400">Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section id="colleges" className="px-6 lg:px-16 py-16 scroll-mt-24 min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Colleges</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Add college cards here */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 py-8 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 EduConnect. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <Link to="/" className="hover:text-rose-500 transition-colors duration-300">Home</Link>
              <Link to="/about" className="hover:text-rose-500 transition-colors duration-300">About</Link>
              <Link to="/colleges" className="hover:text-rose-500 transition-colors duration-300">Colleges</Link>
              <Link to="/coursespage" className="hover:text-rose-500 transition-colors duration-300">Courses</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Latest;