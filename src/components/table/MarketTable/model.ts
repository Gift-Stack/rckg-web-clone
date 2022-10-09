import { CoinPairEnum, FlowEnum } from "types/enum";
import { ITableFilter, ITableOption } from "../model";

export interface MarketTableProps extends MetaProps {
	children: JSX.Element;
	cssClass: string;
	title?: string;
	tableFilters?: ITableFilter[];
	tableOptions?: ITableOption[];
	handleFilter?: (value: string) => void;
	handleOption?: (value: string) => void;
	handleSearch?: (value: string) => void;
}

export interface MobileMarketTableProps {
	data: IMarketTableData[];
	trade: (value: IMarketTableData) => void;
}

export interface IMarketTableData {
	id: number;
	coinPair: CoinPairEnum;
	price: number;
	change: {
		rate: number;
		flow: FlowEnum;
	};
	highLow: {
		high: number;
		low: number;
	};
	volume: number;
	marketCap: number;
	trade?: () => void;
}
