"use client";

import { Clock, Award, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { apiUrl } from "../../../lib/api";
import { ScrollReveal } from "../../../components/ScrollReveal";

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

interface CourseApi {
  id: number;
  name: string;
  credits: number;
  curriculumGroupId: number;
}

interface CurriculumGroupApi {
  id: number;
  label: string;
  programStudiId: number;
  courses?: CourseApi[];
}

interface CompetencyItemApi {
  id: number;
  text: string;
  competencyGroupId: number;
}

interface CompetencyGroupApi {
  id: number;
  title: string;
  programStudiId: number;
  items?: CompetencyItemApi[];
}

function normalizeArray<T>(payload: any): T[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

export default function ProgramDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState("overview");

  const [programStudiId, setProgramStudiId] = useState<number | null>(null);
  const [programApi, setProgramApi] = useState<ProgramStudiApi | null>(null);
  const [abouts, setAbouts] = useState<OverviewAbout[]>([]);
  const [requirements, setRequirements] = useState<OverviewRequirement[]>([]);
  const [curriculumGroups, setCurriculumGroups] = useState<CurriculumGroupApi[]>([]);
  const [competencyGroups, setCompetencyGroups] = useState<CompetencyGroupApi[]>([]);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingCurriculum, setLoadingCurriculum] = useState(false);
  const [loadingCompetencies, setLoadingCompetencies] = useState(false);
  const [curriculumLoaded, setCurriculumLoaded] = useState(false);
  const [competenciesLoaded, setCompetenciesLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchOverview = async () => {
      setLoadingOverview(true);
      setLoadingCurriculum(false);
      setLoadingCompetencies(false);
      setActiveTab("overview");
      setProgramApi(null);
      setProgramStudiId(null);
      setAbouts([]);
      setRequirements([]);
      setCurriculumGroups([]);
      setCompetencyGroups([]);
      setCurriculumLoaded(false);
      setCompetenciesLoaded(false);

      try {
        const res = await fetch(apiUrl(`/api/program-studi/${slug}`));
        if (!res.ok) {
          if (!cancelled) setProgramApi(null);
          return;
        }

        const data = await res.json();
        const item = data.data ?? data;

        if (!item || typeof item !== "object") {
          if (!cancelled) setProgramApi(null);
          return;
        }

        const resolvedProgramStudiId = Number(item.id);
        if (!resolvedProgramStudiId) {
          if (!cancelled) setProgramApi(null);
          return;
        }

        if (cancelled) return;
        setProgramApi(item);
        setProgramStudiId(resolvedProgramStudiId);

        const [aboutRes, reqRes] = await Promise.all([
          fetch(apiUrl(`/api/OverviewAbout/programstudi/${resolvedProgramStudiId}`)),
          fetch(apiUrl(`/api/OverviewRequirement/programstudi/${resolvedProgramStudiId}`)),
        ]);

        if (cancelled) return;

        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();
          setAbouts(normalizeArray<OverviewAbout>(aboutData));
        } else {
          setAbouts([]);
        }

        if (reqRes.ok) {
          const reqData = await reqRes.json();
          setRequirements(normalizeArray<OverviewRequirement>(reqData));
        } else {
          setRequirements([]);
        }
      } catch {
        if (cancelled) return;
        setProgramApi(null);
        setProgramStudiId(null);
        setAbouts([]);
        setRequirements([]);
        setCurriculumGroups([]);
        setCompetencyGroups([]);
      } finally {
        if (!cancelled) {
          setLoadingOverview(false);
        }
      }
    };

    fetchOverview();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (activeTab !== "curriculum" || !programStudiId || curriculumLoaded) return;

    let cancelled = false;

    const fetchCurriculum = async () => {
      setLoadingCurriculum(true);
      try {
        const [groupRes, courseRes] = await Promise.all([
          fetch(apiUrl("/api/jenis-matkul")),
          fetch(apiUrl("/api/mata-kuliah")),
        ]);

        let allCourses: CourseApi[] = [];
        if (courseRes.ok) {
          const courseData = await courseRes.json();
          allCourses = normalizeArray<CourseApi>(courseData);
        }

        if (groupRes.ok) {
          const groupData = await groupRes.json();
          const allGroups = normalizeArray<CurriculumGroupApi>(groupData);

          const filteredGroups = allGroups
            .filter((group) => group.programStudiId === programStudiId)
            .map((group) => ({
              ...group,
              courses: Array.isArray(group.courses)
                ? group.courses
                : allCourses.filter((course) => course.curriculumGroupId === group.id),
            }));

          if (!cancelled) {
            setCurriculumGroups(filteredGroups);
            setCurriculumLoaded(true);
          }
        } else if (!cancelled) {
          setCurriculumGroups([]);
          setCurriculumLoaded(true);
        }
      } catch {
        if (!cancelled) {
          setCurriculumGroups([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingCurriculum(false);
        }
      }
    };

    fetchCurriculum();

    return () => {
      cancelled = true;
    };
  }, [activeTab, programStudiId, curriculumLoaded]);

  useEffect(() => {
    if (activeTab !== "competencies" || !programStudiId || competenciesLoaded) return;

    let cancelled = false;

    const fetchCompetencies = async () => {
      setLoadingCompetencies(true);
      try {
        const competencyRes = await fetch(apiUrl(`/api/kompetensi/program/${programStudiId}`));
        if (competencyRes.ok) {
          const competencyData = await competencyRes.json();
          const allCompetencyGroups = normalizeArray<CompetencyGroupApi>(competencyData);

          if (!cancelled) {
            setCompetencyGroups(
              allCompetencyGroups.map((group) => ({
                ...group,
                items: Array.isArray(group.items) ? group.items : [],
              }))
            );
            setCompetenciesLoaded(true);
          }
        } else if (!cancelled) {
          setCompetencyGroups([]);
          setCompetenciesLoaded(true);
        }
      } catch {
        if (!cancelled) {
          setCompetencyGroups([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingCompetencies(false);
        }
      }
    };

    fetchCompetencies();

    return () => {
      cancelled = true;
    };
  }, [activeTab, programStudiId, competenciesLoaded]);

  const heroTitle = programApi?.heroTitle || programApi?.name || "Program Akademik";
  const heroSubtitle =
    programApi?.heroSubtitle || programApi?.description || "Detail program studi";
  const duration = programApi?.duration || "-";
  const totalCredits = programApi ? `${programApi.totalCredits} SKS` : "-";
  const degree = programApi?.degree || "-";
  const aboutParagraphs =
    abouts.length > 0
      ? abouts.map((item) => item.text).filter(Boolean)
      : (programApi?.description ? [programApi.description] : []);
  const apiRequirementItems = requirements
    .flatMap((item) => item.text.split(/\r?\n/))
    .map((item) => item.trim())
    .filter(Boolean);
  const curriculumItems = curriculumGroups.map((group) => ({
    label: group.label,
    courses: group.courses ?? [],
  }));
  const competencyItems = competencyGroups.map((group) => ({
    id: group.id,
    title: group.title,
    items: (group.items ?? []).map((item) => item.text).filter(Boolean),
  }));

  if (!programApi && !loadingOverview) {
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

  if (!programApi && loadingOverview) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#002366] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Header */}
      <ScrollReveal y={28} amount={0.2}>
      <div className="bg-[#002366] text-white py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">{heroTitle}</h1>
          <div className="h-1 w-24 bg-[#C41E3A] mb-6"></div>
          <p className="text-xl text-gray-200">{heroSubtitle}</p>
        </div>
      </div>
      </ScrollReveal>

      {/* Quick Facts */}
      <ScrollReveal>
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
      </ScrollReveal>

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
                <ScrollReveal>
                <div className="prose max-w-none">
                  <h2 className="text-2xl text-[#002366] mb-4">
                    Tentang Program
                  </h2>
                  {loadingOverview ? (
                    <div className="flex justify-center py-8">
                      <div className="w-6 h-6 border-3 border-[#002366] border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : aboutParagraphs.length > 0 ? (
                    aboutParagraphs.map((paragraph, idx) => (
                      <p key={idx} className="text-gray-700 mb-4">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-600">Overview belum tersedia.</p>
                  )}

                  {loadingOverview ? null : apiRequirementItems.length > 0 ? (
                    <>
                      <h3 className="text-xl text-[#002366] mt-8 mb-4">
                        Requirements:
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {apiRequirementItems.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-[#C41E3A] mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-gray-600 mt-6">Requirements belum tersedia.</p>
                  )}
                </div>
                </ScrollReveal>
              </Tabs.Content>

              {/* Curriculum Tab */}
              <Tabs.Content value="curriculum">
                <ScrollReveal>
                  <h2 className="text-2xl text-[#002366] mb-6">
                    Daftar Mata Kuliah
                  </h2>
                </ScrollReveal>

                {loadingCurriculum && curriculumItems.length === 0 ? (
                  <div className="flex justify-center py-8">
                    <div className="w-6 h-6 border-3 border-[#002366] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : curriculumItems.length === 0 ? (
                  <p className="text-gray-600">Kurikulum belum tersedia.</p>
                ) : (
                  <div className="space-y-8">
                    {curriculumItems.map((semester, sIdx) => (
                      <ScrollReveal key={sIdx} delay={sIdx * 0.06} amount={0.18}>
                        <div>
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
                                    <td className="px-4 py-3 text-gray-800">{course.name}</td>
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
                      </ScrollReveal>
                    ))}
                  </div>
                )}
              </Tabs.Content>

              {/* Competencies Tab */}
              <Tabs.Content value="competencies">
                <h2 className="text-2xl text-[#002366] mb-6">
                  Kompetensi Lulusan
                </h2>

                {loadingCompetencies && competencyItems.length === 0 ? (
                  <div className="flex justify-center py-8">
                    <div className="w-6 h-6 border-3 border-[#002366] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : competencyItems.length === 0 ? (
                  <p className="text-gray-600">Kompetensi belum tersedia.</p>
                ) : (
                  <div className="space-y-6">
                    {competencyItems.map((group, index) => (
                      <ScrollReveal key={group.id} delay={index * 0.06} amount={0.18}>
                      <div className="bg-gray-50 p-6 rounded-lg">
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
                      </ScrollReveal>
                    ))}
                  </div>
                )}
              </Tabs.Content>
            </Tabs.Root>
          </div>

          {/* Right Column - Sticky Form */}
          <div className="lg:col-span-1">
            <ScrollReveal>
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
                    Pesan 
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
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
