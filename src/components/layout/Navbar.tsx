"use client";

import React from "react";
import Link from "next/link";
import { Menu, Bell, Settings, LogOut } from "lucide-react";
import { useSidebarStore } from "@/stores/sidebarStore";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";

const Navbar: React.FC = () => {
  const { toggleSidebar } = useSidebarStore();

  const userMenuItems = [
    { label: "Profile", onClick: () => console.log("Profile clicked") },
    { label: "Settings", onClick: () => console.log("Settings clicked") },
    { divider: true },
    { label: "Logout", onClick: () => console.log("Logout clicked") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center  px-4 md:px-6 shadow-sm">
      <div className=""></div>
      <div className="flex justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="md:p-2"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-persebaya-primary"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-persebaya-primary to-persebaya-primary-hover rounded-lg flex items-center justify-center text-white font-bold">
              FP
            </div>
            <span className="hidden md:inline">FaiSal</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="sm" className="p-2 relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          <Button variant="ghost" size="sm" className="p-2">
            <Settings className="w-5 h-5 text-gray-600" />
          </Button>

          <div className="hidden md:block w-px h-6 bg-gray-200" />

          <Dropdown
            trigger={
              <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 transition">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-persebaya-primary to-persebaya-primary-hover flex items-center justify-center text-white text-sm font-semibold">
                  AB
                </div>
                <span className="hidden md:inline text-sm text-persebaya-text">
                  Admin
                </span>
              </div>
            }
            items={userMenuItems}
            align="right"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
