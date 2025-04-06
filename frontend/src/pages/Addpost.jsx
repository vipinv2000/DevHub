import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';
import { FaLock, FaGlobe } from 'react-icons/fa';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import Switch from '../components/togle';
import { SwitchCameraIcon } from 'lucide-react';

const AddPost = () => {
  const { authUser } = useAuthStore();
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState(false); 
  const [isJob, setIsJob] = useState(false);

  const [formData, setFormData] = useState({
    caption: '',
    description: '',
    image: '',
    visibility: '',
    isJob: '',
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
      console.log(base64Image);

      setImage(base64Image);
    };
  };
  console.log('vis', visibility);
  
  useEffect(() => {
      
  }, [isJob]);

  // Handle Form Submission
  const handleSubmit = async e => {
    e.preventDefault();


    try {
      const finalData = {
        caption: formData.caption,
        description: formData.description,
        image: image,
        visibility: visibility,
        isJob: isJob,
      };
      console.log('finaldata', finalData);

      await axiosInstance.post('/userdash/addpost', finalData);

      toast.success('Post added successfully!');
      setCaption('');
      setImage('');
      setDescription('');
      setVisibility('public');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Add New Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Caption */}
          <textarea
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
            rows="3"
            placeholder="Write a caption..."
            value={formData.caption}
            onChange={e =>
              setFormData({ ...formData, caption: e.target.value })
            }
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

          <div className="flex items-center gap-4">
            <span className="font-extrabold font-serif">Job</span>
            <Switch checked={isJob} onChange={() => setIsJob(prev => !prev)} />
          </div>

          {/* Visibility Toggle */}
          {!isJob && (
            <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600">
              <span className="text-white">Visibility:</span>
              <button
                type="button"
                className="flex items-center gap-2 text-white p-2 rounded-lg transition bg-blue-600 hover:bg-blue-700"
                onClick={() =>
                  setVisibility(visibility === true ? false : true)
                }
              >
                {visibility === true ? <FaLock /> :<FaGlobe /> }
                {visibility === true ? 'Private' : 'Public'}
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
