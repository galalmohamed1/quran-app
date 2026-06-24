// import { fetchReciters } from '@/api/home.services';
// import { ReciterType } from '@/types/reciters';
// import React, { useEffect, useState } from 'react'

// export default function page() {
// 	const [reciters, setReciters] = useState<ReciterType[]>([]);
// 	const [selectedReciter, setSelectedReciter] = useState<{ id: string; name: string } | null>(null);
// 	const [selectedSurah, setSelectedSurah] = useState<number>(1);

// 	const audioUrl = getSurahAudioUrl(
//   "https://server6.mp3quran.net/akdr/",
//   selectedSurah
// );

// 	console.log(audioUrl);
// 	useEffect(() => {
//   const loadReciters = async () => {
//     const data = await fetchReciters();
// 	console.log(data);
	
//     setReciters(data);
//   };

//   loadReciters();
// }, []);
//   return (
// 	  <>
// 		  <div className="w-full h-[45px] flex items-center gap-2">
// 			<audio
// 				className="w-full h-full min-h-[45px]"
// 				src={`${audioUrl}`}
// 				controls
// 			/>
// 		</div>
// 	  </>
//   )
// }























// import React, { useEffect, useState } from 'react'
// import SurahCard from "../UI/SurahCard";
// import { SurahType } from '@/types/type';
// import { fetchSurahList } from '@/api/home.services';
// import { useAppSelector } from '@/app/rtk/hooks';
// export default function page() {
// 	const [searchValue, setSearchValue] = useState<string>("");
// 	const [surahsListToShow, setSurahsListToShow] = useState<SurahType[]>([]);
// 	const [searchResults, setSearchResults] = useState<SurahType[]>([]);
// 	const surahsList = useAppSelector(state => state.listSlice.list);
// 	useEffect(() => {
// 			const loadSurahList = async () => {
// 				const surahs = await fetchSurahList();
	
// 				setSurahsListToShow(surahs);
// 				// setSurahsListOriginal(surahs);
// 			};
	
// 			loadSurahList();
// 		}, []);
	
// 		useEffect(() => {
// 			localStorage.setItem("surahsList", JSON.stringify(surahsList));
// 		}, [surahsList]);
// 	useEffect(() => {
// 			const query = searchValue.trim().toLowerCase();
	
// 			if (query === "") {
// 				setSearchResults([]);
// 				return;
// 			}
	
// 			setSearchResults(
// 				surahsListToShow.filter(surah => {
// 					const matchesEnglish = surah.englishName.toLowerCase().includes(query);
// 					const matchesArabic = surah.name.includes(searchValue.trim());
// 					const matchesNumber = surah.number.toString() === query;
// 					return matchesEnglish || matchesArabic || matchesNumber;
// 				})
// 			);
// 		}, [searchValue, surahsListToShow]);
// 	const returnList = (): SurahType[] => {
// 			if (searchValue.trim() === "") return surahsListToShow;
// 			else return searchResults;
// 		};
//   return (
//     <div>
//         <div className="h-[calc(100%-109px)] lg:h-[calc(100vh-162px)] overflow-y-scroll">
// 					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-3 pr-3">
// 						{returnList().map(surah => (
// 							<SurahCard key={surah.number} surah={surah} />
// 						))}
// 					</div>
// 				</div>
//     </div>
//   )
// }
