export interface Updates {
	id: number;
	message: string;
	date: string;
}

export interface UpdatesAndAnnouncementsUIProps {
	message: string;
	date: string;
	underline: boolean;
}

export interface UpdateProps {
	updates: Updates[];
	[key: string]: any;
}
