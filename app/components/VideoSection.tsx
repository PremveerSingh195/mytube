"use client";
import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { NavState } from "../redux/slices/navigationSlice";
import { subscribedChannels } from "../data/subscribedChannels";

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

type Video = {
  title: string;
  channel: string;
  views: string;
  age: string;
  duration: string;
  isLive?: boolean;
  category: string;
  gradient: string;
  avatar: string;
};

const videos: Video[] = [
  {
    title: "Building a YouTube Clone with Next.js — Full Course",
    channel: "Acme Tech",
    views: "1.2M",
    age: "2 weeks ago",
    duration: "24:18",
    category: "Learning",
    gradient: "bg-gradient-to-br from-red-600 via-rose-800 to-zinc-900",
    avatar: "bg-red-600",
  },
  {
    title: "Lofi Beats to Code and Relax To 🎧",
    channel: "Lofi Beats",
    views: "845K",
    age: "1 month ago",
    duration: "3:12:05",
    category: "Music",
    gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-700 to-indigo-900",
    avatar: "bg-pink-600",
  },
  {
    title: "10 Minute Full Body Workout — No Equipment",
    channel: "Fitness First",
    views: "2.4M",
    age: "3 days ago",
    duration: "10:32",
    category: "Sports",
    gradient: "bg-gradient-to-br from-orange-500 via-red-600 to-rose-900",
    avatar: "bg-orange-600",
  },
  {
    title: "How Satellites Actually Stay in Orbit",
    channel: "Space & Beyond",
    views: "512K",
    age: "5 days ago",
    duration: "12:47",
    category: "Learning",
    gradient: "bg-gradient-to-br from-indigo-500 via-purple-700 to-black",
    avatar: "bg-purple-600",
  },
  {
    title: "The Best Chocolate Cake Recipe You'll Ever Try",
    channel: "The Kitchen Lab",
    views: "96K",
    age: "1 week ago",
    duration: "18:03",
    category: "Cooking",
    gradient: "bg-gradient-to-br from-amber-500 via-orange-700 to-stone-900",
    avatar: "bg-emerald-600",
  },
  {
    title: "Learn TypeScript in 60 Minutes — Zero to Hero",
    channel: "Coding with Sam",
    views: "1.8M",
    age: "4 days ago",
    duration: "58:21",
    category: "Learning",
    gradient: "bg-gradient-to-br from-sky-500 via-blue-700 to-slate-900",
    avatar: "bg-amber-600",
  },
  {
    title: "Top 10 Hidden Gems in Japan Nobody Talks About",
    channel: "Pixel Art Daily",
    views: "233K",
    age: "2 days ago",
    duration: "15:56",
    category: "Travel",
    gradient: "bg-gradient-to-br from-teal-500 via-emerald-700 to-zinc-900",
    avatar: "bg-blue-600",
  },
  {
    title: "React 19 Deep Dive: Actions, Forms & Suspense",
    channel: "Coding with Sam",
    views: "670K",
    age: "1 day ago",
    duration: "41:09",
    category: "Learning",
    gradient: "bg-gradient-to-br from-violet-500 via-indigo-700 to-black",
    avatar: "bg-amber-600",
  },
  {
    title: "Solo Camping in the Norwegian Fjords",
    channel: "Wild Earth",
    views: "1.1M",
    age: "6 days ago",
    duration: "22:44",
    category: "Travel",
    gradient: "bg-gradient-to-br from-green-500 via-emerald-800 to-stone-900",
    avatar: "bg-green-700",
  },
  {
    title: "Why 2026 Is the Year of AI Agents",
    channel: "Acme Tech",
    views: "389K",
    age: "12 hours ago",
    duration: "9:15",
    category: "News",
    gradient: "bg-gradient-to-br from-cyan-500 via-sky-700 to-slate-900",
    avatar: "bg-red-600",
  },
  {
    title: "Street Food Tour: Bangkok, Thailand 🇹🇭",
    channel: "The Kitchen Lab",
    views: "754K",
    age: "3 weeks ago",
    duration: "19:28",
    category: "Cooking",
    gradient: "bg-gradient-to-br from-lime-500 via-green-700 to-emerald-950",
    avatar: "bg-emerald-600",
  },
  {
    title: "The Physics of Time Travel Explained",
    channel: "Space & Beyond",
    views: "1.6M",
    age: "2 months ago",
    duration: "14:52",
    category: "Learning",
    gradient: "bg-gradient-to-br from-fuchsia-500 via-purple-800 to-indigo-950",
    avatar: "bg-purple-600",
  },
  {
    title: "The Ultimate 2026 Game Reveal Reactions!",
    channel: "GameHub",
    views: "2.1M",
    age: "8 hours ago",
    duration: "17:40",
    category: "Gaming",
    gradient: "bg-gradient-to-br from-emerald-500 via-teal-800 to-slate-950",
    avatar: "bg-emerald-700",
  },
  {
    title: "I Built a $500 Gaming Setup — Can It Run 4K?",
    channel: "GameHub",
    views: "468K",
    age: "3 days ago",
    duration: "13:02",
    category: "Gaming",
    gradient: "bg-gradient-to-br from-zinc-600 via-slate-800 to-black",
    avatar: "bg-emerald-700",
  },
  {
    title: "Live: Sunrise Over Mount Fuji 🌅",
    channel: "Wild Earth",
    views: "129K",
    age: "streaming now",
    duration: "",
    isLive: true,
    category: "Live",
    gradient: "bg-gradient-to-br from-rose-400 via-orange-600 to-amber-900",
    avatar: "bg-green-700",
  },
  {
    title: "Live: Lofi Beats — 24/7 Study Stream",
    channel: "Lofi Beats",
    views: "3.4K",
    age: "streaming now",
    duration: "",
    isLive: true,
    category: "Live",
    gradient: "bg-gradient-to-br from-purple-500 via-fuchsia-800 to-pink-950",
    avatar: "bg-pink-600",
  },
  {
    title: "Tech Podcast: The Rise of AI Agents",
    channel: "Acme Tech",
    views: "87K",
    age: "1 week ago",
    duration: "52:16",
    category: "Podcasts",
    gradient: "bg-gradient-to-br from-slate-500 via-blue-800 to-indigo-950",
    avatar: "bg-red-600",
  },
  {
    title: "True Crime Podcast: The Vanishing Act",
    channel: "The Story Room",
    views: "1.4M",
    age: "2 weeks ago",
    duration: "1:08:33",
    category: "Podcasts",
    gradient: "bg-gradient-to-br from-neutral-700 via-zinc-900 to-black",
    avatar: "bg-slate-600",
  },
  {
    title: "Breaking: Biggest Tech Announcement of 2026",
    channel: "Pixel Press",
    views: "3.2M",
    age: "4 hours ago",
    duration: "6:58",
    category: "News",
    gradient: "bg-gradient-to-br from-blue-500 via-indigo-800 to-slate-950",
    avatar: "bg-cyan-700",
  },
  {
    title: "Highlights: The Championship Final — Last 10 Minutes",
    channel: "Sports Zone",
    views: "920K",
    age: "1 day ago",
    duration: "10:21",
    category: "Sports",
    gradient: "bg-gradient-to-br from-lime-500 via-green-700 to-emerald-950",
    avatar: "bg-lime-700",
  },
];

type FeedState =
  | {
      kind: "feed";
      videos: Video[];
      heading?: string;
      showChips: boolean;
    }
  | { kind: "shorts"; videos: Video[] }
  | { kind: "placeholder"; heading: string; message: string };

const PLACEHOLDER: Record<string, { title: string; message: string }> = {
  yourChannel: {
    title: "Your channel",
    message: "Create videos and build your channel here.",
  },
  playlists: {
    title: "Playlists",
    message: "Playlists you create will show up here.",
  },
  yourVideos: {
    title: "Your videos",
    message: "Upload your first video to get started.",
  },
  premium: {
    title: "MyTube Premium",
    message: "Enjoy ad-free videos, background play and downloads.",
  },
  movies: {
    title: "Movies",
    message: "Rent or buy the latest movies — coming soon.",
  },
  settings: {
    title: "Settings",
    message: "Your account and app preferences will live here.",
  },
  report: {
    title: "Report history",
    message: "Reports you've submitted will appear here.",
  },
  help: {
    title: "Help",
    message: "Get answers to common questions about MyTube.",
  },
  feedback: {
    title: "Send feedback",
    message: "We'd love to hear what you think of MyTube.",
  },
};

const subscribedNames = new Set(subscribedChannels.map((c) => c.name));

function resolveFeed(nav: NavState): FeedState {
  switch (nav.key) {
    case "home":
      return { kind: "feed", videos, showChips: true };
    case "subscriptions":
      return {
        kind: "feed",
        videos: videos.filter((v) => subscribedNames.has(v.channel)),
        heading: "Subscriptions",
        showChips: true,
      };
    case "channel":
      return {
        kind: "feed",
        videos: videos.filter((v) => v.channel === nav.channel),
        heading: nav.channel ?? "Channel",
        showChips: false,
      };
    case "history":
      return {
        kind: "feed",
        videos: videos.slice(0, 4),
        heading: "History",
        showChips: true,
      };
    case "watchLater":
      return {
        kind: "feed",
        videos: [videos[2], videos[5], videos[8]].filter(
          (v): v is Video => Boolean(v)
        ),
        heading: "Watch later",
        showChips: true,
      };
    case "liked":
      return {
        kind: "feed",
        videos: [videos[1], videos[4], videos[9], videos[12]].filter(
          (v): v is Video => Boolean(v)
        ),
        heading: "Liked videos",
        showChips: true,
      };
    case "shorts":
      return { kind: "shorts", videos: videos.slice(0, 5) };
    case "Music":
    case "Gaming":
    case "Live":
      return { kind: "feed", videos, showChips: true };
    default:
      return {
        kind: "placeholder",
        heading: PLACEHOLDER[nav.key]?.title ?? "MyTube",
        message: PLACEHOLDER[nav.key]?.message ?? "This page is coming soon.",
      };
  }
}

function ShortCard({ video, index }: { video: Video; index: number }) {
  return (
    <div
      className="group w-40 shrink-0 cursor-pointer sm:w-44"
      style={{
        animation: "fade-up 0.35s ease-out both",
        animationDelay: `${Math.min(index, 8) * 40}ms`,
      }}
    >
      <div
        className={`relative aspect-9/16 w-full overflow-hidden rounded-xl ${video.gradient}`}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60">
            <Play className="h-6 w-6 fill-white text-white" />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-3">
          <p className="line-clamp-2 text-xs font-medium text-white">
            {video.title}
          </p>
          <p className="mt-1 text-[11px] text-[#AAAAAA]">{video.views} views</p>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, index }: { video: Video; index: number }) {
  const isLive = video.isLive === true;

  return (
    <article
      className="group cursor-pointer"
      style={{
        animation: "fade-up 0.35s ease-out both",
        animationDelay: `${Math.min(index, 8) * 40}ms`,
      }}
    >
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-xl ${video.gradient}`}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60">
            <Play className="h-6 w-6 fill-white text-white" />
          </span>
        </div>
        {isLive ? (
          <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-red-600 px-1.5 py-0.5 text-xs font-medium text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            LIVE
          </span>
        ) : video.duration ? (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {video.duration}
          </span>
        ) : null}
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

function FeedView({
  feed,
  nav,
}: {
  feed: Extract<FeedState, { kind: "feed" }>;
  nav: NavState;
}) {
  const [activeChip, setActiveChip] = useState(
    nav.key === "Music" || nav.key === "Gaming" || nav.key === "Live"
      ? nav.key
      : "All"
  );

  // Scroll to top whenever a new feed mounts (i.e. navigation changes).
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const visibleVideos =
    activeChip === "All"
      ? feed.videos
      : feed.videos.filter((video) => video.category === activeChip);

  return (
    <>
      {feed.showChips && (
        <div className="sticky top-14 z-30 -mx-4 mb-4 flex gap-3 overflow-x-auto bg-[#0F0F0F] px-4 py-1 [scrollbar-width:none] sm:-mx-6 sm:px-6">
          {chips.map((chip) => {
            const isActive = chip === activeChip;
            return (
              <button
                key={chip}
                onClick={() => setActiveChip(chip)}
                aria-pressed={isActive}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors duration-150 ${
                  isActive
                    ? "bg-white font-medium text-black"
                    : "bg-[#272727] text-white hover:bg-[#3F3F3F]"
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      )}

      {feed.heading && (
        <h2 className="mb-4 text-xl font-bold text-white">{feed.heading}</h2>
      )}

      {visibleVideos.length > 0 ? (
        <div
          key={`${nav.key}-${nav.channel ?? ""}-${activeChip}`}
          className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {visibleVideos.map((video, index) => (
            <VideoCard key={video.title} video={video} index={index} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-[#AAAAAA]">
          No videos here yet. Check back soon!
        </p>
      )}
    </>
  );
}

function VideoSection() {
  const nav = useSelector((state: RootState) => state.navigation);
  const feed = resolveFeed(nav);

  if (feed.kind === "placeholder") {
    return (
      <main className="min-w-0 flex-1 px-4 pb-10 pt-4 sm:px-6">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#272727] px-6 py-24 text-center">
          <h2 className="text-xl font-semibold text-white">{feed.heading}</h2>
          <p className="mt-2 max-w-md text-sm text-[#AAAAAA]">
            {feed.message}
          </p>
        </div>
      </main>
    );
  }

  if (feed.kind === "shorts") {
    return (
      <main className="min-w-0 flex-1 px-4 pb-10 pt-4 sm:px-6">
        <h2 className="mb-4 text-xl font-bold text-white">Shorts</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
          {feed.videos.map((video, index) => (
            <ShortCard key={video.title} video={video} index={index} />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="min-w-0 flex-1 px-4 pb-10 pt-4 sm:px-6">
      <FeedView
        key={`${nav.key}-${nav.channel ?? ""}`}
        feed={feed}
        nav={nav}
      />
    </main>
  );
}

export default VideoSection;
