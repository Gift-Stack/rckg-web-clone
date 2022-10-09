import React, { FC, ReactElement } from "react";
import { TabProps } from "./model";

const Tab: FC<TabProps> = ({ name, tabIndex, openTab, setOpenTab }) => {
	const setName = (name: string[]): ReactElement[] => {
		let _name: ReactElement[];
		if (name && name.length > 0 && name.length == 1) {
			_name = name.map((n) => <React.Fragment key={n}>{n}</React.Fragment>);
		} else if (name && name.length > 1) {
			_name = name.map((n) => (
				<React.Fragment key={n}>{n + " "}</React.Fragment>
			));
		} else {
			_name = [<></>];
		}
		return _name;
	};
	return (
		<li
			className={`last:mr-0 border-b-2 text-center flex-1 ${
				openTab === tabIndex ? "border-blue" : "border-gray-200"
			}`}
			data-testid="rg-spot-tab"
		>
			<div className={"h-full flex items-center text-center justify-center"}>
				<a
					className={`text-x-small font-medium px-2 block leading-normal ${
						openTab === tabIndex ? "text-neutral-400" : "text-disabled"
					}`}
					onClick={(e) => {
						e.preventDefault();
						setOpenTab(tabIndex);
					}}
					data-toggle="tab"
					href={"#link" + tabIndex}
					role="tablist"
					data-testid="rg-spot-tab-anchor"
				>
					{setName(name)}
				</a>
			</div>
		</li>
	);
};

export default Tab;
