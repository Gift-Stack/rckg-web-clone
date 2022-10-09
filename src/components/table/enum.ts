export enum TableFilterState {
	PRIMARY = "bg-primary-400 rounded-sm flex justify-center items-center text-white font-medium lg:font-bold text-x-small lg:text-sm-regular my-1",
	SECONDARY = "bg-white flex justify-center items-center text-neutral-400 font-medium lg:font-bold text-x-small lg:text-sm-regular my-1",
	TERTIARY = "bg-neutral-100 rounded flex justify-center items-center text-neutral-300 font-medium lg:font-bold text-x-small lg:text-sm-regular my-1",
}

export enum TableOptionState {
	PRIMARY = "bg-primary-100 border-primary-400 border rounded flex justify-center items-center text-primary-400 font-medium text-x-small lg:text-labels my-1",
	SECONDARY = "bg-white rounded border-neutral-100 border flex justify-center items-center text-neutral-400 font-medium text-x-small lg:text-labels my-1",
	TERTIARY = "bg-neutral-100 rounded flex justify-center items-center text-neutral-300 font-medium text-x-small lg:text-labels my-1",
}

export enum P2PListingOptionState {
	BUY = "bg-active rounded flex justify-center items-center text-white font-medium text-buttonText",
	SELL = "bg-error-300 rounded flex justify-center items-center text-white font-medium text-buttonText",
	INACTIVE = "bg-white flex justify-center items-center text-inActive font-medium text-buttonText",
}

export enum DataState {
	DEFAULT = "text-x-small lg:text-labels lg:text-labels xl:text-sm-regular font-medium leading-5 text-neutral-400",
	PRIMARY = "text-x-small lg:text-labels xl:text-sm-regular font-medium leading-5 text-primary-400",
	SUCCESS = "text-x-small lg:text-labels xl:text-sm-regular font-medium leading-5 text-success",
	DANGER = "text-x-small lg:text-labels xl:text-sm-regular font-medium leading-5 text-error-300",
}

export enum TableSortState {
	ASC = "ASC",
	DEC = "DEC",
}
