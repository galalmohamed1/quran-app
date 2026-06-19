"use client";

import { RiDeleteBin7Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/app/rtk/hooks";
import Link from "next/link";
import React from "react";
import Button from "../UI/Button";
import { removeSurah } from "@/app/rtk/slices/listSlice";

const Index = () => {
	const list = useAppSelector(state => state.listSlice.list);
	const dispatch = useAppDispatch();

	return (
		<>
			<h1 className="main-title">Surahs List</h1>
			{list.length ? (
				<div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-between gap-3 [&:last-child]:pb-3">
					{list.map(surah => (
						<div
							key={surah.number}
							className="min-w-[300px] h-[150px] flex bg-slate-50 dark:bg-slate-900 rounded-md text-white text-lg font-semibold text-start border dark:border-slate-800 shadow-sm transition-colors duration-200"
						>
							<div className="w-5/12 h-full flex flex-col justify-between rounded-ss-md rounded-es-md bg-slate-100 dark:bg-slate-950 p-3 transition-colors duration-200">
								<div>
									<h4 className="w-fit text-sm text-slate-200 dark:text-slate-300 font-normal bg-primary-color rounded-full px-3 line-clamp-1 mb-3">
										{surah.number}
									</h4>
									<h2 className="text-primary-gray dark:text-slate-200">{surah.name}</h2>
								</div>
								<Link
									href={`/read/surah/${surah.number}`}
									className="w-fit items-end text-start text-sm text-primary-gray-2 dark:text-slate-400 hover:text-primary-gray dark:hover:text-slate-200 font-normal rounded-full line-clamp-1 mb-3 flex transition"
								>
									<span className="line-clamp-1">Read {surah.englishName}</span>
									<IoIosArrowForward size={18} />
								</Link>
							</div>
							<div className="w-7/12 h-full flex flex-col justify-between p-3 text-primary-color">
								<div>
									<h2 className="text-primary-gray dark:text-slate-200">{surah.englishName}</h2>
									<h2 className="text-sm text-primary-gray-2 dark:text-slate-400 font-medium">
										{surah.englishNameTranslation}
									</h2>
									<h2 className="text-primary-gray-2 dark:text-slate-400 font-medium">
										{surah.numberOfAyahs} آيَة
									</h2>
								</div>
								<Button
									text=""
									icon={<RiDeleteBin7Line size={25} className="dark:text-slate-400 hover:!text-red-500" />}
									customStyles="!min-w-[45px] !min-h-[45px] !p-0 hover:!text-red-500 ml-auto"
									onclick={() => dispatch(removeSurah(surah))}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				<h2 className="w-full text-xl font-semibold text-center">
					There is no items to show!
				</h2>
			)}
		</>
	);
};

export default Index;
