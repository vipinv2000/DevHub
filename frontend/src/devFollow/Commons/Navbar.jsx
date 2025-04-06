import React from 'react'
import { SiDiscord } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";

function Navabr() {
  return (
    <header className="p-4 dark:bg-gray-100 dark:text-gray-800">
    <div className="container flex justify-between h-16 mx-auto">
      <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
        <h1 className='text-orange-500 text-xl font-medium'>DEV<span className='text-black'>Flow</span></h1>
      </a>
      <ul className="items-stretch hidden space-x-3 lg:flex">
      <li className='mt-4.5'>
        About
      </li>
      </ul>
      <div className="items-center flex-shrink-0 hidden lg:flex">
      <div className=''><SiDiscord  />   </div> &nbsp; &nbsp; &nbsp;<FaTwitter />&nbsp; &nbsp; &nbsp;
      </div>
    </div>
  </header>
  )
}

export default Navabr