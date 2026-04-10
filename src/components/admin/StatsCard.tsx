import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export default function StatsCard({ title, value, icon: Icon, color, bgColor }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[136px] hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="pr-3">
          <p className="text-[15px] leading-7 font-semibold text-slate-600">{title}</p>
          <p className="text-[44px] leading-none font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${bgColor}`}>
          <Icon size={28} className={color} />
        </div>
      </div>
    </div>
  );
}
