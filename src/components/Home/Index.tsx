"use client";


import React, { useCallback, useEffect, useState } from "react";
import SurahCard from "../UI/SurahCard";
import SortButton from "../UI/SortButton";
import Input from "../UI/Input";
import { useAppSelector } from "@/app/rtk/hooks";
import Loading from "../UI/Loading";
import { SurahType } from "@/types/type";
import { fetchSurahList } from "@/api/home.services";



const Home = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [sortBtnActive, setSortBtnActive] = useState("Number");
	const [surahsListOriginal, setSurahsListOriginal] = useState<SurahType[]>([]);
	const [surahsListToShow, setSurahsListToShow] = useState<SurahType[]>([]);
	const [searchResults, setSearchResults] = useState<SurahType[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const surahsList = useAppSelector(state => state.listSlice.list);

	useEffect(() => {
		const loadSurahList = async () => {
			const surahs = await fetchSurahList();

			setSurahsListToShow(surahs);
			setSurahsListOriginal(surahs);
		};

		loadSurahList();
	}, []);

	useEffect(() => {
		localStorage.setItem("surahsList", JSON.stringify(surahsList));
	}, [surahsList]);

	const handleSelectedSortOption = useCallback(() => {
		if (sortBtnActive == "Number") {
			setSurahsListToShow(surahsListOriginal);
		} else if (sortBtnActive == "Alphabet") {
			setSurahsListToShow(() => {
				let sorted: SurahType[] = Object.assign([], surahsListOriginal);

				sorted.sort((a, b) => a.englishName.localeCompare(b.englishName));

				return sorted;
			});
		} else {
			setSurahsListToShow(surahsList);
		}

		setTimeout(() => {
			if (surahsListToShow.length) {
				setIsLoading(false);
			} else {
				setIsLoading(true);
			}
		}, 1000);
	}, [sortBtnActive]);

	useEffect(() => {
		handleSelectedSortOption();
	}, [handleSelectedSortOption]);

	useEffect(() => {
		const query = searchValue.trim().toLowerCase();

		if (query === "") {
			setSearchResults([]);
			return;
		}

		setSearchResults(
			surahsListToShow.filter(surah => {
				const matchesEnglish = surah.englishName.toLowerCase().includes(query);
				const matchesArabic = surah.name.includes(searchValue.trim());
				const matchesNumber = surah.number.toString() === query;
				return matchesEnglish || matchesArabic || matchesNumber;
			})
		);
	}, [searchValue, surahsListToShow]);

	const returnList = (): SurahType[] => {
		if (searchValue.trim() === "") return surahsListToShow;
		else return searchResults;
	};

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900/50 lg:m-0 rounded-md lg:rounded-lg lg:mt-0 px-4 transition-colors duration-200">
			<div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center mr-3">
				<div className="flex gap-3 my-3">
					{["Number", "Alphabet", "In List"].map((sortBtn, index) => (
						<SortButton
							onclick={() => setSortBtnActive(sortBtn)}
							key={index}
							text={sortBtn}
							active={sortBtnActive == sortBtn ? true : false}
						/>
					))}
				</div>
				<div className="w-full sm:w-[250px] md:w-[300px] xl:w-[500px] mt-3 sm:mt-0">
					<Input
						type="text"
						value={searchValue}
						onchange={setSearchValue}
						placeholder="Al-Baqara / البقرة / 2..."
					/>
					{searchValue.trim() !== "" && (
						<p className="text-xs text-primary-gray-2 dark:text-slate-500 mt-1 px-1">
							{returnList().length} result{returnList().length !== 1 ? "s" : ""} found
						</p>
					)}
				</div>
			</div>
			{surahsListToShow.length > 0 ? (
				<div className="h-[calc(100%-109px)] lg:h-[calc(100vh-162px)] overflow-y-scroll">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-3 pr-3">
						{returnList().map(surah => (
							<SurahCard key={surah.number} surah={surah} />
						))}
					</div>
				</div>
			) : searchValue != "" ? (
				<h2 className="text-center dark:text-slate-200">
					{" "}
					&quot;{searchValue}&quot; does not match any results!
				</h2>
			) : isLoading ? (
				<Loading />
			) : (
				<h2 className="text-center py-6 dark:text-slate-200">No items!</h2>
			)}
		</div>
	);
};

export default Home;
