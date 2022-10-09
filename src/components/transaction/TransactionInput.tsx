import { FC } from "react";
import { TransactionInputProps } from "./model";

const TransactionInput: FC<TransactionInputProps> = ({
	name,
	type,
	label,
	extras,
	value,
	onChange,
	handleExtras,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		onChange(e.target.value);
	};
	return (
		<div
			data-testid={"transaction-input"}
			className="mt-1 relative w-full text-center transaction-select"
		>
			<div className={"text-left w-full flex justify-center"}>
				<div
					className={
						"w-full md:w-4/6 lg:w-3/6 xl:w-2/6 text-neutral-400 text-labels md:text-sm-headline py-2"
					}
				>
					{label}
				</div>
			</div>
			<div className={"text-left w-full flex justify-center"}>
				<div
					className={
						"flex items-center w-full md:w-4/6 lg:w-3/6 xl:w-2/6 bg-gray-faint rounded-md shadow-sm text-left text-labels md:text-sm-headline"
					}
				>
					<input
						data-testid={"transaction-input-field"}
						onChange={handleChange}
						type={type}
						value={value}
						className={
							"w-full bg-gray-faint px-6 py-3 rounded-md form-radio text-neutral-400 focus:outline-none"
						}
						name={name}
					/>
					{extras && (
						<span
							className={"px-6 text-primary-400 cursor-pointer"}
							onClick={handleExtras}
						>
							{extras}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default TransactionInput;
