"use client";

import LeftSideBar from "./components/LeftSideBar";
import LeftSideBarSmall from "./components/LeftSideBarSmall";
import VideoSection from "./components/VideoSection";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

export default function Home() {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.toggleSidebar.isSidebarOpen
  );

  return (
    <div className="flex w-full flex-row items-start">
      {isSidebarOpen ? <LeftSideBar /> : <LeftSideBarSmall />}
      <VideoSection />
    </div>
  );
}
