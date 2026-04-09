"use client";

import { motion, useReducedMotion } from "motion/react";
import { Heart, BookOpenText, Handshake, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CoreValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

const coreValues: CoreValue[] = [
  {
    icon: Heart,
    title: "Christ Centered",
    description:
      "Rencana keselamatan Allah bagi dunia berpusat pada karya penebusan Kristus. Hal ini dipahami melalui metanarasi Alkitab yang mencakup Penciptaan, Kejatuhan, Penebusan, dan Penggenapan, serta diwujudkan melalui mandat budaya dan mandat Injil.",
  },
  {
    icon: BookOpenText,
    title: "Teks Konteks",
    description:
      "Pendekatan teks–konteks menekankan kesetiaan pada Firman Tuhan dan warisan iman Bapa-Bapa Gereja, sekaligus tetap responsif terhadap perkembangan konteks sosial dan generasional.",
  },
  {
    icon: Handshake,
    title: "Penatalayanan",
    description:
      "Penatalayanan diwujudkan melalui integritas, dedikasi, dan kompetensi, yang tercermin dalam kejujuran, tanggung jawab, pelayanan kepada sesama, serta pengembangan kemampuan akademik, pelayanan, dan penelitian.",
  },
  {
    icon: Users,
    title: "Transformatif",
    description:
      "Karya penebusan Kristus yang transformatif dialami oleh semua stakeholder STTB (mahasiswa, dosen, staf, karyawan, yayasan, mitra pelayanan, gereja, dan masyarakat)",
  },
];

export default function CoreValues() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl text-[#002366] mb-4">Core Values</h2>
          <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg border-2 border-[#002366] hover:border-[#C41E3A] hover:shadow-lg transition-all"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex justify-center mb-6">
                  <Icon className="text-[#002366]" size={48} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl text-[#002366] text-center mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
