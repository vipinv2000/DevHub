import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { Button } from 'antd';

const ProjectDashboard = () => {
  const [listOpenings, setListOpenings] = useState([]);

  const fetchlist = async () => {
    try {
      const { data } = await axiosInstance.get('/userdash/getProjectList');
      setListOpenings(data.projects);
      console.log("data.projects", data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchlist();
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
    // Functionality to open messaging for the project
    console.log("Opening messages for project:", projectId);
    toast.success("Opening chat...");
  };

  return (
    <div className='pt-5 max-h-screen bg-white p-6 overflow-auto'>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {listOpenings.map((project) => (
          <div
            key={project._id}
            className={`relative p-5 rounded-xl shadow-lg hover:shadow-xl transition-transform transform  flex flex-col justify-between hover:scale-[1.02] ${project.isAlreadyRejected ? 'opacity-50' : 'bg-white bg-opacity-40 backdrop-blur-lg border border-white'}`}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h2>
            <p className="text-gray-600 line-clamp-3 mb-2">{project.description}</p>
            <p className="text-gray-600"><strong>Status:</strong> {project.status}</p>
            <p className="text-gray-600"><strong>Deadline:</strong> {new Date(project.deadline).toDateString()}</p>
            <p className="text-gray-600"><strong>Tech Stack:</strong> {project.techStack.join(', ')}</p>
            <p className="text-gray-600"><strong>Owner:</strong> {project.owner.fullName}</p>

            {/* Status Messages & Buttons */}
            {project.isAlreadyRejected ? (
              <h2 className="text-red-600 font-bold mt-2">Your request is rejected</h2>
            ) : project.isAlreadyRequested ? (
              <button className='text-blue-600 font-bold'>You Already Requested</button>
            ) : project.isAlreadyContributed ? (
              <>
                <h2 className="text-green-600 font-bold mt-2">You are already in</h2>
                <button
                  className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
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
      </div>
    </div>
  );
};

export default ProjectDashboard;