'use client'
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Menu (☰) and Close (✖) icons

export default function Taskbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="top-0 left-0 w-full h-16 bg-black flex justify-between items-center px-6 md:px-16 border-b-2 border-white">
            {/* Logo / Instagram Link */}
            <Link target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ChrisGarciaNextlevel/" className="group flex items-center space-x-2">
                <img src="/NextLevelLogo.png" alt="NextLevel Logo" className="h-8 w-8" />
                <div className="text-white border-b-2 border-transparent group-hover:border-white transition duration-300">
                    NextLevel Insurance
                </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
                {["Home", "Contact Us", "About Us", "News", "FAQ", "CanopyConnect"].map((item, index) => (
                    <Link key={index} href={`/${item === "Home" ? "" : item.replace(/\s/g, "")}`} className="group">
                        <div className="text-white border-b-2 border-transparent group-hover:border-white transition duration-300">
                            {item}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>

            {/* Mobile Dropdown Menu */}
            <div className={`absolute top-16 left-0 w-full bg-black flex flex-col items-center py-4 space-y-4 transition-all duration-300 ease-in-out z-50 ${isOpen ? "block" : "hidden"} md:hidden`}>
                {["Home", "Contact Us", "About Us", "News", "FAQ", "CanopyConnect"].map((item, index) => (
                    <Link key={index} href={`/${item === "Home" ? "" : item.replace(/\s/g, "")}`} className="text-white hover:underline" onClick={() => setIsOpen(false)}>
                        {item}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
