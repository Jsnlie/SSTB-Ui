# Konversi React Router ke Next.js

## Status Konversi

✅ Selesai:
- Layout (komponen sudah diupdate ke Next.js)
- Home page (/)
- Tentang Kami (/tentang-kami)
- Program Studi (/program-studi)

⏳ Perlu dikonversi (copy dari /src/app/pages/ ke struktur Next.js):
- Admisi: Salin dari `/src/app/pages/Admisi.tsx` → `/src/app/admisi/page.tsx`
- Berita: Salin dari `/src/app/pages/Berita.tsx` → `/src/app/berita/page.tsx`
- Artikel Detail: Salin dari `/src/app/pages/ArtikelDetail.tsx` → `/src/app/berita/[id]/page.tsx`
- Kehidupan Kampus: Salin dari `/src/app/pages/KehidupanKampus.tsx` → `/src/app/kehidupan-kampus/page.tsx`
- Program Akademik: Salin dari `/src/app/pages/ProgramAkademik.tsx` → `/src/app/program-akademik/page.tsx`

## Perubahan yang Diperlukan Untuk Setiap File:

1. Tambahkan `"use client";` di baris pertama jika menggunakan hooks (useState, useEffect, dll)
2. Ganti `import { Link } from "react-router"` → `import Link from "next/link"`
3. Ganti `to=` → `href=` pada semua Link component
4. Untuk dynamic routes seperti berita/[id]:
   - Gunakan `import { useParams } from "next/navigation"` 
   - const params = useParams(); const id = params.id;

## File Konfigurasi:

✅ `/next.config.js` - Sudah dibuat
✅ `/src/app/layout.tsx` - Root layout sudah dibuat
✅ `/src/app/page.tsx` - Home page sudah dibuat
✅ `package.json` - Scripts sudah diupdate

## Catatan Penting:

- Semua imports CSS sudah di layout.tsx
- ImageWithFallback component tetap sama
- Radix UI components tetap berfungsi
- Tailwind CSS sudah terkonfigurasi dengan benar
