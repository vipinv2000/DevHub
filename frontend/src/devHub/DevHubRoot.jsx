import React from "react";
import { Outlet } from "react-router-dom";
import DevHubNavbar from "./DevHubNavbar";
import DevHubSidebar from "./DevHubSidebar";
import { userSidebar } from "../store/ToggleMenu";

const DevHubRoot = () => {
  const { isMenuactive } = userSidebar();

  return (
    <div className="">
      <DevHubNavbar />
      <div className="flex pt-20 h-screen">
        <div className={`${isMenuactive ? "w-[5%]" : "w-[15%]"} transition-all duration-300 -mt-2 `}>
          <DevHubSidebar />
        </div>
        <div className={`${isMenuactive ? "w-[95%] -ml-5" : "w-[100%]"} transition-all duration-300  `}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DevHubRoot;
