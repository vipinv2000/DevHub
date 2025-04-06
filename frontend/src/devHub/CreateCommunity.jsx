import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';
import { FaLock, FaGlobe } from 'react-icons/fa';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';

const CreateCommunity = () => {
  const [image, setImage] = useState('');
  const [adding, setAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });
  const navigate = useNavigate();

  // Handle Image Upload
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setImage(base64Image);
    };
  };

  // Handle Form Submission
  const handleSubmit = async e => {
    e.preventDefault();
    setAdding(true);
    try {
      const finalData = {
        name: formData.name,
        description: formData.description,
        image: image,
      };
      console.log('finaldata', finalData);

      await axiosInstance.post('/comunity/createCommunity', finalData);

      toast.success('Post added successfully!');
      setFormData({});
      navigate('/devhub/CommunityList');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center  justify-center p-6">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md -mt-[6%]">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Create Community
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Caption */}
          <textarea
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
            rows="3"
            placeholder="Write a caption..."
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />

          {/* Description */}
          <textarea
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
            rows="2"
            placeholder="Write a description (optional)..."
            value={formData.description}
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white cursor-pointer"
            onChange={handleImageChange}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={adding}
            className={`w-full text-white p-3 rounded-lg transition ${
              adding
                ? 'bg-purple-300 cursor-not-allowed'
                : 'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            {adding ? 'Adding...' : 'Add Community'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunity;
