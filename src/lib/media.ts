export type MediaType = "Article" | "Video" | "Journal" | "Bulletin" | "Monograph";

export interface MediaItem {
  id: number;
  slug: string;
  type: MediaType;
  title: string;
  description: string;
  author: string;
  image: string;
  meta?: string;
  categoryLabel?: string;
  releaseDate: string;
  category: string;
  referenceCode: string;
  pages: string[];
}

export const readableMediaTypes: MediaType[] = ["Article", "Journal", "Bulletin", "Monograph"];

export const mediaItems: MediaItem[] = [
  {
    id: 1,
    slug: "neo-classical-urbanism",
    type: "Article",
    title: "The Architectural Resurgence of Neo-Classical Forms in Modern Urbanism",
    description:
      "An in-depth analysis of how historical motifs are being repurposed to address contemporary density challenges in major European metropolitan areas.",
    author: "Admin",
    meta: "12 Min Read",
    image:
      "https://images.unsplash.com/photo-1455885666463-3a047aaa1639?auto=format&fit=crop&q=80",
    releaseDate: "2025-03-14",
    category: "Article",
    referenceCode: "ART-2025-0314",
    pages: [
      "Section 1. Neo-classical vocabulary has re-entered contemporary urban design as a stabilizing visual language amid accelerated city expansion.",
      "Section 2. In dense metropolitan districts, symmetrical facade systems and colonnade rhythm are being adapted to mixed-use zoning without reproducing historical rigidity.",
      "Section 3. The strongest outcomes appear when ornament is treated as legibility infrastructure, helping pedestrians read civic hierarchy in high-complexity environments.",
    ],
  },
  {
    id: 2,
    slug: "future-digital-archiving",
    type: "Video",
    title: "The Future of Digital Archiving",
    description:
      "Join Curator Elena Rossi as she discusses the preservation of volatile digital media in the 21st century.",
    author: "Elena Rossi",
    meta: "FEATURED VIDEO",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80",
    releaseDate: "2025-05-01",
    category: "Video",
    referenceCode: "VID-2025-0501",
    pages: [],
  },
  {
    id: 3,
    slug: "journal-applied-hermeneutics-vol42-no4",
    type: "Journal",
    title: "Journal of Applied Hermeneutics",
    description: "VOL. 42 | NO. 4",
    author: "Editor",
    meta: "ISSN: 1945-8224",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80",
    releaseDate: "2024-11-23",
    category: "Journal",
    referenceCode: "ISSN 1945-8224",
    pages: [
      "Editorial. This issue maps interpretive frameworks that bridge textual fidelity and modern institutional practice.",
      "Research Note. Comparative hermeneutic models reveal a persistent gap between methodological clarity and translational usefulness in interdisciplinary settings.",
      "Conclusion. Journal contributors advocate for an integrated reading ecology where historical grammar, lived context, and ethical implication are treated as one movement.",
    ],
  },
  {
    id: 4,
    slug: "epistemological-shifts-anthropocene",
    type: "Monograph",
    title: "Epistemological Shifts in the Anthropocene",
    description:
      "A comprehensive study of how our understanding of objective truth has mutated under the pressure of climate change discourse.",
    author: "Dr. Julian Thorne",
    categoryLabel: "MONOGRAPH",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80",
    releaseDate: "2023-08-19",
    category: "Monograph",
    referenceCode: "MONO-2023-0819",
    pages: [
      "Chapter 1. Anthropocene discourse has challenged inherited assumptions about neutral observation and detached objectivity.",
      "Chapter 2. Knowledge communities now negotiate truth claims through layered risk models, policy narratives, and transnational media infrastructures.",
      "Chapter 3. The monograph proposes a post-foundational framework where rigor is measured by traceability, accountability, and consequence awareness.",
    ],
  },
  {
    id: 5,
    slug: "summer-residency-grants-2026",
    type: "Bulletin",
    title: "Summer Residency Grants: Now Accepting Applications",
    description:
      "The Gallery is proud to announce three new fellowship tracks for early-career researchers focusing on media studies.",
    author: "Admin",
    categoryLabel: "BULLETIN: LIVE UPDATES",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80",
    releaseDate: "2026-01-07",
    category: "Bulletin",
    referenceCode: "BLTN-2026-0107",
    pages: [
      "Update 1. Fellowship track A prioritizes archival research proposals with measurable public dissemination outputs.",
      "Update 2. Fellowship track B supports practice-based investigation combining field documentation and critical annotation.",
      "Update 3. Fellowship track C is reserved for collaborative teams working on cross-campus media literacy initiatives.",
    ],
  },
];

export function getMediaBySlug(slug: string) {
  return mediaItems.find((item) => item.slug === slug) || null;
}

export function isReadableMediaType(type: MediaType) {
  return readableMediaTypes.includes(type);
}