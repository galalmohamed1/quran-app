interface PropsType {
	type: string;
	placeholder?: string;
	value: string;
	onchange: (e: string) => void;
	autoFocus?: boolean;
}

const Input = (props: PropsType) => {
	const { type, placeholder, value, onchange, autoFocus } = props;

	return (
		<input
			onChange={e => onchange(e.target.value)}
			type={type}
			placeholder={placeholder}
			autoFocus={autoFocus}
			className="w-full py-2 px-5 border dark:border-slate-700 rounded-md text-primary-gray-2 dark:text-slate-200 bg-white dark:bg-slate-800 placeholder:text-primary-gray-2 dark:placeholder:text-slate-400 outline-none focus:border-primary-gray-2 dark:focus:border-slate-600 transition-colors duration-200"
			value={value}
		/>
	);
};

export default Input;
