import React, { FC } from "react";
import { P2pContainerProps } from "./model";

const P2pContainer: FC<P2pContainerProps> = ({ children }) => {
	return (
		<div data-testid={"rg-p2p-container"} className={"w-full"}>
			<div className={"w-full py-4 sm:py-10 px-4 md:px-8 lg:px-20"}>
				{children}
			</div>
		</div>
	);
};

export default P2pContainer;
