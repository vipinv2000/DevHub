import { Phone, X } from "lucide-react";

import { useEffect } from "react";

import { CommunityGroupSidebarFunction } from "../../store/communityGroupStore.js";

const CommunityChatHeader = () => {
  const { communityGroup,getCommunityGroup,setSelectedCommunityGroup,slectedCommunityGroup,communityMessages,getCommunitytMessages } = CommunityGroupSidebarFunction();

useEffect(() => {
   
    
    getCommunitytMessages(slectedCommunityGroup?._id);

    // subscribeToMessages();

    // return () => unsubscribeFromMessages();
  }, [slectedCommunityGroup]);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={slectedCommunityGroup?.image || "/avatar.png"} alt={slectedCommunityGroup?.name} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{slectedCommunityGroup?.name}</h3>
            
          </div>
        </div>

        {/* Close button */}
        <button >
          <Phone/>
        </button>
      </div>
      
    </div>
  );
};
export default CommunityChatHeader;
