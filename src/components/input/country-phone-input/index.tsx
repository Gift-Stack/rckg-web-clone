import FormError from "../../formError";
import { FC } from "react";
import PhoneInput from "./PhoneInput";
import { CountryPhoneInputProps } from "./model";

const CountryPhoneInput: FC<CountryPhoneInputProps> = ({
	countries,
	value,
	formik,
	setPhoneCode,
	...props
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setPhoneCode(
			e.target.value.includes("+") ? e.target.value : `+${e.target.value}`
		);
	};

	return (
		<div className={"country_phone_input"} data-testid="rg-cpi">
			<div
				className={`flex ${
					formik && formik?.errors["mobile_number"]
						? "border border-error-main shadow-error focus-within:shadow-error focus-within:border-error-main"
						: "focus-within:shadow-active focus-within:border focus-within:border-primary-400"
				}`}
			>
				<div className={"w-1/5"}>
					<select
						{...props}
						className={
							"text-sm-regular sm:text-sm-headline w-full bg-primary-100"
						}
						defaultValue={
							countries &&
							countries.find((c: any) => c.dialCode === "234")?.dialCode
						}
						onChange={handleChange}
						data-testid="rg-cpi-select"
					>
						{countries && countries.length > 0
							? countries.map((c: any) => (
									<option
										data-testid="rg-cpi-select-option"
										key={c.name}
										value={c.dialCode}
									>
										{c.unicodeFlag}
										{c.name}
									</option>
							  ))
							: " "}
					</select>
				</div>
				<div className={"w-4/5"}>
					<PhoneInput
						onChange={formik.handleChange}
						type={"number"}
						name={"mobile_number"}
						placeholder={"Mobile Number"}
						value={value}
						autoComplete="off"
						pattern="[+]{1}[0-9]{11,14}"
					/>
				</div>
			</div>
			<FormError
				errors={formik && formik?.errors}
				name={"mobile_number"}
				value={formik && formik.values["mobile_number"]}
			/>
		</div>
	);
};

export default CountryPhoneInput;
