import Card from "../card";
import Tabs from "../tab";
import { TabsItem } from "../tab/model";
import React, { FC, useState } from "react";
import Trade from "./Trade";

const tabs: TabsItem[] = [
	{
		id: 1,
		name: ["Spot"],
	},
	{
		id: 2,
		name: ["Margin", "Cross 3x"],
	},
	{
		id: 3,
		name: ["Margin", "Isolated 10x"],
	},
];

const SpotTrading: FC = () => {
	const [openTab, setOpenTab] = useState(0);
	return (
		<div className={"w-full"} data-testid="rg-spot-trading">
			<Card cssClass={"px-2 sm:px-5 py-2 rounded h-full bg-lightGrey"}>
				<>
					<div className={"flex flex-wrap"}>
						<div className={"w-full"}>
							{/* <Tabs openTab={openTab} tabs={tabs} opened={setOpenTab} /> */}
							<Trade tradeTab={tabs[openTab]} />
						</div>
					</div>
				</>
			</Card>
		</div>
	);
};

export default SpotTrading;
