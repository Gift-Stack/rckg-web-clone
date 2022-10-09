import React, { FC, useState } from "react";
import BasicFeatures from "./BasicFeatures";
import CurrentFeatures from "./CurrentFeatures";
import MobileBasicFeatures from "./MobileBasicFeatures";
import MobileCurrentFeatures from "./MobileCurrentFeatures";
import MobileIdentitySwitch from "./MobileIdentitySwitch";
import MobileVerifiedFeatures from "./MobileVerifiedFeatures";
import VerifiedFeatures from "./VerifiedFeatures";
import { MobileIdentitySwitchEnum } from "../../types/enum/mobileIdentitySwitchEnum";
import { createKYCStageAsync } from "../../redux/actions/settings.action";
import { hideModal } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { withProvider } from "../../hoc/withProvider";

interface IdentitySettingsProps {
	isEmailVerify: boolean;
	profile: boolean;
	usersKYC: any[];
	phone: boolean;
	KYCStages: any[];
}

const IdentitySettings: FC<IdentitySettingsProps> = ({
	isEmailVerify,
	profile,
	usersKYC,
	phone,
	KYCStages,
}) => {
	const [showCurrent, setShowCurrent] = useState(false);
	const [activeTab, setActiveTab] = useState<MobileIdentitySwitchEnum>(
		MobileIdentitySwitchEnum.BASIC
	);
	const [showMore, setShowMore] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	const handleBasic = () => {
		if (usersKYC.length <= 0) {
			dispatch(
				createKYCStageAsync(KYCStages[0].id, () => {
					dispatch(hideModal());
					return router.push(`/profile/[tab]`, "/profile/0").then();
				})
			);
		}
		if (profile && phone && usersKYC[0].verified) {
			return;
		}
		if (!profile) {
			dispatch(hideModal());
			return router.push(`/profile/[tab]`, "/profile/0").then();
		}
		if (!phone) {
			dispatch(hideModal());
			return router.push(`/profile/[tab]`, "/profile/1").then();
		}
		if (profile && phone) {
			dispatch(hideModal());
			return router.push(`/profile/[tab]`, "/profile/2").then();
		}
	};
	const basicFeatures = [
		{
			tag: "Fiat Limits",
			key: "Deposit and Withdrawal",
			value: "$50K Daily",
		},
		{
			tag: "P2P Transaction Limits",
			key: "P2P",
			value: "Unlimited",
		},
	];
	const verifiedFeatures = [
		{
			tag: "Fiat Limits",
			key: "Deposit and Withdrawal",
			value: "$200K Daily",
		},
		{
			tag: "P2P Transaction Limits",
			key: "P2P",
			value: "Unlimited",
		},
	];
	const verifiedPlusRequirements = ["Proof of address", "Review time: 10 days"];

	const basicRequirements = [
		"Personal information",
		"Government-issued ID",
		"Facial recognition",
		"Review time: 10 days",
	];

	const desktopBasicFeatures = [
		{ key: "Fiat Deposit & Withdrawal Limits", value: "$50K Daily" },
		{ key: "Crypto Deposit Limit", value: "100 BTC Daily" },
		{ key: "Crypto Withdrawal Limit", value: "$50K Daily" },
		{ key: "P2P Transaction Limits", value: "$50K Daily" },
	];

	const desktopVerifiedFeatures = [
		{ key: "Fiat Deposit & Withdrawal Limits", value: "$200K Daily" },
		{ key: "Crypto Deposit Limit", value: "Unlimited" },
		{ key: "Crypto Withdrawal Limit", value: "Unlimited" },
		{ key: "P2P Transaction Limits", value: "Unlimited" },
		{ key: "Other Features", value: "LPD/OTC/Binance card" },
	];
	return (
		<div>
			<div className="hidden lg:block">
				<h1
					data-testid={"identity-settings"}
					className="text-md-headline font-bold mb-4 lg:mb-12"
				>
					Profile Verification
				</h1>
				<div className="flex flex-wrap w-full">
					<CurrentFeatures
						isCompleted={isEmailVerify}
						features={desktopBasicFeatures}
					/>
					<div className="flex flex-1 flex-wrap justify-between flex-col lg:flex-row">
						<BasicFeatures
							handleClick={handleBasic}
							isCompleted={profile && usersKYC[0]?.verified && phone}
							requirements={basicRequirements}
							features={desktopBasicFeatures}
						/>
						<VerifiedFeatures
							shouldStart={profile && usersKYC[0]?.verified && phone}
							requirements={verifiedPlusRequirements}
							isCompleted={false}
							features={desktopVerifiedFeatures}
						/>
					</div>
				</div>
			</div>
			<div className="block lg:hidden">
				<MobileIdentitySwitch
					setShowMore={setShowMore}
					setShowCurrent={setShowCurrent}
					showMore={showMore}
					setActiveTab={setActiveTab}
					activeTab={activeTab}
				/>
				<MobileCurrentFeatures
					showCurrent={showCurrent}
					setShowCurrent={setShowCurrent}
					features={
						activeTab === MobileIdentitySwitchEnum.BASIC
							? desktopBasicFeatures
							: desktopVerifiedFeatures
					}
				/>
				{activeTab === MobileIdentitySwitchEnum.BASIC && (
					<MobileBasicFeatures
						data-testid={"rg-mobile-basic-features"}
						requirements={basicRequirements}
						handleClick={handleBasic}
						features={basicFeatures}
						isCompleted={profile && usersKYC[0]?.verified && phone}
					/>
				)}
				{activeTab === MobileIdentitySwitchEnum.VERIFIED && (
					<MobileVerifiedFeatures
						data-testid={"rg-mobile-verified-features"}
						features={verifiedFeatures}
						isCompleted={false}
						isFailedVerification={false}
						requirements={verifiedPlusRequirements}
					/>
				)}
			</div>
		</div>
	);
};
export default withProvider(IdentitySettings);
