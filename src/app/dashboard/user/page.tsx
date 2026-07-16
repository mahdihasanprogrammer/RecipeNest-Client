import { Card, Avatar } from "@heroui/react";
import { FiBookOpen, FiCalendar, FiGlobe, FiClock, FiArrowRight } from "react-icons/fi";
import Image from 'next/image';
import Link from 'next/link';
import { getUserDashboardStats } from "@/lib/api/recipes";
import { getUserSession } from "@/lib/session";
import RecipeChart from '@/components/dashboard/RecipeChart';


const UserDashboardHomePage = async () => {
  // ১. সেশন এবং ব্যাকএন্ড ডাটা প্যারালাল ফেচ করা
  const user = await getUserSession();
  
  const {
    totalRecipes,
    todayCreated,
    totalCuisine,
    recentRecipes,
    chartData
  } = await getUserDashboardStats();

  return (
    <div className="space-y-6 p-6 bg-transparent text-white min-h-screen">
      
      {/* 👤 ১. Welcome Banner (সার্ভার সেশন থেকে ডিরেক্ট ডাটা রিড) */}
      <div className="p-6 rounded-2xl bg-linear-to-r from-orange-600/20 via-amber-600/10 to-transparent border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
          <Avatar className="w-16 h-16 rounded-2xl ring-2 ring-orange-500/50">
            {user?.image && <Avatar.Image src={user.image} />}
            <Avatar.Fallback className="text-xl bg-orange-600 font-bold">
              {(user?.name || "C").charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-wide">
              Welcome back, Chef {user?.name || "Guest"}! 🍳
            </h1>
            <p className="text-xs text-white/50 mt-0.5">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* 📊 ২. ৩টি কার্ড (Total, Today, Cuisine) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Recipes */}
        <Card className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-row items-center gap-4">
          <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400 shrink-0">
            <FiBookOpen size={20} />
          </div>
          <div>
            <p className="text-xs text-white/40 font-medium">Total Recipes</p>
            <h3 className="text-xl font-bold mt-0.5">{totalRecipes}</h3>
          </div>
        </Card>

        {/* Today Created */}
        <Card className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-row items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <FiCalendar size={20} />
          </div>
          <div>
            <p className="text-xs text-white/40 font-medium">Today&apos;s Recipes</p>
            <h3 className="text-xl font-bold mt-0.5">{todayCreated} New</h3>
          </div>
        </Card>

        {/* Total Cuisine */}
        <Card className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-row items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
            <FiGlobe size={20} />
          </div>
          <div>
            <p className="text-xs text-white/40 font-medium">Total Cuisines</p>
            <h3 className="text-xl font-bold mt-0.5">{totalCuisine} Types</h3>
          </div>
        </Card>
      </div>

      {/* 📈 ৩. ডাইনামিক চার্ট ও রিসেন্ট ৪ ডাটা */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* চার্ট ক্লায়েন্ট কম্পোনেন্ট */}
        <RecipeChart data={chartData} />

        {/* সাম্প্রতিক ৪টি রেসিপি */}
        <Card className="p-5 bg-white/3 border border-white/5 rounded-2xl">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-white">Recent Recipes</h2>
            <p className="text-[11px] text-white/40 mt-0.5 font-medium">Your last 4 uploaded culinary creations.</p>
          </div>

          <div className="space-y-3.5">
            {recentRecipes && recentRecipes.length > 0 ? (
              recentRecipes.map((recipe) => (
                <div key={recipe._id} className="flex items-center gap-3 p-2 rounded-xl bg-white/2 border border-white/5 hover:border-orange-500/20 transition-all group">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-white/5">
                    <Image 
                      src={recipe.coverImage || '/placeholder.jpg'} 
                      alt={recipe.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-orange-400 transition-colors">
                      {recipe.title}
                    </h4>
                    <p className="text-[10px] text-white/40 flex items-center gap-1 mt-1 font-medium">
                      <FiClock size={10} /> {recipe.createdAt ? new Date(recipe.createdAt).toLocaleDateString() : ""}
                    </p>
                  </div>
                  {/* 🔗 ডিটেইলস আইকন লিংক (শুধু আইকন) */}
                  <Link 
                    href={`/recipes/${recipe._id}`} 
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-orange-500/20 text-white/60 hover:text-orange-400 transition-colors shrink-0"
                  >
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-xs text-white/30 text-center py-6 font-medium">No recent data found.</p>
            )}
          </div>
        </Card>
      </div>

    </div>
  );
};

export default UserDashboardHomePage;