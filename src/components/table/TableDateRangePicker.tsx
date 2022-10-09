import { FC, useState } from "react";
import { TableDateRangePickerProps } from "./model";

const getDate = (date: string): string => {
	return date.split("T")[0];
};

const setInitMax_ = (date: string): string => {
	let d = new Date(date);
	let newD = d.setDate(d.getDate() - 1);
	return getDate(new Date(newD).toISOString());
};

const substractDay = (num: number): string => {
	let d = new Date();
	let newD = d.setDate(d.getDate() - num);
	return getDate(new Date(newD).toISOString());
};

const TableDateRangePicker: FC<TableDateRangePickerProps> = ({
	getInitial,
	getFinal,
}) => {
	const finalMax = getDate(new Date(Date.now()).toISOString());
	const [initial, setInitial] = useState<string>(substractDay(1));
	const [final, setFinal] = useState<string>(
		getDate(new Date(Date.now()).toISOString())
	);

	const handleInitial = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInitial(e.target.value);
		getInitial(e.target.value);
	};

	const handleFinal = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFinal(e.target.value);
		getFinal(e.target.value);
	};

	return (
		<div className={"w-max"} data-testid="rg-table-date-range-picker-container">
			<div className={"xl:mb-5 mb-3 text-labels text-gray-deep"}>Date</div>
			<div className={"border table-select bg-white flex items-center"}>
				<input
					data-testid="rg-table-date-range-picker-initial"
					className={"text-labels bg-white"}
					type="date"
					name="dates"
					max={setInitMax_(finalMax)}
					onChange={handleInitial}
					value={initial}
				/>
				<div className={"mx-4"}>-</div>
				<input
					data-testid="rg-table-date-range-picker-final"
					className={"text-labels bg-white"}
					type="date"
					name="dates"
					min={initial}
					max={finalMax}
					onChange={handleFinal}
					value={final}
				/>
			</div>
		</div>
	);
};

export default TableDateRangePicker;
