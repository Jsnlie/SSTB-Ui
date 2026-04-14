"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Library,
  Clapperboard,
  DollarSign,
  Newspaper,
  CalendarDays,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import StatsCard from "../../../components/admin/StatsCard";
import Link from "next/link";
import { apiUrl } from "../../../lib/api";
import {
  BeritaItem,
  formatBeritaDate,
  parseBeritaListResponse,
} from "../../../lib/berita";
import { parseAdmissionListResponse } from "../../../lib/admin-admisi";
import { getTotalAdminMedia } from "../../../lib/admin-media";
import { getTotalAdminEbook } from "../../../lib/admin-perpustakaan";

const AUTO_REFRESH_INTERVAL_MS = 30_000;

interface AcaraItem {
  id: number;
  title: string;
  date: string;
  time: string;
}

interface DashboardCounts {
  programStudi: number;
  mataKuliah: number;
  berita: number;
  kegiatan: number;
  media: number;
  ebook: number;
  biayaStudi: number;
}

interface ActivityItem {
  id: string;
  title: string;
  timestamp: number;
  dotColor: string;
}

function toStringSafe(value: unknown) {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return String(value);
}

function toNumberSafe(value: unknown) {
  if (typeof value === "number") return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractArray(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
}

function parseAcaraListResponse(payload: any): AcaraItem[] {
  const source = extractArray(payload);

  return source.map((item: any) => ({
    id: toNumberSafe(item?.id),
    title: toStringSafe(item?.title),
    date: toStringSafe(item?.date),
    time: toStringSafe(item?.time),
  }));
}

function getErrorMessage(text: string, fallback: string) {
  if (!text) return fallback;
  try {
    const parsed = JSON.parse(text);
    return parsed?.message || parsed?.title || fallback;
  } catch {
    return text;
  }
}

function toDateOnly(value: string): Date | null {
  if (!value) return null;

  const parsed = new Date(value.includes("T") ? value : `${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

function toTimestamp(value: string): number {
  if (!value) return 0;

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) return parsed.getTime();

  const dateOnly = toDateOnly(value);
  return dateOnly ? dateOnly.getTime() : 0;
}

function formatAcaraDate(value: string) {
  const parsed = toDateOnly(value);
  if (!parsed) return value || "-";

  return parsed.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatRelativeTime(timestamp: number) {
  if (!timestamp) return "-";

  const diffMs = timestamp - Date.now();
  const absMs = Math.abs(diffMs);

  const minuteMs = 60_000;
  const hourMs = 3_600_000;
  const dayMs = 86_400_000;

  if (absMs < minuteMs) return "baru saja";

  const formatter = (value: number, unit: string) =>
    diffMs >= 0 ? `${value} ${unit} lagi` : `${value} ${unit} lalu`;

  if (absMs < hourMs) {
    return formatter(Math.floor(absMs / minuteMs), "menit");
  }

  if (absMs < dayMs) {
    return formatter(Math.floor(absMs / hourMs), "jam");
  }

  return formatter(Math.floor(absMs / dayMs), "hari");
}

function getKegiatanStatus(value: string): "Upcoming" | "Selesai" {
  const parsed = toDateOnly(value);
  if (!parsed) return "Upcoming";

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return parsed.getTime() < today.getTime() ? "Selesai" : "Upcoming";
}

function getProgressPercentage(value: number, total: number) {
  if (total <= 0) return "0%";
  return `${Math.min(100, Math.round((value / total) * 100))}%`;
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<DashboardCounts>({
    programStudi: 0,
    mataKuliah: 0,
    berita: 0,
    kegiatan: 0,
    media: getTotalAdminMedia(),
    ebook: getTotalAdminEbook(),
    biayaStudi: 0,
  });
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([]);
  const [kegiatanList, setKegiatanList] = useState<AcaraItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const isFetchingRef = useRef(false);

  const fetchJson = useCallback(
    async (path: string, fallbackLabel: string, headers: HeadersInit) => {
      const res = await fetch(apiUrl(path), {
        headers,
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(getErrorMessage(text, `Gagal memuat data ${fallbackLabel}`));
      }

      return res.json();
    },
    []
  );

  const fetchDashboardData = useCallback(
    async ({ silent = false }: { silent?: boolean } = {}) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      if (silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        setError("");
        const token = localStorage.getItem("token");
        const headers: HeadersInit = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const [programStudiPayload, mataKuliahPayload, beritaPayload, kegiatanPayload, admissionPayload] =
          await Promise.all([
            fetchJson("/api/program-studi", "program studi", headers),
            fetchJson("/api/mata-kuliah", "mata kuliah", headers),
            fetchJson("/api/berita", "berita", headers),
            fetchJson("/api/Acara", "kegiatan", headers),
            fetchJson("/api/admission", "biaya studi", headers),
          ]);

        const programStudi = extractArray(programStudiPayload);
        const mataKuliah = extractArray(mataKuliahPayload);
        const berita = parseBeritaListResponse(beritaPayload);
        const kegiatan = parseAcaraListResponse(kegiatanPayload);
        const admission = parseAdmissionListResponse(admissionPayload);

        setCounts({
          programStudi: programStudi.length,
          mataKuliah: mataKuliah.length,
          berita: berita.length,
          kegiatan: kegiatan.length,
          media: getTotalAdminMedia(),
          ebook: getTotalAdminEbook(),
          biayaStudi: admission.length,
        });
        setBeritaList(berita);
        setKegiatanList(kegiatan);
        setLastUpdated(new Date());
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat dashboard");
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
        isFetchingRef.current = false;
      }
    },
    [fetchJson]
  );

  useEffect(() => {
    fetchDashboardData();

    const intervalId = window.setInterval(() => {
      fetchDashboardData({ silent: true });
    }, AUTO_REFRESH_INTERVAL_MS);

    const handleFocus = () => {
      fetchDashboardData({ silent: true });
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchDashboardData]);

  const recentBerita = useMemo(() => {
    return [...beritaList]
      .sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date))
      .slice(0, 4);
  }, [beritaList]);

  const recentKegiatan = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const upcoming = kegiatanList
      .filter((item) => {
        const parsed = toDateOnly(item.date);
        return parsed ? parsed.getTime() >= today.getTime() : false;
      })
      .sort((a, b) => toTimestamp(a.date) - toTimestamp(b.date));

    if (upcoming.length > 0) {
      return upcoming.slice(0, 4);
    }

    return [...kegiatanList]
      .sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date))
      .slice(0, 4);
  }, [kegiatanList]);

  const latestActivities = useMemo<ActivityItem[]>(() => {
    const beritaActivities = beritaList.map((item) => ({
      id: `berita-${item.id}`,
      title: `Berita: ${item.title}`,
      timestamp: toTimestamp(item.date),
      dotColor: "bg-green-500",
    }));

    const kegiatanActivities = kegiatanList.map((item) => ({
      id: `kegiatan-${item.id}`,
      title: `Kegiatan: ${item.title}`,
      timestamp: toTimestamp(item.date),
      dotColor: "bg-blue-500",
    }));

    return [...beritaActivities, ...kegiatanActivities]
      .filter((item) => item.timestamp > 0)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 4);
  }, [beritaList, kegiatanList]);

  const monthlyStats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const beritaBulanIni = beritaList.filter((item) => {
      const parsed = new Date(item.date);
      if (Number.isNaN(parsed.getTime())) return false;
      return (
        parsed.getMonth() === currentMonth &&
        parsed.getFullYear() === currentYear
      );
    }).length;

    const kegiatanMendatang = kegiatanList.filter((item) => {
      const parsed = toDateOnly(item.date);
      return parsed ? parsed.getTime() >= today.getTime() : false;
    }).length;

    const kegiatanSelesai = kegiatanList.filter((item) => {
      const parsed = toDateOnly(item.date);
      return parsed ? parsed.getTime() < today.getTime() : false;
    }).length;

    return {
      beritaBulanIni,
      kegiatanMendatang,
      kegiatanSelesai,
    };
  }, [beritaList, kegiatanList]);

  if (loading && !lastUpdated) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-gray-500">
          Data dashboard tersinkron otomatis setiap 30 detik
          {lastUpdated
            ? ` • Terakhir diperbarui ${lastUpdated.toLocaleTimeString("id-ID")}`
            : ""}
        </p>

        <button
          type="button"
          onClick={() => fetchDashboardData({ silent: true })}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-60"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Memperbarui..." : "Refresh"}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        <StatsCard
          title="Total Program Studi"
          value={counts.programStudi}
          icon={GraduationCap}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatsCard
          title="Total Mata Kuliah"
          value={counts.mataKuliah}
          icon={BookOpen}
          color="text-emerald-600"
          bgColor="bg-emerald-50"
        />
        <StatsCard
          title="Total Berita"
          value={counts.berita}
          icon={Newspaper}
          color="text-amber-600"
          bgColor="bg-amber-50"
        />
        <StatsCard
          title="Total Kegiatan"
          value={counts.kegiatan}
          icon={CalendarDays}
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
        <StatsCard
          title="Total Media"
          value={counts.media}
          icon={Clapperboard}
          color="text-indigo-600"
          bgColor="bg-indigo-50"
        />
        <StatsCard
          title="Total Ebook"
          value={counts.ebook}
          icon={Library}
          color="text-rose-600"
          bgColor="bg-rose-50"
        />
        <StatsCard
          title="Total Biaya Studi"
          value={counts.biayaStudi}
          icon={DollarSign}
          color="text-cyan-600"
          bgColor="bg-cyan-50"
        />
      </div>

      {/* Quick overview row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h2>
            <TrendingUp size={20} className="text-gray-400" />
          </div>
          {latestActivities.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada aktivitas yang bisa ditampilkan.</p>
          ) : (
            <div className="space-y-3">
              {latestActivities.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <div className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                  <span className="text-gray-600 truncate">{item.title}</span>
                  <span className="ml-auto text-gray-400 text-xs whitespace-nowrap">
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Ringkasan Data Bulan Ini</h2>
            <TrendingUp size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Berita bulan ini</span>
                <span className="font-medium text-gray-800">{monthlyStats.beritaBulanIni}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#1E3A8A] h-2 rounded-full"
                  style={{ width: getProgressPercentage(monthlyStats.beritaBulanIni, counts.berita) }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Kegiatan mendatang</span>
                <span className="font-medium text-gray-800">{monthlyStats.kegiatanMendatang}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#1E3A8A] h-2 rounded-full"
                  style={{ width: getProgressPercentage(monthlyStats.kegiatanMendatang, counts.kegiatan) }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Kegiatan selesai</span>
                <span className="font-medium text-gray-800">{monthlyStats.kegiatanSelesai}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#1E3A8A] h-2 rounded-full"
                  style={{ width: getProgressPercentage(monthlyStats.kegiatanSelesai, counts.kegiatan) }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Berita */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Berita Terbaru</h2>
            <Link href="/admin/berita" className="text-sm text-[#1E3A8A] hover:underline">
              Lihat semua
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentBerita.map((item) => (
              <div key={`${item.id}-${item.title}`} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatBeritaDate(item.date)}</p>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium bg-green-50 text-green-700"
                >
                  {item.category || "Berita"}
                </span>
              </div>
            ))}
            {recentBerita.length === 0 && (
              <div className="px-6 py-8 text-sm text-center text-gray-400">
                Belum ada berita.
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Kegiatan */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Kegiatan Mendatang</h2>
            <Link href="/admin/kegiatan" className="text-sm text-[#1E3A8A] hover:underline">
              Lihat semua
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentKegiatan.map((item) => (
              <div key={`${item.id}-${item.title}`} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatAcaraDate(item.date)}</p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    getKegiatanStatus(item.date) === "Upcoming"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {getKegiatanStatus(item.date)}
                </span>
              </div>
            ))}
            {recentKegiatan.length === 0 && (
              <div className="px-6 py-8 text-sm text-center text-gray-400">
                Belum ada kegiatan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
