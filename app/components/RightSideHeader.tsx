"use client";

import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  EllipsisVertical,
  Flag,
  KeyRound,
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
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // login modal view state
  const [loginView, setLoginView] = useState<"login" | "forgot">("login");
  const [forgotStep, setForgotStep] = useState<
    "email" | "otp" | "password" | "success"
  >("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotStatus, setForgotStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotInfo, setForgotInfo] = useState<string | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const forgotEmailRef = useRef<HTMLInputElement | null>(null);
  const newPasswordRef = useRef<HTMLInputElement | null>(null);

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
    setLoginError(null);
    setSignupError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupError(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setSignupError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
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
        throw new Error(data.message || "Registration failed");
      }

      dispatch(
        setUser({
          user: data.user,
          accessToken: data.accessToken,
        })
      );

      setOpenSignupModal(false);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error(error);
      setSignupError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError(null);

    if (!formData.email.trim() || !formData.password) {
      setLoginError("Please enter both email and password");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      dispatch(
        setUser({
          user: data.user,
          accessToken: data.accessToken,
        })
      );

      setOpenLoginModal(false);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error(error);
      setLoginError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async (credential: string | undefined) => {
    if (!credential) return;
    setLoginError(null);
    try {
      const res = await fetch(`${serverUrl}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          token: credential,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Google authentication failed");
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
      setLoginError(error instanceof Error ? error.message : "Google authentication failed");
    }
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
    backToLogin();
  };

  const backToLogin = () => {
    setLoginView("login");
    setForgotStep("email");
    setForgotStatus("idle");
    setForgotError(null);
    setForgotInfo(null);
    setForgotEmail("");
    setOtpDigits(["", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
  };

  const openForgotPassword = () => {
    setForgotEmail(formData.email);
    setForgotStep("email");
    setForgotStatus("idle");
    setForgotError(null);
    setForgotInfo(null);
    setLoginView("forgot");
  };

  const requestOtp = async (email: string) => {
    const response = await fetch(`${serverUrl}/auth/sendOtp`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
  };

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!forgotEmail.trim()) {
      setForgotStatus("error");
      setForgotError("Please enter your email address");
      return;
    }

    setForgotStatus("loading");
    setForgotError(null);

    try {
      await requestOtp(forgotEmail.trim());
      setForgotStatus("idle");
      setForgotInfo(null);
      setOtpDigits(["", "", "", ""]);
      setForgotStep("otp");
    } catch (error) {
      console.error(error);
      setForgotStatus("error");
      setForgotError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const handleResendOtp = async () => {
    setForgotStatus("loading");
    setForgotError(null);
    setForgotInfo(null);

    try {
      await requestOtp(forgotEmail.trim());
      setForgotStatus("idle");
      setForgotInfo("A new code has been sent to your email");
      setOtpDigits(["", "", "", ""]);
      otpRefs.current[0]?.focus();
    } catch (error) {
      console.error(error);
      setForgotStatus("error");
      setForgotError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const handleSubmitOtp = async () => {
    const otp = otpDigits.join("");

    if (otp.length < 4) {
      setForgotStatus("error");
      setForgotError("Please enter the 4-digit code");
      return;
    }

    setForgotStatus("loading");
    setForgotError(null);
    setForgotInfo(null);

    try {
      const response = await fetch(`${serverUrl}/auth/verifyOtp`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail.trim(), otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP");
      }

      setForgotStatus("idle");
      setForgotStep("password");
    } catch (error) {
      console.error(error);
      setForgotStatus("error");
      setForgotError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword.trim()) {
      setForgotStatus("error");
      setForgotError("Please enter a new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotStatus("error");
      setForgotError("Passwords do not match");
      return;
    }

    setForgotStatus("loading");
    setForgotError(null);

    try {
      const response = await fetch(`${serverUrl}/auth/resetPassword`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail.trim(),
          otp: otpDigits.join(""),
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setForgotStatus("idle");
      setForgotStep("success");
    } catch (error) {
      console.error(error);
      setForgotStatus("error");
      setForgotError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    if (digit && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      setOtpDigits((prev) => {
        const next = [...prev];
        next[index - 1] = "";
        return next;
      });
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pasted) return;

    e.preventDefault();
    setOtpDigits(
      pasted.split("").concat(["", "", "", ""]).slice(0, 4)
    );
    otpRefs.current[Math.min(pasted.length, 3)]?.focus();
  };

  // focus the right field whenever the forgot step changes
  useEffect(() => {
    if (loginView !== "forgot") return;

    if (forgotStep === "otp") {
      otpRefs.current[0]?.focus();
    } else if (forgotStep === "password") {
      newPasswordRef.current?.focus();
    } else if (forgotStep === "email") {
      forgotEmailRef.current?.focus();
    }
  }, [loginView, forgotStep]);

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
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name || "User"}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3EA6FF] text-sm font-medium text-black">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          )}
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
          <div className="flex items-center gap-3 px-4 py-3">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name || "User"}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3EA6FF] text-base font-semibold text-black">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user?.name}
              </p>
              <p className="truncate text-xs text-[#AAAAAA]">{user?.email}</p>
            </div>
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

            {signupError && (
              <p className="mt-3 text-center text-sm text-red-400">
                {signupError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full cursor-pointer rounded-lg bg-[#3EA6FF] py-3 text-sm font-medium text-black hover:bg-[#5bb3ff] disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
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
          <div
            className="relative my-8 w-full max-w-md rounded-2xl border border-[#303030] bg-[#0F0F0F] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenLoginModal(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 cursor-pointer rounded-full p-1 text-[#AAAAAA] hover:bg-[#272727] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {loginView === "login" && (
              <form onSubmit={handleSubmitLogin}>
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
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className={inputClass}
                      onChange={handleChange}
                      value={formData.password}
                    />
                    <div className="mt-1.5 text-right">
                      <button
                        type="button"
                        onClick={openForgotPassword}
                        className="cursor-pointer text-xs font-medium text-[#3EA6FF] hover:text-[#5bb3ff]"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>
                </div>

                {loginError && (
                  <p className="mt-3 text-center text-sm text-red-400">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full cursor-pointer rounded-lg bg-[#3EA6FF] py-3 text-sm font-medium text-black hover:bg-[#5bb3ff] disabled:opacity-60"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
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
                      setLoginError("Google Sign-In failed");
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
            )}

            {loginView === "forgot" && forgotStep === "email" && (
              <form onSubmit={handleSendOtp}>
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#263850]">
                    <KeyRound className="h-8 w-8 text-[#3EA6FF]" />
                  </div>
                </div>
                <h2 className="mt-5 text-center text-xl font-medium text-white">
                  Forgot password?
                </h2>
                <p className="mt-1 text-center text-sm text-[#AAAAAA]">
                  Enter your email and we&apos;ll send you a 4-digit code to
                  reset your password
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  <input
                    ref={forgotEmailRef}
                    type="email"
                    name="forgotEmail"
                    placeholder="Email"
                    className={inputClass}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    value={forgotEmail}
                  />
                </div>

                {forgotStatus === "error" && forgotError && (
                  <p className="mt-3 text-center text-sm text-red-400">
                    {forgotError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={forgotStatus === "loading"}
                  className="mt-6 w-full cursor-pointer rounded-lg bg-[#3EA6FF] py-3 text-sm font-medium text-black hover:bg-[#5bb3ff] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {forgotStatus === "loading" ? "Sending..." : "Get OTP"}
                </button>

                <button
                  type="button"
                  onClick={backToLogin}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1 text-sm text-[#AAAAAA] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to sign in
                </button>
              </form>
            )}

            {loginView === "forgot" && forgotStep === "otp" && (
              <div>
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#263850]">
                    <KeyRound className="h-8 w-8 text-[#3EA6FF]" />
                  </div>
                </div>
                <h2 className="mt-5 text-center text-xl font-medium text-white">
                  Enter OTP
                </h2>
                <p className="mt-1 wrap-break-word text-center text-sm text-[#AAAAAA]">
                  We&apos;ve sent a 4-digit code to{" "}
                  <span className="font-medium text-white">{forgotEmail}</span>
                </p>

                <div className="mt-6 flex justify-center gap-3">
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handleOtpPaste}
                      aria-label={`Digit ${index + 1}`}
                      className="h-14 w-14 rounded-lg border border-[#303030] bg-[#121212] text-center text-xl font-semibold text-white focus:border-[#3EA6FF] focus:outline-none"
                    />
                  ))}
                </div>

                {forgotStatus === "error" && forgotError && (
                  <p className="mt-3 text-center text-sm text-red-400">
                    {forgotError}
                  </p>
                )}

                {forgotInfo && (
                  <p className="mt-3 text-center text-sm text-[#4ADE80]">
                    {forgotInfo}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleSubmitOtp}
                  disabled={forgotStatus === "loading"}
                  className="mt-6 w-full cursor-pointer rounded-lg bg-[#3EA6FF] py-3 text-sm font-medium text-black hover:bg-[#5bb3ff] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {forgotStatus === "loading" ? "Verifying..." : "Submit OTP"}
                </button>

                <div className="mt-4 flex items-center justify-between text-xs text-[#AAAAAA]">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotStatus("idle");
                      setForgotError(null);
                      setForgotInfo(null);
                      setForgotStep("email");
                    }}
                    className="cursor-pointer font-medium text-[#3EA6FF] hover:text-[#5bb3ff]"
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={forgotStatus === "loading"}
                    className="cursor-pointer font-medium text-[#3EA6FF] hover:text-[#5bb3ff] disabled:opacity-60"
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  type="button"
                  onClick={backToLogin}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1 text-sm text-[#AAAAAA] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to sign in
                </button>
              </div>
            )}

            {loginView === "forgot" && forgotStep === "password" && (
              <form onSubmit={handleResetPassword}>
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#263850]">
                    <KeyRound className="h-8 w-8 text-[#3EA6FF]" />
                  </div>
                </div>
                <h2 className="mt-5 text-center text-xl font-medium text-white">
                  Set new password
                </h2>
                <p className="mt-1 text-center text-sm text-[#AAAAAA]">
                  Choose a strong password for your account
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  <input
                    ref={newPasswordRef}
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                    className={inputClass}
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    className={inputClass}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                </div>

                {forgotStatus === "error" && forgotError && (
                  <p className="mt-3 text-center text-sm text-red-400">
                    {forgotError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={forgotStatus === "loading"}
                  className="mt-6 w-full cursor-pointer rounded-lg bg-[#3EA6FF] py-3 text-sm font-medium text-black hover:bg-[#5bb3ff] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {forgotStatus === "loading"
                    ? "Resetting..."
                    : "Reset Password"}
                </button>

                <button
                  type="button"
                  onClick={backToLogin}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1 text-sm text-[#AAAAAA] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to sign in
                </button>
              </form>
            )}

            {loginView === "forgot" && forgotStep === "success" && (
              <div className="flex flex-col items-center pt-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1D3B28]">
                  <CheckCircle2 className="h-8 w-8 text-[#4ADE80]" />
                </div>
                <h2 className="mt-5 text-xl font-medium text-white">
                  Password reset successful
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#AAAAAA]">
                  Your password has been updated. You can now sign in with your
                  new password.
                </p>
                <button
                  type="button"
                  onClick={() => setOpenLoginModal(false)}
                  className="mt-6 w-full cursor-pointer rounded-lg bg-[#3EA6FF] py-3 text-sm font-medium text-black hover:bg-[#5bb3ff]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={backToLogin}
                  className="mt-3 w-full cursor-pointer rounded-lg border border-[#303030] py-3 text-sm font-medium text-white hover:bg-[#272727]"
                >
                  Back to sign in
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RightSideHeader;
