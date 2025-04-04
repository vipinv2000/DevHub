import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { ProjectGroupSidebarFunction } from "../store/projectGroupStore.js";
import { useEffect } from "react";
import NoChatSelected from "../components/NoChatSelected.jsx";

const ProjectgroupChatHeader = () => {
const { setSelectedProgectGroup,selectedProjectGroup,getProjectMessages } = ProjectGroupSidebarFunction();

useEffect(() => {
    console.log("selectedProjectGroup",selectedProjectGroup);
    
    getProjectMessages(selectedProjectGroup?._id);

    // subscribeToMessages();

    // return () => unsubscribeFromMessages();
  }, [selectedProjectGroup]);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedProjectGroup?.image || "/avatar.png"} alt={selectedProjectGroup?.name} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedProjectGroup?.name}</h3>
            
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedProgectGroup(null)}>
          <X />
        </button>
      </div>
      
    </div>
  );
};
export default ProjectgroupChatHeader;
