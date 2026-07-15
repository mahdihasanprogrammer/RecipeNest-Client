import React from "react";

// ১. নেভবার স্কেলিটন (Top Header)
export const NavbarSkeleton = () => {
  return (
    <header className="w-full h-16 bg-[#0B0C10]/80 border-b border-white/10 backdrop-blur-xl fixed top-0 inset-x-0 z-50 animate-pulse px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* লোগো প্লেসহোল্ডার */}
        <div className="h-5 w-32 bg-white/10 rounded-lg" />
        
        {/* নেভিগেশন লিংক প্লেসহোল্ডার (ডেস্কটপ) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="h-3.5 w-16 bg-white/5 rounded" />
          <div className="h-3.5 w-16 bg-white/5 rounded" />
          <div className="h-3.5 w-16 bg-white/5 rounded" />
        </div>

        {/* ইউজার প্রোফাইল বা অ্যাকশন বাটন */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-20 bg-orange-500/20 border border-orange-500/10 rounded-xl" />
          <div className="h-8 w-8 bg-white/10 rounded-xl" />
        </div>
      </div>
    </header>
  );
};

// ২. ফুটার স্কেলিটন (Bottom Footer)
export const FooterSkeleton = () => {
  return (
    <footer className="w-full bg-black/20 border-t border-white/5 py-8 mt-auto animate-pulse px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-4 w-28 bg-white/10 rounded" />
          <div className="h-3 w-44 bg-white/5 rounded" />
        </div>
        <div className="flex gap-4">
          <div className="h-7 w-7 bg-white/5 rounded-lg" />
          <div className="h-7 w-7 bg-white/5 rounded-lg" />
          <div className="h-7 w-7 bg-white/5 rounded-lg" />
        </div>
      </div>
    </footer>
  );
};

// ৩. ফুল প্রোজেক্ট অ্যাপ বডি কন্টেইনার
const AppLayoutSkeleton = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col relative overflow-hidden">
      {/* 🔮 ইউনিভার্সাল ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/[0.01] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/[0.01] rounded-full blur-[120px] pointer-events-none" />

      {/* নেভবার */}
      <NavbarSkeleton />

      {/* মেইন ডাইনামিক কন্টেন্ট এরিয়া (নেভবারের জন্য টপ প্যাডিং যুক্ত) */}
      <main className="flex-1 pt-16 relative z-10 w-full max-w-7xl mx-auto">
        {children ? children : (
          /* জেনেরিক বডি ফলব্যাক যদি চিলড্রেন পাস না করা হয় */
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-pulse">
            <div className="h-40 bg-white/[0.02] border border-white/10 rounded-[1.8rem]" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-64 bg-white/[0.02] border border-white/10 rounded-[1.8rem] md:col-span-2" />
              <div className="h-64 bg-white/[0.02] border border-white/10 rounded-[1.8rem]" />
            </div>
          </div>
        )}
      </main>

      {/* ফুটার */}
      <FooterSkeleton />
    </div>
  );
};

export default AppLayoutSkeleton;