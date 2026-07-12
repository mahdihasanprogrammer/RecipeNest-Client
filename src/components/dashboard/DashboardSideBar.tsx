"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar } from '@heroui/react';
import { PiChefHat } from 'react-icons/pi';
import { 
  FiGrid, FiBookOpen, FiPlusCircle, FiUser, FiLogOut, 
   FiUsers, FiChevronRight, FiArrowLeft 
} from 'react-icons/fi';
import { toast } from 'sonner';
import { signOut } from '@/lib/auth-client';

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  role: 'user' | 'admin'
}

interface DashboardSidebarProps {
  session: any;
  userRole: string;
}

export default function DashboardSidebar({ user, userRole }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // কোড রিডিউস করার জন্য ম্যাপ স্টাইল রাউট ডেটা আর্কিটেকচার
  const sidebarNavigation: SidebarItem[] = [
    { label: 'Dashboard Home', path: '/dashboard/user', icon: FiGrid, role: 'user' },
    { label: 'Dashboard Home', path: '/dashboard/admin', icon: FiGrid, role: 'admin' },
    { label: 'My Recipes', path: '/dashboard/user/my-recipes', icon: FiBookOpen, role: 'user' },
    { label: 'Add Recipe', path: '/dashboard/user/add-recipe', icon: FiPlusCircle, role: 'user' },
    { label: 'Manage Recipes', path: '/dashboard/admin/manage-recipes', icon: FiBookOpen, role: 'admin' },
    { label: 'Manage Users', path: '/dashboard/admin/manage-users', icon: FiUsers, role: 'admin' },
    { label: 'Profile', path: '/dashboard/user/profile', icon: FiUser, role: 'user' },
    { label: 'Profile', path: '/dashboard/admin/profile', icon: FiUser, role: 'admin' },
  ];

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully! 🍳");
            router.push('/login');
          }
        }
      });
    } catch (err) {
      toast.error("Logout failed.");
    }
  };

  const isActive = (path: string) => pathname === path;


  // রোল অনুযায়ী নেভিগেশন ম্যাপ ফিল্টারিং
  const filteredNavigation = sidebarNavigation.filter(item => 
     item.role === userRole
  );

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-[#14110f]/40 border-r border-white/10 p-5 shrink-0 justify-between overflow-hidden">
      
      {/* TOP SECTION: BRAND LOGO & BACK LINK */}
      <div className="flex flex-col gap-5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <PiChefHat className="text-white text-base" />
          </div>
          <p className="font-black text-base tracking-wider text-white">
            Recipe<span className="text-amber-400 font-bold">Nest</span>
          </p>
        </Link>

        <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-[11px] font-semibold px-3 py-2 bg-white/5 border border-white/10 rounded-xl">
          <FiArrowLeft size={13} />
          <span>Back to Marketing Site</span>
        </Link>

        <div className="h-px w-full bg-linear-to-r from-white/10 to-transparent my-1" />

        {/* DYNAMIC NAVIGATION MAP */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[9px] font-black uppercase tracking-widest text-white/40 px-3 mb-2">
            {userRole} Portal
          </p>
          
          {filteredNavigation.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={index}
                href={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all group ${
                  active 
                    ? 'bg-linear-to-r from-amber-600/20 to-orange-600/10 text-amber-400 border border-amber-500/20' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`text-base ${active ? 'text-amber-400' : 'text-white/40 group-hover:text-amber-400/80'}`} />
                  <span>{item.label}</span>
                </div>
                {active && <FiChevronRight size={12} className="text-amber-400" />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* BOTTOM SECTION: HERO UI AVATAR & LOGOUT */}
      <div className="flex flex-col gap-4 mt-auto">
        
       

        <div className="h-px w-full bg-white/5" />

        {/* User Identity Box with HeroUI Account Anatomy */}
        <div className="flex items-center gap-3 p-2 bg-white/3 border border-white/5 rounded-2xl">
          <Avatar className="w-9 h-9 rounded-full overflow-hidden shrink-0 ring-2 ring-amber-500/20">
            <Avatar.Image 
              src={user?.image || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c"} 
              alt={user?.name || "Chef"} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <Avatar.Fallback className="bg-amber-600 text-white font-black flex items-center justify-center text-xs w-full h-full">
              {(user?.name || "C").charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-amber-400">{user?.userRole}</p>
            <p className="text-xs font-bold text-white truncate leading-tight">{user?.name || "Chef"}</p>
            <p className="text-[10px] text-white/40 truncate mt-0.5">{user?.email}</p>
          </div>
        </div>

        {/* Action Logout button */}
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-rose-400/90 hover:text-rose-400 hover:bg-rose-500/5 bg-white/3 border border-white/5 hover:border-rose-500/10 rounded-xl transition-all text-left cursor-pointer"
        >
          <FiLogOut className="text-sm" />
          <span>Exit Session</span>
        </button>
      </div>

    </aside>
  );
}