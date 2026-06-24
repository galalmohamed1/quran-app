import { AyahOfTheDayType, SurahType } from "@/types/type";
import { ReciterType,FAMOUS_RECITER_NAMES } from "@/types/reciters";


export async function fetchSurahList():Promise<SurahType[]>{
    try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        const { data } = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

export async function fetchSurah(surahNumber: number): Promise<SurahType | null> {
    try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`);
        const { data } = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
export async function AyahOfTheDay(surahNumber: number): Promise<AyahOfTheDayType | null> {
    try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`);
        const { data } = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

export async function fetchReciters(): Promise<ReciterType[]> {
  try {
    const response = await fetch(
      "https://www.mp3quran.net/api/v3/reciters?language=ar"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reciters");
    }

    const data = await response.json();

    
    const reciters: ReciterType[] = data.reciters;

    const famousReciters = reciters.filter((reciter) =>
      FAMOUS_RECITER_NAMES.some((name) => reciter.name.includes(name))
    );

    return famousReciters.sort((a, b) => {
      const indexA = FAMOUS_RECITER_NAMES.findIndex((name) =>
        a.name.includes(name)
      );

      const indexB = FAMOUS_RECITER_NAMES.findIndex((name) =>
        b.name.includes(name)
      );

      return indexA - indexB;
    });
  } catch (err) {
    console.log(err);
    return [];
  }
}
export function getSurahAudioUrl(server: string, surahNumber: number): string {
  const surah = String(surahNumber).padStart(3, "0");
  return `${server}${surah}.mp3`;
}