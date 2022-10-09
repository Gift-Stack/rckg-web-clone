import React, { FC, ReactElement } from "react";

export interface CheckBoxProps {
	label: ReactElement;
	accepted: boolean;
	handleAccepted: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckBoxProps> = ({ label, accepted, handleAccepted }) => {
	return (
		<div
			className="flex items-center mb-2"
			data-testid={"rg-checkbox-container"}
		>
			<input
				type="checkbox"
				id="checkbox"
				name="checkbox"
				value="yes"
				data-testid={"rg-checkbox"}
				checked={accepted}
				onChange={handleAccepted}
				className="opacity-0 absolute h-5 w-5"
			/>
			<div className="bg-primary-100 border-2 rounded-md border-primary-200 w-5 h-5 flex flex-shrink-0 justify-center items-center  focus-within:border-primary-200">
				<svg
					className="fill-current hidden w-3 h-3 text-primary-200 pointer-events-none"
					width="12"
					height="8"
					viewBox="0 0 12 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M11.0253 0.641392C11.2694 0.885467 11.2694 1.2812 11.0253 1.52528L5.19193 7.35858C4.94785 7.60267 4.55218 7.60267 4.30808 7.35858L0.974743 4.02525C0.730668 3.78117 0.730668 3.3855 0.974743 3.14142C1.21882 2.89733 1.61455 2.89733 1.85863 3.14142L4.75002 6.03275L10.1414 0.641392C10.3855 0.397317 10.7812 0.397317 11.0253 0.641392Z"
						fill="#0069FF"
					/>
				</svg>
			</div>
			<label htmlFor="checkbox" className="select-none">
				{label}
			</label>
		</div>
	);
};
export default Checkbox;
