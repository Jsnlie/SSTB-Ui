import Link from "next/link";
import { ArrowRight, Clapperboard } from "lucide-react";
import { adminMediaSectionConfigs } from "../../../../lib/admin-media";

export default function MediaOverviewPage() {
	return (
		<div className="space-y-6">
			<div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
				OJS tidak dikelola melalui CMS. Section media yang tersedia hanya Artikel, Jurnal, Bulletin, Monograf, dan Video.
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
				{adminMediaSectionConfigs.map((item) => (
					<Link
						key={item.section}
						href={`/admin/media/${item.section}`}
						className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<div className="inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#1E3A8A]">
									<Clapperboard size={14} />
									{item.menuLabel}
								</div>
								<h2 className="mt-4 text-lg font-semibold text-gray-900">CMS {item.label}</h2>
								<p className="mt-2 text-sm text-gray-500">
									Kelola dummy data {item.label.toLowerCase()} dengan pola tampilan yang sama seperti CMS perpustakaan.
								</p>
							</div>
							<ArrowRight className="mt-1 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-[#1E3A8A]" size={18} />
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
