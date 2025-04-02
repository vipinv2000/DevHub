import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBigRight, Bell, Menu } from 'lucide-react';
import { userSidebar } from '../store/ToggleMenu';

const DevHubNavbar = () => {
  const navigate = useNavigate();
  const { isMenuactive,setIsMenuActive } = userSidebar();
  console.log("isMenuactive isMenuactive",isMenuactive);
  
  return (
    <header className="fixed w-full z-10 bg-white text-black">
      <div className="flex items-center justify-between py-1 px-5 w-full">

        {/* Menu Button & Logo */}
        <div className="flex items-center justify-start gap-3.5">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Menu className="h-auto w-6" onClick={() => { setIsMenuActive()}} />
          </button>
          <div className="h-16 flex flex-col justify-center">
            <h2 className="sm:text-2xl text-sm font-bold cursor-pointer" onClick={() => {}}>
              DeveloperHub
            </h2>
          </div>
        </div>

        {/* Notifications & User Icon */}
        <div className="flex items-center space-x-4">
          <button className="p-2 relative rounded-full hover:bg-gray-100">
            <div onClick={() => {}}>
              <Bell className="h-6 w-6" />
              <div className="bg-red-700 absolute top-1 right-1 rounded-full w-4 h-4 flex items-center justify-center">
                <span className="text-xs font-bold">!</span>
              </div>
            </div>
          </button>
          <button className="p-2 relative rounded-full hover:bg-gray-100"></button>
        </div>

      </div>
    </header>
  );
};

export default DevHubNavbar;
