"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Calendar } from "../../components/ui/calendar";
import { apiUrl } from "../../lib/api";
import { parseAcaraListResponse, type AcaraItem } from "../../lib/acara";
import { getErrorMessage } from "../../lib/response";

function toDateOnly(value: string): Date | null {
  if (!value) return null;
  const parsed = new Date(value.includes("T") ? value : `${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
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

function formatAcaraTime(value: string) {
  if (!value) return "-";

  const normalized = value.trim();
  const match = normalized.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (!match) return normalized;

  return `${match[1].padStart(2, "0")}.${match[2]}`;
}

function formatSelectedDate(value: Date) {
  return value.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function compareAcara(a: AcaraItem, b: AcaraItem) {
  const aDate = toDateOnly(a.date)?.getTime() ?? Number.MAX_SAFE_INTEGER;
  const bDate = toDateOnly(b.date)?.getTime() ?? Number.MAX_SAFE_INTEGER;

  if (aDate !== bDate) return aDate - bDate;
  return a.time.localeCompare(b.time);
}

export default function KegiatanPublicPage() {
  const today = useMemo(() => new Date(), []);

  const [events, setEvents] = useState<AcaraItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [month, setMonth] = useState<Date>(today);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        setError("");
        const res = await fetch(apiUrl("/api/Acara"));

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(getErrorMessage(text, "Gagal memuat data acara"));
        }

        const json = await res.json();
        setEvents(parseAcaraListResponse(json));
      } catch (err: unknown) {
        setEvents([]);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat acara");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const sortedEvents = useMemo(() => {
    return [...events].sort(compareAcara);
  }, [events]);

  const markedDates = useMemo(() => {
    const map = new Map<string, Date>();

    sortedEvents.forEach((item) => {
      const parsed = toDateOnly(item.date);
      if (!parsed) return;

      const key = `${parsed.getFullYear()}-${parsed.getMonth()}-${parsed.getDate()}`;
      map.set(key, parsed);
    });

    return Array.from(map.values());
  }, [sortedEvents]);

  const eventsOnSelectedDate = useMemo(() => {
    if (!selectedDate) return [];

    return sortedEvents.filter((item) => {
      const parsed = toDateOnly(item.date);
      return parsed ? sameDay(parsed, selectedDate) : false;
    });
  }, [selectedDate, sortedEvents]);

  return (
    <div>
      <div className="relative h-80 bg-[#002366] flex items-center justify-center">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl text-white">Kegiatan Acara Kampus</h1>
          <div className="h-1 w-24 bg-[#C41E3A] mx-auto mt-4"></div>
          <p className="text-gray-200 text-base md:text-lg mt-4 max-w-2xl mx-auto px-4">
            Lihat jadwal dan informasi acara kampus untuk mahasiswa dan civitas STTB.
          </p>
        </div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1470&auto=format&fit=crop"
          alt="Acara Kampus"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <CalendarDays size={20} className="text-[#002366]" />
              <h2 className="text-2xl text-[#002366]">Daftar Kegiatan Acara</h2>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-24 rounded-lg bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : sortedEvents.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
                Belum ada acara yang tersedia.
              </div>
            ) : (
              <div className="space-y-4">
                {sortedEvents.map((item) => {
                  const eventDate = toDateOnly(item.date);
                  const activeByDate =
                    !!selectedDate && !!eventDate && sameDay(selectedDate, eventDate);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (!eventDate) return;
                        setSelectedDate(eventDate);
                        setMonth(eventDate);
                        setSelectedEventId(item.id);
                      }}
                      className={`w-full text-left bg-white rounded-lg border p-5 transition-all ${
                        activeByDate
                          ? "border-[#002366] ring-2 ring-[#002366]/10"
                          : "border-gray-200 hover:border-[#002366]/30"
                      }`}
                    >
                      <p className="text-lg text-[#002366]">{item.title}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={14} />
                          {formatAcaraDate(item.date)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock3 size={14} />
                          {formatAcaraTime(item.time)} WIB
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    month={month}
                    onMonthChange={setMonth}
                    selected={selectedDate}
                    onSelect={(value) => {
                      setSelectedDate(value);
                      setSelectedEventId(null);
                    }}
                    modifiers={{ hasEvent: markedDates }}
                    modifiersClassNames={{
                      hasEvent:
                        "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-[#C41E3A]",
                    }}
                    className="p-0"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                <h3 className="text-[#002366] mb-2">
                  {selectedDate
                    ? `Acara ${formatSelectedDate(selectedDate)}`
                    : "Pilih tanggal"}
                </h3>

                {!selectedDate || eventsOnSelectedDate.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Tidak ada acara pada tanggal ini.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {eventsOnSelectedDate.map((item) => (
                      <div key={item.id} className="rounded-lg border border-gray-200 p-3">
                        <p className="text-sm text-[#002366]">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1 inline-flex items-center gap-1">
                          <CalendarDays size={12} />
                          {formatAcaraDate(item.date)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{formatAcaraTime(item.time)} WIB</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}