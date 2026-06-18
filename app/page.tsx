"use client";

import LeftSideBar from "./components/LeftSideBar";
import LeftSideBarSmall from "./components/LeftSideBarSmall";
import VideoSection from "./components/VideoSection";
import { useSelector } from "react-redux";

export default function Home() {
  const isSidebarOpen = useSelector((state: any) => state.toggleSidebar.isSidebarOpen);

  console.log(isSidebarOpen , 'dsafadsafds');
  

  return (
    <div className="flex justify-center flex-row items-center text-white w-full mx-8">
        {isSidebarOpen ? <div className="w-[20%]"><LeftSideBar/></div> : <div><LeftSideBarSmall/></div>}
        <div className="w-[80%]"><VideoSection/></div>
    </div>
  );
}