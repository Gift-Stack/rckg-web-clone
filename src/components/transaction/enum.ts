export enum TransactionStatus {
	SUCCESSFUL = "SUCCESSFUL",
	PENDING = "PENDING",
	FAILED = "FAILED",
}

export enum TransactionStatusVariant {
	SUCCESSFUL = "bg-deepGreen",
	PENDING = "bg-secondary",
	FAILED = "bg-error-300",
	BANK_TRANSFER = "text-labels text-secondary bg-lightsecondary border border-mediumsecondary rounded-sm p-1",
}

export enum TransactionTabState {
	PRIMARY = "bg-primary-100 border-primary-400 border rounded flex justify-center items-center text-primary-400 font-medium text-labels my-1",
	SECONDARY = "bg-white rounded border-neutral-100 border flex justify-center items-center text-neutral-400 font-medium text-labels my-1",
	TERTIARY = "bg-neutral-100 rounded flex justify-center items-center text-neutral-300 font-medium text-labels my-1",
}

export enum PaymentType {
	CARD = "CARD",
	P2P = "P2P",
	ADVANCE = "ADVANCE",
}

export enum PaymentMethod {
	BANK_TRANSFER = "BANK_TRANSFER",
}
