"use client";


import { Card } from "@heroui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TChartDayData {
  day: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
  count: number;
}

interface RecipeChartProps {
  data: TChartDayData[];
}

export default function RecipeChart({ data }: RecipeChartProps) {
  return (
    <Card className="lg:col-span-2 p-5 bg-white/3 border border-white/5 rounded-2xl flex flex-col justify-between">
      <div>
        <h2 className="text-sm font-bold text-white">Activity Overview</h2>
        <p className="text-[11px] text-white/40 mt-0.5 font-medium">Number of recipes published in the last 7 days.</p>
      </div>
      
      <div className="w-full h-64 pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" style={{ fontSize: '11px' }} />
            <YAxis stroke="rgba(255,255,255,0.3)" style={{ fontSize: '11px' }} allowDecimals={false} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
              contentStyle={{ backgroundColor: '#14110f', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} 
            />
            <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}