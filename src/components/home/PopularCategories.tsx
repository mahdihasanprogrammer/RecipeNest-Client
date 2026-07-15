import { FiChevronRight } from "react-icons/fi";

const PopularCategories = () => {
  const categories = [
    { name: "Desserts & Cakes", icon: "🍰", count: 24 },
    { name: "Seafood Special", icon: "🍤", count: 18 },
    { name: "Steaks & Grills", icon: "🥩", count: 32 },
    { name: "Healthy & Vegan", icon: "🥗", count: 15 },
  ];

  return (
    <div className="py-12 relative overflow-hidden">
      {/* 👑 হেডার */}
      <div className="relative border-b border-white/10 pb-6 mb-8 text-center flex flex-col items-center justify-center">
        <div className="space-y-2 max-w-2xl relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-orange-400 uppercase">
            🍔 Quick Browse
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Popular <span className="bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Categories</span>
          </h2>
        </div>
      </div>

      {/* 🎴 গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-4">
        {categories.map((cat) => (
          <div key={cat.name} className="bg-linear-to-b from-white/3 to-transparent border border-white/10 rounded-[1.8rem] p-6 flex flex-col items-center justify-between text-center group hover:border-white/20 transition-all cursor-pointer">
            <span className="text-4xl mb-3 group-hover:scale-105 transition-transform">{cat.icon}</span>
            <div>
              <h3 className="text-base font-black text-white">{cat.name}</h3>
              <p className="text-[11px] text-white/40 mt-0.5">{cat.count} Recipes Available</p>
            </div>
            <div className="mt-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-bold">
              Explore <FiChevronRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;