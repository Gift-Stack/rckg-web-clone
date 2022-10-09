import { ErrorUI } from "components";
import React from "react";

interface CCInputProps {
	error?: string;
	onChange: (value: string) => void;
	name?: string;
	placeholder: string;
	value: string;
	creditCardIcon?: React.ReactElement | null;
	title: string;
}
export default function CCInput({
	error,
	onChange,
	name,
	placeholder,
	value,
	creditCardIcon,
	title,
}: CCInputProps) {
	return (
		<div data-testid={"cc-input-container"} className="flex flex-col mb-7">
			<label
				data-testid={"cc-input-title"}
				className="text-sm-headline text-neutral-400 mb-2.5"
			>
				{title}
			</label>
			<div
				data-testid={"cc-input-field-wrapper"}
				className={`${
					creditCardIcon &&
					`bg-gray-200 rounded flex items-center justify-between p-3 placeholder-gray-400 outline-none  focus:outline-none  text-neutral-400 w-full h-12 rounded-l rounded-r outline-red`
				} ${
					error && creditCardIcon
						? "border border-error-main shadow-error focus-within:shadow-error focus-within:border-error-main"
						: "focus-within:shadow-active"
				}`}
			>
				<input
					data-testid={"cc-input-field"}
					className={`w-full bg-transparent focus:outline-none ${
						!creditCardIcon
							? `bg-gray-200 rounded p-3 placeholder-gray-400 outline-none text-neutral-400 w-full h-12 rounded-l rounded-r outline-red`
							: " focus:shadow-none"
					} ${
						error && !creditCardIcon
							? "border border-error-main shadow-error focus-within:shadow-error focus-within:border-error-main "
							: "focus-within:shadow-active"
					}`}
					placeholder={placeholder}
					name={name}
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				{creditCardIcon && (
					<div data-testid={"cc-issuer-logo"}>{creditCardIcon}</div>
				)}
			</div>
			{error && (
				<p data-testid={"cc-input-error"} className="text-x-small mt-3">
					{error}
				</p>
			)}
		</div>
	);
}
