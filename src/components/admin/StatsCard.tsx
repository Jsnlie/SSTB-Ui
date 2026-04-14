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
    <div className="h-full min-h-[152px] rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
      <div className="flex h-full items-start justify-between gap-4">
        <div className="flex h-full min-h-[84px] flex-1 flex-col justify-between pr-2">
          <p className="min-h-[48px] text-[15px] leading-6 font-semibold text-slate-600">
            {title}
          </p>
          <p className="text-[44px] leading-none font-bold text-gray-900">{value}</p>
        </div>
        <div className={`mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${bgColor}`}>
          <Icon size={28} className={color} />
        </div>
      </div>
    </div>
  );
}
