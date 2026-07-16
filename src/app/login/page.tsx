"use client";

import { Button, Form, Input, Label, Spinner, TextField, FieldError } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { FiCheckCircle, FiHeart, FiEye, FiEyeOff, FiBookOpen, FiLogIn, FiUser, FiShield } from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';
import { FcGoogle } from 'react-icons/fc';
import { PiChefHat } from 'react-icons/pi';
import { signIn } from '@/lib/auth-client';
import { TUser } from '@/types/interface';

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData(e.currentTarget);
      const email = form.get("email") as string;
      const password = form.get("password") as string;

      const { data, error }= await signIn.email({
        email,
        password,
      }) as { data: { user: TUser } | null, error: { message: string } | null };

      if (data) {
        toast.success("Welcome back to the kitchen! 🍳");
        router.push(data?.user?.userRole === 'admin' ? '/dashboard/admin' : '/dashboard/user');
      }
      if (error) {
        toast.error(error.message || "Authentication failed");
      }
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (userRole: 'user' | 'admin') => {
    try {
      setLoading(true);
      const credentials = {
        user: { email: 'demo.user@recipenest.com', password: 'Password123' },
        admin: { email: 'demo.admin@recipenest.com', password: 'Password123' }
      };

      const selected = credentials[userRole];

      const { data, error } = await signIn.email({
        email: selected.email,
        password: selected.password,
      });

      if (data) {
        toast.success(`Logged in safely as Demo ${userRole === 'admin' ? 'Admin' : 'User'} ✨`);
        router.push(userRole === 'admin' ? '/dashboard/admin' : '/dashboard/user');
      }
      if (error) {
        toast.error(error.message);
      }
    } catch (err: any) {
      toast.error('Demo authentication routine encountered an issue');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      await signIn.social({
        provider: "google",
      });
    } catch (err: any) {
      toast.error(err?.message || 'Google sign-in failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-500/60 focus:bg-white/10 transition-all duration-200";
  const labelClass = "text-xs font-semibold tracking-wider text-amber-300 uppercase mb-1 block";

  return (
    // ফিক্সড ন্যাভবারের নিচে পারফেক্ট গ্যাপ রাখার জন্য pt-24
    <div className="min-h-screen bg-[#0f0d0b] text-white pt-24 pb-12 relative overflow-hidden">
      
      {/* Background Warm Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-125 h-125 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Tailwind Container Utility */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* items-stretch এর মাধ্যমে লেফট এবং রাইট সাইড সবসময় সমান হাইট বজায় রাখবে */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 xl:gap-10 max-w-5xl mx-auto">
          
          {/* ================= LEFT SIDE: BRAND SHOWCASE BANNER ================= */}
          <div className="hidden lg:flex w-1/2 bg-[#14110f]/40 border border-white/10 rounded-3xl relative items-center justify-center p-8 xl:p-12 overflow-hidden backdrop-blur-3xl shadow-[0_0_50px_rgba(245,158,11,0.01)]">
            
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-600/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-orange-600/10 rounded-full blur-[80px]" />

            <div className="relative z-10 w-full max-w-sm flex flex-col gap-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-500/30">
                  <PiChefHat className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-white font-black text-2xl tracking-wider">Recipe<span className="text-amber-400 font-bold">Nest</span></h1>
                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mt-0.5">The Home Cook Ecosystem</p>
                </div>
              </div>

              <div className="h-px w-full bg-linear-to-r from-white/10 to-transparent" />

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3.5 group">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-500/40 transition-colors text-amber-400">
                    <FiCheckCircle size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Verified Home Cooks</h4>
                    <p className="text-xs text-white/50 mt-0.5 leading-relaxed">Interact with authentic recipes structured by genuine cooks worldwide.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 group">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-500/40 transition-colors text-amber-400">
                    <FiBookOpen size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Step-by-Step Clarity</h4>
                    <p className="text-xs text-white/50 mt-0.5 leading-relaxed">No placeholder content. Clear, ordered execution pathways for perfect results.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 group">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-500/40 transition-colors text-amber-400">
                    <FiHeart size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Real Reviews & Ratings</h4>
                    <p className="text-xs text-white/50 mt-0.5 leading-relaxed">An honest system backed by real comments, precise details, and ratings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE: FORM CONTAINER ================= */}
          <div className="w-full lg:w-1/2 bg-linear-to-b from-white/3 to-white/1 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-[0_0_50px_rgba(245,158,11,0.02)] flex flex-col justify-center">
            
            <div className="flex items-center gap-2 mb-2">
              <LuSparkles className="text-amber-400 text-sm animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-amber-400/80 uppercase">Welcome Back</span>
            </div>

            <h2 className="bg-linear-to-r from-white to-amber-200 bg-clip-text text-transparent font-black text-2xl sm:text-3xl tracking-tight mb-1.5">
              Sign In to Nest
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mb-6">
              Access your custom cooking portal and manage your collections.
            </p>

            {/* Quick Sandbox Environment Demo Logins */}
            <div className="grid grid-cols-1 gap-3 mb-5">
              <Button
                type="button"
                isDisabled={loading || googleLoading}
                onClick={() => handleDemoLogin('user')}
                className="w-full bg-white/5 border border-white/10 hover:border-amber-500/30 text-white/80 font-medium text-xs py-2 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <FiUser size={13} className="text-amber-400" />
                <span>Demo User</span>
              </Button>
              {/* <Button
                type="button"
                disabled={loading || googleLoading}
                onClick={() => handleDemoLogin('admin')}
                className="bg-white/5 border border-white/10 hover:border-orange-500/30 text-white/80 font-medium text-xs py-2 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <FiShield size={13} className="text-orange-400" />
                <span>Demo Admin</span>
              </Button> */}
            </div>

            <div className="relative mb-5 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <span className="relative bg-[#0f0d0b] px-2 text-[9px] font-bold tracking-widest text-white/30 uppercase">
                Or Use Credentials
              </span>
            </div>

            <Form className="flex flex-col gap-4 w-full" onSubmit={handleSignIn}>
              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label className={labelClass}>Email Address</Label>
                <Input placeholder="chef@recipenest.com" className={inputClass} />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <TextField isRequired name="password" type={showPassword ? "text" : "password"}>
                <Label className={labelClass}>Password</Label>
                <div className="relative w-full flex items-center">
                  <Input placeholder="••••••••" className={inputClass} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-white/40 hover:text-amber-400 transition-colors focus:outline-none cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <Button
                type="submit"
                isDisabled={loading || googleLoading}
                className="w-full mt-2 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold tracking-wider py-3 rounded-xl transition-all duration-300 shadow-xl shadow-amber-600/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <><Spinner size="sm" className='text-white' /> Logging in...</>
                ) : (
                  <>
                    <FiLogIn className="text-sm text-white/90" />
                    <span>Secure Sign In</span>
                  </>
                )}
              </Button>
            </Form>

            <div className="relative my-5 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <span className="relative bg-[#0f0d0b] px-3 text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                or continue with
              </span>
            </div>

            <Button
              type="button"
              onClick={handleGoogleSignIn}
              isDisabled={loading || googleLoading}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {googleLoading ? <Spinner size="sm" color="current" /> : <><FcGoogle className="text-xl" /><span>Google Authenticate</span></>}
            </Button>

            <p className="mt-6 text-center text-sm text-white/50">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/register"
                className="font-semibold text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4 decoration-amber-500/40"
              >
                Register Here
              </Link>
            </p>
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default LoginPage;