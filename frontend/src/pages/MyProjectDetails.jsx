import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { ArrowDown, Check, Circle, MessageCircleCodeIcon, MessageSquare, MessagesSquare, Users, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from 'antd';
import { ProjectGroupSidebarFunction } from '../store/projectGroupStore';
import ProjectGroupSidebar from '../devHub/ProjectGroupSidebar';
import { useAuthStore } from '../store/useAuthStore';

const MyProjectDetails = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [projects, setprojects] = useState([]);
  const [selectedTab, setSelectedTab] = useState("one")
  const { getProjectGroup, projectGroup } = ProjectGroupSidebarFunction();
  const [expanded, setExpanded] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
    zipFile: null,
  });

  const { authUser } = useAuthStore();

  const handleProjectClick = project => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const handleInterestClick = (e, project) => {
    e.stopPropagation();
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const fetchMyProjectsUpdates = async () => {
    const { data } = await axiosInstance.get('/userdash/ownerMyProjects');
    setprojects(data.Updated_List);
  };

  useEffect(() => {
    fetchMyProjectsUpdates();
    getProjectGroup();

  }, []);

  const handleAccept = async (developerId, projectId) => {
    try {
      console.log("prrrrrrsss", projectId);

      await axiosInstance.get(`/userdash/InterestRequestAccept/${developerId}/${projectId}`);
      toast.success('Accepted');
      setprojects(prevProjects =>
        prevProjects.map(project =>
          project._id === selectedProject._id
            ? {
              ...project,
              interestedDev: project.interestedDev.filter(
                dev => dev.userId._id !== developerId
              ),
            }
            : project
        )
      );

      setSelectedProject(prev => ({
        ...prev,
        interestedDev: prev.interestedDev.filter(
          dev => dev.userId._id !== developerId
        ),
      }));
    } catch (error) {
      toast.error('Failed to accept');
    }
  };

  const handleReject = async (developerId, projectId) => {
    try {
      await axiosInstance.get(`/userdash/InterestRequestReject/${developerId}/${projectId}`);
      toast.success('Rejected');
      setprojects(prevProjects =>
        prevProjects.map(project =>
          project._id === selectedProject._id
            ? {
              ...project,
              interestedDev: project.interestedDev.map(dev =>
                dev.userId._id === developerId
                  ? { ...dev, isRejected: true }
                  : dev
              ),
            }
            : project
        )
      );

      setSelectedProject(prev => ({
        ...prev,
        interestedDev: prev.interestedDev.map(dev =>
          dev.userId._id === developerId ? { ...dev, isRejected: true } : dev
        ),
      }));
    } catch (error) {
      toast.error('Failed to reject');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const SendCodeFile = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className=' w-full flex justify-between'>
          <button
            onClick={() => setSelectedTab("one")}
            className={`p-2 bg-gray-400 ${selectedTab === "one" ? "hover:bg-green-500" : ""}`}>
            My Project
          </button>

          <button
            onClick={() => setSelectedTab("two")}
            className={`p-2 bg-gray-400 ${selectedTab === "two" ? "hover:bg-green-500" : ""}`}>
            Commited Project
          </button>
        </div>

        {/* My Projects */}

        {
          selectedTab === "one" ? (<div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Projects</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div
                  key={project._id}
                  onClick={() => handleProjectClick(project)}
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow flex flex-col h-full"
                >
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {project.name}
                      </h2>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-3">{project.description}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="flex items-center text-gray-500 hover:text-blue-600 cursor-pointer"
                          onClick={(e) => handleInterestClick(e, project)}
                        >
                          <Users size={20} className="mr-2" />
                          <span>{project.interestedDev.length} interested</span>
                        </div>

                      </div>
                      <div className="text-sm text-gray-500">
                        Due: {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>) : (<div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Contributed Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectGroup.map((project, index) => (
                <div
                  key={project._id}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow flex flex-col
                    ${expanded === index ? "h-full" : "h-[200px]"} `}
                >
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {project.name}
                      </h2>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-3">{project.description}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {
                          authUser?._id === project?.owner?._id ? (
                            <div
                              className="flex items-center text-gray-500 bg-blue-300 px-2 py-1 rounded-xl"
                            >
                              owned
                            </div>
                          ) : (
                            <div
                              className="flex items-center text-gray-500 bg-green-300 px-2 py-1 rounded-xl"
                            >
                              contributor
                            </div>
                          )
                        }

                      </div>
                      <div
                        onClick={() => setExpanded(index === expanded ? null : index)}
                        className="text-sm text-gray-400 bg-gray-200 p-1 rounded-full">
                        <ArrowDown />
                      </div>
                    </div>
                  </div>
                  {
                    expanded === index && (
                      <div className='w-full h-auto bg-gray-100 mt-3 rounded-lg transition transform duration-300  ease-in-out'>
                        <form action="" className="p-2 flex flex-col gap-3 text-gray-600" onSubmit={SendCodeFile}>
                          <div className="flex flex-col gap-1 w-full justify-center items-center">
                            <h1 className="font-extrabold">Submit Your Work</h1>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label>Title :</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="px-2 py-1 border rounded-md" placeholder="Title" />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label>Description :</label>
                            <input type="text" name="description" value={formData.description} onChange={handleChange} className="px-2 py-1 border rounded-md" placeholder="Descri..." />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label>Github Link :</label>
                            <input type="text" name="githubLink" value={formData.githubLink} onChange={handleChange} className="px-2 py-1 border rounded-md" placeholder="Repo Link" />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label>Zip File :</label>
                            <input type="file" name="zipFile" onChange={handleChange} className="px-2 py-1 border rounded-md" />
                          </div>

                          <div className="flex flex-col gap-1">
                            <input type="submit" value="Submit" className="px-2 py-1 bg-blue-300 hover:bg-blue-400 rounded-xl cursor-pointer" />
                          </div>
                        </form>
                      </div>
                    )
                  }


                </div>
              ))}
            </div>
          </div>)
        }



        {/* Project Details Modal */}
        {showProjectDetails && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedProject.name}
                  </h2>
                  <button
                    onClick={() => setShowProjectDetails(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={24} />
                  </button>
                </div>

                {selectedProject.image && (
                  <div className="mb-6">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Project Details</h3>
                  <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-600">
                        <span className="font-medium">Status:</span> {selectedProject.status}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Deadline:</span>{' '}
                        {new Date(selectedProject.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <div className='ml-16 '> <MessageSquare className="w-5 h-5 text-primary cursor-pointer" /></div>
                    <div>
                      <span className="font-medium text-gray-600">Tech Stack:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProject.techStack.map(tech => (
                          <span
                            key={tech}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Contributors</h3>
                  <div className="space-y-4">
                    {selectedProject.contributors && selectedProject.contributors.length > 0 ? (
                      selectedProject.contributors.map(contributor => (
                        <div
                          key={contributor._id}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <img
                            src={contributor.userId.profilePic}
                            alt={contributor.userId.fullName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {contributor.userId.fullName}
                            </h4>
                            <p className="text-gray-500 text-sm">
                              {contributor.userId.email}
                            </p>
                            <p className="text-gray-500 text-sm">
                              Joined: {new Date(contributor.DateTime).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center">No contributors yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interested Developers Modal */}
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedProject.name}
                  </h2>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      fetchMyProjectsUpdates();
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Interested Developers
                  </h3>
                  {selectedProject.interestedDev.length === 0 ? (
                    <p className="text-gray-500">No interested developers yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {selectedProject.interestedDev.map(dev => (
                        <div
                          key={dev._id}
                          className="border rounded-lg p-4 flex items-center justify-between"
                        >
                          <div className="flex gap-6 items-center">
                            <div>
                              <img
                                src={dev.userId.profilePic}
                                className="w-12 h-12 rounded-full object-cover"
                                alt={dev.userId.fullName}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {dev.userId.fullName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {dev.userId.email}
                              </p>
                              <p className="text-sm text-gray-500">
                                Interested since:{' '}
                                {new Date(dev.DateTime).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {!dev.isRejected && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleAccept(dev.userId._id, selectedProject._id)}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
                              >
                                <Check size={16} className="mr-2" />
                                Accept
                              </button>
                              <button
                                onClick={() => handleReject(dev.userId._id, selectedProject._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
                              >
                                <X size={16} className="mr-2" />
                                Reject
                              </button>
                            </div>
                          )}
                          {dev.isRejected && (
                            <span className="text-red-500 font-medium">
                              Rejected
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjectDetails;

