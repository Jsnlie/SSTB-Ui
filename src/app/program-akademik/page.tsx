"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { apiUrl } from "../../lib/api";

interface ProgramStudiItem {
  id: number;
  slug: string;
  name: string;
  level: string;
  duration: string;
  totalCredits: number;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  degree: string;
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

function parseProgramStudiList(payload: any): ProgramStudiItem[] {
  const source = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.items)
        ? payload.items
        : [];

  return source.map((item: any) => ({
    id: toNumberSafe(item?.id),
    slug: toStringSafe(item?.slug),
    name: toStringSafe(item?.name),
    level: toStringSafe(item?.level),
    duration: toStringSafe(item?.duration),
    totalCredits: toNumberSafe(item?.totalCredits),
    description: toStringSafe(item?.description),
    heroTitle: toStringSafe(item?.heroTitle),
    heroSubtitle: toStringSafe(item?.heroSubtitle),
    degree: toStringSafe(item?.degree),
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

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export default function ProgramAkademikPage() {
  const [programs, setPrograms] = useState<ProgramStudiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setError("");
        const res = await fetch(apiUrl("/api/program-studi"));

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(getErrorMessage(text, "Gagal memuat data program akademik"));
        }

        const json = await res.json();
        setPrograms(parseProgramStudiList(json));
      } catch (err: unknown) {
        setPrograms([]);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat data program akademik");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const sortedPrograms = useMemo(() => {
    return [...programs].sort((a, b) => {
      const levelCompare = a.level.localeCompare(b.level);
      if (levelCompare !== 0) return levelCompare;
      return a.name.localeCompare(b.name);
    });
  }, [programs]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#002366] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#002366] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">Program Akademik</h1>
          <p className="text-xl text-gray-200">
            Pilih program studi yang sesuai dengan panggilan pelayanan Anda
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {error && (
          <div className="mb-6 p-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
            {error}
          </div>
        )}

        {sortedPrograms.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
            Program akademik belum tersedia.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPrograms.map((program) => (
              <Link
                key={program.id || program.slug}
                href={`/program-akademik/${program.slug}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl text-[#002366] mb-2 group-hover:text-[#C41E3A] transition-colors">
                    {program.heroTitle || program.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {program.heroSubtitle || `${program.level} • ${program.degree}`}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1 text-[#C41E3A]" />
                      <span>{program.duration || "-"}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen size={14} className="mr-1 text-[#C41E3A]" />
                      <span>{program.totalCredits > 0 ? `${program.totalCredits} SKS` : "-"}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                    {truncate(program.description || "Program ini belum memiliki deskripsi.", 180)}
                  </p>

                  <span className="inline-flex items-center text-[#C41E3A] text-sm group-hover:underline">
                    Lihat Detail
                    <ArrowRight className="ml-1" size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
