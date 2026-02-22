'use client';

import React from 'react';
import clsx from 'clsx';
import { useSidebarStore } from '@/stores/sidebarStore';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isOpen } = useSidebarStore();

  return (
    <div
      className='min-h-screen bg-persebaya-bg bg-cover bg-center bg-no-repeat'
      // style={{
      //   backgroundImage: "url('/img1.png')",
      // }}
    >
      {/* <Image
        src="/img1.png"
        alt="backround"
        className="absolute top-0 left-0 grayscale -z-100 w-full h-full"
        width={1000}
        height={1000}
        quality={100}
      /> */}
      <Navbar />
      <Sidebar />
      {/* Main Content */}
      <main className={clsx('pt-28 transition-all duration-300', isOpen ? 'md:ml-64' : 'md:ml-20')}>
        <div className='p-4 md:p-6 lg:p-8'>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
