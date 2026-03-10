# Ringkasan Konversi React Router ke Next.js

## ✅ SUDAH SELESAI DIKONVERSI

### 1. File Konfigurasi
- ✅ `/package.json` - Scripts updated untuk Next.js
- ✅ `/next.config.js` - Konfigurasi Next.js dengan static export
- ✅ `/src/app/layout.tsx` - Root layout dengan CSS imports
- ✅ `/src/app/components/Layout.tsx` - Updated dengan "use client" dan Next.js hooks

### 2. Halaman Yang Sudah Dikonversi  
- ✅ `/src/app/page.tsx` - Home page (converted dari /src/app/pages/Home.tsx)
- ✅ `/src/app/tentang-kami/page.tsx` - Tentang Kami page
- ✅ `/src/app/program-studi/page.tsx` - Program Studi page
- ✅ `/src/app/admisi/page.tsx` - Admisi page

## ⏳ BELUM DIKONVERSI - PERLU MANUAL COPY & EDIT

Ikuti panduan di `/INSTRUKSI-KONVERSI.md` untuk mengkonversi file-file berikut:

### 3. Halaman Yang Perlu Dikonversi

| Source File | Destination | Status | Catatan |
|------------|-------------|--------|---------|
| `/src/app/pages/Berita.tsx` | `/src/app/berita/page.tsx` | ⏳ TODO | Tambah "use client", ganti Link imports |
| `/src/app/pages/ArtikelDetail.tsx` | `/src/app/berita/[id]/page.tsx` | ⏳ TODO | Dynamic route, ganti useParams |
| `/src/app/pages/KehidupanKampus.tsx` | `/src/app/kehidupan-kampus/page.tsx` | ⏳ TODO | Tambah "use client" |
| `/src/app/pages/ProgramAkademik.tsx` | `/src/app/program-akademik/page.tsx` | ⏳ TODO | Check jika ada Link yang perlu diganti |

## CARA KONVERSI CEPAT

### Untuk Berita Page:

```bash
# 1. Buat folder
mkdir /src/app/berita

# 2. Copy file
cp /src/app/pages/Berita.tsx /src/app/berita/page.tsx

# 3. Edit /src/app/berita/page.tsx
# Tambahkan di line 1: "use client";
# Ganti: import { Link } from "react-router" 
# Dengan: import Link from "next/link"
# Ganti semua: to="/..." dengan href="/..."
```

### Untuk Artikel Detail (Dynamic Route):

```bash
# 1. Buat folder dengan bracket
mkdir -p /src/app/berita/[id]

# 2. Copy file  
cp /src/app/pages/ArtikelDetail.tsx /src/app/berita/[id]/page.tsx

# 3. Edit /src/app/berita/[id]/page.tsx
# Tambahkan di line 1: "use client";
# Ganti: import { useParams } from "react-router"
# Dengan: import { useParams } from "next/navigation"
# Ganti: import { Link } from "react-router"
# Dengan: import Link from "next/link"  
# Ganti semua: to="..." dengan href="..."
```

### Untuk Kehidupan Kampus:

```bash
mkdir /src/app/kehidupan-kampus
cp /src/app/pages/KehidupanKampus.tsx /src/app/kehidupan-kampus/page.tsx
# Edit: Tambahkan "use client"; di line 1
```

### Untuk Program Akademik:

```bash
mkdir /src/app/program-akademik
cp /src/app/pages/ProgramAkademik.tsx /src/app/program-akademik/page.tsx
# Edit: Tambahkan "use client"; jika pakai useState, ganti Link jika ada
```

## VERIFICATION CHECKLIST

Setelah konversi, check ini:

- [ ] Semua halaman bisa diakses via browser
- [ ] Navigation links bekerja dengan benar
- [ ] Styling Tailwind tampil dengan benar
- [ ] Images dari Unsplash loading
- [ ] Component interactions (accordion, tabs, etc) bekerja
- [ ] Dynamic routes ([id]) menangkap parameter dengan benar

## TESTING

```bash
# Jalankan development server
npm run dev
# atau
pnpm dev

# Test di browser:
# http://localhost:3000 - Home
# http://localhost:3000/tentang-kami - Tentang Kami  
# http://localhost:3000/program-studi - Program Studi
# http://localhost:3000/admisi - Admisi
# http://localhost:3000/berita - Berita (setelah dikonversi)
# http://localhost:3000/berita/1 - Artikel Detail (setelah dikonversi)
# http://localhost:3000/kehidupan-kampus - Kehidupan Kampus (setelah dikonversi)
```

## CLEANUP

Setelah semua halaman dikonversi dan ditest, hapus file-file lama:

```bash
# HATI-HATI: Pastikan semua sudah dikonversi dan ditest sebelum menghapus!

rm -rf /src/app/pages
rm /src/app/routes.ts
rm /src/app/App.tsx
rm /vite.config.ts
```

## STRUKTUR FOLDER FINAL

```
/src/app/
├── layout.tsx (root layout)
├── page.tsx (home)
├── components/
│   ├── Layout.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/
│       └── ... (semua UI components)
├── tentang-kami/
│   └── page.tsx
├── program-studi/
│   └── page.tsx
├── program-akademik/
│   └── page.tsx
├── admisi/
│   └── page.tsx
├── berita/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
└── kehidupan-kampus/
    └── page.tsx
```

## TROUBLESHOOTING

### Error: "Cannot find module 'react-router'"
**Fix**: Ganti semua `import { ... } from "react-router"` dengan Next.js equivalents

### Error: "'to' is not a valid prop"
**Fix**: Ganti semua `to=` dengan `href=` pada Link components

### Error: "You're importing a component that needs useState"
**Fix**: Tambahkan `"use client";` di baris pertama file

### Styling tidak muncul
**Fix**: Pastikan CSS imports ada di `/src/app/layout.tsx`

## DOKUMENTASI

- Panduan lengkap ada di: `/INSTRUKSI-KONVERSI.md`
- Next.js docs: https://nextjs.org/docs
- App Router Guide: https://nextjs.org/docs/app

---

**Status Terakhir**: 4 dari 8 halaman sudah dikonversi (50%)
**Estimasi waktu konversi sisa**: 30-45 menit (manual copy & edit 4 file)
