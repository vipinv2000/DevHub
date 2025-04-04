import React, { useEffect } from 'react'
import ProjectGroupSidebar from './ProjectGroupSidebar.jsx'
import ProjectChatContainer from './ProjectGroupChatContainer.jsx'
import { ProjectGroupSidebarFunction } from '../store/projectGroupStore.js';
import NoChatSelected from '../components/NoChatSelected.jsx';

const ChatGroupRoot = () => {
    const {
      
      selectedProjectGroup,
      
    } = ProjectGroupSidebarFunction();
   
    
  return <>
  <div className='flex h-screen '>
    <ProjectGroupSidebar/>
    {selectedProjectGroup?<ProjectChatContainer/>:<NoChatSelected/>}
  </div>
  </>
}

export default ChatGroupRoot