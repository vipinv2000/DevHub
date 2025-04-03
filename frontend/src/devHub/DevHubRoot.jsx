import React from 'react'
import { Outlet } from 'react-router-dom'
import DevHubNavbar from './DevHubNavbar'
import DevHubSidebar from './DevHubSidebar'

const DevHubRoot = () => {
  return (
    <div >
      <DevHubNavbar />
      <div className='flex pt-20'>
        <div className='w-[10%]'>
          <DevHubSidebar />
        </div>
        <div  className='w-[90%]'>

          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default DevHubRoot