import { Time, TransactionCopy } from "../../../assets";
import {
	formatToCurrency,
	getDateTimeWithSeconds,
	getTime,
} from "../../../constants";
import Link from "next/link";
import { FC } from "react";
import { OrderStatus } from "./enum";
import { MobileOrderProps } from "./model";

const MobileOrder: FC<MobileOrderProps> = ({
	order,
	handleCopy,
	handleParty,
	handleAction,
}) => {
	return (
		<div
			data-testid="rg-mobile-order-component"
			className={"border-b border-gray-off pb-5 mb-5"}
		>
			<div className={"text-sm-regular font-medium text-neutral-400"}>
				<span
					className={`${
						order.type === OrderStatus.BUY ? "text-deepGreen" : "text-error-400"
					}`}
				>
					{order.type === OrderStatus.BUY ? "Buy" : "Sell"}
				</span>
				<span className={"pl-1"}>{order.coin}</span>
				<span className={"pl-1 font-normal"}>with</span>
				<span className={"pl-1"}>NGN</span>
			</div>
			<div className={"text-labels text-gray-tint"}>
				<div className={"flex justify-between mt-2"}>
					<div>Created time</div>
					<div>{getDateTimeWithSeconds(order.date)}</div>
				</div>
				<div className={"flex justify-between mt-2"}>
					<div>Order number</div>
					<div
						data-testid="rg-mobile-order-component-copy"
						onClick={() => handleCopy(order.address)}
						className={"copy flex"}
					>
						<span className={"underline"}>{order.address} </span>
						<span>
							<TransactionCopy />{" "}
						</span>
					</div>
				</div>
				<div className={"flex justify-between mt-2"}>
					<div>Fiat amount</div>
					<div className={"font-medium text-gray-deep"}>
						{formatToCurrency(order.flatAmount, 2)} NGN
					</div>
				</div>
				<div className={"flex justify-between mt-2"}>
					<div>Price</div>
					<div>{formatToCurrency(order.price, 2)} NGN</div>
				</div>
				<div className={"flex justify-between mt-2"}>
					<div>Crypto amount</div>
					<div>{order.cryptoAmount} RCKC</div>
				</div>
				<div className={"flex justify-between mt-2"}>
					<div>Counterparty</div>
					<div>
						<div
							data-testid="rg-mobile-order-component-party"
							onClick={() => handleParty(order)}
							className="cursor-pointer underline text-deepGreen"
						>
							{order.counterparty}
						</div>
					</div>
				</div>
				<div className={"flex justify-between mt-2"}>
					<div>Status</div>
					<div className={"flex"}>
						{order.status.paymentStatus !== "Completed" ? (
							<div className={"flex items-center"}>
								<Time />
								<span className={"pl-2 text-x-small text-sky-deep"}>
									{getTime(order.status.time)}
								</span>
							</div>
						) : (
							<></>
						)}

						<div className={"pl-2 font-medium text-gray-deep"}>
							{order.status.paymentStatus}
						</div>
					</div>
				</div>
				<div className={"flex justify-between mt-2"}>
					<div>Operation</div>
					<div className={"text-sky-deep"}>
						<div
							data-testid="rg-mobile-order-component-contact"
							onClick={() => handleAction("contact", order)}
							className={"cursor-pointer"}
						>
							Contact
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileOrder;
