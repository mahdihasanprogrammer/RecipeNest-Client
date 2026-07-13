"use client";

import { motion } from "framer-motion";

// ১. টাইপ সেফটির জন্য ইন্টারফেস ডিফাইন
interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

export default function FaqSection() {
    // ২. রিয়েল ও প্রাসঙ্গিক FAQ ডেটা
    const faqData: FaqItem[] = [
        {
            id: "faq-1",
            question: "Is RecipeNest free to use?",
            answer: "Yes, RecipeNest is completely free for home cooks and chefs to browse, search, and save recipes. You can access thousands of community culinary processes without any subscription."
        },
        {
            id: "faq-2",
            question: "Can I edit a recipe after posting?",
            answer: "Absolutely. You retain complete ownership of your culinary blueprints. Simply navigate to your Personal Dashboard, select the recipe, and update the ingredients, instructions, or macro metrics instantly."
        },
        {
            id: "faq-3",
            question: "How accurate are the macro-nutrient calculations?",
            answer: "Our automated system breaks down hydration ratios, calories, and macros based on standard nutritional databases. While highly accurate for core ingredients, slight variations may occur depending on specific local brands."
        },
        {
            id: "faq-4",
            question: "Can I save recipes from other chefs for offline use?",
            answer: "Yes, you can bookmark any public recipe to your unified hub. If you install the RecipeNest PWA (Progressive Web App) on your device, you can view your bookmarked archives even without an active internet connection."
        },
        {
            id: "faq-5",
            question: "What makes RecipeNest different from standard food blogs?",
            answer: "We focus strictly on true-to-life engineering roadmaps for food. No long filler stories, no unnecessary fluff text—just clean, precise molecular variables, হাইড্রেশন লগ, temperature scales, and execution methods."
        }
    ];

    // ফ্রেমার মোশন অ্যানিমেশন ভ্যারিয়েন্টস
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } 
        }
    };

    return (
        <section className="relative w-full bg-[#0c0908] py-16 md:py-24 border-b border-white/5 px-4 sm:px-6 lg:px-8">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="w-full max-w-3xl mx-auto relative z-10">
                
                {/* Section Header */}
                <div className="text-center space-y-3 mb-12">
                    <span className="text-[10px] bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                        Questions & Answers
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                        Frequently Asked <span className="text-orange-400">Questions</span>
                    </h2>
                    <p className="text-sm text-white/50 max-w-md mx-auto">
                        Everything you need to know about managing, scaling, and preserving your recipes on RecipeNest.
                    </p>
                </div>

                {/* FAQ List Content */}
                <motion.div 
                    className="space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {faqData.map((faq) => (
                        <motion.div
                            key={faq.id}
                            variants={itemVariants}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:border-orange-500/30 group"
                        >
                            <h3 className="text-base md:text-lg font-bold text-white group-hover:text-orange-400 transition-colors duration-200">
                                {faq.question}
                            </h3>
                            <p className="mt-2.5 text-sm text-white/60 leading-relaxed">
                                {faq.answer}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}