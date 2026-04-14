"use client";

import { motion, useReducedMotion } from "motion/react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    name: "Maria Elsa",
    role: "S.Pd. 2014",
    text: "Menjadi guru Kristen adalah sebuah panggilan Allah untuk mewujudkan misi-Nya dalam dunia pendidikan. Saya bersyukur bisa bergabung dan diperlengkapi dalam program studi Sarjana Pendidikan Kristen di STT Bandung. Saya tidak hanya diajar secara kognitif melainkan juga belajar melalui pengalaman orang lain. Selain itu, di STT Bandung juga saya tidak hanya bertumbuh secara pemikiran tetapi juga bertumbuh dalam spiritualitas. Benar-benar menjadi jawaban dalam kebutuhan pelayanan saya. Saya berharap 30 tahun STT Bandung kiranya semakin maju, berkembang, dan terus mempersiapkan pelayan Tuhan yang menjadi berkat di manapun mereka ditempatkan.",
  },
  {
    name: "Yogi Fitra Firdaus",
    role: "STh., 2015",
    text: "STT Bandung sebagai seminari yang multikultur telah mempersiapkan saya sebagai hamba Tuhan yang mampu beradaptasi dalam berbagai konteks budaya yang ada di tengah gereja urban. Dengan visi menghasilkan pastor-scholar, diskusi teologis mengenai isu-isu di tengah masyarakat seperti kemiskinan, hak-hak anak dan ekologi memperlengkapi saya dengan satu pemahaman misi gereja yang holistik bahwa umat Allah tidak hanya dipanggil mewartakan Injil keselamatan tetapi juga hadir untuk menjadi agen transformasi sosial. STT Bandung juga memberikan ruang diseminasi ilmiah terhadap hasil-hasil riset yang dilakukan oleh dosen, mahasiswa dan alumni sehingga seluruh civitas academica dapat memberikan kontribusi strategis bagi gereja dan masyarakat.",
  },
  {
    name: "Samuel Wiratama",
    role: "MTh., 2018",
    text: "Bagi saya, STT Bandung telah menghadirkan berkat besar dalam kehidupan pelayanan. Dengan menekankan keseimbangan dalam karakter, akademik, dan praktik, menolong saya untuk menjadi seorang gembala yang mahir dalam pelayanan praktis gereja dengan berlandaskan akademik kuat dan kehidupan etis yang dapat menjadi teladan. Tidak ketinggalan, para dosen yang sangat peduli dalam membimbing dan memperhatikan para mahasiswa menjadi nilai tambah yang amat bermanfaat untuk membekali mahasiswa dalam pelayanan. Saya berharap STT Bandung terus bertumbuh dalam hal-hal ini sehingga dapat menjadi berkat bagi kekristenan di Indonesia.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: index * 0.12,
      ease: smoothEase,
    },
  }),
};

export default function TestimonialsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <h2 className="text-4xl text-[#002366] mb-4">Kesaksian Alumni</h2>
          <div className="h-1 w-20 bg-[#C41E3A] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dengarkan pengalaman para alumni yang kini melayani di berbagai ladang pelayanan
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-transparent hover:border-[#C41E3A]/20"
              variants={cardVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              custom={index}
            >
              <div className="flex items-center mb-4">
                <div>
                  <h3 className="text-[#002366]">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
