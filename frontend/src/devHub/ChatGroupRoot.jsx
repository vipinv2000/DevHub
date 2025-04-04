import React from 'react'
import ProjectGroupSidebar from './ProjectGroupSidebar.jsx'
import ProjectChatContainer from './ProjectGroupChatContainer.jsx'

const ChatGroupRoot = () => {
  return <>
  <div className='flex h-7'>
    <ProjectGroupSidebar/>
    <ProjectChatContainer/>
  </div>
  </>
}

export default ChatGroupRoot