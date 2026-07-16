import React from "react";
import { Card } from "@heroui/react";
import { FiHeart, FiAward, FiUsers } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white space-y-12 min-h-screen">
      
      {/* 🌟 হেডার সেকশন */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black tracking-wide bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
          About RecipeNest
        </h1>
        <p className="text-sm text-white/60 max-w-xl mx-auto font-medium">
          Where culinary passion meets community. We are building the ultimate space for chefs and food lovers to share their creations.
        </p>
      </div>

      {/* 🍳 আমাদের গল্প */}
      <Card className="p-6 bg-white/3 border border-white/5 rounded-2xl space-y-3">
        <h2 className="text-xl font-bold text-orange-400 flex items-center gap-2">
          Our Story 🍳
        </h2>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
          RecipeNest was born out of a simple idea: making recipe sharing beautiful, fast, and accessible. 
          Whether you are a professional chef hosting your signature dishes or a home cook experimenting 
          with new flavors, our platform provides the perfect tools to showcase your culinary journey.
        </p>
      </Card>

      {/* ⚡ আমাদের বৈশিষ্ট্য (Core Pillars) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-white/3 border border-white/5 rounded-2xl space-y-2">
          <div className="p-3 w-fit rounded-xl bg-orange-500/10 text-orange-400">
            <FiHeart size={20} />
          </div>
          <h3 className="text-sm font-bold">Built with Love</h3>
          <p className="text-xs text-white/40 font-medium">Designed meticulously to give food creators the stage they truly deserve.</p>
        </Card>

        <Card className="p-5 bg-white/3 border border-white/5 rounded-2xl space-y-2">
          <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-400">
            <FiUsers size={20} />
          </div>
          <h3 className="text-sm font-bold">Community First</h3>
          <p className="text-xs text-white/40 font-medium">Connect with fellow foodies, explore diverse global cuisines, and grow together.</p>
        </Card>

        <Card className="p-5 bg-white/3 border border-white/5 rounded-2xl space-y-2">
          <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-400">
            <FiAward size={20} />
          </div>
          <h3 className="text-sm font-bold">Premium Quality</h3>
          <p className="text-xs text-white/40 font-medium">Clean interfaces, zero clutter, and pure focus on high-fidelity food presentation.</p>
        </Card>
      </div>

    </div>
  );
}