"use client";

import React from "react";
import clsx from "clsx";
import { useSidebarStore } from "@/stores/sidebarStore";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isOpen } = useSidebarStore();

  return (
    <div className="min-h-screen bg-hero-pattern bg-cover">
      <Navbar />
      <Sidebar />

      {/* Main Content */}
      <main
        className={clsx(
          "pt-28 transition-all duration-300",
          isOpen ? "md:ml-64" : "md:ml-20",
        )}
      >
        <h1 className="text-center text-3xl font-bold mt-2">
          Selamat Datang Di Website Persebaya Surabaya
        </h1>
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
