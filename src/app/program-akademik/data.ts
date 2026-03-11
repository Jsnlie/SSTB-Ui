export type Course = {
  name: string;
  credits: number;
};

export type Semester = {
  label: string;
  courses: Course[];
};

export type CompetencyGroup = {
  title: string;
  items: string[];
};

export type ProgramData = {
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  duration: string;
  totalCredits: string;
  degree: string;
  overview: {
    about: string[];
    requirements?: string[];
  };
  curriculum: Semester[];
  competencies: CompetencyGroup[];
};

export const programs: ProgramData[] = [
  {
    slug: "sarjana-teologi",
    heroTitle: "Program Sarjana Teologi",
    heroSubtitle: "Sarjana Teologi (S.Th)",
    duration: "4 Tahun (3 tahun kuliah + 1 tahun praktik pelayanan)",
    totalCredits: "145 SKS",
    degree: "Sarjana Teologi (S.Th)",
    overview: {
      about: [
        "Program Sarjana Teologi (S.Th) adalah program studi 4 tahun yang dirancang untuk memberikan fondasi teologi yang kuat bagi calon hamba Tuhan. Mahasiswa akan dibekali dengan pengetahuan Alkitab yang mendalam, teologi sistematika, serta keterampilan pelayanan praktis yang relevan.",
        "Kurikulum dirancang agar mahasiswa mampu membaca dan menganalisis Alkitab dalam bahasa aslinya (Ibrani dan Yunani), memahami perkembangan doktrin sepanjang sejarah gereja, serta mengaplikasikan kebenaran Firman Tuhan dalam konteks pelayanan masa kini.",
      ],
      requirements: [
        "Minimal lulusan SMA/sederajat",
        "Sudah baptis dewasa/sidi",
        "Pernah Terlibat dalam pelayanan gerejawi/lembaga Kristen",
        "Memiliki panggilan yang jelas sebagai pendidik Kristen penuh waktu",
        "Memenuhi prosedur admisi STTB",
      ],
    },
    curriculum: [
      {
        label: "Dasar Umum",
        courses: [
          { name: "Pancasila & Kewarganegaraan", credits: 2 },
          { name: "Bahasa Indonesia", credits: 2 },
          { name: "Bahasa Inggris Teologi", credits: 3 },
          { name: "Psikologi Perkembangan Masa Hidup", credits: 2 },
          { name: "Metode Penulisan & Penelitian", credits: 3 },
        ],
      },
      {
        label: "Studi Pendidikan & Praktika",
        courses: [
          { name: "Teologi Asuhan Kristen", credits: 2 },
          { name: "Formasi Spiritualitas", credits: 2 },
          { name: "Pelayanan Ibadah & Musik", credits: 3 },
          { name: "Homiletika 1", credits: 3 },
          { name: "Homiletika 2", credits: 3 },
          { name: "Konseling Pastoral 1 - Dasar Konseling", credits: 2 },
          {
            name: "Konseling Pastoral 2 - Dasar Konseling Sekolah",
            credits: 3,
          },
          { name: "Pemuridan Transformatif", credits: 3 },
          { name: "Pelayanan Anak Transformatif", credits: 3 },
          { name: "Pelayanan Kaum Muda Transformatif", credits: 3 },
          { name: "Pelayanan Orang Tua Transformatif", credits: 3 },
          { name: "Introduksi Pendidikan Kristen", credits: 2 },
          { name: "Psikologi Pendidikan Kristen", credits: 3 },
          { name: "Teologi Pendidikan Kristen", credits: 2 },
          { name: "Pendidikan Kristen", credits: 2 },
          { name: "Integrasi Iman & Ilmu", credits: 3 },
          {
            name: "Integrasi Teologi dan Spiritualitas Anak dan Remaja",
            credits: 3,
          },
          { name: "Kurikulum Pendidikan Kristen", credits: 3 },
          { name: "Perencanaan & Evaluasi Pembelajaran", credits: 3 },
          { name: "Strategi Pembelajaran", credits: 3 },
          { name: "Media & Teknologi Pembelajaran", credits: 2 },
          { name: "Manajemen / Administrasi Pendidikan", credits: 3 },
          { name: "Micro Teaching 1", credits: 2 },
          { name: "Micro Teaching 2", credits: 4 },
        ],
      },
      {
        label: "Studi Biblika",
        courses: [
          { name: "Studi PL 1: Kitab Taurat", credits: 3 },
          { name: "Studi PL 2: Kitab Sejarah", credits: 3 },
          { name: "Studi PL 3: Kitab Sastra", credits: 3 },
          { name: "Studi PL 4: Kitab Nabi-nabi", credits: 3 },
          { name: "Studi PB 1: Kitab Injil", credits: 3 },
          { name: "Studi PB 2: Kisah Para Rasul & Surat Paulus", credits: 3 },
          { name: "Studi PB 3: Surat Umum & Wahyu", credits: 3 },
          { name: "Bahasa Ibrani", credits: 3 },
          { name: "Bahasa Yunani", credits: 2 },
          { name: "Hermeneutika Biblika", credits: 3 },
        ],
      },
      {
        label: "Studi Teologi",
        courses: [
          {
            name: "Prolegomena & Doktrin Alkitab",
            credits: 3,
          },
          { name: "Doktrin Allah Penciptaan & Manusia", credits: 3 },
          { name: "Doktrin Kristus, Dosa & Keselamatan", credits: 3 },
          { name: "Doktrin Roh Kudus & Akhir Zaman", credits: 3 },
          { name: "Doktrin Gereja", credits: 3 },
          { name: "Apologetika", credits: 3 },
          { name: "Etika Kristen", credits: 2 },
        ],
      },
      {
        label: "Studi Sejarah & Budaya",
        courses: [
          { name: "Sejarah & Filosofi Pendidikan Kristen", credits: 3 },
        ],
      },
      {
        label: "Praktik Lapangan",
        courses: [
          { name: "Praktik Pelayanan Media 1", credits: 0 },
          { name: "Praktik Pelayanan Media 2", credits: 0 },
          { name: "Praktik Pelayanan Akhir Pekan 1", credits: 0 },
          { name: "Praktik Pelayanan Akhir Pekan 2", credits: 0 },
          { name: "Praktik Pelayanan Misi", credits: 1 },
          { name: "Praktik Pelayanan 1 Tahun", credits: 8 },
        ],
      },
      {
        label: "Praktik Pelayanan",
        courses: [
          { name: "Praktik Pelayanan Akhir Pekan 1", credits: 0 },
          { name: "Praktik Pelayanan Akhir Pekan 2", credits: 0 },
          { name: "Praktik Pelayanan Akhir Pekan 3", credits: 0 },
          { name: "Praktik Pelayanan Akhir Pekan 4", credits: 0 },
          { name: "Praktik Pelayanan Akhir Pekan 5", credits: 0 },
          { name: "Praktik Pelayanan Misi", credits: 1 },
          { name: "Praktik Pelayanan 3 Bulan", credits: 2 },
          { name: "Praktik Pelayanan 1 Tahun", credits: 4 },
          { name: "Skripsi", credits: 6 },
        ],
      },
      {
        label: "Tugas Akhir",
        courses: [
          { name: "Artikel Jurnal", credits: 3 },
          { name: "Proyek: Merancang Program Pembinaan", credits: 4 },
        ],
      },
    ],
    competencies: [
      {
        title: "Informed",
        items: [
          "Pendidikan Kristen Yng berpengetahuan luas dan aplikatif terhadap tantangan perkembangan dunia pendidikan",
        ],
      },
      {
        title: "Transformed",
        items: [
          "Pembelajaran yang memiliki fondasi spiritualitas yang kokoh dan matang.",
        ],
      },
      {
        title: "Transformative",
        items: [
          "Pendidikan Kristen yang berdampak bagi peserta didik dan lingkungan templatnya melayani",
        ],
      },
    ],
  },
  {
    slug: "sarjana-pendidikan-kristen",
    heroTitle: "Sarjana Pendidikan Kristen",
    heroSubtitle: "Sarjana Pendidikan Kristen (S.Pd)",
    duration: "4 Tahun (3 tahun kuliah + 1 tahun praktik pelayanan)",
    totalCredits: "145 SKS",
    degree: "Sarjana Pendidikan Kristen (S.Pd)",
    overview: {
      about: [
        "Program ini fokus membentuk pelayan Kristen yang siap melayani langsung melalui praktik lapangan intensif: praktik 3 bulan, 1 tahun, youth camp, dan MEET. Mahasiswa mengaplikasikan teori kelas ke pelayanan nyata di gereja, sekolah Kristen, panti asuhan, rumah sakit, hingga lembaga rehabilitasi.",
        "dengan mengintegrasikan teori dan praktik secara mendalam, didukung supervisi serta evaluasi dari pendeta dan pemimpin Kristen di lapangan, sehingga lulusannya matang rohani, terampil, dan siap melayani di berbagai bidang pelayanan Kristen.",
      ],
      requirements: [
        "Minimal lulusan SMA/sederajat",
        "Sudah baptis dewasa/sidi",
        "Pernah Terlibat dalam pelayanan gerejawi/lembaga Kristen",
        "Memiliki panggilan yang jelas sebagai pendidik Kristen penuh waktu",
        "Memenuhi prosedur admisi STTB",
      ],
    },
    curriculum: [
      {
        label: "Dasar Umum",
        courses: [
          { name: "Pancasila & Kewarganegaraan", credits: 2 },
          { name: "Bahasa Indonesia", credits: 2 },
          { name: "Bahasa Inggris Teologi", credits: 3 },
          { name: "Psikologi Perkembangan Masa Hidup", credits: 2 },
          { name: "Metode Penulisan & Penelitian", credits: 3 },
        ],
      },
      {
        label: "Studi Pendidikan & Praktika",
        courses: [
          { name: "Teologi Asuhan Kristen", credits: 2 },
          { name: "Formasi Spiritualitas", credits: 2 },
          { name: "Pelayanan Ibadah & Musik", credits: 3 },
          { name: "Homiletika 1", credits: 3 },
          { name: "Homiletika 2", credits: 3 },
          { name: "Konseling Pastoral 1 - Dasar Konseling", credits: 2 },
          {
            name: "Konseling Pastoral 2 - Dasar Konseling Sekolah",
            credits: 3,
          },
          { name: "Pemuridan Transformatif", credits: 3 },
          { name: "Pelayanan Anak Transformatif", credits: 3 },
          { name: "Pelayanan Kaum Muda Transformatif", credits: 3 },
          { name: "Pelayanan Orang Tua Transformatif", credits: 3 },
          { name: "Introduksi Pendidikan Kristen", credits: 2 },
          { name: "Psikologi Pendidikan Kristen", credits: 3 },
          { name: "Teologi Pendidikan Kristen", credits: 2 },
          { name: "Pendidikan Kristen", credits: 2 },
          { name: "Integrasi Iman & Ilmu", credits: 3 },
          {
            name: "Integrasi Teologi dan Spiritualitas Anak dan Remaja",
            credits: 3,
          },
          { name: "Kurikulum Pendidikan Kristen", credits: 3 },
          { name: "Perencanaan & Evaluasi Pembelajaran", credits: 3 },
          { name: "Strategi Pembelajaran", credits: 3 },
          { name: "Media & Teknologi Pembelajaran", credits: 2 },
          { name: "Manajemen / Administrasi Pendidikan", credits: 3 },
          { name: "Micro Teaching 1", credits: 2 },
          { name: "Micro Teaching 2", credits: 4 },
        ],
      },
      {
        label: "Studi Biblika",
        courses: [
          { name: "Studi PL 1: Kitab Taurat", credits: 3 },
          { name: "Studi PL 2: Kitab Sejarah", credits: 3 },
          { name: "Studi PL 3: Kitab Sastra", credits: 3 },
          { name: "Studi PL 4: Kitab Nabi-nabi", credits: 3 },
          { name: "Studi PB 1: Kitab Injil", credits: 3 },
          { name: "Studi PB 2: Kisah Para Rasul & Surat Paulus", credits: 3 },
          { name: "Studi PB 3: Surat Umum & Wahyu", credits: 3 },
          { name: "Bahasa Ibrani", credits: 3 },
          { name: "Bahasa Yunani", credits: 2 },
          { name: "Hermeneutika Biblika", credits: 3 },
        ],
      },
      {
        label: "Studi Teologi",
        courses: [
          {
            name: "Prolegomena & Doktrin Alkitab",
            credits: 3,
          },
          { name: "Doktrin Allah Penciptaan & Manusia", credits: 3 },
          { name: "Doktrin Kristus, Dosa & Keselamatan", credits: 3 },
          { name: "Doktrin Roh Kudus & Akhir Zaman", credits: 3 },
          { name: "Doktrin Gereja", credits: 3 },
          { name: "Apologetika", credits: 3 },
          { name: "Etika Kristen", credits: 2 },
        ],
      },
      {
        label: "Studi Sejarah & Budaya",
        courses: [
          { name: "Sejarah & Filosofi Pendidikan Kristen", credits: 3 },
        ],
      },
      {
        label: "Praktik Lapangan",
        courses: [
          { name: "Praktik Pelayanan Media 1", credits: 0 },
          { name: "Praktik Pelayanan Media 2", credits: 0 },
          { name: "Praktik Pelayanan Akhir Pekan 1", credits: 0 },
          { name: "Praktik Pelayanan Akhir Pekan 2", credits: 0 },
          { name: "Praktik Pelayanan Misi", credits: 1 },
          { name: "Praktik Pelayanan 1 Tahun", credits: 8 },
        ],
      },
      {
        label: "Praktik Pelayanan",
        courses: [
          { name: "Praktik Pelayanan Akhir Pekan 1", credits: 0 },
          { name: "Praktik Pelayanan Akhir Pekan 2", credits: 0 },
          { name: "Praktik Pelayanan Akhir Pekan 3", credits: 0 },
          { name: "Praktik Pelayanan Akhir Pekan 4", credits: 0 },
          { name: "Praktik Pelayanan Akhir Pekan 5", credits: 0 },
          { name: "Praktik Pelayanan Misi", credits: 1 },
          { name: "Praktik Pelayanan 3 Bulan", credits: 2 },
          { name: "Praktik Pelayanan 1 Tahun", credits: 4 },
          { name: "Skripsi", credits: 6 },
        ],
      },
      {
        label: "Tugas Akhir",
        courses: [
          { name: "Artikel Jurnal", credits: 3 },
          { name: "Proyek: Merancang Program Pembinaan", credits: 4 },
        ],
      },
    ],
    competencies: [
      {
        title: "Informed",
        items: [
          "Pendidikan Kristen Yng berpengetahuan luas dan aplikatif terhadap tantangan perkembangan dunia pendidikan",
        ],
      },
      {
        title: "Transformed",
        items: [
          "Pembelajaran yang memiliki fondasi spiritualitas yang kokoh dan matang.",
        ],
      },
      {
        title: "Transformative",
        items: [
          "Pendidikan Kristen yang berdampak bagi peserta didik dan lingkungan templatnya melayani",
        ],
      },
    ],
  },
  {
    slug: "magister-teologi",
    heroTitle: "Magister Teologi Pelayanan Pastoral Gereja Urban",
    heroSubtitle: "Master of Theology (M.Th)",
    duration: "2 Tahun",
    totalCredits: "56 SKS",
    degree: "Master of Theology (M.Th)",
    overview: {
      about: [
        "Program Magister Teologi Pelayanan Gereja Urban dirancang untuk memperlengkapi para pelayan dan pemimpin gereja dengan pemahaman teologi yang mendalam serta kemampuan melayani secara kontekstual di lingkungan perkotaan. Program ini menekankan integrasi antara refleksi teologis, kepemimpinan pelayanan, dan respons terhadap dinamika sosial, budaya, serta spiritual masyarakat urban.",
      ],
      requirements: [
        "Minimal lulusan S.Th./M.Div./M.Min. dari sekolah teologi yang terakreditasi BAN PT dan atau ATA",
        "Lulus program S1 non teologi (dengan syarat mengikuti program M.Min. Teologi dan Pelayanan Gerejawi terlebih dahulu). Lulusan program Sarjana Pendidikan dari STTB tidak perlu mengambil program matrikulasi",
        "Pernah terlibat pelayanan gerejawi/lembaga Kristen minimal selama 2 tahun",
        "Memiliki panggilan yang jelas sebagai rohaniwan penuh waktu",
        "Memiliki kemampuan dasar Bahasa Inggris yang baik, terutama membaca dan memahami teks berbahasa Inggris",
        "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB",
        "Menyerahkan paper akademik minimal 15 halaman",
      ],
    },
    curriculum: [
      {
        label: "Mata Kuliah Inti",
        courses: [
          {
            name: "Pandangan Reformed tentang Peran Gereja Dalam Transformasi Masyarakat",
            credits: 3,
          },
          { name: "Gereja Perkotaan", credits: 3 },
          { name: "Sosiologi dan Misi Perkotaan", credits: 3 },
          { name: "Sejarah Gereja dalam Perspektif Transformasi", credits: 3 },
          { name: "Kehidupan Spiritual Seorang Gembala", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Elektif",
        courses: [
          { name: "Elektif Pelayanan Kategorial 1", credits: 3 },
          { name: "Elektif Pelayanan Kategorial 2", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Konsentrasi",
        courses: [
          { name: "Homiletika Lanjutan", credits: 3 },
          { name: "Pengembangan Gereja", credits: 3 },
          { name: "Kepemimpinan & Manajemen Perubahan", credits: 3 },
          { name: "Isu-isu Kontemporer Etika Kristen", credits: 3 },
          { name: "Pelayanan Antar Generasi", credits: 3 },
          { name: "Konseling Pastoral", credits: 3 },
        ],
      },
      {
        label: "Penelitian & Tugas Akhir",
        courses: [
          { name: "Penulisan Akademik", credits: 3 },
          {
            name: "Riset Praktis Dalam Pelayanan Pastoral (Kualitatif)",
            credits: 3,
          },
          { name: "Praktik Pelayanan Weekend", credits: 3 },
          {
            name: "Praktik Pelayanan 6 bulan / Tugas Akhir Penelitian",
            credits: 6,
          },
        ],
      },
      {
        label: "Mentoring (per semester)",
        courses: [
          { name: "Mentoring Akademik", credits: 1 },
          { name: "Mentoring Spiritual I-Learn", credits: 1 },
        ],
      },
    ],
    competencies: [
      {
        title: "Informed",
        items: [
          "Pastor-Scholar yang berpengetahuan luas, mampu mengkonstruksi teologi yang sehat berdasarkan teks Alkitab dan mengembangkan relevansinya dalam konteks perkotaan di Indoensia dan sekitarnya.",
        ],
      },
      {
        title: "Transformed",
        items: [
          "Pastor-Scholar yang hidupnya mengalami transformasi dan berpusatkan kepada Kristus dalam setiap aspek kehidupannya",
        ],
      },
      {
        title: "Transformative",
        items: [
          "Pastor-Scholar yang mampu merancang dan melakukan pelayanan yang integral dalam konteks gereja perkotaan",
        ],
      },
    ],
  },
  {
    slug: "magister-budaya",
    heroTitle: "Magister Teologi Transformasi Budaya & Masyarakat",
    heroSubtitle: "Master of Theology (M.Th)",
    duration: "2 Tahun",
    totalCredits: "56 SKS",
    degree: "Master of Theology (M.Th)",
    overview: {
      about: [
        "Program Magister Teologi Transformasi Budaya & Masyarakat membekali mahasiswa dengan pemahaman teologi yang mendalam untuk merespons dan mentransformasi budaya serta kehidupan masyarakat secara relevan, melalui pelayanan, pemikiran kritis, dan keterlibatan sosial yang berdampak.",
      ],
      requirements: [
        "Minimal lulusan S.Th./M.Div./M.Min. dari sekolah teologi yang terakreditasi BAN PT dan atau ATA",
        "Lulus program S1 non teologi (dengan syarat mengikuti program M.Min. Teologi dan Pelayanan Gerejawi terlebih dahulu). Lulusan program Sarjana Pendidikan dari STTB tidak perlu mengambil program matrikulasi",
        "Pernah terlibat pelayanan gerejawi/lembaga Kristen minimal selama 2 tahun",
        "Memiliki panggilan yang jelas sebagai rohaniwan penuh waktu",
        "Memiliki kemampuan dasar Bahasa Inggris yang baik, terutama membaca dan memahami teks berbahasa Inggris",
        "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB",
        "Menyerahkan paper akademik minimal 15 halaman",
      ],
    },
    curriculum: [
      {
        label: "Mata Kuliah Inti",
        courses: [
          {
            name: "Pandangan Reformed tentang Peran Gereja Dalam Transformasi Masyarakat",
            credits: 3,
          },
          { name: "Gereja Perkotaan", credits: 3 },
          { name: "Sosiologi dan Misi Perkotaan", credits: 3 },
          { name: "Sejarah Gereja dalam Perspektif Transformasi", credits: 3 },
          { name: "Kehidupan Spiritual Seorang Gembala", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Elektif",
        courses: [
          { name: "Elektif 1", credits: 3 },
          { name: "Elektif 2", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Konsentrasi",
        courses: [
          { name: "Perspektif Teologi/Biblika Tentang Kemiskinan", credits: 3 },
          {
            name: "Perspektif Teologi/Biblika Tentang Dunia Kerja Dan Perekonomian",
            credits: 3,
          },
          { name: "Perspektif Teologi/Biblika Tentang Ekologi", credits: 3 },
          {
            name: "Perspektif Teologi/Biblika Tentang Keadilan Dan Kekuasaan",
            credits: 3,
          },
          {
            name: "Perspektif Teologi/Biblika Tentang Kemajemukan/Pluralisme",
            credits: 3,
          },
          { name: "Pelayanan Antar Generasi", credits: 3 },
        ],
      },
      {
        label: "Penelitian & Tugas Akhir",
        courses: [
          { name: "Penulisan Ilmiah Akademik", credits: 3 },
          { name: "Seminar Riset", credits: 3 },
          { name: "Proposal", credits: 3 },
          { name: "Tesis", credits: 6 },
        ],
      },
      {
        label: "Mentoring (per semester)",
        courses: [
          { name: "Mentoring Akademik", credits: 1 },
          { name: "Mentoring Spiritual I-Learn", credits: 1 },
        ],
      },
    ],
    competencies: [
      {
        title: "Informed",
        items: [
          "Pastor-Scholar yang berpengetahuan luas, mampus mengkonstruksi teologi yang sehat berdasarkan teks Alkitab dan mengembangkan relevansinya dalam konteks perkotaan di Indonesia dan sekitarnya.",
        ],
      },
      {
        title: "Transformed",
        items: [
          "Pastor-Scholar yang hidupnya mengalami transformasi dan berpusatkan kepada Kristus dalam setiap aspek kehidupannya",
        ],
      },
      {
        title: "Transformative",
        items: [
          "Pastor-Scholar yang mampu merancang dan melakukan pelayanan yang integral serta mampu melakukan penelitian akademis dan publikasi ilmiah dalam bidang ilmu teologi dan biblika yang ditekuninya",
        ],
      },
    ],
  },
  {
    slug: "magister-pendidikan",
    heroTitle: "Magister Pendidikan Kristen",
    heroSubtitle: "Magister Pendidikan (M.Pd.)",
    duration: "2 Tahun ",
    totalCredits: "80 SKS",
    degree: "Magister Pendidikan (M.Pd.)",
    overview: {
      about: [
        "Program Magister Pendidikan Kristen bertujuan memperlengkapi pendidik dan pemimpin pendidikan dengan pemahaman teologi dan pedagogi yang mendalam untuk mengembangkan pendidikan Kristen yang berkualitas dan relevan.",
      ],
      requirements: [
        "Minimal lulusan S1 dari semua jurusan",
        "Sudah baptis dewasa/sidi",
        "Pernah terlibat pelayanan sekolah/gereja/lembaga Kristen minimal selama 2 tahun",
        "Memiliki kemampuan dasar Bahasa inggris yang baik, terutama membaaca dan memahami teks berbahasa inggris",
        "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB",
        "Menyerahkan book review",
      ],
    },
    curriculum: [
      {
        label: "Mata Kuliah Fondasi",
        courses: [
          { name: "Fondasi Teologi Sistematika", credits: 3 },
          { name: "Fondasi Perjanjian Baru", credits: 3 },
          { name: "Fondasi Perjanjian Lama", credits: 3 },
          { name: "Hermeneutika", credits: 3 },
        ],
      },
      {
        label: "Kosentrasi: Kepemimpinan Pendidikan",
        courses: [
          { name: "Fondasi Kepimpinan Pendidikan Kristen", credits: 3 },
          { name: "Manajemen Pendidikan Entreprenerurial", credits: 3 },
          { name: "Pengelolaan dan Pengembangan SDM", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Elektif",
        courses: [
          { name: "Elektif 1", credits: 3 },
          { name: "Elektif 2", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Inti",
        courses: [
          { name: "Teologi Natur Manusia", credits: 3 },
          {
            name: "Sejarah, Filosofi dan Teologi Pendidikan Kristen",
            credits: 3,
          },
          { name: "Psikologi Perkembangan & Pendidikan", credits: 3 },
          { name: "Transformasi Spiritualitas Pendidikan", credits: 3 },
          { name: "Pendidikan Berbasis Keluarga", credits: 3 },
          { name: "Mentoring Perjalanan Studi", credits: 1 },
        ],
      },
      {
        label: "Kosentrasi: Desain Kurikulum",
        courses: [
          { name: "Desain & Pengembangan Kurikulum", credits: 3 },
          { name: "Evaluasi Pembelajaran", credits: 3 },
          { name: "Desain Strategi & Media Pembelajaran", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Penelitian",
        courses: [
          { name: "Penulisan Akademik", credits: 3 },
          { name: "Metodologi Pendidikan Kualitatif", credits: 3 },
          { name: "Metodologi Penelitian Proyek Kreatif", credits: 3 },
          { name: "Proposal", credits: 3 },
          { name: "Tugas Akhir: Tesis / Proyek Kreatif", credits: 8 },
        ],
      },
    ],
    competencies: [
      {
        title: "Informed",
        items: [
          "Memiliki fondasi biblika-teologis dan pendidikan yang solid dalam mengembangkan pendidikan Kristen yang holistik dan integratif",
        ],
      },
      {
        title: "Transformed",
        items: [
          "Memiliki transformasi hidup yang berpusatkan kepada Kristus dan karakter yang dewasa",
        ],
      },
      {
        title: "Transformative",
        items: [
          "Memiliki kecakapan memimpin dan merancang pendidikan Kristen yang transformatif",
        ],
      },
    ],
  },
  {
    slug: "magister-ministri",
    heroTitle: "Magister Ministri in Marketplace",
    heroSubtitle: "Master of Ministry (M.Min)",
    duration: "2 Tahun",
    totalCredits: "54 SKS",
    degree: "Master of Ministry (M.Min)",
    overview: {
      about: [
        "Program Magister Ministry in Marketplace mempersiapkan pemimpin Kristen untuk mengintegrasikan iman dengan dunia kerja, sehingga mampu menjadi saksi dan membawa nilai-nilai Kerajaan Allah di lingkungan profesional dan bisnis.",
      ],
      requirements: [
        "Minimal lulusan S1 dari semua jurusan",
        "Sudah baptis dewasa/sidi",
        "Pernah terlibat pelayanan sekolah/gereja/lembaga Kristen minimal selama 2 tahun",
        "Memiliki kemampuan dasar Bahasa inggris yang baik, terutama membaaca dan memahami teks berbahasa inggris",
        "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB",
        "Menyerahkan book review",
      ],
    },
    curriculum: [
      {
        label: "Fondasi Biblika",
        courses: [
          { name: "Fondasi Perjanjian Lama", credits: 3 },
          { name: "Fondasi Perjanjian Baru", credits: 3 },
          { name: "Hermeneutika", credits: 3 },
        ],
      },
      {
        label: "Fondasi Sistematika - Historika",
        courses: [
          { name: "Allah, Alkitab & Penciptaan", credits: 3 },
          { name: "Kristus & Keselamatan", credits: 3 },
          { name: "Roh Kudus & Gereja", credits: 3 },
          { name: "Gereja Dalam Konteks Sosio-Historis", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Inti",
        courses: [
          { name: "Spiritualitas Dunia Kerja", credits: 3 },
          { name: "Pemuridan Dunia Kerja", credits: 3 },
          { name: "Misi Integral Dunia Kerja", credits: 3 },
          { name: "Kepemimpinan Transformasional Dunia Kerja", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Konsentrasi",
        courses: [
          { name: "Teologi Kerja", credits: 3 },
          { name: "Etika Kerja", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Elektif",
        courses: [
          { name: "Kesehatan Mental Dalam Dunia Kerja", credits: 3 },
          { name: "Konseling Dasar Untuk Dunia Kerja", credits: 3 },
          { name: "Isu-Isu Kontemporer Dalam Dunia Kerja", credits: 3 },
          { name: "Perspektif Misi Dunia", credits: 3 },
          { name: "Mata Kuliah Di Prodi S2 Lain", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Penelitian",
        courses: [
          { name: "Mentoring Profesi", credits: 3 },
          { name: "Proyek Tugas Akhir", credits: 6 },
        ],
      },
    ],
    competencies: [
      {
        title: "Informed",
        items: [
          "Profesional Kristen yang memiliki fondasi biblikal-teologis yaang kokoh untuk memahami kehidupoan di dunia kerja dan misi Allah melalui dunia kerja",
        ],
      },
      {
        title: "Transformed",
        items: [
          "Profesional Kristen yang hidupnya mengalami transformasi dan tumbuh dalam spiritualitas yang utuh",
        ],
      },
      {
        title: "Transformative",
        items: [
          "Professional Kristen yang tumbuh dalam semangat dan kompetensi untuk menghadirkan shalom melalui hidup dan karyanya di dunia kerja",
        ],
      },
    ],
  },
  {
    slug: "magister-pastoral",
    heroTitle: "Magister Ministri Kepemimpinan Pastoral",
    heroSubtitle: "Master of Ministry (M.Min)",
    duration: "2 Tahun ",
    totalCredits: "45 SKS",
    degree: "Master of Ministry (M.Min)",
    overview: {
      about: [
        "Program Magister Minister Kepemimpinan Pastoral dirancang untuk mempersiapkan pemimpin gereja yang memiliki kedewasaan rohani, kemampuan pastoral, serta kepemimpinan yang efektif dalam menggembalakan jemaat dan mengembangkan pelayanan gereja.",
      ],
      requirements: [
        "Minimal lulusan S1 dari semua jurusan",
        "Sudah baptis dewasa/sidi",
        "Pernah terlibat pelayanan sekolah/gereja/lembaga Kristen minimal selama 2 tahun",
        "Memiliki kemampuan dasar Bahasa inggris yang baik, terutama membaaca dan memahami teks berbahasa inggris",
        "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB",
        "Menyerahkan book review",
      ],
    },
    curriculum: [
      {
        label: "Fondasi Biblika",
        courses: [
          { name: "Hermeneutika (Advanced)", credits: 3 },
          { name: "Revisit Fondasi Biblika (Metanarasi)", credits: 3 },
          {
            name: "Revisit Fondasi Sistematika (Teologi Reformed)",
            credits: 3,
          },
        ],
      },
      {
        label: "Mata Kuliah Inti",
        courses: [
          { name: "Spiritualitas Pemimpin Gereja", credits: 3 },
          { name: "Pemuridan Gereja", credits: 3 },
          { name: "Misi Integral Gereja", credits: 3 },
          { name: "Kepemimpinan Transformasional Gereja", credits: 3 },
          { name: "Pembinaan Spiritualitas Tiap Fase Kehidupan", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Konsentrasi",
        courses: [
          { name: "Teologi Pastoral", credits: 3 },
          { name: "Khotbah Ekspositori (Adv)", credits: 3 },
          { name: "Ibadah Transformatif", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Elektif",
        courses: [
          {
            name: "Perintisan dan Pertumbuhan Gereja (Timothy Institute)",
            credits: 3,
          },
          { name: "Manajemen Perubahan dan Konflik", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Penelitian",
        courses: [
          { name: "Mentoring Pastoral", credits: 3 },
          { name: "Tugas Akhir", credits: 6 },
        ],
      },
    ],
    competencies: [
      {
        title: "Informed",
        items: [
          "Memiliki fondasi biblika-teologis dan pendidikan yang solid dalam mengembangkan pendidikan Kristen yang holistik dan integratif",
        ],
      },
      {
        title: "Transformed",
        items: [
          "Memiliki transformasi hidup yang berpusatkan kepada Kristus dan karakter yang dewasa",
        ],
      },
      {
        title: "Transformative",
        items: [
          "Memiliki kecakapan memimpin dan merancang pendidikan Kristen yang transformatif",
        ],
      },
    ],
  },
  {
    slug: "magister-gerejawi",
    heroTitle: "Magister Ministri Teologi Pelayanan Gerejawi ",
    heroSubtitle: "Master of Ministry (M.Min)",
    duration: "2,5 Tahun ",
    totalCredits: "65 SKS",
    degree: "Master of Ministry (M.Min)",
    overview: {
      about: [
        "Program Magister Ministri Teologi Pelayanan Gerejawi mempersiapkan pemimpin dan pelayan gereja dengan pemahaman teologi yang mendalam serta keterampilan praktis untuk mengembangkan dan memimpin pelayanan gereja secara efektif.",
      ],
      requirements: [
        "Minimal lulusan S1 dari semua jurusan",
        "Sudah baptis dewasa/sidi",
        "Pernah terlibat pelayanan sekolah/gereja/lembaga Kristen minimal selama 2 tahun",
        "Memiliki kemampuan dasar Bahasa inggris yang baik, terutama membaaca dan memahami teks berbahasa inggris",
        "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB",
        "Menyerahkan book review",
      ],
    },
    curriculum: [
      {
        label: "Fondasi Biblika",
        courses: [
          { name: "Fondasi Perjanjian Lama (Taurat)", credits: 3 },
          { name: "Fondasi Perjanjian Baru (Injil)", credits: 3 },
          { name: "Hermeneutika", credits: 3 },
        ],
      },
      {
        label: "Fondasi Sistematika -Historika",
        courses: [
          { name: "Allah, Alkitab, & Penciptaan", credits: 3 },
          { name: "Kristus & Keselamatan", credits: 3 },
          { name: "Roh Kudus & Gereja", credits: 3 },
          { name: "Gereja Dalam Konteks Sosio - Historis", credits: 3 },
        ],
      },
      {
        label: "Mata Kuliah Kosentrasi",
        courses: [
          { name: "Studi Perjanjian Lama : Kitab Sejarah", credits: 3 },
          { name: "Studi Perjanjian Lama : Kitab Puisi / Nabi", credits: 3 },
          {
            name: "Studi Perjanjian Baru : Para Rasul & Surat Paulus",
            credits: 3,
          },
          { name: "Studi Perjanjian Baru : Kitab Umum & Wahyu", credits: 3 },
          { name: "Homiletika", credits: 3 },
          { name: "Teologi & Praktik Ibadah", credits: 3 },
          { name: "Bahasa Ibrani", credits: 2 },
          { name: "Bahasa Yunani", credits: 2 },
        ],
      },
      {
        label: "Mata Kuliah Inti",
        courses: [
          { name: "Transformasi Spiritualitas", credits: 3 },
          { name: "Pemuridan", credits: 3 },
          { name: "Misi Integral", credits: 3 },
        ],
      },
      {
        label: "Tugas Akhir",
        courses: [
          { name: "Mentoring Akademik", credits: 1 },
          { name: "Penulisan Akademik", credits: 3 },
          { name: "Tugas Akhir : Praktik Pelayanan", credits: 6 },
        ],
      },
    ],
    competencies: [
      {
        title: "Informed",
        items: [
          "Pelayanan gerejawi yang memiliki fondasi teologis yang solid untuk pelayanan gereja dalam konteks masyarakat",
        ],
      },
      {
        title: "Transformed",
        items: [
          "Pelayanan gerejawi yang hidupnya mengalami transformasi dan berpusatkan kepada Kristus dalam setiap aspek kehidupannya",
        ],
      },
      {
        title: "Transformative",
        items: [
          "Pelayanan gerejawi yang mampu merancang dan melakukan pelayanan yang integral dan transformatif dalam konteks gereja masa kini",
        ],
      },
    ],
  },
];

export function getProgramBySlug(slug: string): ProgramData | undefined {
  return programs.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return programs.map((p) => p.slug);
}
