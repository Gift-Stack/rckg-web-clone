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
import { ISpotAccountTableData, SpotAccountTableProps } from "./model";
import SearchFilter from "../SearchFilter";

const SpotAccountTable: FC<SpotAccountTableProps> = ({
	children,
	filterBySearch,
}) => {
	return (
		<div className={"w-full mt-12"}>
			<div className="text-center sm:text-left sm:justify-end justify-center flex-wrap flex">
				<SearchFilter
					placeholder={"Search for Cryptocurrency"}
					handleSearch={(value: string) => filterBySearch(value)}
				/>
			</div>
			{children}
		</div>
	);
};

export default SpotAccountTable;
