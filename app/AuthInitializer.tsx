"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setUser, clearUser } from "../app/redux/slices/userSlice";
import { serverUrl } from "./utils/serverUrl";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(
         `${serverUrl}/auth/refresh`,
         {},
          {
            withCredentials: true,
          }
        );

        dispatch(
          setUser({
            user: response.data.user,
            accessToken: response.data.accessToken,
          })
        );
      } catch {
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, [dispatch]);

  return null;
}