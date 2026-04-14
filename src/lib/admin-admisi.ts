import {
  getErrorMessage,
  normalizeArray,
  toNumberSafe,
  toStringSafe,
} from "./response";

export interface AdmissionApiItem {
  id: number;
  admissionPackageId: number;
  name: string;
  price: number;
}

export interface AdmissionApiPackage {
  id: number;
  programStudiId: number;
  year: string;
  admissionItems: AdmissionApiItem[];
}

export interface AdmisiBiayaStudiItem {
  id: number;
  programStudiId: number;
  program: string;
  year: string;
  total: number;
  admissionItems: AdmissionApiItem[];
}

function toAdmissionItem(raw: any): AdmissionApiItem {
  return {
    id: toNumberSafe(raw?.id),
    admissionPackageId: toNumberSafe(raw?.admissionPackageId),
    name: toStringSafe(raw?.name),
    price: toNumberSafe(raw?.price),
  };
}

function mapAdmissionPackage(
  raw: any,
  programNameById: Map<number, string>
): AdmisiBiayaStudiItem {
  const id = toNumberSafe(raw?.id);
  const programStudiId = toNumberSafe(raw?.programStudiId);
  const year = toStringSafe(raw?.year);
  const admissionItems = normalizeArray<any>(raw?.admissionItems).map(toAdmissionItem);

  const total = admissionItems.reduce((sum, item) => sum + toNumberSafe(item.price), 0);
  const program =
    programNameById.get(programStudiId) ||
    toStringSafe(raw?.programStudiName) ||
    `Program Studi ${programStudiId || "-"}`;

  return {
    id,
    programStudiId,
    program,
    year,
    total,
    admissionItems,
  };
}

export function parseAdmissionListResponse(
  payload: any,
  programNameById: Map<number, string> = new Map()
) {
  return normalizeArray<any>(payload).map((item) => mapAdmissionPackage(item, programNameById));
}

export function parseAdmissionDetailResponse(
  payload: any,
  programNameById: Map<number, string> = new Map()
) {
  if (!payload) return null;
  const source = payload?.data ?? payload;

  if (Array.isArray(source)) {
    if (source.length === 0) return null;
    return mapAdmissionPackage(source[0], programNameById);
  }

  if (!source || typeof source !== "object") return null;
  return mapAdmissionPackage(source, programNameById);
}

export function parseCurrencyInput(value: string) {
  const numeric = value.replace(/[^\d]/g, "");
  if (!numeric) return 0;
  return Number.parseInt(numeric, 10);
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export { getErrorMessage };
