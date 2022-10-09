import { MoreBlue, MoreGray } from "./../../assets/svg";
import React from "react";
import { MobileIdentitySwitchEnum } from "../../types/enum/mobileIdentitySwitchEnum";

interface MobileIdentitySwitchProps {
	setShowMore: (value: boolean) => void;
	setShowCurrent: (value: boolean) => void;
	showMore: boolean;
	setActiveTab: (value: MobileIdentitySwitchEnum) => void;
	activeTab: string;
}

export default function MobileIdentitySwitch({
	setShowMore,
	setShowCurrent,
	showMore,
	setActiveTab,
	activeTab,
}: MobileIdentitySwitchProps) {
	return (
		<div data-testid={"rg-mobile-identity-switch"}>
			<div className="flex justify-between items-center relative">
				<h1 className="text-buttonText font-bold mb-4 lg:mb-12">
					Profile Verification
				</h1>
				<div
					data-testid={"show-more-button"}
					className="mr-4"
					onClick={() => setShowMore(!showMore)}
				>
					{showMore ? <MoreBlue /> : <MoreGray />}
				</div>
				{showMore && (
					<div
						data-testid={"show-more"}
						onClick={() => setShowCurrent(true)}
						className="absolute top-10 right-0 bg-white border-gray-500 px-4 py-3 border rounded-b"
					>
						View current features
					</div>
				)}
			</div>
			<div className="flex gap-3 mt-6">
				<div
					data-testid={"basic"}
					onClick={() => setActiveTab(MobileIdentitySwitchEnum.BASIC)}
					className={` flex items-center justify-center py-1.5 px-3 w-28  border rounded-sm text-labels font-500 ${
						activeTab === MobileIdentitySwitchEnum.BASIC
							? "bg-primary-400 text-white border-primary-400"
							: "text-primary-500"
					}`}
				>
					Basic Profile
				</div>
				<div
					data-testid={"verified"}
					onClick={() => setActiveTab(MobileIdentitySwitchEnum.VERIFIED)}
					className={` flex items-center justify-center py-1.5 px-3 w-28  border rounded-sm text-labels font-500 ${
						activeTab === MobileIdentitySwitchEnum.VERIFIED
							? "bg-primary-400 text-white border-primary-400"
							: "text-primary-500"
					}`}
				>
					Verified Plus
				</div>
			</div>
		</div>
	);
}
