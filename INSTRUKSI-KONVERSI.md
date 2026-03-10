# Panduan Lengkap Konversi React Router ke Next.js

## ✅ Yang Sudah Selesai

1. **Next.js Configuration**
   - `next.config.js` - Konfigurasi Next.js dengan export static
   - `package.json` - Scripts updated untuk Next.js
   
2. **Root Files**
   - `/src/app/layout.tsx` - Root layout dengan imports CSS
   - `/src/app/page.tsx` - Home page

3. **Komponen**
   - `/src/app/components/Layout.tsx` - Diupdate untuk Next.js dengan "use client"

4. **Pages Yang Sudah Dikonversi**
   - `/src/app/tentang-kami/page.tsx` ✅
   - `/src/app/program-studi/page.tsx` ✅

## ⏳ Yang Masih Perlu Dikonversi

Untuk setiap file di bawah, ikuti langkah konversi:

### 1. `/src/app/admisi/page.tsx`
**Source**: `/src/app/pages/Admisi.tsx`

**Langkah**:
```bash
1. Buat folder: mkdir /src/app/admisi
2. Copy file: cp /src/app/pages/Admisi.tsx /src/app/admisi/page.tsx
3. Edit file /src/app/admisi/page.tsx:
   - Tambahkan "use client"; di baris 1 (karena pakai useState)
   - TIDAK PERLU ubah import Link karena tidak ada Link di file ini
```

### 2. `/src/app/berita/page.tsx`
**Source**: `/src/app/pages/Berita.tsx`

**Langkah**:
```bash
1. Buat folder: mkdir /src/app/berita
2. Copy file: cp /src/app/pages/Berita.tsx /src/app/berita/page.tsx
3. Edit file /src/app/berita/page.tsx:
   - Tambahkan "use client"; di baris 1
   - Ganti: import { Link } from "react-router" 
     Dengan: import Link from "next/link"
   - Ganti semua: to="/berita/..." 
     Dengan: href="/berita/..."
```

### 3. `/src/app/berita/[id]/page.tsx`  
**Source**: `/src/app/pages/ArtikelDetail.tsx`

**Langkah**:
```bash
1. Buat folder: mkdir -p /src/app/berita/[id]
2. Copy file: cp /src/app/pages/ArtikelDetail.tsx /src/app/berita/[id]/page.tsx
3. Edit file /src/app/berita/[id]/page.tsx:
   - Tambahkan "use client"; di baris 1
   - Ganti: import { useParams } from "react-router"
     Dengan: import { useParams } from "next/navigation"
   - Ganti: import { Link } from "react-router"
     Dengan: import Link from "next/link"
   - Ganti semua: to="..."
     Dengan: href="..."
   - useParams tetap sama, pakai: const { id } = useParams();
```

### 4. `/src/app/kehidupan-kampus/page.tsx`
**Source**: `/src/app/pages/KehidupanKampus.tsx`

**Langkah**:
```bash
1. Buat folder: mkdir /src/app/kehidupan-kampus
2. Copy file: cp /src/app/pages/KehidupanKampus.tsx /src/app/kehidupan-kampus/page.tsx
3. Edit file /src/app/kehidupan-kampus/page.tsx:
   - Tambahkan "use client"; di baris 1 (karena pakai useState)
   - TIDAK PERLU ubah import Link jika tidak ada
```

### 5. `/src/app/program-akademik/page.tsx`
**Source**: `/src/app/pages/ProgramAkademik.tsx`

**Langkah**:
```bash
1. Buat folder: mkdir /src/app/program-akademik  
2. Copy file: cp /src/app/pages/ProgramAkademik.tsx /src/app/program-akademik/page.tsx
3. Edit file /src/app/program-akademik/page.tsx:
   - Tambahkan "use client"; jika pakai useState/useEffect
   - Ganti import Link jika ada:
     Dari: import { Link } from "react-router"
     Ke: import Link from "next/link"
   - Ganti semua to= ke href=
```

## Cheat Sheet Perubahan

### Import Statements
```typescript
// ❌ React Router
import { Link, useNavigate, useParams } from "react-router";

// ✅ Next.js
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
```

### Link Components
```typescript
// ❌ React Router
<Link to="/about">About</Link>

// ✅ Next.js  
<Link href="/about">About</Link>
```

### Client Component
```typescript
// ❌ Tanpa directive
import { useState } from "react";

export default function Page() { ... }

// ✅ Dengan directive
"use client";

import { useState } from "react";

export default function Page() { ... }
```

### Navigation Hooks
```typescript
// ❌ React Router
import { useNavigate } from "react-router";
const navigate = useNavigate();
navigate("/about");

// ✅ Next.js
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/about");
```

### Dynamic Routes
```typescript
// ❌ React Router
// File: /src/app/pages/ArtikelDetail.tsx
import { useParams } from "react-router";
const { id } = useParams();

// ✅ Next.js
// File: /src/app/berita/[id]/page.tsx
import { useParams } from "next/navigation";
const params = useParams();
const id = params.id; // atau const { id } = params;
```

## Menjalankan Aplikasi

```bash
# Development
npm run dev
# atau
pnpm dev

# Build
npm run build
# atau
pnpm build

# Production
npm run start
# atau
pnpm start
```

## File Yang Bisa Dihapus Setelah Konversi Selesai

- `/src/app/pages/*` (folder pages lama)
- `/src/app/routes.ts` (tidak diperlukan di Next.js)
- `/src/app/App.tsx` (tidak diperlukan di Next.js)
- `/vite.config.ts` (Next.js tidak pakai Vite)

## Troubleshooting

### Error: "You're importing a component that needs useState..."
**Solusi**: Tambahkan `"use client";` di baris pertama file

### Error: "Module not found: Can't resolve 'react-router'"
**Solusi**: Ganti import dari "react-router" ke "next/link" atau "next/navigation"

### Error: "to is not a prop of Link"
**Solusi**: Ganti `to=` dengan `href=`

### Error: Tailwind styles not working
**Solusi**: Pastikan CSS imports ada di `/src/app/layout.tsx`:
```typescript
import "../styles/index.css";
import "../styles/fonts.css";
import "../styles/tailwind.css";
import "../styles/theme.css";
```
