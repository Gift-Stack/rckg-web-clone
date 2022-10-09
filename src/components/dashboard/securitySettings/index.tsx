import Card from "../../card";
import React, { FC, useEffect, useState } from "react";
import { Status } from "./enum";
import { AllSettings, SecuritySettingsProps } from "./model";
import Setting from "./Setting";

const SecuritySettings: FC<SecuritySettingsProps> = ({ allSettings }) => {
	const [settings, setSettings] = useState<AllSettings[]>([]);

	useEffect(() => {
		setSettings(allSettings);
	}, [allSettings]);

	const filterSettings = (status: Status): void => {};

	return (
		<div data-testid="rg-security-settings" className={"m-2 lg:w-3/5"}>
			<Card title="Security Settings" cssClass="p-5 rounded bg-white h-full">
				<div
					className={
						"sm:flex sm:flex-wrap grid grid-cols-2 m-auto sm:m-0 justify-between"
					}
				>
					{settings &&
						settings.length >= 1 &&
						settings.map((setting, index) => (
							<React.Fragment key={setting.id}>
								<Setting
									name={setting.name}
									icon={setting.icon}
									state={setting.state}
									status={setting.status}
									onClick={(status) => filterSettings(status)}
								/>
								{index !== settings.length - 1 && (
									<div
										className={"border-r border-neutral-250 hidden md:grid"}
									></div>
								)}
							</React.Fragment>
						))}
				</div>
			</Card>
		</div>
	);
};

export default SecuritySettings;
