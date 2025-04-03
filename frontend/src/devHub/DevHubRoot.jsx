import React from "react";
import { Outlet } from "react-router-dom";
import DevHubNavbar from "./DevHubNavbar";
import DevHubSidebar from "./DevHubSidebar";
import { userSidebar } from "../store/ToggleMenu";

const DevHubRoot = () => {
  const { isMenuactive } = userSidebar();

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar - Fixed at the top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <DevHubNavbar />
      </div>

      {/* Sidebar & Outlet Container */}
      <div className="flex flex-grow pt-16">
        {/* Sidebar - Fixed on the left */}
        <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-800 text-white transition-all duration-300 ${isMenuactive ? "w-[5%]" : "w-[15%]"}`}>
          <DevHubSidebar />
        </div>

        {/* Outlet - Scrollable Content */}
        <div className={`ml-auto ${isMenuactive ? "w-[95%]" : "w-[85%]"} h-[calc(100vh-4rem)] overflow-hidden`}>
  <Outlet />
</div>

      </div>
    </div>
  );
};

export default DevHubRoot;
