"use client"

import { EllipsisVertical, User } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

function RightSideHeader() {

    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    return (
        <div ref={dropdownRef} className='flex flex-row justify-center items-center gap-2'>
            <button className='cursor-pointer hover:bg-gray-500 hover:rounded-4xl p-1' onClick={() => setOpen(!open)}><EllipsisVertical color='white' /></button>
            {
                open && <div className='absolute top-16 right-6 bg-[#272727] rounded-lg py-2 px-4 flex flex-col gap-2'>
                    <button className='text-white hover:bg-gray-700 rounded-lg py-1 px-2 text-left'>Settings</button>
                    <button className='text-white hover:bg-gray-700 rounded-lg py-1 px-2 text-left'>Help</button>
                </div>
            }
            <button className='flex flex-row justify-center items-center text-white border rounded-3xl py-1.5 px-2 border-white hover:bg-gray-700 cursor-pointer'><User color='white' /> Sign in</button>
        </div>
    )
}

export default RightSideHeader