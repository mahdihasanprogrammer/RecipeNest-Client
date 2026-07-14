"use client";

import { Skeleton, Card } from "@heroui/react";

export default function DashboardSkeleton() {
  return (
    <div className="flex h-screen w-full bg-[#14110f] text-white overflow-hidden">
      
      {/* ১. সাইডবার স্কেলেটন */}
      <aside className="hidden md:flex flex-col w-64 h-full border-r border-white/10 p-6 space-y-6 bg-white/5">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl bg-white/15" />
          <Skeleton className="w-28 h-5 rounded-lg bg-white/15" />
        </div>
        
        <div className="space-y-5 pt-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-2">
              <Skeleton className="w-5 h-5 rounded-md bg-white/15" />
              <Skeleton className="w-24 h-4 rounded-md bg-white/15" />
            </div>
          ))}
        </div>
      </aside>

      {/* মেইন কন্টেন্ট এরিয়া */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        

        {/* ৩. ড্যাশবোর্ড বডি স্কেলেটন */}
        <div className="p-6 md:p-8 space-y-8 flex-1">
          
          {/* স্ট্যাটস কার্ড গ্রিড */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4" shadow="none">
                <div className="flex justify-between items-center">
                  <Skeleton className="w-24 h-4 rounded-md bg-white/15" />
                  <Skeleton className="w-8 h-8 rounded-xl bg-white/15" />
                </div>
                <Skeleton className="w-16 h-7 rounded-lg bg-white/15" />
                <Skeleton className="w-32 h-3 rounded-md bg-white/15" />
              </Card>
            ))}
          </div>

          {/* মেইন কন্টেন্ট ও টেবিল সেকশন */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* বড় টেবিল কন্টেইনার */}
            <Card className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl space-y-5" shadow="none">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="w-40 h-5 rounded-lg bg-white/15" />
                <Skeleton className="w-20 h-8 rounded-xl bg-white/15" />
              </div>
              
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 py-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full bg-white/15" />
                    <div className="space-y-2">
                      <Skeleton className="w-28 h-4 rounded-md bg-white/15" />
                      <Skeleton className="w-20 h-3 rounded-md bg-white/15" />
                    </div>
                  </div>
                  <Skeleton className="w-16 h-4 rounded-md bg-white/15" />
                </div>
              ))}
            </Card>

            {/* সাইড রিসেন্ট অ্যাক্টিভিটি */}
            <Card className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-5" shadow="none">
              <Skeleton className="w-32 h-5 rounded-lg bg-white/15 mb-2" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-3 py-1">
                  <Skeleton className="w-full h-4 rounded-md bg-white/15" />
                  <Skeleton className="w-2/3 h-3 rounded-md bg-white/15" />
                </div>
              ))}
            </Card>

          </div>

        </div>
      </main>

    </div>
  );
}