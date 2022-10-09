import React, { FC } from "react";
import { TabsProps } from "./model";
import Tab from "./Tab";

const Tabs: FC<TabsProps> = ({ tabs, opened, openTab, width, ...props }) => {
	const _setOpenedTab = (index: number): void => {
		opened(index);
	};
	return (
		<div data-testid="rg-spot-tabs" className={`${width ? "flex" : ""}`}>
			<ul
				className={`flex mb-0 list-none ${width ? width : ""}`}
				role="tablist"
				data-testid="rg-spot-tabs-list"
				{...props}
			>
				{tabs && tabs.length > 0 ? (
					tabs.map((tab, index) => (
						<Tab
							key={tab.id}
							name={tab.name}
							tabIndex={index}
							openTab={openTab}
							setOpenTab={(index) => _setOpenedTab(index)}
						/>
					))
				) : (
					<></>
				)}
			</ul>
			{width && (
				<ul className={"mb-0 list-none border-b-2 w-full border-gray-200"}></ul>
			)}
		</div>
	);
};

export default Tabs;
