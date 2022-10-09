import { CoinEnum, FlowEnum } from "types/enum";

export interface MobileP2PTableProps {
	data: IP2PTableData[];
	buy: (value: IP2PTableData) => void;
	sell: (value: IP2PTableData) => void;
	transfer: (value: IP2PTableData) => void;
	send: (value: IP2PTableData) => void;
}

export interface IP2PTableData {
	id: number;
	coin: {
		title: string;
		value: CoinEnum;
	};
	total: {
		amount: number;
		flow?: FlowEnum;
	};
	avaliable: {
		amount: number;
		flow?: FlowEnum;
	};
	frozen: {
		amount: number;
		flow?: FlowEnum;
	};
	btcValue: {
		amount: number;
		flow?: FlowEnum;
	};
}
