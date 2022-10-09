import { AdvanceCash, P2PTransfer, VMCard } from "../../assets";
import { FC } from "react";
import { PaymentType } from "./enum";
import { TransactionRadioProps } from "./model";

const TransactionRadio: FC<TransactionRadioProps> = ({
	currency,
	name,
	value,
	paymentType,
	paymentTypeEnum,
	onChange,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		onChange(e.target.value);
	};
	return (
		<div data-testid={"transaction-radio"} className={"bg-gray-faint p-4 mb-2"}>
			<label className="items-center flex">
				<input
					data-testid={"transaction-radio-field"}
					onChange={handleChange}
					type="radio"
					className="form-radio"
					name={name}
					value={value}
				/>
				<div className={"flex items-center justify-between w-full"}>
					<div className={"flex items-center"}>
						<div className="ml-4">
							{paymentTypeEnum === PaymentType.CARD ? (
								<VMCard />
							) : paymentTypeEnum === PaymentType.P2P ? (
								<P2PTransfer />
							) : (
								<AdvanceCash />
							)}
						</div>
						<div className="ml-4 text-labels md:text-sm-regular">
							{paymentType}
						</div>
					</div>
					{currency && <div className={"font-medium"}>0.01 {currency}</div>}
				</div>
			</label>
		</div>
	);
};

export default TransactionRadio;
