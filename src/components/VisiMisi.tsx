"use client";

import { motion, useReducedMotion } from "motion/react";
import { Target, Users } from "lucide-react";

export default function VisiMisi() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl text-[#002366] mb-4">Visi & Misi Kami</h2>
          <div className="h-1 w-20 bg-[#C41E3A] mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="bg-gray-50 p-8 rounded-lg"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center mb-6">
              <Target className="text-[#C41E3A] mr-3" size={32} />
              <h3 className="text-2xl text-[#002366]">Visi</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Menjadi institusi pendidikan teologi yang mempersiapkan pastor-scholar yang transformatif dan
              memberdayakan seluruh umat Allah untuk menghadirkan Injil seutuhnya di tengah konteks masyarakat urban
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-50 p-8 rounded-lg"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center mb-6">
              <Users className="text-[#C41E3A] mr-3" size={32} />
              <h3 className="text-2xl text-[#002366]">Misi</h3>
            </div>
            <ul className="text-gray-700 space-y-3">
              <li className="flex items-start">
                <span className="text-[#C41E3A] mr-2">•</span>
                <span>Mempersiapakn pastor-scholar yang transfomatif untuk melayani dalam konteks urban.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C41E3A] mr-2">•</span>
                <span>Memberdayakan seluruh umat Allah untuk menghadirkan Injil seutuhnya
                  di tengah konteks masyarakat ubrna melalui penelitian dan pendidikan non-formal</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C41E3A] mr-2">•</span>
                <span>Mengembangkan tim dosen, struktur organisasi dan keuangan, serta kemitraan untuk mendukung pencapaian visi STTB.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
