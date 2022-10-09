import { FC, ReactElement } from "react";
import FormError from "../formError";

export interface InputProps {
	name: string;
	type?: string;
	label?: string;
	formik?: any;
	icon?: ReactElement;
	info?: string;
	disabled?: boolean;

	[key: string]: any;
}

const Input: FC<InputProps> = ({
	name,
	type = "text",
	label,
	formik,
	info,
	icon,
	...props
}) => {
	return (
		<div className="input" data-testid="rg-input-component">
			<label
				htmlFor={props.id}
				data-testid="rg-input-label"
				className={"text-neutral-300"}
			>
				{label}
			</label>
			<div
				data-testid="rg-input-container"
				className={`input__container rounded bg-primary-100 focus-within:bg-white ${
					formik && formik?.errors[name]
						? "border border-error-main shadow-error focus-within:shadow-error focus-within:border-error-main "
						: "focus-within:shadow-active focus-within:border focus-within:border-primary-400 "
				}`}
			>
				<input
					data-testid={"rg-input"}
					type={type}
					name={name}
					{...props}
					className={
						"bg-primary-100 focus:outline-none text-neutral-400 focus:bg-white"
					}
				/>
				{icon && icon}
			</div>

			{info && (
				<span
					data-testid="rg-input-info"
					className={"input__info text-neutral-300"}
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
export default Input;
