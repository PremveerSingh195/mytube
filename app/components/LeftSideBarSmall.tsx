"use client";
import React from "react";
import { CircleUser, Home, SquarePlay, Zap } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setNav } from "../redux/slices/navigationSlice";
import { toggleSideBar } from "../redux/slices/sidebarToggleSlice";

const items = [
  { icon: Home, label: "Home", key: "home" },
  { icon: Zap, label: "Shorts", key: "shorts" },
  { icon: SquarePlay, label: "Subscriptions", key: "subscriptions" },
];

function LeftSideBarSmall() {
  const dispatch = useDispatch();
  const nav = useSelector((state: RootState) => state.navigation);

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-20 shrink-0 flex-col items-center gap-1 bg-[#0F0F0F] px-1 py-3 md:flex">
      {items.map(({ icon: Icon, label, key }) => {
        const active = nav.key === key;
        return (
          <button
            key={key}
            onClick={() => dispatch(setNav({ key }))}
            className={`flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl py-4 transition-colors ${
              active
                ? "bg-white text-black"
                : "text-white hover:bg-[#272727]"
            }`}
          >
            <Icon className="h-6 w-6" />
            <span className="text-[10px]">{label}</span>
          </button>
        );
      })}
      <button
        onClick={() => dispatch(toggleSideBar())}
        className="flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl py-4 text-white transition-colors hover:bg-[#272727]"
      >
        <CircleUser className="h-6 w-6" />
        <span className="text-[10px]">You</span>
      </button>
    </aside>
  );
}

export default LeftSideBarSmall;
