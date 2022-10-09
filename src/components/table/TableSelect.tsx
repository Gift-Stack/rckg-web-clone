import { SelectDown } from "../../assets";
import { FC } from "react";
import { TableSelectProps } from "./model";

const TableSelect: FC<TableSelectProps> = ({
	options,
	label,
	value,
	placeholder,
	onChange,
	cssClass,
	...props
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		onChange(e.target.value);
	};
	return (
		<div className={"w-max"} data-testid="rg-table-select-container">
			<div className={"xl:mb-5 mb-3 text-labels text-gray-deep"}>{label}</div>
			<div className={"border table-select bg-white flex items-center"}>
				<select
					className={`${cssClass} text-labels xl:text-sm-regular pr-5 text-neutral-400`}
					{...props}
					defaultValue={value}
					onChange={handleChange}
					data-testid="rg-table-select"
				>
					<option
						data-testid="rg-table-select-option"
						value={placeholder}
						disabled
					>
						{placeholder}
					</option>
					{options && options.length > 0
						? options.map((option) => (
								<option
									data-testid="rg-table-select-option"
									key={option}
									value={option}
								>
									{option}
								</option>
						  ))
						: " "}
				</select>
				<SelectDown />
			</div>
		</div>
	);
};
export default TableSelect;
