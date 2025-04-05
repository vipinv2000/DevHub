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
 <div className="flex h-[100%] overflow-hidden">
  <ProjectGroupSidebar />
  <div className="flex-1 overflow-hidden">
    {selectedProjectGroup ? <ProjectChatContainer /> : <NoChatSelected />}
  </div>
</div>

  </>
}

export default ChatGroupRoot