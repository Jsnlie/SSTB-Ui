// "use client";

// import { Clock, BookOpen, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import { programs } from "./data";

// export default function ProgramAkademik() {
//   return (
//     <div>
//       {/* Hero Header */}
//       <div className="bg-[#002366] text-white py-16">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl md:text-5xl mb-4">Program Akademik</h1>
//           <p className="text-xl text-gray-200">
//             Pilih program studi yang sesuai dengan panggilan pelayanan Anda
//           </p>
//         </div>
//       </div>

//       {/* Program List */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {programs.map((program) => (
//             <Link
//               key={program.slug}
//               href={`/program-akademik/${program.slug}`}
//               className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <div className="p-6">
//                 <h3 className="text-xl text-[#002366] mb-2 group-hover:text-[#C41E3A] transition-colors">
//                   {program.heroTitle}
//                 </h3>
//                 <p className="text-sm text-gray-500 mb-3">{program.heroSubtitle}</p>
//                 <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
//                   <div className="flex items-center">
//                     <Clock size={14} className="mr-1 text-[#C41E3A]" />
//                     <span>{program.duration}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <BookOpen size={14} className="mr-1 text-[#C41E3A]" />
//                     <span>{program.totalCredits}</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-700 text-sm line-clamp-3 mb-4">
//                   {program.overview.about[0]}
//                 </p>
//                 <span className="inline-flex items-center text-[#C41E3A] text-sm group-hover:underline">
//                   Lihat Detail
//                   <ArrowRight className="ml-1" size={14} />
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
