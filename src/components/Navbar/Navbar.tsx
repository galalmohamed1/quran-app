"use client";
import { CgClose } from "react-icons/cg";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaQuran } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import React, { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import Button from "../UI/Button";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [navLinksHeight, setNavLinksHeight] = useState(0);
	const linksRef = useRef<HTMLUListElement>(null);
	const [theme, setTheme] = useState<"light" | "dark">("light");

	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

	useEffect(() => {
		if (linksRef.current != undefined) {
			setNavLinksHeight(linksRef.current?.offsetHeight);
		}
	}, [linksRef.current?.offsetHeight]);

	useEffect(() => {
		const localTheme = localStorage.getItem("theme") as "light" | "dark" | null;
		if (localTheme) {
			setTheme(localTheme);
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		if (newTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	return (
		<>
			<nav className="relative container mx-auto h-[70px] flex justify-between items-center rounded-md px-[1rem] md:px-[5rem] bg-white dark:bg-slate-900 transition-colors duration-200 z-10">
				<Link href="/">
					<Button text="QURAN" icon={<FaQuran size={25} className="dark:text-white" />} customStyles="dark:text-white" />
				</Link>

				<div className="flex items-center">
					<button
						onClick={toggleTheme}
						aria-label="Toggle dark mode"
						className="relative inline-flex sm:hidden h-8 w-16 items-center rounded-full bg-slate-100 dark:bg-slate-800 p-1 cursor-pointer transition-colors duration-300 focus:outline-none border border-slate-200 dark:border-slate-700 mx-2"
					>
						<div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
							<BsMoonStarsFill size={12} className="text-slate-400 dark:text-slate-600" />
							<BsSunFill size={12} className="text-slate-400 dark:text-slate-600" />
						</div>
						<span
							className={`${
								theme === "dark" ? "translate-x-8 bg-emerald-500" : "translate-x-0 bg-white"
							} flex items-center justify-center h-6 w-6 transform rounded-full shadow-md transition-transform duration-300 z-10`}
						>
							{theme === "dark" ? (
								<BsSunFill size={12} className="text-yellow-100" />
							) : (
								<BsMoonStarsFill size={12} className="text-slate-750" />
							)}
						</span>
					</button>
					<Button
						text=""
						icon={
							isMenuOpen ? <CgClose size={25} className="dark:text-white" /> : <CgMenuLeftAlt size={25} className="dark:text-white" />
						}
						onclick={() => setIsMenuOpen(!isMenuOpen)}
						customStyles="visible md:hidden"
					/>
				</div>

				<ul
					ref={linksRef}
					className={`items-center gap-4 ${
						isMenuOpen
							? `absolute w-full h-[${navLinksHeight}] left-0 top-[70px] flex-row [&>a]:w-full bg-white dark:bg-slate-900 rounded-md z-0 shadow-md border dark:border-slate-800`
							: "hidden"
					} md:flex transition`}
				>
					<NavLink
						linkName="Home"
						link="/"
						icon={<AiOutlineHome size={25} />}
					/>
					<NavLink
						linkName="Favorite List"
						link="list"
						icon={<AiOutlineUnorderedList size={25} />}
					/>
					<NavLink
						linkName="Schedule"
						link="schedule"
						icon={<AiOutlineSchedule size={25} />}
					/>
					<button
						onClick={toggleTheme}
						aria-label="Toggle dark mode"
						className="relative hidden sm:flex h-8 w-16 items-center rounded-full bg-slate-100 dark:bg-slate-800 p-1 cursor-pointer transition-colors duration-300 focus:outline-none border border-slate-200 dark:border-slate-700 mx-2"
					>
						<div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
							<BsMoonStarsFill size={12} className="text-slate-400 dark:text-slate-600" />
							<BsSunFill size={12} className="text-slate-400 dark:text-slate-600" />
						</div>
						<span
							className={`${
								theme === "dark" ? "translate-x-8 bg-emerald-500" : "translate-x-0 bg-white"
							} flex items-center justify-center h-6 w-6 transform rounded-full shadow-md transition-transform duration-300 z-10`}
						>
							{theme === "dark" ? (
								<BsSunFill size={12} className="text-yellow-100" />
							) : (
								<BsMoonStarsFill size={12} className="text-slate-750" />
							)}
						</span>
					</button>
				</ul>
			</nav>
		</>
	);
};

export default Navbar;
