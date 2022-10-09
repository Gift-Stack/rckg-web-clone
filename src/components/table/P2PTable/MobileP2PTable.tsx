import {
	BnbBtc,
	BtcBtc,
	DodgeBtc,
	EthBtc,
	LtcBtc,
	MenuDown,
	MenuUp,
	MenuOption,
} from "../../../assets";
import React, { FC, useEffect, useState } from "react";
import { CoinEnum } from "../../../types/enum";
import { IP2PTableData, MobileP2PTableProps } from "./model";

enum Style {
	TITLE = "text-labels text-gray-deep mb-1",
	BODY = "text-sm-regular font-medium",
}

const MobileSpotAccountTable: FC<MobileP2PTableProps> = ({
	data,
	buy,
	sell,
	transfer,
	send,
}) => {
	const [dataSet, setDataSet] = useState<IP2PTableData[]>([]);

	useEffect(() => {
		setDataSet(data);
	}, [data]);

	const [visibilities, setVisibilities] = React.useState(() =>
		dataSet.map((x) => true)
	);
	const handleClick = (event: any) => {
		const index = parseInt(event.currentTarget.dataset.index, 10);
		const newVisibilities = [...visibilities];
		newVisibilities[index] = !newVisibilities[index];
		setVisibilities(newVisibilities);
	};
	return (
		<div data-testid="rg-mobile-p2p-table" className={"bg-white px-4"}>
			{dataSet?.map((row, index) => (
				<div className={"border-b border-neutral-100"} key={row.id}>
					<div className={"flex items-center justify-between mt-2 mb-4"}>
						<div className="flex items-center mt-4">
							<div className="flex items-center coins">
								{row.coin.value === CoinEnum.DOGE ? (
									<DodgeBtc />
								) : CoinEnum.LTC ? (
									<LtcBtc />
								) : CoinEnum.BNB ? (
									<BnbBtc />
								) : CoinEnum.BTC ? (
									<BtcBtc />
								) : (
									<EthBtc />
								)}
							</div>

							<div className="ml-1">
								<div
									className={
										"text-sm-regular font-semibold leading-5 text-neutral-400"
									}
								>
									{row.coin.value}
								</div>
								<div className={Style.TITLE}>{row.coin.title}</div>
							</div>
						</div>
						<div>
							<div className="flex items-center space-x-1">
								<p className={Style.BODY}>{row.total.amount}</p>
								<div
									data-index={index}
									data-testid={`rg-mobile-p2p-table-dropdown-${index}`}
									onClick={handleClick}
								>
									{visibilities[index] ? <MenuUp /> : <MenuDown />}
								</div>
								<div className="user-group relative h-full dashboard__header__link">
									<div className="flex items-center h-full">
										<MenuOption />
									</div>
									<div className="hidden user-group-hover:block absolute right-0 top-full w-32 bg-white">
										<button
											data-testid="rg-mobile-p2p-table-btn"
											onClick={() => buy(row)}
											className="flex text-left py-3 px-3 border-b border-neutral-100 text-primary-400 hover:text-blue-dark text-small"
										>
											Buy
										</button>
										<button
											data-testid="rg-mobile-p2p-table-btn"
											onClick={() => sell(row)}
											className="flex text-left py-3 px-3 border-b border-neutral-100 text-primary-400 hover:text-blue-dark text-small"
										>
											Sell
										</button>
										<button
											data-testid="rg-mobile-p2p-table-btn"
											onClick={() => transfer(row)}
											className="flex text-left py-3 px-3 border-b border-neutral-100 text-primary-400 hover:text-blue-dark text-small"
										>
											Transfer
										</button>
										<button
											data-testid="rg-mobile-p2p-table-btn"
											onClick={() => send(row)}
											className="flex text-left py-3 px-3 border-b border-neutral-100 text-primary-400 hover:text-blue-dark text-small"
										>
											Send
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					{visibilities[index] ? (
						<div>
							<div className={"flex items-center justify-between mt-2 mb-1.5"}>
								<p className={Style.TITLE}>Frozen</p>
								<p className={Style.BODY}>{row.frozen.amount}</p>
							</div>
							<div className={"flex items-center justify-between mb-1.5"}>
								<p className={Style.TITLE}>Available</p>
								<p className={Style.BODY}>{row.avaliable.amount}</p>
							</div>
							<div className={"flex items-center justify-between mb-1.5"}>
								<p className={Style.TITLE}>BTC Value</p>
								<p className={Style.BODY}>{row.btcValue.amount}</p>
							</div>
						</div>
					) : (
						""
					)}
				</div>
			))}
		</div>
	);
};

export default MobileSpotAccountTable;
