import React, { useState } from "react";
import { Search } from "lucide-react";

const colleges = [
  {
    name: "College of Engineering Chengannur",
    address: "CEC Chengannur, Alappuzha, Kerala",
    contact: "+91 98765 43210",
    email: "collegeeng@ceconline.edu",
    rankings: {
      hostel: 7,
      faculty: 9,
      placement: 8,
      atmosphere: 7,
      events: 7,
      infrastructure: 7,
      research: 8,
    },
    nearest: {
      railway: "Cityville Central Station",
      bus: "Tech Park Bus Stop",
    },
    image: "/api/placeholder/400/300"
  },
  {
    name: "XYZ University",
    address: "456 Knowledge Lane, Metropolis",
    contact: "+91 87654 32109",
    email: "admissions@xyzuniversity.edu",
    rankings: {
      hostel: 7,
      faculty: 8,
      placement: 8,
      atmosphere: 9,
      events: 9,
      sports: 8,
      library: 9,
    },
    nearest: {
      railway: "Metropolis Junction",
      bus: "University Gate Bus Stop",
    },
    image: "/api/placeholder/400/300"
  },
  {
    name: "LMN College of Engineering",
    address: "789 Innovation Street, Technotown",
    contact: "+91 76543 21098",
    email: "contact@lmnce.edu",
    rankings: {
      hostel: 9,
      faculty: 9,
      placement: 10,
      atmosphere: 8,
      events: 7,
      labs: 9,
      startups: 9,
    },
    nearest: {
      railway: "Technotown Rail Station",
      bus: "Engineering Hub Bus Stop",
    },
    image: "/api/placeholder/400/300"
  },
];

const getAllRankingFactors = () => {
  const factors = new Set();
  colleges.forEach(college => {
    Object.keys(college.rankings).forEach(factor => factors.add(factor));
  });
  return Array.from(factors);
};

const Colleges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const rankingFactors = getAllRankingFactors();

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          college.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = activeFilter ? 
                           (college.rankings[activeFilter] && college.rankings[activeFilter] >= minRating) : 
                           true;
    
    return matchesSearch && matchesRating;
  }).sort((a, b) => {
    if (!activeFilter) return 0;
    return (b.rankings[activeFilter] || 0) - (a.rankings[activeFilter] || 0);
  });

  const RatingBar = ({ rating, className = "" }) => {
    return (
      <div className={`h-1 w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
        <div 
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${rating * 10}%` }}
        ></div>
      </div>
    );
  };

  const CollegeDetailModal = ({ college, onClose }) => {
    if (!college) return null;
    
    const averageRating = Math.round(
      Object.values(college.rankings).reduce((sum, val) => sum + val, 0) / 
      Object.values(college.rankings).length
    );
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-xl w-full max-w-3xl max-h-90 overflow-y-auto shadow-2xl">
          <div className="relative h-52 bg-gradient-to-r from-slate-800 to-emerald-900 rounded-t-xl overflow-hidden">
            <img src={college.image} className="w-full h-full object-cover opacity-30" alt={college.name} />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h2 className="text-3xl font-bold text-white">{college.name}</h2>
              <p className="text-emerald-100 mt-2">{college.address}</p>
            </div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50"
            >
              ×
            </button>
          </div>
          
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-medium text-gray-900">Overall Excellence</span>
                <span className="text-xl font-semibold text-emerald-700">{averageRating}/10</span>
              </div>
              <RatingBar rating={averageRating} className="h-2" />
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(college.rankings)
                  .sort(([, valueA], [, valueB]) => valueB - valueA)
                  .map(([key, value]) => (
                    <div key={key} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="capitalize text-gray-700 group-hover:text-emerald-700 transition-colors">{key}</span>
                        <span className="font-semibold text-emerald-700">{value}/10</span>
                      </div>
                      <RatingBar rating={value} />
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-full mr-4">
                      📞
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{college.contact}</p>
                      <p className="text-gray-500 text-sm">Phone</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-full mr-4">
                      ✉️
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{college.email}</p>
                      <p className="text-gray-500 text-sm">Email</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Transport Access</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-full mr-4">
                      🚆
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{college.nearest.railway}</p>
                      <p className="text-gray-500 text-sm">Railway Station</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-full mr-4">
                      🚌
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{college.nearest.bus}</p>
                      <p className="text-gray-500 text-sm">Bus Stop</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between rounded-b-xl">
            <button 
              className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors" 
              onClick={onClose}
            >
              Close
            </button>
            <button className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg">
              Request Information
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Prestigious Institutes</h1>
          <p className="text-gray-600">Discover excellence in higher education</p>
        </div>
        
        {/* Search & Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl mb-12 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by institution name or location..."
                className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-4 top-4 text-gray-400">
                <Search size={20} />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-2">
              <h2 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Filter by excellence</h2>
              {activeFilter && (
                <button
                  className="ml-4 text-xs text-emerald-600 hover:text-emerald-800"
                  onClick={() => {
                    setActiveFilter("");
                    setMinRating(0);
                  }}
                >
                  Clear filter
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === "" 
                    ? "bg-emerald-600 text-white shadow-md" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setActiveFilter("");
                  setMinRating(0);
                }}
              >
                All Metrics
              </button>
              {rankingFactors.map(factor => (
                <button
                  key={factor}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeFilter === factor 
                      ? "bg-emerald-600 text-white shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveFilter(factor)}
                >
                  {factor.charAt(0).toUpperCase() + factor.slice(1)}
                </button>
              ))}
            </div>
            
            {activeFilter && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Minimum {activeFilter} rating: <span className="text-emerald-600">{minRating}+</span>
                  </span>
                  <span className="text-xs text-gray-500">{filteredColleges.length} results</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredColleges.length} {filteredColleges.length === 1 ? 'Institution' : 'Institutions'}
          </h2>
          {!activeFilter && filteredColleges.length > 0 && (
            <div className="text-sm text-gray-500">
              Sorted by overall excellence
            </div>
          )}
        </div>
        
        {/* College Cards */}
        {filteredColleges.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
            {filteredColleges.map((college, index) => {
              const averageRating = Math.round(
                Object.values(college.rankings).reduce((sum, val) => sum + val, 0) / 
                Object.values(college.rankings).length
              );
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img src={college.image} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="px-2 py-1 bg-emerald-500 bg-opacity-90 rounded text-xs font-semibold">
                            {activeFilter ? 
                              college.rankings[activeFilter] : 
                              averageRating
                            }/10
                          </div>
                          {!activeFilter && (
                            <div className="text-xs">Overall Rating</div>
                          )}
                          {activeFilter && (
                            <div className="text-xs capitalize">{activeFilter}</div>
                          )}
                        </div>
                        <h2 className="text-lg font-bold mb-1">{college.name}</h2>
                        <p className="text-xs text-emerald-100">{college.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-700 mb-3">
                      {activeFilter ? 
                        activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1) + " Excellence" : 
                        "Excellence Categories"}
                    </h3>
                    
                    {activeFilter ? (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 capitalize">{activeFilter}</span>
                          <span className="text-emerald-600 font-semibold">{college.rankings[activeFilter] || 0}/10</span>
                        </div>
                        <RatingBar rating={college.rankings[activeFilter] || 0} />
                      </div>
                    ) : (
                      <div className="space-y-3 mb-4">
                        {Object.entries(college.rankings)
                          .sort(([, valueA], [, valueB]) => valueB - valueA)
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <div key={key}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-gray-600 capitalize">{key}</span>
                                <span className="text-emerald-600 font-semibold">{value}/10</span>
                              </div>
                              <RatingBar rating={value} />
                            </div>
                          ))}
                      </div>
                    )}
                    
                    <div className="flex text-xs text-gray-500 justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center">
                        <span className="mr-1">🚆</span> 
                        <span className="truncate">{college.nearest.railway}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">📞</span> 
                        <span>{college.contact.split(' ')[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 pb-4 pt-2">
                    <button 
                      className="w-full py-2.5 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-emerald-600 hover:text-white transition-colors"
                      onClick={() => setSelectedCollege(college)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              🔍
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No institutions found</h3>
            <p className="text-gray-500 mb-6">We couldn't find any institutions matching your criteria</p>
            <button 
              className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              onClick={() => {
                setSearchTerm("");
                setActiveFilter("");
                setMinRating(0);
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedCollege && (
        <CollegeDetailModal 
          college={selectedCollege} 
          onClose={() => setSelectedCollege(null)} 
        />
      )}
    </div>
  );
};

export default Colleges;