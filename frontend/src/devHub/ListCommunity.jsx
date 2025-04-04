import { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../lib/axios';
import { MessageSquare, MessageSquareText, Plus } from 'lucide-react';
import { MdAddBox } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axiosInstance.get('/comunity/listComunity');
        setCommunities(response.data.UpdatedCommunity);
        console.log('communities', response);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching communities:', error);
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const handleJoinCommunity = async communityId => {
    try {
      const response = await axiosInstance.get(
        `/comunity/joinCommunity/${communityId}`
      );

      if (response.data.success) {
        setCommunities(prevCommunities =>
          prevCommunities.map(c =>
            c._id === communityId ? { ...c, alreadyIn: true } : c
          )
        );
      }
    } catch (error) {
      console.error('Error joining community:', error);
    }
  };

  if (loading) return <p className="text-center">Loading communities...</p>;

if (communities.length === 0) {
  return <>
  <h2 className="text-center text-gray-500 pt-10">No communities available.</h2>;
  <div className='fixed bottom-10 right-10 bg-gray-800 rounded-full p-3 shadow-lg hover:scale-105'>
        <Link
          to="/devhub/CreateCommunity"
          className=" h-fit text-white bg-black rounded-full  shadow-lg text-[20px] "
        >
          <Plus size={40}/>
        </Link>
      </div>
  </>
}


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Communities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
        {communities.map(community => (
          <div key={community._id} className="bg-white p-4 shadow rounded-lg hover:shadow-xl">
            <img
              src={community.image}
              alt={community.name}
              className="w-full h-40 object-cover rounded-md "
            />
            <h2 className="text-xl font-semibold mt-2">{community.name}</h2>
            <p className="text-gray-600">{community.description}</p>
            <div className="mt-4">
              {community.alreadyIn ? (
                <div className="flex justify-between">
                  <div>
                    {' '}
                    <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full">
                      Member
                    </span>
                  </div>
                  <div className='cursor-pointer hover:scale-x-110'>
                  <MessageSquareText color='gray' />
                  </div>
                </div>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => handleJoinCommunity(community._id)}
                >
                  Join
                </button>
              )}
            </div>
          </div>
        ))}
        
      </div>
      <div className='fixed bottom-10 right-10 bg-gray-800 rounded-full p-3 shadow-lg hover:scale-105'>
        <Link
          to="/devhub/CreateCommunity"
          className=" h-fit text-white bg-black rounded-full  shadow-lg text-[20px] "
        >
          <Plus size={40}/>
        </Link>
      </div>
    </div>
  );
};

export default CommunityList;
