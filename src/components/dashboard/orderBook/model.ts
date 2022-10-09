export interface Record {
	id: number;
	price: number;
	amount: number;
	total: number;
	type: string;
	activity?: number;
}
export interface RecordProps {
	records: Record[];
	onClose: () => void;
	baseCoin: string;
	quoteCoin: string;
}
export interface MobileRecordProps {
	records: Record[];
}
export interface BuySellRecords {
	records: Record[];
	show: boolean;
	cssClass?: string;
	baseCoin?: string;
	quoteCoin?: string;
}
export interface ItemProps {
	data: Record;
}
