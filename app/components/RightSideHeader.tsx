"use client";

import { EllipsisVertical, User } from "lucide-react";
import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";
import React, { useEffect, useRef, useState } from "react";

function RightSideHeader() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const [openSignupModal, setOpenSignupModal] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

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
            <button onClick={() => setOpenSignupModal((prev) => !prev)} className="flex flex-row justify-center items-center text-white border rounded-3xl py-1.5 px-2 border-white hover:bg-gray-700 cursor-pointer">
                <User color="white" /> Sign in
            </button>


            {openSignupModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setOpenSignupModal(false)}>
                    <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4 relative">

                        <button
                            type="button"
                            onClick={() => setOpenSignupModal(false)}
                            className="absolute top-3 right-3 text-xl cursor-pointer"
                        >
                            ×
                        </button>

                        <h2 className="text-2xl font-bold text-center">
                            Create Account
                        </h2>

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="border p-2 rounded"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="border p-2 rounded"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="border p-2 rounded"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
                        >
                            Create Account
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default RightSideHeader;
