import { FiMessageSquare, FiStar } from "react-icons/fi";
import Image from "next/image";

const TestimonialsSection = () => {
  const reviews = [
    {
      name: "Anika Rahman",
      role: "Home Chef",
      initial: "A",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      comment: "The Secret Vault completely changed my weekend dinners! The Beef Steak recipe was flawless and easy to follow.",
      rating: 5
    },
    {
      name: "Tanvir Ahmed",
      role: "Food Blogger",
      initial: "T",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      comment: "Clean UI, amazing dark theme, and high-quality curated recipes. This is exactly what the foodie community needed.",
      rating: 5
    },
    {
      name: "Sarah Jenkins",
      role: "Pastry Expert",
      initial: "S",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
      comment: "I tried the Lava Cake recipe from the dessert section. The instructions were precise and the taste was professional!",
      rating: 5
    },
    {
      name: "Sajid Islam",
      role: "Culinary Student",
      initial: "S",
      image: "", // ফ্যালব্যাক চেক করার জন্য খালি রাখা হলো
      comment: "As a student, the step-by-step guidance here is a lifesaver. Learned so many unique kitchen hacks already.",
      rating: 5
    }
  ];

  return (
    <div className="py-12  mx-auto relative overflow-hidden">
      {/* 🔮 ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-orange-500/2 rounded-full blur-[80px] pointer-events-none" />

      {/* 👑 স্লিক সেন্ট্রাল হেডার */}
      <div className="relative border-b border-white/10 pb-6 mb-8 text-center flex flex-col items-center justify-center">
        <div className="space-y-2 max-w-2xl relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-orange-400 uppercase">
            💬 Reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            What Our <span className="bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Foodies Say</span>
          </h2>
        </div>
      </div>

      {/* 🎴 ৪-কলামের রিভিউ কার্ড গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
        {reviews.map((rev, index) => (
          <div key={index} className="bg-linear-to-b from-white/3 to-transparent border border-white/10 rounded-[1.8rem] p-4 flex flex-col justify-between relative group hover:border-white/20 transition-all duration-300">
            
            {/* কোট আইকন */}
            <FiMessageSquare className="absolute top-6 right-6 text-white/10 text-xl group-hover:text-orange-500/20 transition-colors" />

            <div className="space-y-4">
              {/* স্টার রেটিং */}
              <div className="flex gap-1 text-orange-400">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <FiStar key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              
              {/* কমেন্ট */}
              <p className="text-xs md:text-sm text-white/70 italic leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            {/* 👤 ইউজার প্রোফাইল এরিয়া (ইমেজ + ফ্যালব্যাক লজিক) */}
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
              <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center relative overflow-hidden shrink-0">
                {rev.image ? (
                  <Image
                    src={rev.image}
                    alt={rev.name}
                    fill
                    sizes="40px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <span className="font-black text-orange-400 uppercase text-sm">
                    {rev.initial}
                  </span>
                )}
              </div>
              <div className="truncate">
                <h4 className="text-sm font-black text-white truncate">{rev.name}</h4>
                <p className="text-[10px] text-white/40 font-medium truncate">{rev.role}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;