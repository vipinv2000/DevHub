import { useEffect, useRef } from "react";
import { ProjectGroupSidebarFunction } from "../store/projectGroupStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import ProjectgroupChatHeader from "./ProjectgroupChatHeader.jsx";
import ProjectMessageInput from "./ProjectMessageInput.jsx";
import { formatMessageTime } from "../lib/utils";

const ProjectChatContainer = () => {
  const messageEndRef = useRef(null);

  const {
    projectMessages,
    selectedProjectGroup,
    getProjectMessages,
    subscribeToProjectMessages,
  } = ProjectGroupSidebarFunction();

  const { authUser } = useAuthStore();

  // Fetch & subscribe when group is selected
  useEffect(() => {
    if (selectedProjectGroup?._id) {
      getProjectMessages(selectedProjectGroup._id);
      subscribeToProjectMessages();
    }
  }, [selectedProjectGroup?._id, getProjectMessages]);

  useEffect(() => {
    setTimeout(() => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100); // Adding slight delay to ensure it scrolls after re-render
  }, [projectMessages]);
  

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messageEndRef.current && projectMessages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [projectMessages]);

  return (
    <div className="flex-1 flex flex-col overflow-auto h-screen pb-20 relative">
      {/* Header */}
      <div className="bg-slate-300 pt-2 absolute top-0 w-full z-10">
        <ProjectgroupChatHeader />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 mt-20 space-y-4">
        {projectMessages?.map((message, index) => (
          <div
            key={index}
            className={`chat ${
              message?.senderId?._id === authUser._id
                ? "chat-end"
                : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId?._id === authUser._id
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
              <p className="text-xs text-base-content/70 italic font-extrabold">
                {message?.senderId?._id === authUser._id
                  ? "You"
                  : message?.senderId?.fullName}
                {"\u00A0\u00A0"}
                {message?.isOwner ? "(Admin)" : ""}
              </p>

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

        {/* Scroll Anchor */}
        <div ref={messageEndRef} />
      </div>

      {/* Input Field */}
      <ProjectMessageInput />
    </div>
  );
};

export default ProjectChatContainer;
