"use client";

import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { toast } from "sonner";

const CallToAction = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address!");
      return;
    }

    // 🚀 ফ্রন্টএন্ড সাকসেস টোস্ট মেসেজ
    toast.success("Successfully Subscribed! Welcome to the Vault. 🎉");
    
    // ইনপুট ফিল্ড খালি করা
    setEmail("");
  };

  return (
    <div className="py-12 max-w-5xl mx-auto  relative overflow-hidden">
      <div className="bg-linear-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-white/10 rounded-[2rem] p-5 md:p-14 text-center relative overflow-hidden">
        {/* ব্যাকগ্রাউন্ড লাইটিং গ্লো */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-orange-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none">
            Never Miss a <span className="bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Secret Taste</span>
          </h2>
          <p className="text-xs md:text-sm text-white/50 max-w-md mx-auto">
            Subscribe to our recipe vault newsletter and get premium curated food updates directly into your inbox every Sunday.
          </p>
          
          {/* 📬 ফর্ম সাবমিশন লজিক */}
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full bg-black/40 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md"
          >
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your secret email..." 
              className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-hidden"
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-linear-to-r from-orange-500 to-amber-500 text-black font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 active:scale-95 duration-200"
            >
              Subscribe <FiSend className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;