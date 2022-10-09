import Tabs from "../tab";
import { TabsItem } from "../tab/model";
import React, { FC, useEffect, useState } from "react";
import Limit from "./Limit";
import Market from "./Market";
import { MarketValueProps, TradeProps } from "./model";
import { TradeSwitch } from "./TradeSwitch";

const tabs: TabsItem[] = [
	{
		id: 1,
		name: ["Limit"],
	},
	{
		id: 2,
		name: ["Market"],
	},
	// {
	// 	id: 3,
	// 	name: ["Stop Limit"],
	// },
];

const Trade: FC<TradeProps> = ({ tradeTab, ...props }) => {
	const [active, setActive] = useState<string>("BUY");
	const [openTab, setOpenTab] = useState(0);
	const [, setLimitTradeRate] = useState(0);
	const [, setMarketTradeRate] = useState(0);

	useEffect(() => {}, []);
	const handleMarketValues = (values: MarketValueProps): void => {};

	return (
		<div data-testid="rg-trade" {...props}>
			<div className={"mt-3 mb-4"}>
				<TradeSwitch
					handleSwitch={(value: string) => setActive(value)}
					switchItem={["BUY", "SELL"]}
					active={active}
				/>
			</div>
			<Tabs openTab={openTab} width={"w-1/2"} tabs={tabs} opened={setOpenTab} />
			<div className={"mt-8"}>
				<div className={"w-full"} data-testid="rg-trade-switches">
					{openTab === 0 && (
						<Limit
							btnState={active}
							setTradeRate={(value: number) => setLimitTradeRate(value)}
						/>
					)}
					{openTab === 1 && (
						<Market
							btnState={active}
							setValues={(values: MarketValueProps) =>
								handleMarketValues(values)
							}
							setTradeRate={(value: number) => setMarketTradeRate(value)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Trade;
