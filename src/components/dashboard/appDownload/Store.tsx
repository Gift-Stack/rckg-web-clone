import { AppStore, PlayStore } from "../../../assets";
import React, { FC } from "react";
import { AppIcon } from "./enum";
import { StoreProps } from "./model";

const Store: FC<StoreProps> = ({ name, icon, handleClick, url, index }) => {
	return (
		<button
			data-testid={`rg-storeUI-${index} `}
			className={
				"flex items-center text-white w-full bg-storeBtn justify-center text-labels px-1 py-2 rounded mt-6"
			}
			onClick={() => handleClick(url)}
		>
			{icon === AppIcon.APP_STORE ? <AppStore /> : <PlayStore />}{" "}
			<span className={"pl-2"}>{name}</span>
		</button>
	);
};

export default Store;
