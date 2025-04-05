import React from 'react';
import CommunityGroupSidebar from './CommunitySidebar.jsx';
import { CommunityGroupSidebarFunction } from '../../store/communityGroupStore.js';
import ProjectChatContainer from '../../devHub/ProjectGroupChatContainer.jsx';
import NoChatSelected from '../NoChatSelected.jsx';
import CommunityChatContainer from './CommunityChatContainer.jsx';

const CommunityRoot = () => {
  const { slectedCommunityGroup } = CommunityGroupSidebarFunction();
  return (
    <div className="flex h-[100%] overflow-hidden">
      <CommunityGroupSidebar />
      <div className="flex-1 overflow-hidden">
        {slectedCommunityGroup ? (
          <CommunityChatContainer />
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  );
};

export default CommunityRoot;
