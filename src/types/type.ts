export interface AyahType {
    audio: string;
    audioSecondary: string[];
    hizbQuarter: number;
    juz: number;
    manzil: number;
    number: number;
    numberInSurah: number;
    page: number;
    ruku: number;
    sajda: boolean;
    text: string;
}

export interface SurahType {
    ayahs?: AyahType[];
    englishName: string;
    englishNameTranslation: string;
    name: string;
    number: number;
    numberOfAyahs: number;
    revelationType: string;
}

export interface AyahOfTheDayType {
    code: number;
    data: {
        audio: string;
        audioSecondary: string[];
        edition: {
            direction: null;
            englishName: string;
            format: string;
            identifier: string;
            language: string;
            name: string;
            type: string;
        };
        hizbQuarter: number;
        juz: number;
        manzil: number;
        number: number;
        numberInSurah: number;
        page: number;
        ruku: number;
        sajda: boolean;
        surah: SurahType;
        text: string;
    };
    status: string;
}