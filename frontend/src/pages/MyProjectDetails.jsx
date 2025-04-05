import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import {
  ArrowDown,
  Check,
  Circle,
  MessageCircleCodeIcon,
  MessageSquare,
  MessageSquareText,
  MessagesSquare,
  Star,
  Users,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button, Modal, Rate, Select } from 'antd';
import { ProjectGroupSidebarFunction } from '../store/projectGroupStore';
import ProjectGroupSidebar from '../devHub/ProjectGroupSidebar';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const PROJECT_STATUSES = ['Planning', 'In Progress', 'Completed', 'On Hold'];

const MyProjectDetails = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [projects, setprojects] = useState([]);
  const [selectedTab, setSelectedTab] = useState('one');
  const {
    getProjectGroup,
    projectGroup,
    setSelectedProjectGroup,
    selectedProjectGroup,
  } = ProjectGroupSidebarFunction();
  const [expanded, setExpanded] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubLink: '',
    zipFile: null,
  });
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [projectToRate, setProjectToRate] = useState(null);

  const { authUser } = useAuthStore();
  const Navigate = useNavigate();

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
    console.log('cheking Rating', projects);
  }, [selectedTab]);

  const handleAccept = async (developerId, projectId) => {
    try {
      await axiosInstance.get(
        `/userdash/InterestRequestAccept/${developerId}/${projectId}`
      );
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
      await axiosInstance.get(
        `/userdash/InterestRequestReject/${developerId}/${projectId}`
      );
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

  const handleChange = e => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const SendCodeFile = e => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  const handleRatingSubmit = async projectId => {
    try {
      console.log('proidddddddddd', projectId, ratingComment);

      await axiosInstance.post(`/projectMessage/addRating/${projectId}`, {
        rating: rating,
        comment: ratingComment,
      });
      toast.success('Rating submitted successfully');
      setIsRatingModalOpen(false);
      setRating(0);
      setRatingComment('');
      getProjectGroup();
      fetchMyProjectsUpdates();
    } catch (error) {
      toast.error('Failed to submit rating');
    }
  };

  const openRatingModal = project => {
    setProjectToRate(project);
    setIsRatingModalOpen(true);
  };

  const canShowRating = project => {
    const currentUserContributor = project.contributors.find(
      contributor => contributor.userId._id === authUser?._id
    );

    return currentUserContributor && !currentUserContributor.isRated;
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await axiosInstance.patch(
        `/projectMessage//updateStatus/${projectId}/${newStatus}`
      );

      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div
      className={`${
        isRatingModalOpen ? 'bg-black' : 'bg-gray-100'
      } min-h-screen`}
    >
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            <button
              onClick={() => setSelectedTab('one')}
              className={`relative px-6 py-2 text-lg font-medium transition-all duration-200 ${
                selectedTab === 'one'
                  ? 'text-blue-600 transform scale-110'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              My Projects
              {selectedTab === 'one' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-lg transform scale-x-100 transition-transform duration-200"></span>
              )}
            </button>

            <button
              onClick={() => setSelectedTab('two')}
              className={`relative px-6 py-2 text-lg font-medium transition-all duration-200 ${
                selectedTab === 'two'
                  ? 'text-blue-600 transform scale-110'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Committed Projects
              {selectedTab === 'two' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-lg transform scale-x-100 transition-transform duration-200"></span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        {selectedTab === 'one' ? (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              My Projects
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Rest of the My Projects content remains the same */}
              {projects.map(project => (
                <div
                  key={project._id}
                  onClick={() => handleProjectClick(project)}
                  className="bg-slate-300 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow flex flex-col h-full"
                >
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {project.name}
                      </h2>
                      <Select
                        value={project.status}
                        onChange={value =>
                          handleStatusChange(project._id, value)
                        }
                        onClick={e => e.stopPropagation()}
                        className="w-32"
                      >
                        {PROJECT_STATUSES.map(status => (
                          <Option key={status} value={status}>
                            {status}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <p className="text-gray-600 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="flex items-center text-gray-500 hover:text-blue-600 cursor-pointer"
                          onClick={e => handleInterestClick(e, project)}
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
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Contributed Projects
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Rest of the Committed Projects content remains the same */}
              {projectGroup.map((project, index) => (
                <div
                  key={project._id}
                  className={`bg-slate-300 rounded-lg shadow-2xl p-6 cursor-pointer hover:shadow-xl transition-shadow flex flex-col 
                    ${expanded === index ? 'h-full' : 'h-[230px]'} `}
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
                    <p className="text-gray-600 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {authUser?._id === project?.owner?._id ? (
                          <div className="flex items-center text-gray-500 bg-blue-300 px-2 py-1 rounded-xl">
                            owned
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center text-gray-500 bg-green-300 px-2 py-1 rounded-xl">
                              contributor
                            </div>

                            <Star
                              size={20}
                              className="text-yellow-500 cursor-pointer hover:text-yellow-600"
                              onClick={e => {
                                openRatingModal(project);
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-5">
                        <div
                          onClick={() => {
                            setSelectedProjectGroup(project);
                            Navigate('/devhub/ChatGroupRoot');
                          }}
                          className="text-sm text-black bg-white p-2 rounded-full hover:bg-gray-300 transition-colors "
                        >
                          <MessageSquareText size={20} />
                        </div>
                        <div
                          onClick={() =>
                            setExpanded(index === expanded ? null : index)
                          }
                          className="text-sm text-black bg-white  p-1 rounded-full hover:bg-gray-300 transition-colors"
                        >
                          <ArrowDown
                            className={`transform transition-transform duration-200 ${
                              expanded === index ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {expanded === index && (
                    <div className="w-full h-auto bg-gray-100 mt-3 rounded-lg transition transform duration-300 ease-in-out ">
                      <form
                        action=""
                        className="p-2 flex flex-col gap-3 text-gray-600"
                        onSubmit={SendCodeFile}
                      >
                        <div className="flex flex-col gap-1 w-full justify-center items-center">
                          <h1 className="font-extrabold">Submit Your Work</h1>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label>Title :</label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="px-2 py-1 border rounded-md"
                            placeholder="Title"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label>Description :</label>
                          <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="px-2 py-1 border rounded-md"
                            placeholder="Descri..."
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label>Github Link :</label>
                          <input
                            type="text"
                            name="githubLink"
                            value={formData.githubLink}
                            onChange={handleChange}
                            className="px-2 py-1 border rounded-md"
                            placeholder="Repo Link"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label>Zip File :</label>
                          <input
                            type="file"
                            name="zipFile"
                            onChange={handleChange}
                            className="px-2 py-1 border rounded-md"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <input
                            type="submit"
                            value="Submit"
                            className="px-2 py-1 bg-blue-300 hover:bg-blue-400 rounded-xl cursor-pointer"
                          />
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
                  <h3 className="text-lg font-semibold mb-2">
                    Project Details
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedProject.description}
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-600">
                        <span className="font-medium">Status:</span>{' '}
                        {selectedProject.status}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Deadline:</span>{' '}
                        {new Date(
                          selectedProject.deadline
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-16">
                      <MessageSquareText
                        size={20}
                        onClick={() => {
                          setSelectedProjectGroup(selectedProject);
                          Navigate('/devhub/ChatGroupRoot');
                        }}
                        className="w-9 h-9 text-primary cursor-pointer rounded-full border border-green-400 p-1  "
                      />
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Tech Stack:
                      </span>
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
                    {selectedProject.contributors &&
                    selectedProject.contributors.length > 0 ? (
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
                              Joined:{' '}
                              {new Date(
                                contributor.DateTime
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center">
                        No contributors yet
                      </p>
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
                    <p className="text-gray-500">
                      No interested developers yet.
                    </p>
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
                                onClick={() =>
                                  handleAccept(
                                    dev.userId._id,
                                    selectedProject._id
                                  )
                                }
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
                              >
                                <Check size={16} className="mr-2" />
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleReject(
                                    dev.userId._id,
                                    selectedProject._id
                                  )
                                }
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

        <Modal
          title="Rate Project"
          open={isRatingModalOpen}
          onOk={() => handleRatingSubmit(projectToRate._id)}
          onCancel={() => {
            setIsRatingModalOpen(false);
            setRating(0);
            setRatingComment('');
          }}
          okText="Submit Rating"
          className="mt-[10%]"
        >
          <div className="space-y-4">
            <div>
              <p className="mb-2">Your Rating:</p>
              <Rate value={rating} onChange={setRating} />
            </div>
            <div>
              <p className="mb-2">Comment:</p>
              <textarea
                value={ratingComment}
                onChange={e => setRatingComment(e.target.value)}
                className="w-full bg-white  p-2 border rounded-md"
                rows={4}
                placeholder="Share your experience working on this project..."
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MyProjectDetails;
