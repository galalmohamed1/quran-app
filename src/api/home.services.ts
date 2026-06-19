import { AyahOfTheDayType, SurahType } from "@/types/type";


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

