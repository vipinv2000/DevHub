import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";

import { formatMessageTime } from "../../lib/utils.js";
import { CommunityGroupSidebarFunction } from "../../store/communityGroupStore.js";
import CommunityChatHeader from "./CommunityChatHeader.jsx";
import CommunityMessageInput from "./CommunityMessageInput.jsx";

const CommunityChatContainer = () => {
  const messageEndRef = useRef(null);

  const { communityGroup, getCommunityGroup, setSelectedCommunityGroup, slectedCommunityGroup, communityMessages, getCommunitytMessages } = CommunityGroupSidebarFunction();

  const { authUser } = useAuthStore();

  // Fetch & subscribe when group is selected
  useEffect(() => {
    if (slectedCommunityGroup?._id) {
      getCommunitytMessages(slectedCommunityGroup._id);
      //   subscribeToProjectMessages();
    }
  }, [slectedCommunityGroup?._id, getCommunitytMessages]);

  useEffect(() => {
    setTimeout(() => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100); // Adding slight delay to ensure it scrolls after re-render
  }, [communityMessages]);


  // Scroll to bottom on new messages
  useEffect(() => {
    if (messageEndRef.current && communityMessages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [communityMessages]);

  return (
    <div className="flex-1 flex flex-col overflow-auto h-screen pb-20 relative">
      {/* Header */}
      <div className="bg-slate-300 pt-2 absolute top-0 w-full z-10">
        <CommunityChatHeader />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 mt-20 space-y-4">
        {communityMessages?.map((message, index) => (
          <div
            key={index}
            className={`chat  ${message?.senderId?._id === authUser._id
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
            {
              message.isPost ? (
                <div className="chat-bubble bg-gradient-to-r from-gray-400 to-gray-700 shadow-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-base-content/70 italic font-extrabold">
                      {message?.senderId?._id === authUser._id
                        ? "You"
                        : message?.senderId?.fullName}
                      {"\u00A0\u00A0"}
                      {message?.isOwner ? "(Admin)" : ""}
                    </p>
                    <p className="text-white text-xs text-base-content/70  font-extrabold bg-green-300 px-2 py-1 rounded-lg">
                      post
                    </p>
                  </div>


                  <p className="text-white text-[18px] font-extrabold text-center line-clamp-2" style={{ letterSpacing: "4px" }}>
                    {message.name}
                  </p>

                  {
                    message.image && (
                      <a href={message.link}>
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="sm:max-w-[200px] rounded-md mb-2"
                        />
                      </a>

                    )
                  }
                  {message.text && <p className="text-center text-white">{message.text}</p>}
                </div>
              ) : (
                <div className="chat-bubble flex flex-col">
                  <p className="text-xs text-base-content/70 italic font-extrabold">
                    {message?.senderId?._id === authUser._id
                      ? "You"
                      : message?.senderId?.fullName}
                    {"\u00A0\u00A0"}
                    {message?.isOwner ? "(Admin)" : ""}
                  </p>

                  {
                    message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2"
                      />
                    )
                  }
                  {message.text && <p>{message.text}</p>}
                </div>
              )
            }
          </div>
        ))
        }

        {/* Scroll Anchor */}
        <div ref={messageEndRef} />
      </div >

      {/* Input Field */}
      < CommunityMessageInput />
    </div >
  );
};

export default CommunityChatContainer;
