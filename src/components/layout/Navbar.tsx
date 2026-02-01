"use client";

import React from "react";
import Link from "next/link";
import { Menu, Bell, Settings, LogOut, User, Search } from "lucide-react";
import { useSidebarStore } from "@/stores/sidebarStore";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Image from "next/image";

interface NavbarMenuTypes {
  title: string;
  href: string;
}

const NavbarMenu: NavbarMenuTypes[] = [
  {
    title: "Ticket",
    href: "#",
  },
  {
    title: "Home",
    href: "#",
  },
  {
    title: "Berita",
    href: "#",
  },
  {
    title: "Pertandingan",
    href: "#",
  },
  {
    title: "Tim",
    href: "#",
  },
  {
    title: "Event",
    href: "#",
  },
  {
    title: "Store",
    href: "#",
  },
  {
    title: "Fans",
    href: "#",
  },
  {
    title: "Gallery",
    href: "#",
  },
];

const Navbar: React.FC = () => {
  const { toggleSidebar } = useSidebarStore();

  const userMenuItems = [
    { label: "Profile", onClick: () => console.log("Profile clicked") },
    { label: "Settings", onClick: () => console.log("Settings clicked") },
    { divider: true },
    { label: "Logout", onClick: () => console.log("Logout clicked") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-20  bg-persebaya-primary text-white z-40 flex items-center  shadow-sm">
      <div className="w-full items-center h-16">
        <div className="flex w-full justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              size="sm"
              onClick={toggleSidebar}
              className="md:p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          <Link href="/" className="absolute top-4 left-20 z-10">
            <Image
              src="/logo-small.png"
              width={100}
              height={100}
              alt="logo-persebaya"
            />
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4 my-2 me-2">
            <Button variant="ghost" size="sm" className="p-2 relative">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            <Button variant="ghost" size="sm" className="p-2">
              <Settings className="w-5 h-5 text-white" />
            </Button>

            <div className="hidden md:block w-px h-6 bg-gray-200" />

            <Dropdown
              trigger={
                <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 transition">
                  <span className="hidden md:inline text-sm text-white">
                    Admin
                  </span>
                </div>
              }
              items={userMenuItems}
              align="right"
            />
            {/* Username Field */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  placeholder="Search"
                  // onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center bg-white h-10 z-50">
          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-8">
            {NavbarMenu.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="text-persebaya-text hover:text-gray-500 transition-colors font-medium text-sm uppercase tracking-wider"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
