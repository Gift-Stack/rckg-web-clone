import React, { FC } from "react";

interface RadioProps {
	group: string;
	label: string;
	id: string;
	onChange: (value: string) => void;
	value: string;
}

const Radio: FC<RadioProps> = ({ group, id, label, onChange, value }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		onChange(e.target.value);
	};
	return (
		<label htmlFor={id} className="items-center flex" data-testid={"rg-radio"}>
			<input
				data-testid={"rg-radio-input"}
				onChange={handleChange}
				type="radio"
				className="form-radio w-5 h-5 sm:w-8 sm:h-8"
				name={group}
				value={value}
				id={id}
			/>
			<div className={"flex items-center justify-between w-full"}>
				<div className={"flex items-center"}>
					<div className="ml-1 sm:ml-2 text-x-small sm:text-sm-regular text-gray-deep">
						{label}
					</div>
				</div>
			</div>
		</label>
	);
};

export default Radio;
