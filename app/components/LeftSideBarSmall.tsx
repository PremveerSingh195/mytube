"use client";
import React from "react";
import { CircleUser, Home, SquarePlay, Zap } from "lucide-react";

const items = [
  { icon: Home, label: "Home" },
  { icon: Zap, label: "Shorts" },
  { icon: SquarePlay, label: "Subscriptions" },
  { icon: CircleUser, label: "You" },
];

function LeftSideBarSmall() {
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-20 shrink-0 flex-col items-center gap-1 bg-[#0F0F0F] px-1 py-3 md:flex">
      {items.map(({ icon: Icon, label }) => (
        <button
          key={label}
          className="flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl py-4 text-white hover:bg-[#272727]"
        >
          <Icon className="h-6 w-6" />
          <span className="text-[10px]">{label}</span>
        </button>
      ))}
    </aside>
  );
}

export default LeftSideBarSmall;
