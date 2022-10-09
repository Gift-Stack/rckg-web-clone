export interface IFooterRow {
	id: number;
	title: string;
	links: {
		name: string;
		path: string;
	}[];
}

export interface FooterRowProps {
	row: IFooterRow;
}

export interface FooterProps {
	rows: IFooterRow[];
}
