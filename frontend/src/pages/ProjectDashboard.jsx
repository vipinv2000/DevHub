import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios.js';

const ProjectDashboard = () => {
  const [listOpenings, setListOpenings] = useState([]);

  const fetchlist = async () => {
    try {
      const { data } = await axiosInstance.get('/userdash/getProjectList');
      setListOpenings(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);

  return (
    <div className='pt-20 h-screen bg-gray-100'>
      <h1 className="text-2xl font-bold mb-4">Openings</h1>
      <div  
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}
      >
        {listOpenings.map((project) => (
          <div  
            key={project._id} 
            className="border p-1 rounded-lg shadow-lg"
            style={{ borderColor: '#ddd' }}
          >
            <div 
              className={`${project.isAlreadyRejected ? 'opacity-30' : ''}`} // Fades rejected projects
              style={{ 
                border: '1px solid rgba(255, 255, 255, 0.2)', 
                borderRadius: '10px', 
                padding: '20px', 
                boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)', // Blurred effect inside card
                background: 'rgba(255, 255, 255, 0.2)', // Light translucent background
              }}
            >
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p>{project.description}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <p><strong>Deadline:</strong> {new Date(project.deadline).toDateString()}</p>
              <p><strong>Tech Stack:</strong> {project.techStack.join(', ')}</p>
              <p><strong>Owner:</strong> {project.owner.fullName}</p>

              {/* ✅ Fixed Conditional Rendering */}
              {project.isAlreadyRejected ? (
                <h2 className="text-red-500">Your request is rejected</h2>
              ) : project.isAlreadyRequested ? (
                <h2 className="text-blue-500">You already requested</h2>
              ) : project.isAlreadyContributed ? (
                <h2 className="text-green-500">You are already in</h2>
              ) : (
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
                  Send Request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDashboard;
