"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiHeart, FiFacebook } from "react-icons/fi";
import { usePathname } from "next/navigation";

interface SocialLink {
    icon: React.ReactNode;
    href: string;
    label: string;
}

interface SitemapLink {
    label: string;
    href: string;
}

interface SitemapColumn {
    title: string;
    links: SitemapLink[];
}

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // প্রফেশনাল সোশ্যাল লিংকসমূহ (Fully Working)
    const socialLinks: SocialLink[] = [
        { icon: <FiGithub size={18} />, href: "https://github.com/mahdihasanprogrammer", label: "GitHub" },
        { icon: <FiLinkedin size={18} />, href: "https://www.linkedin.com/in/mahdi-hasan-web", label: "LinkedIn" },
        { icon: <FiFacebook size={18} />, href: "https://www.facebook.com/hasan.shardar.1", label: "Facebook" }
    ];

    // শুধুমাত্র কার্যকরী (Working) লিংকগুলোর জন্য সাইটম্যাপ আপডেট করা হলো
    const sitemapColumns: SitemapColumn[] = [
        {
            title: "Company",
            links: [
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" }
            ]
        },
        {
            title: "Explore",
            links: [
                { label: "All Recipes", href: "/recipes" }
            ]
        }
    ];

    const pathName = usePathname();
    
    if (pathName?.includes("/dashboard")) {
        return null; 
    }

    return (
        <footer className="relative w-full bg-[#0c0908] text-white border-t border-white/5 pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
            
            {/* Background Subtle Ambient Light */}
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/5">
                    
                    {/* Brand & Contact Info */}
                    <div className="md:col-span-4 space-y-5">
                        <Link href="/" className="inline-block">
                            <span className="text-xl font-black tracking-tight text-white">
                                Recipe<span className="text-orange-400">Nest</span>
                            </span>
                        </Link>
                        <p className="text-xs text-white/50 leading-relaxed max-w-sm">
                            Preserving tomorrow&apos;s culinary wisdom today. Build your digital formula vault, map your macro nutrition, and share processes with food enthusiasts.
                        </p>
                        
                        {/* 📞 Contact Information (Fully Functional Links) */}
                        <div className="space-y-3 pt-2 text-xs text-white/60">
                            <div className="flex items-center gap-3">
                                <FiMail className="text-orange-400 shrink-0" size={14} />
                                <a href="mailto:support@recipenest.com" className="hover:text-orange-400 transition-colors">
                                    support@recipenest.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiPhone className="text-orange-400 shrink-0" size={14} />
                                <a href="tel:+8801400596304" className="hover:text-orange-400 transition-colors">
                                    +8801400596304
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiMapPin className="text-orange-400 shrink-0" size={14} />
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </div>

                    {/* Sitemap Columns (Rendered based on updated working links) */}
                    <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {sitemapColumns.map((column) => (
                            <div key={column.title} className="space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">
                                    {column.title}
                                </h4>
                                <ul className="space-y-2.5">
                                    {column.links.map((link) => (
                                        <li key={link.href}>
                                            <Link 
                                                href={link.href} 
                                                className="text-sm text-white/60 hover:text-orange-400 transition-colors duration-200 block"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* Social Links Panel (Fully Functional) */}
                    <div className="flex items-center gap-3 order-last sm:order-first">
                        {socialLinks.map((social) => (
                            <Link 
                                key={social.label} 
                                href={social.href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <Button
                                    isIconOnly
                                    aria-label={social.label}
                                    className="w-9 h-9 min-w-9 bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-orange-600 rounded-xl transition-all duration-300 cursor-pointer"
                                >
                                    {social.icon}
                                </Button>
                            </Link>
                        ))}
                    </div>

                    {/* Copyright & Dev Credit */}
                    <div className="flex items-center gap-1.5 text-xs text-white/40 text-center sm:text-right">
                        <span>&copy; {currentYear} RecipeNest. All rights reserved.</span>
                        <span className="hidden sm:inline">|</span>
                        <span className="flex items-center gap-1">
                            Made with <FiHeart size={10} className="text-orange-500 fill-orange-500 animate-pulse" /> Mahdi Hasan
                        </span>
                    </div>

                </div>

            </div>
        </footer>
    );
}