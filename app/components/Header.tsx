import { EllipsisVertical, HamburgerIcon, User } from 'lucide-react'
import React from 'react'
import Hamburger from './icons/Hamburger'

function Header() {
  return (
    <div className='flex flex-row justify-between items-center mx-6'>
      {/* left side of the header */}
      <div className='flex flex-row justify-center items-center'><Hamburger /> <img src="/mytubelogo.png" alt="logo" className='w-[150px] h-[80px] -ml-3' /></div>

      {/* middle of the header */}
      <div><div className="relative w-80">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-lg py-2 pl-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <span className="absolute inset-y-0 right-0 flex items-center cursor-pointer bg-gray-200 px-3 rounded-r-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </span>
      </div></div>
      {/* right side of the header */}
      <div className='flex flex-row justify-center items-center'>
        <button><EllipsisVertical /></button>
          <button className='flex flex-row justify-center items-center'><User /> Sign in</button>
      </div>
    </div>
  )
}

export default Header