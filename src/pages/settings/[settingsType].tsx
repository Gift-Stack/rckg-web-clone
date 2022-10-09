import AccountSettings from "components/settings/AccountSettings";
import IdentitySettings from "components/settings/IdentitySettings";
import SecuritySettings from "components/settings/SecuritySettings";
import useWindowSize from "hooks/useWindowSize";
import { NextPage } from "next";
import { DashboardLayout, Switch } from "../../components";
import { RootState } from "../../redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getKycStageAsync,
	getSettingsAsync,
} from "../../redux/actions/settings.action";
import { useRouter } from "next/router";
import { capitalize } from "utils";
import { fetchProfileAsync } from "../../redux/actions";

let displayItems = [
	{ value: "Account", text: "Account Settings" },
	{
		value: "Security",
		text: "Security Settings",
	},
	{ value: "Identity", text: "Identity / Kyc setting " },
];

let displayItemsSm = [
	{ value: "Account", text: "Account" },
	{
		value: "Security",
		text: "Security",
	},
	{ value: "Identity", text: "Identity / Kyc " },
];

const Settings: NextPage = () => {
	const { width } = useWindowSize();
	const dispatch = useDispatch();
	const [active, setActive] = useState("Account");
	const { email, phone, isEmailVerify, isPhoneVerify } = useSelector(
		(state: RootState) => state.auth
	);
	const { KYCStages } = useSelector((state: RootState) => state.settings);

	const { usersKYC, firstName } = useSelector(
		(state: RootState) => state.profile
	);
	const router = useRouter();
	const { settingsType } = router.query;

	useEffect(() => {
		dispatch(getSettingsAsync());
		dispatch(getKycStageAsync());
		dispatch(fetchProfileAsync());
		settingsType && setActive(capitalize((settingsType as string) ?? active));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settingsType]);

	return (
		<DashboardLayout
			title={"Rocket Global Settings"}
			keywords={"Rocket, Settings"}
			description={""}
		>
			<div className="w-full">
				<div className="flex lg:bg-white md:bg-none flex-col lg:flex-row justify-between bg-white-100 items-start lg:items-center  text-headline h-16 py-0 lg:pl-5  lg:pr-2 mb-7 rounded">
					<p className="font-bold text-neutral-400 mb-2 lg:mb-0  ">Settings</p>
					<Switch
						handleSwitch={(value: string) =>
							router.push(`/settings/${value.toLowerCase()}`)
						}
						switchItem={
							(width as number) <= 770 ? displayItemsSm : displayItems
						}
						active={active}
					/>
				</div>
				<div className="settings-bottom bg-white lg:px-8 lg:py-7 p-4">
					{active.toLowerCase().includes("account") && (
						<AccountSettings
							firstName={firstName}
							email={email}
							phone={phone}
						/>
					)}
					{active.toLowerCase().includes("security") && <SecuritySettings />}
					{active.toLowerCase().includes("identity") && (
						<IdentitySettings
							isEmailVerify={isEmailVerify}
							phone={isPhoneVerify}
							profile={firstName !== "" ? true : false}
							usersKYC={usersKYC}
							KYCStages={KYCStages}
						/>
					)}
				</div>
			</div>
		</DashboardLayout>
	);
};
export default Settings;
