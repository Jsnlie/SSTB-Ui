"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, User, Calendar, BookOpen, Tag } from "lucide-react";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card } from "../../components/ui/card";
import { fetchMediaItems, MediaItem, mediaItems } from "../../lib/media";
import { ScrollReveal } from "../../components/ScrollReveal";

export default function MediaLibraryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { id: "all", label: "All Media" },
    { id: "article", label: "Article" },
    { id: "video", label: "Video" },
    { id: "journal", label: "Journal" },
    { id: "bulletin", label: "Bulletin" },
    { id: "monograph", label: "Monograph" },
    { id: "ojs", label: "OJS" },
  ];

  const handleOjsClick = () => {
    window.open("https://e-journal.sttb.ac.id/index.php/transformatio", "_blank");
  };

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError("");
        const result = await fetchMediaItems();
        setItems(result);
      } catch (error: unknown) {
        setItems([]);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Gagal memuat data media");
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    const matchesTab = activeTab === "all" || item.type.toLowerCase() === activeTab;

    if (!normalizedQuery) {
      return matchesTab;
    }

    const searchableText = [
      item.title,
      item.author,
      item.description,
      item.type,
      item.categoryLabel,
      item.meta,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchesTab && searchableText.includes(normalizedQuery);
  });

  const featuredByType = useMemo(() => {
    const find = (type: MediaItem["type"]) => items.find((item) => item.type === type) || null;
    return {
      article: find("Article"),
      journal: find("Journal"),
      video: find("Video"),
      monograph: find("Monograph"),
      bulletin: find("Bulletin"),
    };
  }, [items]);

  const showFeaturedAllLayout = activeTab === "all" && !normalizedQuery && items.length > 0;

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <ScrollReveal y={28} amount={0.2}>
      <section className="relative overflow-hidden h-80 flex items-center justify-center bg-[#071f55]">
        <Image
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1600&auto=format&fit=crop"
          alt="Media Library"
          fill
          className="absolute inset-0 h-full w-full object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 bg-[#082c76]/78" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2f7f]/25 via-[#082366]/55 to-[#06163e]/75" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white text-4xl md:text-5xl leading-tight font-semibold drop-shadow-[0_2px_18px_rgba(0,0,0,0.25)]">
            Media Library
          </h1>
          <div className="mx-auto mt-4 h-1 w-24 bg-[#C41E3A]" />
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-white/92 drop-shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
            Explore our curated selection of multidisciplinary research, cinematic records,
            and scholarly monographs.
          </p>
        </div>
      </section>
      </ScrollReveal>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <ScrollReveal>
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-100/60 p-2 rounded-2xl border border-gray-200/60 items-center">
            <Search className="text-gray-400 h-5 w-5 ml-4" />
            <Input 
              placeholder="Search by title, author, or category..." 
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="flex-1 border-0 bg-transparent shadow-none h-12 focus-visible:ring-0 text-base"
            />
            <div className="h-8 w-px bg-gray-300 mx-2 hidden md:block" />
            {/* <Button variant="ghost" className="h-12 px-4 gap-2 text-gray-700 hover:bg-gray-200/50 font-medium whitespace-nowrap hidden md:flex">
              All Categories <Filter className="h-4 w-4" />
            </Button> */}
            {/* <Button className="h-12 px-8 bg-[#0c34a6] hover:bg-[#0c34a6]/90 rounded-xl text-base font-semibold text-white ml-2 whitespace-nowrap">
              <Filter className="h-4 w-4 mr-2" /> Apply
            </Button> */}
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <Tabs defaultValue="all" value={activeTab} onValueChange={(val) => {
          if (val === 'ojs') {
            handleOjsClick();
          } else {
            setActiveTab(val);
          }
        }} className="mb-12">
          <TabsList className="bg-transparent h-auto p-0 gap-3 flex-wrap justify-start">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="rounded-full px-6 py-2 data-[state=active]:bg-[#0c34a6] data-[state=active]:text-white bg-gray-200/70 hover:bg-gray-300/70 text-gray-700 text-sm font-semibold transition-colors shadow-none border-0"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        </ScrollReveal>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : showFeaturedAllLayout ? (
           <div className="flex flex-col lg:flex-row gap-6">
             {/* Left Column */}
             <div className="w-full lg:w-1/3 flex flex-col gap-6">
               {featuredByType.article && <ScrollReveal><MediaCard item={featuredByType.article} /></ScrollReveal>}
               {featuredByType.journal && <ScrollReveal delay={0.06}><MediaCard item={featuredByType.journal} /></ScrollReveal>}
             </div>
             {/* Right Column */}
             <div className="w-full lg:w-2/3 flex flex-col gap-6">
               {featuredByType.video && <ScrollReveal><MediaCard item={featuredByType.video} /></ScrollReveal>}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {featuredByType.monograph && <ScrollReveal><MediaCard item={featuredByType.monograph} /></ScrollReveal>}
                 {featuredByType.bulletin && <ScrollReveal delay={0.06}><MediaCard item={featuredByType.bulletin} /></ScrollReveal>}
               </div>
             </div>
           </div>
        ) : (
           <>
             {filteredItems.length === 0 ? (
               <ScrollReveal>
               <div className="rounded-2xl border border-dashed border-gray-300 bg-white/70 p-10 text-center">
                 <p className="text-lg font-semibold text-gray-800">Tidak ada media yang cocok</p>
                 <p className="text-sm text-gray-500 mt-2">
                   Coba kata kunci lain atau ganti tab kategori.
                 </p>
               </div>
               </ScrollReveal>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {filteredItems.map((item, index) => (
                   <div key={item.id} className={item.type === "Video" ? "col-span-1 lg:col-span-2" : ""}>
                     <ScrollReveal delay={index * 0.06} amount={0.18}><MediaCard item={item} /></ScrollReveal>
                   </div>
                 ))}
               </div>
             )}
           </>
        )}
      </div>
    </div>
  );
}

function MediaCard({ item }: { item: MediaItem }) {
  const detailHref = `/media/${item.slug}`;
  const releaseDate = new Date(item.releaseDate);
  const releaseDateLabel = Number.isNaN(releaseDate.getTime())
    ? "-"
    : releaseDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

  if (item.type === "Video") {
    return (
      <Link href={detailHref} className="block">
        <Card className="col-span-1 lg:col-span-2 overflow-hidden group border-0 shadow-none rounded-[2rem] relative min-h-[460px] cursor-pointer">
          <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-gray-950 flex flex-col justify-end p-10 z-10" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white w-full z-20">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all border border-white/20">
                <div className="w-4 h-5 rounded-sm bg-white ml-1" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-xs font-bold tracking-[0.2em] text-[#d93025] uppercase flex items-center gap-2">
                   {item.meta} {item.theme && <><span className="text-white/50">•</span> <span className="text-white/70">{item.theme}</span></>}
                 </span>
                 <h3 className="text-3xl md:text-3xl font-bold font-sans tracking-tight">{item.title}</h3>
              </div>
            </div>
            {item.description && item.description !== "Video belum memiliki deskripsi." && (
              <p className="text-gray-300 max-w-2xl text-[16px] leading-relaxed opacity-90 block pt-2 ml-[4.5rem]">
                {item.description}
              </p>
            )}
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={detailHref} className="block h-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-none transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-lg">
        <div className="relative">
          <Image
            src={item.image}
            alt={item.title}
            width={800}
            height={520}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#0b2f86] shadow-sm">
            {item.categoryLabel || item.type}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
           <span className="inline-block w-fit px-2 py-1 text-xs rounded-full bg-[#eef2ff] text-[#002366] mb-2">
              {item.type}
            </span>
          <h3 className="text-xl font-bold text-[#061538] mb-2 line-clamp-2 [font-family:Georgia,_Times_New_Roman,_serif]">
            {item.title}
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-gray-600 line-clamp-2">
            {item.description}
          </p>

          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
            {/* <span className="inline-flex items-center gap-1.5">
              <User size={13} className="text-[#0b2f86]" />
             {item.author}
            </span> */}
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} className="text-[#0b2f86]" />
              {releaseDateLabel}
            </span>
            {item.isbn && (
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={13} className="text-[#0b2f86]" />
                <span className="line-clamp-1 break-all max-w-[150px]">ISBN: {item.isbn}</span>
              </span>
            )}
          </div>

          <div className="mt-auto inline-flex h-10 items-center justify-center rounded-lg bg-[#0c34a6] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0a2d90]">
            Liat selengkapnya
          </div>
        </div>
      </Card>
    </Link>
  );
}
