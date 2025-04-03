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
    image:'',
    deadline: '',
    techStack: [],
  });

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [image, setImage] = useState(null);
  const [previmage, setPrevImage] = useState(null);


  const handleSearch = (input) => {
    setSearchText(input);

    if (input) {
      const matches = techStack.filter((tech) => tech.toLowerCase().includes(input.toLowerCase()));
      setFilteredOptions(matches);
    } else {
      setFilteredOptions([]);
    }
  };
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setImage(base64Image);
      setPrevImage(base64Image)
    };
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
      const finalData ={...formData,image:image}
      console.log("Final",finalData);
      
      await axiosInstance.post('/userdash/addProject', finalData);
      toast.success('Project Added Successfully!');
    
       
  
      setFormData({
        name: '',
        description: '',
        image:"",
        deadline: '',
        techStack: [],
      });
      navigate('/devhub/MyProjectDetails')
    } catch (error) {
      toast.error('Error adding project!');
      console.error('Error:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
  <div className="max-w-2xl w-full bg-gray-100 p-8 rounded-lg shadow-lg">
    <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">Add Project</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Project Name */}
      <div className="form-control">
        <label className="label text-gray-700">Project Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type="text"
            className="input input-bordered w-full pl-10 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
      </div>

      {/* Description */}
      <div className="form-control">
        <label className="label text-gray-700">Description</label>
        <textarea
          className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Write a description..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-4">
        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          className="p-2 border border-gray-300 rounded-lg bg-white text-gray-800 cursor-pointer"
          onChange={handleImageChange}
        />

        {/* Image Preview */}
        {previmage && (
          <div className="w-32 h-20 rounded overflow-hidden border border-gray-400 shadow-lg">
            <img src={previmage} className="w-full h-full object-cover" alt="Preview" />
          </div>
        )}
      </div>

      {/* Deadline */}
      <div className="form-control">
        <label className="label text-gray-700">Deadline</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type="date"
            className="input input-bordered w-full pl-10 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          />
        </div>
      </div>

      {/* Tech Stack Selection */}
      <div className="form-control">
        <label className="label text-gray-700">Tech Stack</label>
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
            <span key={index} className="bg-indigo-600 text-white px-3 py-1 rounded-full flex items-center">
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
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center font-semibold">
        <Plus size={18} className="mr-2" /> Add Project
      </button>
    </form>
  </div>
</div>

  );
};

export default AddProject;
