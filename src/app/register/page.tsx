"use client";

import { Button, Description, FieldError, Form, Input, Label, Spinner, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { FiCheckCircle, FiHeart, FiEye, FiEyeOff, FiBookOpen } from 'react-icons/fi';
import { LuSparkles, LuUserPlus } from 'react-icons/lu';
import { FcGoogle } from 'react-icons/fc';
import { PiChefHat } from 'react-icons/pi';
import { signIn, signUp } from '@/lib/auth-client';

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData(e.currentTarget);

      const name = form.get("name") as string;
      const image = form.get("image") as string;
      const email = form.get("email") as string;
      const password = form.get("password") as string;



      const { data, error } = await signUp.email({
        name:name,
        image:image,
        email:email,
        password:password
      });

      if (data) {
        toast.success("Welcome to the Nest! Registration successful 🚀");
        router.push('/login');
        e.currentTarget.reset();
      }

      if (error) {
        toast.error(error.message || "Registration failed");
      }
    } catch (err: any) {
      const errorMessage = err?.message || err?.error || "Something went wrong during sign up";
      toast.error(errorMessage);
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
    // ফিক্সড ন্যাভবারের নিচে গ্যাপ রাখার জন্য pt-24 এবং mt-6 ব্যবহার করা হয়েছে
    <div className="min-h-screen  text-white pt-24 pb-12 relative overflow-hidden">

      {/* Background Warm Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-125  bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-125 h-125 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Tailwind Container Utility */}
      <div className="container mx-auto  relative z-10">

        {/* flex lg:items-stretch এর মাধ্যমে দুটি সাইডের উচ্চতা সবসময় সমান (Equal Height) থাকবে */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-6xl mx-auto">

          {/* ================= LEFT SIDE: BRAND SHOWCASE BANNER ================= */}
          <div className="hidden lg:flex w-1/2 bg-[#14110f]/40 border border-white/10 rounded-3xl relative items-center justify-center p-6 xl:p-12 overflow-hidden backdrop-blur-3xl shadow-[0_0_50px_rgba(245,158,11,0.01)]">

            {/* Ambient Glow Inside Banner */}
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

              {/* Value Propositions */}
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
              <span className="text-[10px] font-bold tracking-widest text-amber-400/80 uppercase">Join Our Kitchen</span>
            </div>

            <h2 className="bg-linear-to-r from-white to-amber-200 bg-clip-text text-transparent font-black text-2xl sm:text-3xl tracking-tight mb-1.5">
              Create Your Account
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mb-6">
              Join RecipeNest to explore, review, and share your culinary creations.
            </p>

            <Form className="flex flex-col gap-4 w-full" onSubmit={handleSignUp}>
              <TextField isRequired name="name" type="text">
                <Label className={labelClass}>Full Name</Label>
                <Input placeholder="Enter your full name" className={inputClass} />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <TextField isRequired name="image" type="url">
                <Label className={labelClass}>Avatar Photo URL</Label>
                <Input placeholder="https://example.com/avatar.jpg" className={inputClass} />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

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

              {/* Password Field */}
              <TextField
                isRequired
                minLength={8}
                name="password"
                type={showPassword ? "text" : "password"}
                validate={(value) => {
                  if (value.length < 8) return "Password must be at least 8 characters";
                  if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
                  if (!/[a-z]/.test(value)) return "Password must contain a lowercase letter";
                  if (!/[0-9]/.test(value)) return "Password must contain a number";
                  return null;
                }}
              >
                <Label className={labelClass}>Password</Label>
                <div className="relative w-full flex items-center">
                  <Input placeholder="••••••••" className={inputClass} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-white/40 hover:text-amber-400 transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                <Description className="text-[10px] text-white/40 mt-1 block leading-relaxed">
                  Must contain 8+ characters with 1 uppercase, 1 lowercase and 1 number.
                </Description>
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <Button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full mt-2 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold tracking-wider py-3 rounded-xl transition-all duration-300 shadow-xl shadow-amber-600/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Spinner size="sm" color="white" /> Creating Account...</>
                ) : (
                  <>
                    <LuUserPlus className="text-sm text-white/90" />
                    <span>Create Account</span>
                  </>
                )}
              </Button>
            </Form>

            <div className="relative my-5 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <span className="relative bg-[#13100e] px-3 text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                or continue with
              </span>
            </div>

            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || googleLoading}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98] disabled:opacity-50"
            >
              {googleLoading ? <Spinner size="sm" color="current" /> : <><FcGoogle className="text-xl" /><span>Google Authenticate</span></>}
            </Button>

            <p className="mt-6 text-center text-sm text-white/50">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4 decoration-amber-500/40"
              >
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default RegisterPage;