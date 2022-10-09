import { BtcBtc, EthBtc, Time, LtcBtc } from "../../../assets";
import { formatToCurrency, getTime } from "../../../constants";
import { FC } from "react";
import { OrderDetailsProps } from "./model";
import { CurrencyEnum } from "../../../types/enum";

const OrderDetails: FC<OrderDetailsProps> = ({ order, party, action }) => {
	return (
		<div
			data-testid="rg-order-details"
			className={
				"flex items-center text-gray-deep xl:px-8 lg:px-4 px-2 py-8 text-labels lg:text-sm-regular xl:text-sm-headline"
			}
		>
			<div className={"p8 flex items-center coins px-1"}>
				<span>
					{order.coin === CurrencyEnum.BTC ? (
						<BtcBtc />
					) : order.coin === CurrencyEnum.ETH ? (
						<EthBtc />
					) : (
						<LtcBtc />
					)}
				</span>
				<span className={"xl:pl-2 lg:pl-1"}>{order.coin}</span>
			</div>
			<div className={"p14 font-medium text-neutral-400 px-1"}>
				{formatToCurrency(order.flatAmount, 2)} NGN
			</div>
			<div className={"p17 text-neutral-400 px-1"}>
				{formatToCurrency(order.price, 2)} NGN
			</div>
			<div className={"p13 text-neutral-400 px-1"}>
				{order.cryptoAmount} BTC
			</div>
			<div className={"p13 px-1"}>
				<div
					data-testid="rg-order-details-party"
					onClick={() => party(order)}
					className="cursor-pointer underline text-deepGreen"
				>
					{order.counterparty}
				</div>
			</div>
			<div className={"p16 text-neutral-400 px-1"}>
				<div className={"font-medium"}>{order.status.paymentStatus}</div>
				{order.status.paymentStatus !== "Completed" ? (
					<div className={"flex items-center"}>
						<Time />
						<span
							className={
								"pl-2 text-xx-small lg:text-x-small xl:text-labels text-sky-deep"
							}
						>
							{getTime(order.status.time)}
						</span>
					</div>
				) : (
					<></>
				)}
			</div>
			<div
				className={
					"p19 flex items-center gap-x-2 xl:gap-x-5 text-sky-deep px-1"
				}
			>
				<div
					data-testid="rg-order-details-action"
					onClick={() => action("contact", order)}
					className={"cursor-pointer"}
				>
					Contact
				</div>
				<div
					data-testid="rg-order-details-action"
					onClick={() => action("open_dispute", order)}
					className={"cursor-pointer"}
				>
					Open dispute
				</div>
			</div>
		</div>
	);
};

export default OrderDetails;
