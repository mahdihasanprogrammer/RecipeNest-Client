import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/session';
import DashboardSidebar from '@/components/dashboard/DashboardSideBar';





export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // SSR সেশন চেক
  const user = await getUserSession()

  if (!user) {
    redirect('/login');
  }

  // userRole বা role ডায়নামিক এক্সট্রাকশন
  const userRole = user.userRole || 'user';

  return (
    <div className="flex h-screen  bg-[#0f0d0b] text-white overflow-hidden">
      
      {/* 1. SSR Fixed Sidebar Component */}
      <DashboardSidebar user={user} userRole={userRole} />

      {/* 2. Scrollable Right Side Content Area */}
      <main className="flex-1 h-screen overflow-y-auto p-4 sm:p-6 lg:p-8">
        {/* Tailwind Container Utility applied here */}
        <div className="container mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}