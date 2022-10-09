import { FC } from "react";
import { SelectDropdown } from "../../assets";
import FormError from "../formError";

export type Options = {
	value: string;
	text: string;
};

interface SelectProps {
	placeholder?: string;
	label?: string;
	options: Options[];
	info?: string;
	formik?: any;
	name: string;

	[key: string]: any;
}

const Select: FC<SelectProps> = ({
	placeholder,
	name,
	formik,
	info,
	label,
	options,
	...props
}) => {
	return (
		<div className={"select"}>
			{label && (
				<label
					htmlFor={props.id}
					data-testid="rg-select-label"
					className={"text-neutral-300"}
				>
					{label}
				</label>
			)}
			<SelectDropdown className="arrow" />
			<select
				data-testid="rg-select"
				{...props}
				name={name}
				value={props?.value}
				className={`bg-primary-100 focus:outline-shadow-active text-neutral-400 focus:bg-white rounded ${
					formik && formik?.errors[name]
						? "border border-error-main shadow-error focus:shadow-error focus:outline-error-main "
						: "focus:shadow-active focus:border focus:outline-primary-400 "
				}`}
			>
				<option value={""}>{placeholder && placeholder}</option>
				{options.map((option, idx) => (
					<option value={option?.value} key={idx}>
						{option.text}
					</option>
				))}
			</select>
			{info && (
				<span
					data-testid="rg-select-info"
					className={"select__info text-neutral-300"}
				>
					{info}
				</span>
			)}
			<FormError
				errors={formik && formik?.errors}
				name={name}
				value={formik && formik.values[name]}
			/>
		</div>
	);
};

export default Select;
