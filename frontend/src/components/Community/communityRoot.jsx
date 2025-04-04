import React from 'react'
import CommunityGroupSidebar from './CommunitySidebar.jsx'
import { CommunityGroupSidebarFunction } from '../../store/communityGroupStore.js';
import ProjectChatContainer from '../../devHub/ProjectGroupChatContainer.jsx';
import NoChatSelected from '../NoChatSelected.jsx';
import CommunityChatContainer from './CommunityChatContainer.jsx';


const CommunityRoot = () => {
    const { slectedCommunityGroup } = CommunityGroupSidebarFunction();
  return (
  <div className='flex h-screen'>
     
      <CommunityGroupSidebar/>
      {slectedCommunityGroup?<CommunityChatContainer/>:<NoChatSelected/>}
  </div>
  )
}

export default CommunityRoot