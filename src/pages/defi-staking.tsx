import Footer from "components/footer";
import { footerRowsData } from "components/footer/data";
import { Layout } from "components/layout/Layout";
import Header from "components/dashboard/TopNav";
import SectionHeader from "components/shared/SectionHeader";
import { NextPage } from "next";
import React from "react";


const DefiStaking: NextPage = () => {
	return (
		<Layout
			title={"Rocket Global P2P"}
			keywords={"Login, Rocket, Market, Trade, Top Gainer, Top Looser"}
			description={""}
		>
			<>
				<div className={"bg-primary-100 w-full"}>
					<Header wSection={true} />
					<SectionHeader
						title="DeFi Staking"
						description="DeFi (Decentralized Finance) is a way of providing financial services to users through smart contracts. Existing DeFi projects aim to provide higher annualized earnings for specific currencies."
						mobileTitle={"DeFi Staking"}
						wSection={true}
					/>
					<div className="text-l-headline py-40 text-center font-semibold">
						<p>Coming soon...</p>
					</div>
					<Footer rows={footerRowsData} />
				</div>
			</>
		</Layout>
	);
};
export default DefiStaking;
