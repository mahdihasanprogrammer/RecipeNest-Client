import React from "react";
import { Card } from "@heroui/react";
import { FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

// 🔍 TypeScript Interface (এরর মুক্ত কোডের জন্য)
interface IBlogPost {
  _id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  readTime: string;
  date: string;
}

// 📂 মক ব্লগ ডাটা (টাইপ সেফ)
const mockBlogs: IBlogPost[] = [
  {
    _id: "blog-1",
    title: "5 Secret Tips to Make Your Baking Softer",
    excerpt: "Baking is a science. Discover the five crucial mistakes you might be making with your flour and oven temperature control.",
    coverImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    author: "Sarah Jenkins",
    readTime: "4 min read",
    date: "July 12, 2026",
  },
  {
    _id: "blog-2",
    title: "Understanding Spice Pairings in Indian Cuisine",
    excerpt: "Unlock the ultimate flavor profiles by understanding how cumin, cardamom, and garam masala work together in harmony.",
    coverImage: "https://images.unsplash.com/photo-1596797038530-2c107229654b",
    author: "Chef Rahul",
    readTime: "6 min read",
    date: "July 15, 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white space-y-8 min-h-screen">
      
      {/* 🌟 হেডার সেকশন */}
      <div>
        <h1 className="text-3xl font-black tracking-wide">Culinary Insights 📖</h1>
        <p className="text-xs text-white/40 mt-1 font-medium">Tips, tricks, and food stories curated by top culinary experts.</p>
      </div>

      {/* 📰 ব্লগ পোস্ট গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockBlogs.map((blog: IBlogPost) => (
          <Card 
            key={blog._id} 
            className="bg-white/3 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-orange-500/20 transition-all duration-300"
          >
            {/* ইমেজ সেকশন */}
            <div className="relative h-48 w-full bg-white/5 overflow-hidden">
              <Image 
                src={blog.coverImage} 
                alt={blog.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            {/* কন্টেন্ট সেকশন */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                {/* মেটা ইনফো */}
                <div className="flex items-center gap-3 text-[10px] text-white/40 font-semibold tracking-wider uppercase">
                  <span className="flex items-center gap-1"><FiUser /> {blog.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><FiClock /> {blog.readTime}</span>
                </div>
                
                {/* টাইটেল ও ডেসক্রিপশন */}
                <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-white/60 line-clamp-3 leading-relaxed font-medium">
                  {blog.excerpt}
                </p>
              </div>

              {/* রিড মোর বাটন/লিংক */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-white/40 font-medium">
                <span>{blog.date}</span>
                <Link 
                  href={`/blog/${blog._id}`} 
                  className="flex items-center gap-1.5 text-orange-400 font-bold hover:text-orange-300 transition-colors group/btn"
                >
                  Read Article 
                  <FiArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}