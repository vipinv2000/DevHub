import React, { useState } from 'react';
import { User, Calendar, Plus, X } from 'lucide-react';
import { Select } from 'antd';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { techStack } from '../../../backend/utils/tecStacks';
import { useNavigate } from 'react-router-dom';



const AddProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: '',
    techStack: [],
  });

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (input) => {
    setSearchText(input);

    if (input) {
      const matches = techStack.filter((tech) => tech.toLowerCase().includes(input.toLowerCase()));
      setFilteredOptions(matches);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleSelect = (value) => {
    if (!formData.techStack.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, value],
      }));
    }
    setSearchText('');
    setFilteredOptions([]); // Close dropdown
  };

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error('Project name is required!');
    if (!formData.description.trim()) return toast.error('Description is required!');
    if (!formData.deadline) return toast.error('Deadline is required!');

    try {
      const response = await axiosInstance.post('/userdash/addProject', formData);
      toast.success('Project Added Successfully!');
    
       
  
      setFormData({
        name: '',
        description: '',
        deadline: '',
        techStack: [],
      });
      navigate('/ProjectDashboard')
    } catch (error) {
      toast.error('Error adding project!');
      console.error('Error:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full bg-gray-900 p-8 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-white mb-6 text-center">Add Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Project Name */}
          <div className="form-control">
            <label className="label text-white">Project Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="Enter project name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label text-white">Description</label>
            <textarea
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              rows="3"
              placeholder="Write a description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Deadline */}
          <div className="form-control">
            <label className="label text-white">Deadline</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="date"
                className="input input-bordered w-full pl-10"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>

          {/* Tech Stack Selection */}
          <div className="form-control">
            <label className="label text-white">Tech Stack</label>
            <Select
              showSearch
              placeholder="Type to search..."
              style={{ width: '100%' }}
              value={searchText || undefined}
              onSearch={handleSearch}
              onChange={handleSelect}
              options={filteredOptions.map((tech) => ({ value: tech, label: tech }))}
              open={filteredOptions.length > 0}
              notFoundContent={null}
            />
          </div>

          {/* Selected Tech Stack Display */}
          {formData.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.techStack.map((tech, index) => (
                <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center">
                  {tech}
                  <X
                    size={16}
                    className="ml-2 cursor-pointer"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        techStack: prev.techStack.filter((t) => t !== tech),
                      }))
                    }
                  />
                </span>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            <Plus size={18} className="mr-2" /> Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
