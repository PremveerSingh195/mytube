"use client";

import {
  Bell,
  ChevronDown,
  CircleHelp,
  EllipsisVertical,
  Flag,
  LogOut,
  Plus,
  Settings,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../utils/serverUrl";
import { clearUser, setUser } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";

function RightSideHeader() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.userSlice
  );
  const dispatch = useDispatch();

  const [openSettings, setOpenSettings] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${serverUrl}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch(
        setUser({
          user: data.user,
          accessToken: data.accessToken,
        })
      );

      setOpenSignupModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch(
        setUser({
          user: data.user,
          accessToken: data.accessToken,
        })
      );

      setOpenLoginModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async (credential: string | undefined) => {
    const res = await fetch(`${serverUrl}/auth/google`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        token: credential,
      }),
    });

    const data = await res.json();

    dispatch(
      setUser({
        user: data.user,
        accessToken: data.accessToken,
      })
    );
    setOpenLoginModal(false);
  };

  const handleSignOut = async () => {
    try {
      await fetch(`${serverUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(clearUser());
      setOpenUserMenu(false);
    }
  };

  // close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenSettings(false);
        setOpenUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openSignup = () => {
    setOpenLoginModal(false);
    setOpenSignupModal(true);
  };

  const openLogin = () => {
    setOpenSignupModal(false);
    setOpenLoginModal(true);
  };

  const inputClass =
    "w-full rounded-lg border border-[#303030] bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-[#AAAAAA] focus:border-[#3EA6FF] focus:outline-none";

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-1 sm:gap-2"
    >
      {/* create button */}
      {isAuthenticated && (
        <button className="hidden cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white hover:bg-[#272727] lg:flex">
          <Plus className="h-5 w-5" /> Create
        </button>
      )}

      {/* notifications */}
      <button
        aria-label="Notifications"
        className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white hover:bg-[#272727] sm:flex"
      >
        <Bell className="h-5 w-5" />
      </button>

      {/* settings dropdown */}
      <button
        aria-label="Settings"
        className="cursor-pointer rounded-full p-2 text-white hover:bg-[#272727]"
        onClick={() => {
          setOpenUserMenu(false);
          setOpenSettings((prev) => !prev);
        }}
      >
        <EllipsisVertical className="h-5 w-5" />
      </button>
      {openSettings && (
        <div className="absolute right-0 top-14 z-50 w-56 rounded-xl border border-[#303030] bg-[#282828] py-2 shadow-2xl">
          <button className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-[#3F3F3F]">
            <Settings className="h-5 w-5" /> Settings
          </button>
          <button className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-[#3F3F3F]">
            <CircleHelp className="h-5 w-5" /> Help
          </button>
          <button className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-[#3F3F3F]">
            <Flag className="h-5 w-5" /> Report history
          </button>
        </div>
      )}

      {/* avatar / sign in */}
      {isAuthenticated ? (
        <button
          onClick={() => {
            setOpenSettings(false);
            setOpenUserMenu((prev) => !prev);
          }}
          className="flex cursor-pointer items-center gap-1 rounded-full p-1 hover:bg-[#272727]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3EA6FF] text-sm font-medium text-black">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </span>
          <ChevronDown className="h-4 w-4 text-white" />
        </button>
      ) : (
        <button
          onClick={openLogin}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-[#3EA6FF] px-4 py-1.5 text-sm font-medium text-[#3EA6FF] hover:bg-[#263850]"
        >
          <User className="h-5 w-5" /> Sign in
        </button>
      )}

      {/* user menu */}
      {openUserMenu && (
        <div className="absolute right-0 top-14 z-50 w-72 rounded-xl border border-[#303030] bg-[#282828] py-2 shadow-2xl">
          <div className="px-4 py-3">
            <p className="truncate text-sm font-medium text-white">
              {user?.name}
            </p>
            <p className="truncate text-xs text-[#AAAAAA]">{user?.email}</p>
          </div>
          <hr className="border-[#3F3F3F]" />
          <button className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-[#3F3F3F]">
            <User className="h-5 w-5" /> Your channel
          </button>
          <button className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-[#3F3F3F]">
            <Settings className="h-5 w-5" /> Settings
          </button>
          <hr className="border-[#3F3F3F]" />
          <button
            onClick={handleSignOut}
            className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-[#3F3F3F]"
          >
            <LogOut className="h-5 w-5" /> Sign out
          </button>
        </div>
      )}

      {/* signup modal */}
      {openSignupModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setOpenSignupModal(false)}
        >
          <form
            className="relative my-8 w-full max-w-md rounded-2xl border border-[#303030] bg-[#0F0F0F] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <button
              type="button"
              onClick={() => setOpenSignupModal(false)}
              aria-label="Close"
              className="absolute right-4 top-4 cursor-pointer rounded-full p-1 text-[#AAAAAA] hover:bg-[#272727] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-center text-xl font-medium text-white">
              Create Account
            </h2>
            <p className="mt-1 text-center text-sm text-[#AAAAAA]">
              Join MyTube to like, share & upload videos
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={inputClass}
                onChange={handleChange}
                value={formData.name}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={inputClass}
                onChange={handleChange}
                value={formData.email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={inputClass}
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full cursor-pointer rounded-lg bg-[#3EA6FF] py-3 text-sm font-medium text-black hover:bg-[#5bb3ff]"
            >
              Create Account
            </button>

            <p className="mt-4 text-center text-sm text-[#AAAAAA]">
              Already have an account?{" "}
              <button
                type="button"
                onClick={openLogin}
                className="cursor-pointer font-medium text-[#3EA6FF] hover:text-[#5bb3ff]"
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      )}

      {/* login modal */}
      {openLoginModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setOpenLoginModal(false)}
        >
          <form
            className="relative my-8 w-full max-w-md rounded-2xl border border-[#303030] bg-[#0F0F0F] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmitLogin}
          >
            <button
              type="button"
              onClick={() => setOpenLoginModal(false)}
              aria-label="Close"
              className="absolute right-4 top-4 cursor-pointer rounded-full p-1 text-[#AAAAAA] hover:bg-[#272727] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-center text-xl font-medium text-white">
              Sign in
            </h2>
            <p className="mt-1 text-center text-sm text-[#AAAAAA]">
              Welcome back to MyTube
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={inputClass}
                onChange={handleChange}
                value={formData.email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={inputClass}
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full cursor-pointer rounded-lg bg-[#3EA6FF] py-3 text-sm font-medium text-black hover:bg-[#5bb3ff]"
            >
              Sign in
            </button>

            <div className="my-5 flex items-center gap-3">
              <hr className="flex-1 border-[#303030]" />
              <span className="text-xs uppercase tracking-wide text-[#AAAAAA]">
                or
              </span>
              <hr className="flex-1 border-[#303030]" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={async (response) => {
                  await handleGoogleLogin(response.credential);
                }}
                onError={() => {
                  console.log("Google Login Failed");
                }}
              />
            </div>

            <p className="mt-4 text-center text-sm text-[#AAAAAA]">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={openSignup}
                className="cursor-pointer font-medium text-[#3EA6FF] hover:text-[#5bb3ff]"
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default RightSideHeader;
