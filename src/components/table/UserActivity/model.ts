export interface LoginActivityTableProps extends MetaProps {
	children: JSX.Element;
	cssClass: string;
}

export interface MobileTransactionTableProps {
	data: ILoginActivityTableData[];
	pageSize?: number;
}

export interface ILoginActivityTableData {
	id: number;
	date_time: string;
	source: string;
	location: string;
	ip_address: string;
}
