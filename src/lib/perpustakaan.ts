export type BookCategory =
  | "Teologi"
  | "Kepemimpinan"
  | "Spiritualitas"
  | "Misi"
  | "Etika";

export interface DummyBook {
  id: number;
  slug: string;
  title: string;
  author: string;
  releaseDate: string;
  category: BookCategory;
  isbn: string;
  cover: string;
  description: string;
  pages: string[];
}

export const categories: Array<"Semua Koleksi" | BookCategory> = [
  "Semua Koleksi",
  "Teologi",
  "Kepemimpinan",
  "Spiritualitas",
  "Misi",
  "Etika",
];

export const books: DummyBook[] = [
  {
    id: 1,
    slug: "echoes-of-grace",
    title: "Echoes of Grace",
    author: "Daniel Hartono",
    releaseDate: "2024-02-15",
    category: "Teologi",
    isbn: "978-623-0001-11-1",
    cover:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=600&auto=format&fit=crop",
    description:
      "Pengantar teologi sistematika dengan pendekatan pastoral dan relevan bagi pelayanan kontemporer.",
    pages: [
      "Bab 1. Teologi bukan sekadar kumpulan doktrin, tetapi cara gereja mengenali karya Allah dalam sejarah dan kehidupan sehari-hari.",
      "Bab 2. Wahyu khusus menuntun kita memahami siapa Kristus, sementara wahyu umum menolong kita melihat jejak hikmat Allah dalam ciptaan.",
      "Bab 3. Formasi teologi yang sehat selalu berujung pada ibadah, karakter, dan tindakan kasih yang nyata bagi sesama.",
    ],
  },
  {
    id: 2,
    slug: "shepherd-leadership",
    title: "Shepherd Leadership",
    author: "Helena Vance",
    releaseDate: "2021-09-28",
    category: "Kepemimpinan",
    isbn: "978-623-0001-22-7",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    description:
      "Membahas kepemimpinan hamba bagi pelayan Tuhan di era digital yang kompleks.",
    pages: [
      "Bab 1. Pemimpin rohani dipanggil lebih dulu untuk mendengar, sebelum mengarahkan tim atau jemaat.",
      "Bab 2. Keberlanjutan pelayanan membutuhkan sistem mentoring, bukan ketergantungan pada satu figur kuat.",
      "Bab 3. Keteladanan etis adalah kurikulum tanpa kata yang paling cepat dibaca oleh generasi muda.",
    ],
  },
  {
    id: 3,
    slug: "liturgi-dan-kehidupan",
    title: "Liturgi dan Kehidupan",
    author: "Marcus Aurelius Simatupang",
    releaseDate: "2020-03-12",
    category: "Spiritualitas",
    isbn: "978-623-0001-33-3",
    cover:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
    description:
      "Refleksi spiritual tentang ritme ibadah, doa, dan disiplin rohani dalam kehidupan kampus.",
    pages: [
      "Bab 1. Liturgi yang benar bukan hanya urutan acara, melainkan sekolah hati untuk mencintai Allah dengan utuh.",
      "Bab 2. Doa harian membentuk sensitivitas batin untuk membaca kebutuhan orang lain dengan empati.",
      "Bab 3. Keheningan dan sabat menolong kita mengingat bahwa identitas tidak lahir dari produktivitas semata.",
    ],
  },
  {
    id: 4,
    slug: "jalan-misi-kota",
    title: "Jalan Misi Kota",
    author: "Elisa Wright",
    releaseDate: "2019-07-03",
    category: "Misi",
    isbn: "978-623-0001-44-9",
    cover:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop",
    description:
      "Strategi misi perkotaan dengan studi kasus lintas budaya dan pelayanan holistik.",
    pages: [
      "Bab 1. Konteks urban menuntut gereja memahami ritme kerja, migrasi, dan kesepian masyarakat modern.",
      "Bab 2. Pelayanan misi efektif dimulai dari mendengar narasi lokal, bukan sekadar memindahkan program.",
      "Bab 3. Kehadiran gereja harus terasa dalam pendidikan, kesehatan mental, dan advokasi keadilan sosial.",
    ],
  },
  {
    id: 5,
    slug: "ethics-in-ministry",
    title: "Ethics in Ministry",
    author: "Julia Thorne",
    releaseDate: "2023-11-20",
    category: "Etika",
    isbn: "978-623-0001-55-5",
    cover:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=600&auto=format&fit=crop",
    description:
      "Panduan etika pelayanan dan pengambilan keputusan di tengah dilema nyata gerejawi.",
    pages: [
      "Bab 1. Etika Kristen dimulai dari karakter Kristus: benar, adil, dan penuh kasih kepada yang rentan.",
      "Bab 2. Dalam konflik pelayanan, transparansi proses lebih penting daripada citra institusi jangka pendek.",
      "Bab 3. Akuntabilitas dan evaluasi berkala menjaga komunitas tetap sehat serta terpercaya.",
    ],
  },
  {
    id: 6,
    slug: "hermeneutika-kontekstual",
    title: "Hermeneutika Kontekstual",
    author: "Soren Klein",
    releaseDate: "2018-01-17",
    category: "Teologi",
    isbn: "978-623-0001-66-2",
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop",
    description:
      "Metodologi penafsiran Alkitab yang bertanggung jawab dan relevan dengan konteks Indonesia.",
    pages: [
      "Bab 1. Menafsirkan teks harus dimulai dari dunia penulis, lalu bergerak ke dunia pembaca masa kini.",
      "Bab 2. Bahasa, genre, dan konteks historis bukan detail teknis, tetapi jembatan menuju makna yang akurat.",
      "Bab 3. Aplikasi yang setia selalu menghormati maksud teks dan kebutuhan nyata jemaat.",
    ],
  },
  {
    id: 7,
    slug: "komunitas-pemuridan",
    title: "Komunitas Pemuridan",
    author: "Nadia Prasetyo",
    releaseDate: "2022-05-09",
    category: "Kepemimpinan",
    isbn: "978-623-0001-77-9",
    cover:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=600&auto=format&fit=crop",
    description:
      "Praktik membangun kultur pemuridan yang bertumbuh dari relasi, bukan program semata.",
    pages: [
      "Bab 1. Pemuridan dimulai dari kehadiran: mengenal nama, cerita, dan pergumulan setiap orang.",
      "Bab 2. Pertumbuhan rohani konsisten terjadi saat komunitas belajar menghidupi firman bersama.",
      "Bab 3. Multiplikasi pemimpin adalah buah dari proses panjang, bukan target angka instan.",
    ],
  },
  {
    id: 8,
    slug: "hening-di-tengah-bising",
    title: "Hening di Tengah Bising",
    author: "Ruth Manurung",
    releaseDate: "2017-08-25",
    category: "Spiritualitas",
    isbn: "978-623-0001-88-6",
    cover:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
    description:
      "Renungan untuk membangun kedalaman spiritual di tengah tekanan informasi dan kecepatan zaman.",
    pages: [
      "Bab 1. Keheningan bukan pelarian, melainkan ruang untuk menata kembali arah hati di hadapan Allah.",
      "Bab 2. Disiplin membaca kitab suci harian melatih kesetiaan yang kecil tetapi mengubah jangka panjang.",
      "Bab 3. Spiritualitas yang matang terlihat dari cara kita merespons orang lain dengan sabar dan rendah hati.",
    ],
  },
];

export function getBookBySlug(slug: string) {
  return books.find((book) => book.slug === slug) || null;
}
