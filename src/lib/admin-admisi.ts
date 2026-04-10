export interface AdmisiBiayaStudiItem {
  id: number;
  program: string;
  pendaftaranTes: string;
  administrasiPerSemester: string;
  biayaKuliahPerSemester: string;
  bimbinganTA: string;
  wisuda: string;
  cutiAkademik: string;
  total: string;
}

export const admisiBiayaStudiDummyData: AdmisiBiayaStudiItem[] = [
  {
    id: 1,
    program: "Sarjana Teologi (S.Th)",
    pendaftaranTes: "Rp 500.000",
    administrasiPerSemester: "Rp 500.000",
    biayaKuliahPerSemester: "Rp 9.000.000",
    bimbinganTA: "Rp 1.500.000",
    wisuda: "Rp 2.000.000",
    cutiAkademik: "Rp 500.000",
    total: "Rp 14.000.000",
  },
  {
    id: 2,
    program: "Sarjana Teologi (S.Pd)",
    pendaftaranTes: "Rp 500.000",
    administrasiPerSemester: "Rp 500.000",
    biayaKuliahPerSemester: "Rp 9.000.000",
    bimbinganTA: "Rp 1.500.000",
    wisuda: "Rp 2.000.000",
    cutiAkademik: "Rp 500.000",
    total: "Rp 14.000.000",
  },
  {
    id: 3,
    program: "Magister Teologi (M.Th)",
    pendaftaranTes: "Rp 500.000",
    administrasiPerSemester: "Rp 500.000",
    biayaKuliahPerSemester: "Rp 1.500.000",
    bimbinganTA: "Rp 7.000.000",
    wisuda: "Rp 2.500.000",
    cutiAkademik: "Rp 500.000",
    total: "Rp 12.500.000",
  },
  {
    id: 4,
    program: "Magister Pendidikan (M.Pd)",
    pendaftaranTes: "Rp 500.000",
    administrasiPerSemester: "Rp 500.000",
    biayaKuliahPerSemester: "Rp 1.500.000",
    bimbinganTA: "Rp 7.000.000",
    wisuda: "Rp 2.500.000",
    cutiAkademik: "Rp 500.000",
    total: "Rp 12.500.000",
  },
  {
    id: 5,
    program: "Magister Pelayanan (M.Min)",
    pendaftaranTes: "Rp 500.000",
    administrasiPerSemester: "Rp 500.000",
    biayaKuliahPerSemester: "Rp 1.500.000",
    bimbinganTA: "Rp 2.500.000",
    wisuda: "Rp 2.500.000",
    cutiAkademik: "Rp 500.000",
    total: "Rp 8.000.000",
  },
];

export function getAdmisiBiayaStudiById(id: number) {
  return admisiBiayaStudiDummyData.find((item) => item.id === id) ?? null;
}

export function getTotalAdmisiBiayaStudi() {
  return admisiBiayaStudiDummyData.length;
}
