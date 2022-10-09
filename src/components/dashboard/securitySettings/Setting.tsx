import {
	AntiPhishing,
	TwoFA,
	VerifyIdentity,
	WithdrawalWhitelist,
} from "../../../assets";
import React, { FC } from "react";
import { IconTypes, Status } from "./enum";
import { SettingProp } from "./model";

const Setting: FC<SettingProp> = ({ name, icon, state, status, onClick }) => {
	const handleClick = (status: Status): void => {
		onClick(status);
	};
	return (
		<div data-testid="rg-SettingUI" className={`${"py-2 flex items-center"}`}>
			{icon === IconTypes.TWO_FA ? (
				<TwoFA />
			) : icon === IconTypes.VERIFY_IDENTITY ? (
				<VerifyIdentity />
			) : icon === IconTypes.ANTI_PHISHING ? (
				<AntiPhishing />
			) : (
				<WithdrawalWhitelist />
			)}
			<div className={"pl-2"}>
				<div className={"text-labels font-medium text-neutral-400"}>{name}</div>
				<div
					onClick={() => handleClick(status)}
					className={`${state} text-x-small underline cursor-pointer`}
				>
					{status}
				</div>
			</div>
		</div>
	);
};

export default Setting;
