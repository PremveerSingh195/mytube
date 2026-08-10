"use client";
import React from "react";
import { Play } from "lucide-react";

const chips = [
  "All",
  "Music",
  "Gaming",
  "Live",
  "News",
  "Sports",
  "Learning",
  "Podcasts",
  "Cooking",
  "Travel",
];

const videos = [
  {
    title: "Building a YouTube Clone with Next.js — Full Course",
    channel: "Acme Tech",
    views: "1.2M",
    age: "2 weeks ago",
    duration: "24:18",
    gradient: "bg-gradient-to-br from-red-600 via-rose-800 to-zinc-900",
    avatar: "bg-red-600",
  },
  {
    title: "Lofi Beats to Code and Relax To 🎧",
    channel: "Lofi Beats",
    views: "845K",
    age: "1 month ago",
    duration: "3:12:05",
    gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-700 to-indigo-900",
    avatar: "bg-pink-600",
  },
  {
    title: "10 Minute Full Body Workout — No Equipment",
    channel: "Fitness First",
    views: "2.4M",
    age: "3 days ago",
    duration: "10:32",
    gradient: "bg-gradient-to-br from-orange-500 via-red-600 to-rose-900",
    avatar: "bg-orange-600",
  },
  {
    title: "How Satellites Actually Stay in Orbit",
    channel: "Space & Beyond",
    views: "512K",
    age: "5 days ago",
    duration: "12:47",
    gradient: "bg-gradient-to-br from-indigo-500 via-purple-700 to-black",
    avatar: "bg-purple-600",
  },
  {
    title: "The Best Chocolate Cake Recipe You'll Ever Try",
    channel: "The Kitchen Lab",
    views: "96K",
    age: "1 week ago",
    duration: "18:03",
    gradient: "bg-gradient-to-br from-amber-500 via-orange-700 to-stone-900",
    avatar: "bg-emerald-600",
  },
  {
    title: "Learn TypeScript in 60 Minutes — Zero to Hero",
    channel: "Coding with Sam",
    views: "1.8M",
    age: "4 days ago",
    duration: "58:21",
    gradient: "bg-gradient-to-br from-sky-500 via-blue-700 to-slate-900",
    avatar: "bg-amber-600",
  },
  {
    title: "Top 10 Hidden Gems in Japan Nobody Talks About",
    channel: "Pixel Art Daily",
    views: "233K",
    age: "2 days ago",
    duration: "15:56",
    gradient: "bg-gradient-to-br from-teal-500 via-emerald-700 to-zinc-900",
    avatar: "bg-blue-600",
  },
  {
    title: "React 19 Deep Dive: Actions, Forms & Suspense",
    channel: "Coding with Sam",
    views: "670K",
    age: "1 day ago",
    duration: "41:09",
    gradient: "bg-gradient-to-br from-violet-500 via-indigo-700 to-black",
    avatar: "bg-amber-600",
  },
  {
    title: "Solo Camping in the Norwegian Fjords",
    channel: "Wild Earth",
    views: "1.1M",
    age: "6 days ago",
    duration: "22:44",
    gradient: "bg-gradient-to-br from-green-500 via-emerald-800 to-stone-900",
    avatar: "bg-green-700",
  },
  {
    title: "Why 2026 Is the Year of AI Agents",
    channel: "Acme Tech",
    views: "389K",
    age: "12 hours ago",
    duration: "9:15",
    gradient: "bg-gradient-to-br from-cyan-500 via-sky-700 to-slate-900",
    avatar: "bg-red-600",
  },
  {
    title: "Street Food Tour: Bangkok, Thailand 🇹🇭",
    channel: "The Kitchen Lab",
    views: "754K",
    age: "3 weeks ago",
    duration: "19:28",
    gradient: "bg-gradient-to-br from-lime-500 via-green-700 to-emerald-950",
    avatar: "bg-emerald-600",
  },
  {
    title: "The Physics of Time Travel Explained",
    channel: "Space & Beyond",
    views: "1.6M",
    age: "2 months ago",
    duration: "14:52",
    gradient: "bg-gradient-to-br from-fuchsia-500 via-purple-800 to-indigo-950",
    avatar: "bg-purple-600",
  },
];

function VideoCard({ video }: { video: (typeof videos)[number] }) {
  return (
    <article className="group cursor-pointer">
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-xl ${video.gradient}`}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60">
            <Play className="h-6 w-6 fill-white text-white" />
          </span>
        </div>
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {video.duration}
        </span>
      </div>
      <div className="mt-3 flex gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white ${video.avatar}`}
        >
          {video.channel[0]}
        </span>
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-white">
            {video.title}
          </h3>
          <p className="mt-1 truncate text-xs text-[#AAAAAA]">
            {video.channel}
          </p>
          <p className="text-xs text-[#AAAAAA]">
            {video.views} views · {video.age}
          </p>
        </div>
      </div>
    </article>
  );
}

function VideoSection() {
  return (
    <main className="min-w-0 flex-1 px-4 pb-10 pt-4 sm:px-6">
      {/* filter chips */}
      <div className="flex gap-3 overflow-x-auto pb-4 [scrollbar-width:none]">
        {chips.map((chip, index) => (
          <button
            key={chip}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm ${
              index === 0
                ? "bg-white font-medium text-black"
                : "bg-[#272727] text-white hover:bg-[#3F3F3F]"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* video grid */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>
    </main>
  );
}

export default VideoSection;
