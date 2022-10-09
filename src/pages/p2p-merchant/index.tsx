import React from "react";
import { Meta } from "components";
import Header from "components/dashboard/TopNav";
import SectionHeader from "components/shared/SectionHeader";
import P2PMerchantContainer from "components/p2p-merchant/P2PMerchantContainer";
import P2PLinks from "components/p2p-merchant/links";
import {
	SmallP2PCard,
	SecondLargeP2PCard,
	FirstLargeP2PCard,
} from "components/p2p-merchant/cards";

import { HeadsetTool, Badge, AdManagement } from "assets/svg";

const P2PMerchant = () => {
	return (
		<div>
			<Meta
				title={"Rocket Global P2P Merchant"}
				keywords={
					"Login, Rocket, Transaction, Withdrawal Crypto, Withdrawal Fiat"
				}
				description={""}
			/>
			<Header wSection={true} />
			<SectionHeader
				title="P2P Merchant Application"
				description="Become a Rocket Global P2P Merchant and enjoy more benefits"
				mobileTitle={"P2P Merchant"}
				wSection={true}
			/>
			<P2PMerchantContainer>
				<P2PLinks />

				{/* Cards */}
				<div className="flex flex-col gap-y-8">
					<div className="flex justify-between w-full min-h-253 gap-6">
						<SmallP2PCard
							icon={<AdManagement />}
							header={"Advanced Ads Management"}
							description={
								" Merchants can access more trading tools via the merchant portal to better manage advertisements and trading activities"
							}
							path={"/p2p-merchant/ads-management"}
						/>
						<SmallP2PCard
							icon={<Badge />}
							header={"Verified Badges"}
							description={
								" A verified badge will be added beside your P2P nickname, adding credibility to your brand."
							}
						/>
						<SmallP2PCard
							icon={<HeadsetTool />}
							header={"Exclusive Customer Support"}
							description={
								" Rocket Global provides one-on-one services, with fast response to your requests or issues."
							}
						/>
					</div>

					<div className="flex justify-between w-full min-h-253 gap-6">
						<FirstLargeP2PCard />
						<SecondLargeP2PCard />
					</div>
				</div>
			</P2PMerchantContainer>
		</div>
	);
};

export default P2PMerchant;
