"use client";

import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { Clock, Award, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { getProgramBySlug } from "../data";

interface OverviewAbout {
  id: number;
  text: string;
  programStudiId: number;
}

interface OverviewRequirement {
  id: number;
  text: string;
  programStudiId: number;
}

interface ProgramStudiApi {
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

export default function ProgramDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const program = getProgramBySlug(slug);
  const [activeTab, setActiveTab] = useState("overview");

  const [programApi, setProgramApi] = useState<ProgramStudiApi | null>(null);
  const [abouts, setAbouts] = useState<OverviewAbout[]>([]);
  const [requirements, setRequirements] = useState<OverviewRequirement[]>([]);
  const [loadingOverview, setLoadingOverview] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch(`https://localhost:7013/api/program-studi/${slug}`);
        if (!res.ok) return;
        const data = await res.json();
        const item = data.data ?? data;
        setProgramApi(item);

        const programStudiId = item.id;
        const [aboutRes, reqRes] = await Promise.all([
          fetch(`https://localhost:7013/api/OverviewAbout/programstudi/${programStudiId}`),
          fetch(`https://localhost:7013/api/OverviewRequirement/programstudi/${programStudiId}`),
        ]);

        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();
          setAbouts(Array.isArray(aboutData) ? aboutData : aboutData.data ?? []);
        }
        if (reqRes.ok) {
          const reqData = await reqRes.json();
          setRequirements(Array.isArray(reqData) ? reqData : reqData.data ?? []);
        }
      } catch {
        // fallback to hardcoded data
      } finally {
        setLoadingOverview(false);
      }
    };
    fetchOverview();
  }, [slug]);

  // Use API data for hero/quick-facts if available, otherwise fallback to hardcoded
  const heroTitle = programApi?.heroTitle || program?.heroTitle;
  const heroSubtitle = programApi?.heroSubtitle || program?.heroSubtitle;
  const duration = programApi?.duration || program?.duration;
  const totalCredits = programApi ? `${programApi.totalCredits} SKS` : program?.totalCredits;
  const degree = programApi?.degree || program?.degree;

  if (!program && !programApi && !loadingOverview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl text-[#002366] mb-4">Program Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">
            Program yang Anda cari tidak tersedia.
          </p>
          <Link
            href="/program-akademik"
            className="inline-flex items-center bg-[#C41E3A] text-white px-6 py-2 rounded hover:bg-[#A01829] transition-colors"
          >
            Lihat Semua Program
          </Link>
        </div>
      </div>
    );
  }

  if (!program && loadingOverview) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#002366] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Header */}
      <div className="bg-[#002366] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">{heroTitle}</h1>
          <p className="text-xl text-gray-200">{heroSubtitle}</p>
        </div>
      </div>

      {/* Quick Facts */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#C41E3A]/10 p-3 rounded-lg">
                <Clock className="text-[#C41E3A]" size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Durasi</p>
                <p className="text-[#002366]">{duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#C41E3A]/10 p-3 rounded-lg">
                <BookOpen className="text-[#C41E3A]" size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total SKS</p>
                <p className="text-[#002366]">{totalCredits}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#C41E3A]/10 p-3 rounded-lg">
                <Award className="text-[#C41E3A]" size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Gelar</p>
                <p className="text-[#002366]">{degree}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - 2 Column Layout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                <Tabs.Trigger
                  value="overview"
                  className="px-6 py-3 text-[#002366] border-b-2 border-transparent data-[state=active]:border-[#002366] data-[state=active]:text-[#002366] hover:text-[#C41E3A] transition-colors whitespace-nowrap"
                >
                  Overview
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="curriculum"
                  className="px-6 py-3 text-[#002366] border-b-2 border-transparent data-[state=active]:border-[#002366] data-[state=active]:text-[#002366] hover:text-[#C41E3A] transition-colors whitespace-nowrap"
                >
                  Kurikulum
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="competencies"
                  className="px-6 py-3 text-[#002366] border-b-2 border-transparent data-[state=active]:border-[#002366] data-[state=active]:text-[#002366] hover:text-[#C41E3A] transition-colors whitespace-nowrap"
                >
                  Kompetensi
                </Tabs.Trigger>
              </Tabs.List>

              {/* Overview Tab */}
              <Tabs.Content value="overview">
                <div className="prose max-w-none">
                  <h2 className="text-2xl text-[#002366] mb-4">
                    Tentang Program
                  </h2>
                  {loadingOverview ? (
                    <div className="flex justify-center py-8">
                      <div className="w-6 h-6 border-3 border-[#002366] border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : abouts.length > 0 ? (
                    abouts.map((item) => (
                      <p key={item.id} className="text-gray-700 mb-4">
                        {item.text}
                      </p>
                    ))
                  ) : (
                    program?.overview.about.map((paragraph, idx) => (
                      <p key={idx} className="text-gray-700 mb-4">
                        {paragraph}
                      </p>
                    ))
                  )}

                  {loadingOverview ? null : requirements.length > 0 ? (
                    <>
                      <h3 className="text-xl text-[#002366] mt-8 mb-4">
                        Requirements:
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {requirements.map((item) => (
                          <li key={item.id} className="flex items-start">
                            <span className="text-[#C41E3A] mr-2">•</span>
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : program?.overview.requirements ? (
                    <>
                      <h3 className="text-xl text-[#002366] mt-8 mb-4">
                        Requirements:
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {program.overview.requirements.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-[#C41E3A] mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              </Tabs.Content>

              {/* Curriculum Tab */}
              <Tabs.Content value="curriculum">
                <h2 className="text-2xl text-[#002366] mb-6">
                  Daftar Mata Kuliah
                </h2>

                <div className="space-y-8">
                  {(program?.curriculum ?? []).map((semester, sIdx) => (
                    <div key={sIdx}>
                      <h3 className="text-xl text-[#002366] mb-4">
                        {semester.label}
                      </h3>
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-[#002366] text-white">
                            <tr>
                              <th className="px-4 py-3 text-left">Mata Kuliah</th>
                              <th className="px-4 py-3 text-center w-20 bg-[#C41E3A]">SKS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {semester.courses.map((course, cIdx) => (
                              <tr
                                key={cIdx}
                                className="border-b border-gray-200 hover:bg-gray-50"
                              >
                                <td className="px-4 py-3 text-gray-800">
                                  {course.name}
                                </td>
                                <td className="px-4 py-3 text-center text-[#002366] font-semibold bg-gray-50 border-l border-gray-200">
                                  {course.credits}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-[#002366]/5 border-t-2 border-[#002366]">
                              <td className="px-4 py-3 text-[#002366] font-bold">
                                Total SKS
                              </td>
                              <td className="px-4 py-3 text-center text-[#C41E3A] font-bold bg-[#C41E3A]/10 border-l border-gray-200">
                                {semester.courses.reduce((sum, c) => sum + c.credits, 0)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </Tabs.Content>

              {/* Competencies Tab */}
              <Tabs.Content value="competencies">
                <h2 className="text-2xl text-[#002366] mb-6">
                  Kompetensi Lulusan
                </h2>

                <div className="space-y-6">
                  {(program?.competencies ?? []).map((group, gIdx) => (
                    <div key={gIdx} className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg text-[#002366] mb-3">
                        {group.title}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {group.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start">
                            <span className="text-[#C41E3A] mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>

          {/* Right Column - Sticky Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border-2 border-[#002366] rounded-lg p-6">
              <h3 className="text-xl text-[#002366] mb-4">
                Tertarik dengan Program Ini?
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                Dapatkan informasi lebih lanjut tentang program {heroTitle}
              </p>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002366]"
                    placeholder="Masukkan nama"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002366]"
                    placeholder="Masukkan email"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002366]"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Pesan (Opsional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002366]"
                    placeholder="Tuliskan pertanyaan Anda"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C41E3A] text-white py-3 rounded hover:bg-[#A01829] transition-colors"
                >
                  Kirim Permintaan Info
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
