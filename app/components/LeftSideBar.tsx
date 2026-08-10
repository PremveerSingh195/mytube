"use client";
import React from "react";
import {
  BadgeCheck,
  CircleHelp,
  Clock,
  Film,
  Flag,
  Gamepad2,
  History,
  Home,
  ListVideo,
  MessageSquare,
  Radio,
  Settings,
  SquarePlay,
  ThumbsUp,
  User,
  Video,
  Zap,
} from "lucide-react";

const channels = [
  { name: "Acme Tech", color: "bg-red-600" },
  { name: "Pixel Art Daily", color: "bg-blue-600" },
  { name: "The Kitchen Lab", color: "bg-emerald-600" },
  { name: "Space & Beyond", color: "bg-purple-600" },
  { name: "Coding with Sam", color: "bg-amber-600" },
  { name: "Lofi Beats", color: "bg-pink-600" },
  { name: "Wild Earth", color: "bg-green-700" },
  { name: "Fitness First", color: "bg-orange-600" },
];

function SidebarItem({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <li>
      <button
        className={`flex w-full cursor-pointer items-center gap-6 rounded-xl px-3 py-2.5 text-sm ${
          active
            ? "bg-white font-medium text-black"
            : "text-white hover:bg-[#272727]"
        }`}
      >
        <Icon className={`h-5 w-5 shrink-0 ${active ? "text-black" : "text-white"}`} />
        <span className="truncate">{label}</span>
      </button>
    </li>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-3 pb-1 pt-4 text-sm font-medium text-white">{children}</p>
  );
}

function Divider() {
  return <hr className="my-3 border-[#272727]" />;
}

function LeftSideBar() {
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto bg-[#0F0F0F] px-3 py-3 [scrollbar-width:none] md:block">
      <ul>
        <SidebarItem icon={Home} label="Home" active />
        <SidebarItem icon={Zap} label="Shorts" />
        <SidebarItem icon={SquarePlay} label="Subscriptions" />
      </ul>

      <Divider />

      <SectionTitle>You</SectionTitle>
      <ul>
        <SidebarItem icon={User} label="Your channel" />
        <SidebarItem icon={History} label="History" />
        <SidebarItem icon={ListVideo} label="Playlists" />
        <SidebarItem icon={Video} label="Your videos" />
        <SidebarItem icon={Clock} label="Watch later" />
        <SidebarItem icon={ThumbsUp} label="Liked videos" />
      </ul>

      <Divider />

      <SectionTitle>Subscriptions</SectionTitle>
      <ul>
        {channels.map((channel) => (
          <li key={channel.name}>
            <button className="flex w-full cursor-pointer items-center gap-6 rounded-xl px-3 py-2 text-sm text-white hover:bg-[#272727]">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium text-white ${channel.color}`}
              >
                {channel.name[0]}
              </span>
              <span className="truncate">{channel.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <Divider />

      <SectionTitle>More from MyTube</SectionTitle>
      <ul>
        <SidebarItem icon={BadgeCheck} label="MyTube Premium" />
        <SidebarItem icon={Film} label="Movies" />
        <SidebarItem icon={Gamepad2} label="Gaming" />
        <SidebarItem icon={Radio} label="Live" />
      </ul>

      <Divider />

      <ul>
        <SidebarItem icon={Settings} label="Settings" />
        <SidebarItem icon={Flag} label="Report history" />
        <SidebarItem icon={CircleHelp} label="Help" />
        <SidebarItem icon={MessageSquare} label="Send feedback" />
      </ul>

      <div className="px-3 pt-3 text-xs leading-5 text-[#AAAAAA]">
        About · Press · Copyright
        <br />
        Contact · Creators · Advertise
        <br />
        Developers · Terms · Privacy
      </div>
    </aside>
  );
}

export default LeftSideBar;
