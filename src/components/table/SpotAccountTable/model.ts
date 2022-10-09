export interface MobileSpotAccountTableProps {
	data: ISpotAccountTableData[];
	buy: (value: ISpotAccountTableData) => void;
	deposit: (value: ISpotAccountTableData) => void;
	withdraw: (value: ISpotAccountTableData) => void;
	trade: (value: ISpotAccountTableData) => void;
	transfer: (value: ISpotAccountTableData) => void;
	convert: (value: ISpotAccountTableData) => void;
	fetchCoinName: (value1:any, value2:any) => any;
	fetchCoinImage: (value1:any, value2:any) => any;
	allCoins: any;
	showPagination?: boolean;
	showPageSize?: boolean;
	pageSize?: number;
	setCurrentPage?: any;
	totalPages?: any;
}

export interface SpotAccountTableProps {
	filterBySearch: (value: string) => void;
	children: JSX.Element;
}

export interface ISpotAccountTableData {
	asset: string;
	free: string;
	locked: string;
	usdtValue?: any;
}
