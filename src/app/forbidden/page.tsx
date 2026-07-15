"use client";

import { useRouter } from "next/navigation";
import { FiHome, FiLock, FiArrowLeft } from "react-icons/fi";

const ForbiddenPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 relative overflow-hidden text-center">
      {/* 🔮 ব্যাকগ্রাউন্ড সফট রেড/অরেঞ্জ নিওন গ্লো ইফেক্ট */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-md mx-auto space-y-6">

        {/* 🔒 lock icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 border border-red-500/20 text-red-400 rounded-3xl text-3xl shadow-[0_0_30px_rgba(239,68,68,0.15)] animate-pulse">
          <FiLock />
        </div>

        {/* 🔢 ৪MD বা ৪0৩ বড় টেক্সট */}
        <div className="space-y-2">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-white">
            4<span className="bg-linear-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">0</span>3
          </h1>
          <h2 className="text-xl font-black text-white tracking-tight">
            Secret Kitchen Area! 🛑
          </h2>
          <p className="text-xs md:text-sm text-white/40 font-medium max-w-xs mx-auto leading-relaxed">
            Access Denied. You do not have the clearance or premium membership required to unlock this culinary secret.
          </p>
        </div>

        {/* 🔘 ২ বাটন লেআউট (Home & Back) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto bg-white/5 border border-white/10 hover:border-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 active:scale-95 shadow-inner"
          >
            <FiArrowLeft className="w-3.5 h-3.5" /> Go Back
          </button>

          {/* Home Button */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full sm:w-auto bg-linear-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 active:scale-95 shadow-md shadow-red-500/10"
          >
            <FiHome className="w-3.5 h-3.5" /> Recipe Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;