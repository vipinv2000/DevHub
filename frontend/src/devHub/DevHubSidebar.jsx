import { useState } from "react";
import { FolderKanban, Heart, Home, LayoutDashboard, LogOut, Package, PlusSquare, Rss, Settings, ShoppingCart, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userSidebar } from "../store/ToggleMenu";
import { useAuthStore } from "../store/useAuthStore";

const DevHubSidebar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Project Feed");
  const { isMenuactive } = userSidebar();
   const { logout} = useAuthStore();

  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 ${
        isMenuactive ? "w-16" : "w-58"
      } h-full  flex-col py-4 flex flex-grow `}
    >
      <nav className="w-full">
        {[
  { name: "Home", icon: LayoutDashboard, id: "home", path: "/" }, 
  { name: "Add Projects", icon: PlusSquare, id: "Add Projects", path: "/devhub/AddProject" }, 
  { name: "My Projects", icon: FolderKanban, id: "My Projects", path: "/devhub/MyProjectDetails" }, 
  { name: "Project Feed", icon: Rss, id: "Project Feed", path: "/devhub" }, 
  { name: "Community", icon: Users, id: "Community", path: "devhub/AddProject" }, 
  { name: "Settings", icon: Settings, id: "settings", path: "/devhub/ChatGroupRoot" } 
]
.map((item) => (
  <button
  key={item.id}
  onClick={() => {
    setActiveTab(item.id);
    navigate(item.path);
  }}
  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all 
    ${activeTab === item.id ? "bg-gray-700 text-white font-medium" : "hover:bg-gray-700 text-gray-200"}
    ${isMenuactive ? "justify-center" : "justify-start"}`}
  style={{ width: "100%" }} // Ensures full width
>
  <item.icon className="h-6 w-6" />
  <span className={`ml-3 transition-all ${isMenuactive ? "hidden" : "block"}`}>
    {item.name}
  </span>
</button>

        ))}
      </nav>

      {/* Logout Button - Fixed Positioning Issue */}
      <div className="mt-auto w-full">
        <button  onClick={logout}
          className={`cursor-pointer text-white w-full flex items-center px-4 py-3 hover:bg-red-600 ${
            isMenuactive ? "justify-center" : "justify-start"
          }`}
        >
          <LogOut className="h-6 w-6" />
          <span className={`ml-3 transition-all ${isMenuactive ? "hidden" : "block"}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DevHubSidebar;
