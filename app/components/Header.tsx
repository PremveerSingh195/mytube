"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Mic, Search } from "lucide-react";
import Hamburger from "./icons/Hamburger";
import RightSideHeader from "./RightSideHeader";
import { toggleSideBar } from "../redux/slices/sidebarToggleSlice";

function Header() {
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b border-[#272727] bg-[#0F0F0F] px-4">
      {/* left side of the header */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => dispatch(toggleSideBar())}
          aria-label="Toggle sidebar"
          className="cursor-pointer rounded-full p-2 text-white hover:bg-[#272727]"
        >
          <Hamburger />
        </button>
        <Image
          src="/mytubelogo.png"
          alt="MyTube logo"
          width={150}
          height={80}
          className="h-8 w-auto select-none"
        />
      </div>

      {/* middle of the header */}
      <div className="hidden flex-1 justify-center md:flex">
        <div className="flex w-full max-w-150 items-center">
          <div className="flex h-10 flex-1 items-center overflow-hidden rounded-l-full border border-[#303030] bg-[#121212] focus-within:border-[#3EA6FF]">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent px-4 text-sm text-white placeholder:text-[#AAAAAA] focus:outline-none"
            />
          </div>
          <button
            aria-label="Search"
            className="flex h-10 w-16 shrink-0 cursor-pointer items-center justify-center rounded-r-full border border-l-0 border-[#303030] bg-[#222222] text-white hover:bg-[#303030]"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Search with voice"
            className="ml-3 hidden h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#272727] text-white hover:bg-[#3F3F3F] sm:flex"
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* right side of the header */}
      <RightSideHeader />
    </header>
  );
}

export default Header;
