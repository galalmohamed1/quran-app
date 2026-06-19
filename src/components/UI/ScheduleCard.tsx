import React from "react";
import Button from "./Button";
import { BiCheckbox, BiTimeFive } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsCheckAll } from "react-icons/bs";
import { useAppDispatch } from "@/app/rtk/hooks";
import {
	removeSchedule,
	setCompletedSchedule,
	updateScheduleListToLS,
} from "@/app/rtk/slices/scheduleSlice";

export interface ScheduleCardType {
	date: string;
	text: string;
	time: string;
	completed: boolean;
}

interface Props {
	schedule: ScheduleCardType;
}

const ScheduleCard = (schedule: Props) => {
	const { date, text, time, completed } = schedule.schedule;

	const dispatch = useAppDispatch();

	return (
		<div className="shadow-sm border dark:border-slate-800 rounded-md bg-white dark:bg-slate-900 transition-colors duration-200">
			<div className="bg-slate-50 dark:bg-slate-900/50 p-4">
				<h3 className="px-2 bg-primary-color w-fit rounded-md text-white !py-0">
					{date}
				</h3>
				<h3 className="font-semibold text-primary-gray dark:text-slate-200 pt-4 pb-6 w-full line-clamp-2">
					{text}
				</h3>
				<hr className="dark:border-slate-800" />
				<span className="f-c !justify-start gap-2 text-primary-gray-2 dark:text-slate-400 font-semibold mt-3">
					<BiTimeFive size={25} />
					<p>{time}</p>
				</span>
			</div>
			<div className="flex justify-between items-center border-t dark:border-slate-800">
				<Button
					text=""
					icon={<RiDeleteBin7Line size={25} className="dark:text-slate-400" />}
					customStyles="hover:text-red-500"
					onclick={() => {
						dispatch(removeSchedule(text));
						dispatch(updateScheduleListToLS());
					}}
				/>
				<Button
					text=""
					icon={
						completed ? (
							<BsCheckAll className="text-primary-color" size={30} />
						) : (
							<BiCheckbox size={30} className="dark:text-slate-400" />
						)
					}
					onclick={() => {
						dispatch(setCompletedSchedule(text));
						dispatch(updateScheduleListToLS());
					}}
					customStyles="hover:text-primary-color-4"
				/>
			</div>
		</div>
	);
};

export default ScheduleCard;
