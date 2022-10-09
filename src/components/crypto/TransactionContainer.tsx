import React from "react";
interface TransactionContainer {
	children: React.ReactChild | React.ReactElement[];
	onClick?: () => void;
}

export default function TransactionContainer({
	children,
	onClick,
}: TransactionContainer) {
	const handleClick = () => {
		onClick && onClick();
	};
	return (
		<div
			onClick={handleClick}
			data-testid={"transaction-container"}
			className="transaction-container  mx-auto bg-primary-100 flex items-center justify-center mt-0 sm:mt-14 "
		>
			<div className="relative transaction-container__wrapper rounded bg-transparent sm:bg-white  p-4 sm:p-14 mt-0  sm:mt-16">
				{children}
			</div>
		</div>
	);
}
