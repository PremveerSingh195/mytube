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
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setNav } from "../redux/slices/navigationSlice";
import { subscribedChannels } from "../data/subscribedChannels";

function SidebarItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
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
  const dispatch = useDispatch();
  const nav = useSelector((state: RootState) => state.navigation);

  const navigate = (key: string, channel?: string) =>
    dispatch(setNav({ key, channel }));

  const isActive = (key: string, channel?: string) =>
    nav.key === key && (channel === undefined || nav.channel === channel);

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto bg-[#0F0F0F] px-3 py-3 [scrollbar-width:none] md:block">
      <ul>
        <SidebarItem icon={Home} label="Home" active={isActive("home")} onClick={() => navigate("home")} />
        <SidebarItem icon={Zap} label="Shorts" active={isActive("shorts")} onClick={() => navigate("shorts")} />
        <SidebarItem icon={SquarePlay} label="Subscriptions" active={isActive("subscriptions")} onClick={() => navigate("subscriptions")} />
      </ul>

      <Divider />

      <SectionTitle>You</SectionTitle>
      <ul>
        <SidebarItem icon={User} label="Your channel" active={isActive("yourChannel")} onClick={() => navigate("yourChannel")} />
        <SidebarItem icon={History} label="History" active={isActive("history")} onClick={() => navigate("history")} />
        <SidebarItem icon={ListVideo} label="Playlists" active={isActive("playlists")} onClick={() => navigate("playlists")} />
        <SidebarItem icon={Video} label="Your videos" active={isActive("yourVideos")} onClick={() => navigate("yourVideos")} />
        <SidebarItem icon={Clock} label="Watch later" active={isActive("watchLater")} onClick={() => navigate("watchLater")} />
        <SidebarItem icon={ThumbsUp} label="Liked videos" active={isActive("liked")} onClick={() => navigate("liked")} />
      </ul>

      <Divider />

      <SectionTitle>Subscriptions</SectionTitle>
      <ul>
        {subscribedChannels.map((channel) => (
          <li key={channel.name}>
            <button
              onClick={() => navigate("channel", channel.name)}
              className={`flex w-full cursor-pointer items-center gap-6 rounded-xl px-3 py-2 text-sm ${
                isActive("channel", channel.name)
                  ? "bg-white font-medium text-black"
                  : "text-white hover:bg-[#272727]"
              }`}
            >
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
        <SidebarItem icon={BadgeCheck} label="MyTube Premium" active={isActive("premium")} onClick={() => navigate("premium")} />
        <SidebarItem icon={Film} label="Movies" active={isActive("movies")} onClick={() => navigate("movies")} />
        <SidebarItem icon={Gamepad2} label="Gaming" active={isActive("Gaming")} onClick={() => navigate("Gaming")} />
        <SidebarItem icon={Radio} label="Live" active={isActive("Live")} onClick={() => navigate("Live")} />
      </ul>

      <Divider />

      <ul>
        <SidebarItem icon={Settings} label="Settings" active={isActive("settings")} onClick={() => navigate("settings")} />
        <SidebarItem icon={Flag} label="Report history" active={isActive("report")} onClick={() => navigate("report")} />
        <SidebarItem icon={CircleHelp} label="Help" active={isActive("help")} onClick={() => navigate("help")} />
        <SidebarItem icon={MessageSquare} label="Send feedback" active={isActive("feedback")} onClick={() => navigate("feedback")} />
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
