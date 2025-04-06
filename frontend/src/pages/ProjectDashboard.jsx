import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { Button, Rate } from 'antd';
import { Star } from 'lucide-react';

const ProjectDashboard = () => {
  const [listOpenings, setListOpenings] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  const fetchlist = async () => {
    try {
      const { data } = await axiosInstance.get('/userdash/getProjectList');
      setListOpenings(data.projects);
      
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleShowReviews = (project) => {
    setSelectedProject(project);
    setShowReviews(true);
  };


  useEffect(() => {
    fetchlist();
    console.log("data.projects", listOpenings);
  }, []);

  const sentReq = async (projectId) => {
    try {
      await axiosInstance.get(`/userdash/sendInterestRequest/${projectId}`);
      toast.success("Request sent successfully!");
      fetchlist();
    } catch (error) {
      toast.error("Failed to send request");
    }
  };

  const handleMessage = (projectId) => {
   
    toast.success("Opening chat...");
  };

  return (
    <div className='pt-5 max-h-screen bg-white p-6 overflow-auto'>
     <h1 className='text-4xl font-extrabold mb-3'>Get started....</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {listOpenings.map((project) => (
          <div
            key={project._id}
            className={`relative p-5 rounded-xl    shadow-2xl hover:shadow-xl transition-transform transform  flex flex-col justify-between hover:scale-[1.02] ${project.isAlreadyRejected ? 'opacity-50' : ' bg-opacity-40 backdrop-blur-lg border border-white'}`}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h2>
            <p className="text-gray-600 line-clamp-2 mb-2">{project.description}</p>
            <p className="text-gray-600"><strong>Status:</strong> {project.status}</p>
            <p className="text-gray-600"><strong>Deadline:</strong> {new Date(project.deadline).toDateString()}</p>
            <p className="text-gray-600"><strong>Tech Stack:</strong> {project.techStack.join(', ')}</p>
            <p className="text-gray-600"><strong>Owner:</strong> {project.owner.fullName}</p>
            <p className="text-gray-600"><strong>Rating:</strong> <Rate allowHalf disabled  defaultValue={project.overallRating} /></p>
           <div>
           <button
                  onClick={() => handleShowReviews(project)}
                  className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  View Reviews
                </button>
           </div>

            {/* Status Messages & Buttons */}
            {project.isAlreadyRejected ? (
              <h2 className="text-red-600 font-bold mt-2">Your request is rejected</h2>
            ) : project.isAlreadyRequested ? (
              <button className='text-blue-600 font-bold'>You Already Requested</button>
            ) : project.isAlreadyContributed ? (
              <>
                <h2 className="text-green-600 font-bold  mt-2">You are already in</h2>
                <button
                  className="mt-4 w-full py-2 bg-slate-700 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
                  onClick={() => handleMessage(project._id)}
                >
                  Message
                </button>
              </>
            ) : (
              <div className=''>  
                <button
                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition  "
                onClick={() => sentReq(project._id)}
              >
                Send Request
              </button>
              </div>
            )}
          </div>
        ))}
       {showReviews && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Reviews for {selectedProject.name}</h2>
              <button
                onClick={() => setShowReviews(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {selectedProject.contributors
                .filter((contributor) => contributor.isRated)
                .map((contributor) => {
                  const user = selectedProject.contributors.find(c => c.userId === contributor.userId);
                  return (
                    <div key={contributor._id} className="border-b pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={user?.userId?.profilePic || 'https://via.placeholder.com/40'} 
                          alt="Reviewer" 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold">{user?.userId.fullName || 'Anonymous'}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  size={16}
                                  className={
                                    index < contributor.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {new Date(contributor.DateTime).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 ml-14 line-clamp-2">{contributor.ratingComment}</p>
                    </div>
                  );
                })}
              {selectedProject.contributors.filter((c) => c.isRated).length === 0 && (
                <p className="text-gray-500 text-center py-4">No reviews yet</p>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProjectDashboard;