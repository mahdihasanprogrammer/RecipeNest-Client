"use client";

import { TRecipe } from '@/types/interface';
import React from 'react';
import Image from 'next/image';
import { Card, CardFooter, Avatar, Chip, Button } from "@heroui/react";
import { FiClock, FiUsers, FiImage } from "react-icons/fi";
import Link from 'next/link';
import { BsEye } from 'react-icons/bs';

interface RecipeCardProps {
    recipe: TRecipe;
}

// 🟢 কালার ম্যাপিংয়ের জন্য শুধু টেলউইন্ড ক্লাসের নাম ব্যবহার করছি, কোনো কম্পোনেন্ট প্রপ্স না!
const difficultyClasses: Record<string, string> = {
    easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    hard: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
    const difficultyLower = recipe.difficulty?.toLowerCase() || "easy";
    const diffClass = difficultyClasses[difficultyLower] || "bg-white/5 text-white/60 border-white/10";

    return (
        <Card
            className="group relative w-full h-115 bg-linear-to-b from-white/3 to-white/1 border border-white/10 backdrop-blur-3xl rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.07)]"
        >
            {/* 🔮 ব্যাকগ্রাউন্ডেড নিওন গ্লো অরбиটস */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-[50px] group-hover:bg-orange-500/20 group-hover:scale-125 transition-all duration-700 pointer-events-none" />
            <div className="absolute top-1/2 left-1/10 w-28 h-28 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none" />

            {/* ১. কভার ইমেজ সেকশন */}
            <div className="relative w-full h-52.5 overflow-hidden bg-white/5 rounded-2xl border border-white/5 mx-auto">
                {recipe.coverImage ? (
                    <Image
                        src={recipe.coverImage}
                        alt={recipe.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                        className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-xl"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="text-white/20 text-2xl" />
                    </div>
                )}

                {/* মডার্ন ডার্ক ওভারলে গ্রেডিয়েন্ট */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10" />

                {/* কুইজিন ও ডিফিকাল্টি ব্যাজেস (variant, color, size ছাড়া) */}
                <div className="absolute bottom-3 inset-x-3.5 flex items-center justify-between z-20">
                    <Chip
                        className="h-6 bg-black/60 backdrop-blur-lg border border-white/10 text-white text-[10px] font-bold tracking-wider uppercase px-2 rounded-md"
                    >
                        {recipe.cuisine}
                    </Chip>

                    <Chip
                        className={`h-6 font-extrabold text-[10px] uppercase border px-2 rounded-md ${diffClass}`}
                    >
                        {recipe.difficulty}
                    </Chip>
                </div>
            </div>

            {/* ২. মেইন কন্টেন্ট বডি */}
            <div className="py-2 flex flex-col justify-between h-38.5 relative z-10 bg-transparent">
                <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-white tracking-wide truncate group-hover:text-orange-400 transition-colors duration-300">
                        {recipe.title}
                    </h3>
                    <p className="text-xs text-white/40 line-clamp-2 leading-relaxed font-medium">
                        {recipe.shortDesc}
                    </p>
                </div>

                {/* কুক টাইম এবং সার্ভিসিং ইনফো */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-4 pb-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-white/60 font-bold bg-white/3 border border-white/5 px-2.5 py-1 rounded-lg">
                        <FiClock className="w-3.5 h-3.5 text-orange-400" />
                        <span>{recipe.cookTime} Mins</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-white/60 font-bold bg-white/3 border border-white/5 px-2.5 py-1 rounded-lg">
                        <FiUsers className="w-3.5 h-3.5 text-orange-400" />
                        <span>{recipe.servings} Servings</span>
                    </div>
                </div>
            </div>

            {/* ৩. কার্ড ফুটার */}
            <CardFooter className="py-1 h-17.5 bg-transparent border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                    <Avatar className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 font-bold text-white text-xs overflow-hidden shrink-0">
                        {recipe.creatorImage && (
                            <Avatar.Image src={recipe.creatorImage} alt={recipe.creatorName} className="object-cover" />
                        )}
                        <Avatar.Fallback className="bg-linear-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center w-full h-full uppercase text-[10px]">
                            {recipe.creatorName ? recipe.creatorName[0] : "U"}
                        </Avatar.Fallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white/80 max-w-25 truncate">
                            {recipe.creatorName}
                        </span>
                        <span className="text-xs text-white/30 font-semibold tracking-wider mt-1">
                            {recipe.createdAt ? new Date(recipe.createdAt).toDateString() : ""}
                        </span>
                    </div>
                </div>

                {/* 🧡 বাটন (variant, color, size ছাড়া - পুরোপুরি টেলউইন্ড নিয়ন্ত্রিত) */}
                <Link href={`/recipes/${recipe._id}`}>
                    <Button
                        className="w-10 h-9 p-0 min-w-0 bg-orange-500/10 hover:bg-linear-to-r hover:from-orange-500 hover:to-amber-500 text-orange-400 hover:text-white font-bold rounded-xl border border-orange-500/20 hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-orange-500/20 cursor-pointer flex items-center justify-center"
                    >
                        <BsEye className="w-3.5 h-3.5" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default RecipeCard;