import React, { FC } from "react";
import { ActiveProgressProps } from "./model";

const ActiveProgress: FC<ActiveProgressProps> = ({ length, state }) => {
	return (
		<div
			data-testid="rg-active-progress"
			style={{ width: (1 / length) * 100 + "%" }}
			className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${state}`}
		></div>
	);
};

export default ActiveProgress;
