import Card from "../../card";
import React, { FC } from "react";
import { AppDownloadProps } from "./model";
import Store from "./Store";

const AppDownload: FC<AppDownloadProps> = ({ apps, handleClick }) => {
	return (
		<div data-testid="rg-app-download" className={"m-2"}>
			<Card cssClass="p-3 rounded-xl bg-gradient-to-br from-sky-light to-sky-deep h-full">
				<>
					<div className={"text-white text-labels"}>
						For a better experience on the go, kindly download the mobile app
					</div>
					<div className={"grid gap-4 grid-cols-2"}>
						{apps &&
							apps.length >= 1 &&
							apps.map((store, index) => (
								<Store
									index={index}
									handleClick={handleClick}
									key={store.id}
									name={store.name}
									icon={store.icon}
									url={store.url}
								/>
							))}
					</div>
				</>
			</Card>
		</div>
	);
};

export default AppDownload;
