import { useEffect, useRef } from "react";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import { formatMessageTime } from "../lib/utils";
import ProjectgroupChatHeader from "./ProjectgroupChatHeader.jsx";
import { ProjectGroupSidebarFunction } from "../store/projectGroupStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

const   ProjectChatContainer = () => {

  const messageEndRef = useRef(null);

const { projectMessages } = ProjectGroupSidebarFunction();
 const { authUser } = useAuthStore();

 

  return (
    <div className="flex-1 flex flex-col overflow-auto  h-screen pb-20 ">
      <ProjectgroupChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {projectMessages && projectMessages.messages &&projectMessages.messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message?.senderId?._id === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
               
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ProjectChatContainer;
