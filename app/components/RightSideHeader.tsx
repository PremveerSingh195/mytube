"use client";

import { EllipsisVertical, User } from "lucide-react";
import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";
import React, { useEffect, useRef, useState } from "react";
import { serverUrl } from "../utils/serverUrl";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";

function RightSideHeader() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.userSlice,
  );

  const dispatch = useDispatch();

  const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  const [openUserDashBoardModal, setOpenUserDashBoardModal] =
    useState<boolean>(false);

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

      console.log(data, "vsgdsfgdfsgdfg");

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch(
        setUser({
          user: data.user,
          accessToken: data.accessToken,
        }),
      );

      setOpenSignupModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    setOpenSignupModal(false);
    setOpenLoginModal(true);
  };

  const handleSignUpButton = () => {
    setOpenLoginModal(false);
    setOpenSignupModal(true);
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
          accessToken: data.accesstoken,
        }),
      );

      setOpenLoginModal(false);

      console.log(data, "dsfafghfdsjghfsdhjg");
    } catch (error) {}
  };

  return (
    <div
      ref={dropdownRef}
      className="flex flex-row justify-center items-center gap-2"
    >
      <button
        className="cursor-pointer hover:bg-gray-500 hover:rounded-4xl p-1"
        onClick={() => setOpen(!open)}
      >
        <EllipsisVertical color="white" />
      </button>
      {open && (
        <div className="absolute top-16 right-6 bg-[#272727] rounded-lg py-2 px-4 flex flex-col gap-2">
          <button className="text-white hover:bg-gray-700 rounded-lg py-1 px-2 text-left">
            Settings
          </button>
          <button className="text-white hover:bg-gray-700 rounded-lg py-1 px-2 text-left">
            Help
          </button>
        </div>
      )}
      <button
        onClick={
          isAuthenticated
            ? () => setOpenUserDashBoardModal((prev) => !prev)
            : () => setOpenSignupModal((prev) => !prev)
        }
        className="flex flex-row justify-center items-center text-white border rounded-3xl py-1.5 px-2 border-white hover:bg-gray-700 cursor-pointer"
      >
        <User color="white" /> {isAuthenticated ? "" : "SignUp"}
      </button>

      {openSignupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 flex-col">
          <form
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4 relative"
            onSubmit={handleSubmit}
          >
            <button
              type="button"
              onClick={() => setOpenSignupModal(false)}
              className="absolute top-3 right-3 text-xl cursor-pointer"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-center">Create Account</h2>

            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border p-2 rounded"
              onChange={handleChange}
              value={formData.name}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 rounded"
              onChange={handleChange}
              value={formData.email}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 rounded"
              onChange={handleChange}
              value={formData.password}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
            >
              Create Account
            </button>
          </form>
          <p className="mx-auto mt-3 text-white">
            Already User{" "}
            <button className="cursor-pointer" onClick={handleLogin}>
              login
            </button>
          </p>
        </div>
      )}
      {openLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 flex-col">
          <form
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4 relative"
            onSubmit={handleSubmitLogin}
          >
            <button
              type="button"
              onClick={() => setOpenLoginModal(false)}
              className="absolute top-3 right-3 text-xl cursor-pointer"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-center">login</h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 rounded"
              onChange={handleChange}
              value={formData.email}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 rounded"
              onChange={handleChange}
              value={formData.password}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
            >
              login
            </button>
          </form>
          <p className="text-white">
            Don't have account{" "}
            <button onClick={handleSignUpButton} className="cursor-pointer">
              Signup
            </button>
          </p>
        </div>
      )}

      {openUserDashBoardModal && (
        <div>
          <h2 className="text-white">user dashboard</h2>
        </div>
      )}
    </div>
  );
}

export default RightSideHeader;