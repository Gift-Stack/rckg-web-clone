import React from "react";

interface Props {
	children: React.ReactNode;
}

const P2PMerchantContainer: React.FC<Props> = ({ children }) => {
	return (
		<div
			data-testid={"p2p-merchant-container"}
			className="mx-auto bg-primary-100 flex items-center justify-center mt-0 "
		>
			<div className="relative rounded bg-transparent w-full min-h-24 mx-6.25 pt-4 sm:pt-4.4 pb-2.5 mb-6.7 mt-0">
				{children}
			</div>
		</div>
	);
};

export default P2PMerchantContainer;
