import { FC } from "react";
import { PhoneInputProps } from "./model";

const PhoneInput: FC<PhoneInputProps> = ({ ...props }) => {
	return (
		<div className="input" data-testid="rg-phone-input-container">
			<div
				className={
					"input__container rounded bg-primary-100 focus-within:bg-white"
				}
			>
				<input
					data-testid={"rg-phone-input"}
					{...props}
					className={
						"bg-primary-100 focus:outline-none text-neutral-400 focus:bg-white"
					}
					maxLength={10}
				/>
			</div>
		</div>
	);
};

export default PhoneInput;
