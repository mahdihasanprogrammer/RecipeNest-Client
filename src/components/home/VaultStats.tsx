import { FiUsers, FiHeart, FiBookOpen } from "react-icons/fi";

const VaultStats = () => {
  const stats = [
    { label: "Secret Recipes", value: "1,200+", icon: <FiBookOpen className="text-orange-400" /> },
    { label: "Master Chefs", value: "450+", icon: <FiUsers className="text-amber-500" /> },
    { label: "Happy Foodies", value: "10K+", icon: <FiHeart className="text-rose-500" /> },
  ];

  return (
    <div className="py-12 my-10 md:my-16 bg-linear-to-b from-white/2 to-transparent border border-white/5 rounded-[2rem] p-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-20 bg-orange-500/2 rounded-full blur-[60px] pointer-events-none" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i} className={`flex flex-col items-center space-y-2 ${i !== 2 ? "md:border-r md:border-white/10" : ""}`}>
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-lg shadow-inner">
              {stat.icon}
            </div>
            <span className="text-3xl font-black text-white tracking-tight">{stat.value}</span>
            <span className="text-xs text-white/40 font-bold uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaultStats;