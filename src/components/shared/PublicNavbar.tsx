"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Spinner, Avatar } from '@heroui/react';
import { PiChefHat } from 'react-icons/pi';
import { FiLogOut, FiUser, FiPlusCircle, FiBookOpen, FiGrid, FiShield, FiMenu, FiX } from 'react-icons/fi';
import { toast } from 'sonner';
import { useSession, signOut } from '@/lib/auth-client';
import { TUser } from '@/types/interface';

export default function PublicNavbar() {
  const { data: session, isPending } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  // Hide navbar on dashboard routes

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (pathname.includes('/dashboard')) return null;
  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully! See you soon 🍳");
            router.push('/login');
          }
        }
      });
    } catch (err: unknown) {
      toast.error((err as any).message || "Logout failed. Please try again.");
    }
  };

  const isActive = (path: string) => pathname === path;
  const isAdmin = (session?.user as TUser)?.userRole === 'admin';

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-[#0f0d0b]/90 backdrop-blur-md border-b border-white/10 text-white transition-all">
      {/* Tailwind Container Utility applied here */}
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">

          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <PiChefHat className="text-white text-lg" />
              </div>
              <p className="font-black text-lg tracking-wider text-white">
                Recipe<span className="text-amber-400 font-bold">Nest</span>
              </p>
            </Link>
          </div>

          {/* Desktop Routes */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-amber-400' : 'text-white/70 hover:text-white'}`}>
              Home
            </Link>
            <Link href="/recipes" className={`text-sm font-medium transition-colors ${isActive('/recipes') ? 'text-amber-400' : 'text-white/70 hover:text-white'}`}>
              Explore Recipes
            </Link>
            <Link href="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-amber-400' : 'text-white/70 hover:text-white'}`}>
              About
            </Link>
            <Link href="/blog" className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-amber-400' : 'text-white/70 hover:text-white'}`}>
              Blog
            </Link>
          </div>

          {/* Auth Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <Spinner size="sm" color="warning" />
            ) : session ? (
              /* Profile Dropdown Container */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none rounded-full ring-2 ring-amber-500/50 hover:ring-amber-400 transition-all p-0.5"
                >
                  {/* HeroUI v3.1.0 Compound Component Anatomy */}
                  <Avatar className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
                    <Avatar.Image
                      src={session.user.image || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c"}
                      alt={session.user.name || "Chef"}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <Avatar.Fallback className="bg-amber-600 text-white font-bold flex items-center justify-center text-xs w-full h-full">
                      {(session.user.name || "C").charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                </button>

                {/* Dropdown Menu Items */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#14110f] border border-white/10 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-white/5">
                      <p className="text-xs text-white/50">Signed in as</p>
                      <p className="text-sm font-bold text-amber-400 truncate">{session.user.email}</p>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => { router.push('/dashboard/admin'); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-orange-300 hover:bg-white/5 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <FiShield className="text-orange-400" /> Admin Panel
                      </button>
                    )}

                    <button
                      onClick={() => { router.push('/dashboard/user'); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FiGrid className="text-amber-400" /> Dashboard
                    </button>
                    <button
                      onClick={() => { router.push('/dashboard/user/add-recipe'); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FiPlusCircle className="text-amber-400" /> Add Recipe
                    </button>
                    <button
                      onClick={() => { router.push('/dashboard/user/my-recipes'); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FiBookOpen className="text-amber-400" /> My Recipes
                    </button>
                    <button
                      onClick={() => { router.push('/dashboard/user/profile'); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FiUser className="text-amber-400" /> My Profile
                    </button>

                    <div className="border-t border-white/5 mt-1">
                      <button
                        onClick={() => { handleLogout(); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <FiLogOut /> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs rounded-xl transition-all duration-300 shadow-md shadow-amber-600/10">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Trigger (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-white/80 hover:text-white focus:outline-none"
            >
              {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#0f0d0b]/95 border-t border-white/10 px-4 pt-2 pb-6 space-y-1">
          <Link href="/" onClick={() => setIsMobileOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:text-white hover:bg-white/5">
            Home
          </Link>
          <Link href="/recipes" onClick={() => setIsMobileOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:text-white hover:bg-white/5">
            Explore Recipes
          </Link>
          <Link href="/about" onClick={() => setIsMobileOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:text-white hover:bg-white/5">
            About
          </Link>
          <Link href="/blog" onClick={() => setIsMobileOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:text-white hover:bg-white/5">
            Blog
          </Link>

          <div className="pt-4 border-t border-white/10 mt-4">
            {session ? (
              <div className="space-y-1">
                {isAdmin && (
                  <Link href="/dashboard/admin" onClick={() => setIsMobileOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-orange-400 hover:bg-white/5">
                    Admin Panel
                  </Link>
                )}
                <Link href="/dashboard/user" onClick={() => setIsMobileOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-amber-400 hover:bg-white/5">
                  Dashboard
                </Link>
                <Link href="/dashboard/user/add-recipe" onClick={() => setIsMobileOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:bg-white/5">
                  Add Recipe
                </Link>
                <Link href="/dashboard/user/my-recipes" onClick={() => setIsMobileOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:bg-white/5">
                  My Recipes
                </Link>
                <button onClick={() => { handleLogout(); setIsMobileOpen(false); }} className="w-full text-left block px-3 py-2 rounded-lg text-base font-medium text-rose-400 hover:bg-rose-500/10">
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 px-3">
                <Link href="/login" onClick={() => setIsMobileOpen(false)} className="text-center w-full py-2 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/5">
                  Login
                </Link>
                <Link href="/register" onClick={() => setIsMobileOpen(false)} className="text-center w-full py-2 bg-linear-to-r from-amber-600 to-orange-600 text-white rounded-xl text-sm font-semibold">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}