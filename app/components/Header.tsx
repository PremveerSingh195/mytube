
import Hamburger from './icons/Hamburger'
import RightSideHeader from './RightSideHeader'

function Header() {
  return (
    <div className='flex flex-row justify-between items-center mx-6'>
      {/* left side of the header */}
      <div className='flex flex-row justify-center items-center'><div className='hover:bg-gray-500 p-2 rounded-4xl cursor-pointer'><Hamburger /> </div><img src="/mytubelogo.png" alt="logo" className='w-[150px] h-[80px] -ml-3 select-none' /></div>

      {/* middle of the header */}
      <div>
        <div className="relative w-150 border rounded-3xl border-gray-300 focus:outline-none">
        <input
          type="text"
            placeholder="Search"
            className="w-full  py-2 pl-3 pr-12 focus:outline-none placeholder:text-gray-500 text-white"
        />

          <span className="absolute inset-y-0 right-0 flex items-center cursor-pointer bg-[#272727] px-6 rounded-r-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
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
        </div>
      </div>
      {/* right side of the header */}
      <RightSideHeader />
    </div>
  )
}

export default Header