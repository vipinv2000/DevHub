import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import UserDashboard from "./pages/UserDash.jsx";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import ChooseDeveloper from "./pages/ChooseDeveloper";
import DevProfile from "./pages/DevProfile";

import AddPost from "./pages/Addpost.jsx";
import AddStory from "./pages/Addstory.jsx";
import InteractedUsersList from "./pages/InteractedUsersList.jsx";
import AddProject from "./pages/AddProject.jsx";
import ProjectDashboard from "./pages/ProjectDashboard.jsx";
import MyProjectDetails from "./pages/MyProjectDetails.jsx";
import DevHubRoot from "./devHub/DevHubRoot.jsx";
import ProjectGroupSidebar from "./devHub/ProjectGroupSidebar.jsx";
import ChatGroupRoot from "./devHub/ChatGroupRoot.jsx";
import CreateCommunity from "./devHub/CreateCommunity.jsx";
import CommunityList from "./devHub/ListCommunity.jsx";
import CommunityRoot from "./components/Community/communityRoot.jsx";
import LandingPage from "./devFollow/LandingPage.jsx";


import Educonnect from'./devFollow/Educonnect/Latest.jsx';
import AboutPage from './devFollow/Educonnect/AboutPage.jsx';
import Colleges from './devFollow/Educonnect/Colleges';
import CoursesPage from'./devFollow/Educonnect/CoursesPage';
import Pathways from './devFollow/Educonnect/Pathways';


const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  const location = useLocation(); // Get current route path

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme} >

{!["/", "/add-story", "/add-post", "/chooseDeveloper", "/InteractedUsersList", "/MyProjectDetails","/devhub"].includes(location.pathname) &&
    !location.pathname.startsWith("/devProfile/") &&
    !location.pathname.startsWith("/devhub") && !location.pathname.startsWith("/devFlow") &&<Navbar />}




      <Routes>
        <Route path="/chat" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/chooseDeveloper" element={authUser ? <ChooseDeveloper /> : <Navigate to="/login" />} />
        <Route path="/devProfile/:devId" element={authUser ? <DevProfile /> : <Navigate to="/login" />} />
        <Route path="/" element={authUser ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/add-story" element={<AddStory />} />
        <Route path="/InteractedUsersList" element={<InteractedUsersList />} />

        {/* <Route path="/devhub" element={<DevHubRoot />}>
          <Route index  element={<ProjectDashboard />} />
          <Route path="AddProject" element={<AddProject />} />
          <Route path="MyProjectDetails" element={<MyProjectDetails />} />
          <Route path="ChatGroupRoot" element={<ChatGroupRoot />} />
          <Route path="CreateCommunity" element={<CreateCommunity />} />
          <Route path="CommunityList" element={<CommunityList />} />

        </Route> */}

<Route
  path="/devhub"
  element={authUser ? <DevHubRoot /> : <Navigate to="/login" />}>
  <Route index element={<ProjectDashboard />} />
  <Route path="AddProject" element={<AddProject />} />
  <Route path="MyProjectDetails" element={<MyProjectDetails />} />
  <Route path="ChatGroupRoot" element={<ChatGroupRoot />} />
  <Route path="CreateCommunity" element={<CreateCommunity />} />
  <Route path="CommunityList" element={<CommunityList />} />
  <Route path="community" element={<CommunityRoot />} />
  

</Route>

<Route
  path="/devFlow"
 >
  <Route index element={<LandingPage />} />
  <Route path="Educonnect" element={<Educonnect/>} />
      <Route path="about" element={<AboutPage/>} />
      <Route path="colleges" element={<Colleges/>} />
      <Route path="coursespage" element={<CoursesPage/>} />
      <Route path="pathways" element={<Pathways/>} />
 

</Route>

      

      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
