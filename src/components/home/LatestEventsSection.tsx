"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { apiUrl } from "../../lib/api";
import { parseAcaraListResponse, type AcaraItem } from "../../lib/acara";
import { getErrorMessage } from "../../lib/response";

const EVENT_IMAGE_FALLBACKS = [
  "https://images.unsplash.com/photo-1583062434105-9bef71509685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1547817651-7fb0cc360536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];


function toDateOnly(value: string): Date | null {
  if (!value) return null;
  const parsed = new Date(value.includes("T") ? value : `${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

function getSortValue(item: AcaraItem) {
  const parsed = toDateOnly(item.date);
  if (!parsed) return Number.MAX_SAFE_INTEGER;
  return parsed.getTime();
}

function formatAcaraDate(value: string) {
  const parsed = toDateOnly(value);
  if (!parsed) return value || "-";

  return parsed.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function LatestEventsSection() {
  const [events, setEvents] = useState<AcaraItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setError("");
        const res = await fetch(apiUrl("/api/Acara"));

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(getErrorMessage(text, "Gagal memuat kegiatan terbaru"));
        }

        const json = await res.json();
        setEvents(parseAcaraListResponse(json));
      } catch (err: unknown) {
        setEvents([]);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat kegiatan terbaru");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const displayEvents = useMemo(() => {
    const sorted = [...events].sort((a, b) => getSortValue(a) - getSortValue(b));

    const today = new Date();
    const todayDateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const upcoming = sorted.filter((item) => {
      const parsed = toDateOnly(item.date);
      return parsed ? parsed.getTime() >= todayDateOnly.getTime() : false;
    });

    const source = upcoming.length > 0 ? upcoming : sorted;
    return source.slice(0, 3);
  }, [events]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl text-[#002366] mb-4">Kegiatan & Acara</h2>
          <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
        </motion.div>

        {error && (
          <div className="mb-6 p-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-80 rounded-lg bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : displayEvents.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
            Belum ada acara untuk ditampilkan.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {displayEvents.map((event, index) => (
              <motion.div
                key={event.id || `${event.title}-${event.date}-${index}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href="/kegiatan"
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group h-full"
                >
                  <ImageWithFallback
                    src={EVENT_IMAGE_FALLBACKS[index % EVENT_IMAGE_FALLBACKS.length]}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h3 className="text-[#002366] mb-3 group-hover:text-[#C41E3A] transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2 text-[#C41E3A]" />
                      <span className="text-sm">{formatAcaraDate(event.date)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/kegiatan"
            className="inline-flex items-center text-[#002366] hover:text-[#C41E3A] transition-colors"
          >
            Lihat Semua Acara
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
