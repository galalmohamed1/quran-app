"use client";

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { usePathname } from "next/navigation";
import React, {
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { AyahType, SurahType } from "@/types/type";
import { ReciterType } from "@/types/reciters";
import Image from "next/image";
import quranImage from "../../public/Quran.png";
import bismillahImage from "../../public/bismillah.png";
import ayahIcon from "../../public/ayah-icon.svg";
import Button from "./UI/Button";
import Link from "next/link";
import Loading from "./UI/Loading";
import { useAppDispatch, useAppSelector } from "@/app/rtk/hooks";
import {
	addSurah,
	removeSurah,
	updateSurahsListLS,
} from "@/app/rtk/slices/listSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { fetchSurah, getSurahAudioUrl, fetchReciters } from "@/api/home.services";

const ReadCom = () => {
	const pathname = usePathname();
	let surahNumber = Number(pathname.split("/")[pathname.split("/").length - 1]);

	const [surah, setSurah] = useState<SurahType | null>(null);
	const [currentAyah, setCurrentAyah] = useState<AyahType | null>(null);
	const [currentAyahNumber, setCurrentAyahNumber] = useState(1);

	let surahTextContainerRef = useRef<HTMLDivElement | null>(null);

	const [isSurahInList, setIsSurahInList] = useState<boolean | null>(null);
	const [reciters, setReciters] = useState<ReciterType[]>([]);
	const [selectedReciter, setSelectedReciter] = useState<ReciterType | null>(null);
	const [selectedServer, setSelectedServer] = useState<string>("");
	const state = useAppSelector(state => state.listSlice);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setTimeout(() => {
			const ayahIsActive: HTMLElement | null | undefined =
				surahTextContainerRef.current?.querySelector(".active");

			if (
				ayahIsActive?.offsetTop != null &&
				surahTextContainerRef.current != null
			) {
				let scrollLimit =
					ayahIsActive?.offsetTop -
					surahTextContainerRef.current?.offsetHeight -
					200;
				const scrollInterval = setInterval(() => {
					if (
						surahTextContainerRef.current != null &&
						surahTextContainerRef.current.scrollTop <= scrollLimit
					) {
						surahTextContainerRef.current.scrollTop =
							surahTextContainerRef.current.scrollTop += 50;
					} else {
						clearInterval(scrollInterval);
					}
				}, 1);
			}
		}, 1000);
	}, []);

	useEffect(() => {
  const loadSurah = async () => {
    const surahData = await fetchSurah(surahNumber);

    if (!surahData) return;

    setSurah(surahData);

    const firstAyah = surahData.ayahs?.[0];

    if (firstAyah) {
      setCurrentAyahNumber(firstAyah.numberInSurah);
      setCurrentAyah(firstAyah);
    }

    const lastAyahFromLS = localStorage.getItem("lastAyah");

    if (lastAyahFromLS != null) {
      setLastAyah();
    }
  };

  loadSurah();
}, [surahNumber]);

	useEffect(() => {
		const lastAyahFromLS = localStorage.getItem("lastAyah");

		if (currentAyah) {
			if (lastAyahFromLS !== null) {
				const lastAyahObjFromLS = JSON.parse(lastAyahFromLS);

				lastAyahObjFromLS.map(
					(item: { surahNumber: number; ayah: AyahType }) => {
						const isDuplicated = lastAyahObjFromLS.find(
							(item: { surahNumber: number; ayah: AyahType }) =>
								item.surahNumber == surahNumber
						);

						if (item.surahNumber == surahNumber) {
							item.ayah = currentAyah;

							localStorage.setItem(
								"lastAyah",
								JSON.stringify(lastAyahObjFromLS)
							);
						} else if (item.surahNumber != surahNumber && !isDuplicated) {
							localStorage.setItem(
								"lastAyah",
								JSON.stringify(
									lastAyahObjFromLS.concat({ surahNumber, ayah: currentAyah })
								)
							);
						}
					}
				);
			} else {
				localStorage.setItem(
					"lastAyah",
					JSON.stringify([
						{
							surahNumber: surah?.number,
							ayah: currentAyah,
						},
					])
				);
			}
		}
	}, [currentAyah, surah?.number, surahNumber]);

	useEffect(() => {
		const loadReciters = async () => {
			const data = await fetchReciters();

			setReciters(data);

			const firstServer = data[0]?.moshaf?.[0]?.server;

			if (firstServer) {
			setSelectedServer(firstServer);
			}
		};

		loadReciters();
	}, []);

	const setLastAyah = React.useCallback(() => {
		const lastAyahFromLS = localStorage.getItem("lastAyah");

		if (lastAyahFromLS != null) {
			const lastAyahObjFromLS = JSON.parse(lastAyahFromLS);

			lastAyahObjFromLS.map((item: { ayah: AyahType; surahNumber: number }) => {
				if (item.surahNumber == surahNumber) {
					setCurrentAyah(item.ayah);
					setCurrentAyahNumber(item.ayah.numberInSurah);
				}
			});
		}
	}, [surahNumber]);

	const checkIfSurahInTheList = useCallback((): boolean => {
		let isDuplicated = false;

		state.list.map(
			(surah: SurahType) => surah.number == surahNumber && (isDuplicated = true)
		);

		return isDuplicated;
	}, [state.list, surahNumber]);

	useEffect(() => {
		setIsSurahInList(checkIfSurahInTheList());
	}, [checkIfSurahInTheList]);

	const handleAddToList = (surah: any) => {
		dispatch(addSurah(surah));
		dispatch(updateSurahsListLS());
	};

	const handleRemoveFromList = (surah: any) => {
		dispatch(removeSurah(surah));
		dispatch(updateSurahsListLS());
	};
	

	function removeBasmalaFromFirstAyah(text: string, ayahNumberInSurah?: number, surahNumber?: number) {
  		if (surahNumber === 1) return text;
  		if (ayahNumberInSurah !== 1) return text;
  		const words = text.trim().split(/\s+/);
	return words.slice(4).join(" ").trim();
}


	return (
		<div className="h-full grid items-center container mx-auto  lg:px-4 lg:py-14">
			{surah ? (
				<>
					<div className="">
						<div className="flex justify-between items-center bg-gradient-to-l from-primary-color-5 to-primary-color w-full h-40 mx-auto text-white p-4 rounded-t-md">
							<div className="p-3">
								<h2 className="text-2xl font-semibold">
									{surah?.name} - {surah?.englishName}
								</h2>
								<p className="text-xl mb-2">{surah?.englishNameTranslation}</p>
								<p className="text-lg !text-gray-200">
									{surah?.numberOfAyahs} آيَة
								</p>
							</div>
							<div>
								<Image
									src={quranImage}
									alt="quranImage"
									quality={100}
									width={300}
									height={300}
									className="hidden md:block mb-8"
								/>
							</div>
						</div>
						<div className="mx-auto bg-slate-50 dark:bg-slate-900 border-x border-b border-transparent dark:border-slate-800 rounded-bl-lg rounded-br-lg transition-colors duration-200">
							<div className="flex justify-between items-center p-4 text-primary-gray dark:text-slate-200">
								<h3 className="text-xl font-semibold w-full">
									{surah.englishName}
								</h3>
								<div className="text-center w-full">
									<h5 className="text-lg font-semibold">{surah.name}</h5>
									<h5>{surah.englishNameTranslation}</h5>
								</div>
								<h3 className="text-xl font-semibold w-full text-end">
									آيَة {currentAyahNumber}
								</h3>
							</div>
							<div className="w-full mt-8">
								<Image
									src={bismillahImage}
									alt="bismillahImage"
									quality={100}
									width={150}
									height={150}
									className="mx-auto dark:invert"
								/>
							</div>
							<div ref={surahTextContainerRef} className="min-h-[20rem] max-h-[35rem] h-full text-2xl text-center font-semibold text-primary-gray dark:text-slate-200 mt-8 overflow-y-scroll bg-gradient-to-t from-primary-color-6 w-full leading-[4rem] px-4" dir="rtl">
								{surah.ayahs?.map((ayah: AyahType) => {
									const ayahText = removeBasmalaFromFirstAyah(
										ayah.text,
										ayah.numberInSurah,
										surah.number
									);

									return (
										<span key={ayah.number} className="inline mx-2">
											<span
												className={`text-xl md:text-2xl amiri-family ${currentAyahNumber == ayah.number
														? "text-primary-color active"
														: ""
													} hover:text-primary-color cursor-pointer`}
												onClick={() => {
													setCurrentAyahNumber(ayah.numberInSurah);
													setCurrentAyah(ayah);
												}}
											>
												{ayahText}
											</span>

											<span className="relative w-[42px] h-[42px] inline-block align-middle mx-2 text-slate-850 dark:text-slate-100">
												<span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-sm font-bold">
													{ayah.numberInSurah ?? ayah.number}
												</span>

												<Image
													src={ayahIcon}
													alt="ayahIcon"
													width={42}
													height={42}
													className="w-full h-full dark:invert"
												/>
											</span>
										</span>
									)
								})}
							</div>
							<div className="relative border-t dark:border-slate-800 p-4 flex flex-col-reverse md:flex-row justify-between items-center gap-4 mb-4 lg:mb-0 md:gap-12 bg-gradient-to-r from-primary-color-5 to-primary-color rounded-b-md">
								<div className="w-fit flex items-center gap-2 ">
									<Link
										href={
											surahNumber <= 1 ? "/" : `/read/surah/${surahNumber - 1}`
										}
									>
										<Button
											text="Prev"
											icon={<IoIosArrowBack />}
											customStyles="bg-white dark:bg-slate-800 !text-primary-color border dark:border-slate-700 px-4 py-2 shadow-sm"
										/>
									</Link>
									<Link
										href={
											surahNumber >= 114
												? "/"
												: `/read/surah/${surahNumber + 1}`
										}
									>
										<Button
											text="Next"
											icon={<IoIosArrowForward />}
											customStyles="bg-white dark:bg-slate-800 !text-primary-color border dark:border-slate-700 px-4 py-2 flex-row-reverse shadow-sm"
										/>
									</Link>
								</div>
								<div className="flex flex-col gap-3 w-full">
									<div className="w-full h-[45px] flex items-center gap-2">
										<h3 className="text-xl font-semibold text-end">
											آيَة {currentAyahNumber}
										</h3>
										<audio
											className="w-full h-full min-h-[45px]"
											src={`${currentAyah?.audio}`}
											controls
									/>
									<Button
										text=""
										icon={
											isSurahInList ? (
												<AiFillHeart size={28} className="text-primary-color" />
											) : (
												<AiOutlineHeart size={28} className="dark:text-slate-400" />
											)
										}
										customStyles="!text-primary-color bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm"
										onclick={() =>
											isSurahInList
												? handleRemoveFromList(surah)
												: handleAddToList(surah)
										}
									/>
								</div>
								<div className="w-full flex items-center gap-2 overflow-x-auto">
									<select
										className="w-fit p-2 rounded-lg border border-gray-300 dark:bg-slate-800 dark:text-white"
										value={selectedServer}
										onChange={(e) => setSelectedServer(e.target.value)}
										>
										{reciters.map((reciter) =>
											reciter.moshaf.map((moshaf) => (
											<option
												key={`${reciter.id}-${moshaf.id}`}
												value={moshaf.server}
											>
												{reciter.name} - {moshaf.name}
											</option>
											))
										)}
									</select>
									{selectedServer && (
										<audio
											key={`${selectedServer}-${surahNumber}`}
											className="w-full h-full min-h-[45px]"
											src={getSurahAudioUrl(selectedServer, surahNumber)}
											controls
										/>
									)}
								</div>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default ReadCom;
