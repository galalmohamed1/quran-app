export type MoshafType = {
  id: number;
  name: string;
  server: string;
  surah_total: number;
  moshaf_type: number;
  surah_list: string;
};

export type ReciterType = {
  id: number;
  name: string;
  letter: string;
  moshaf: MoshafType[];
};

export const FAMOUS_RECITER_NAMES = [
  "مشاري العفاسي",
  "عبد الرحمن السديس",
  "سعود الشريم",
  "ياسر الدوسري",
  "عبد الباسط عبد الصمد",
  "محمد صديق المنشاوي",
  "ماهر المعيقلي",
  "محمود خليل الحصري",
  "أحمد بن علي العجمي",
  "سعد الغامدي",
  "فارس عباد",
  "ناصر القطامي",
  "إدريس أبكر",
  "هزاع البلوشي",
];