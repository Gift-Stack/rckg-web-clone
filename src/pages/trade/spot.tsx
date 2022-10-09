import { Layout } from "components";
import Header from "components/dashboard/TopNav";
import SpotHistoryGroup from "components/spot-trading/history/SpotHistoryGroup";
import { NextPage } from "next";
import React from "react";

const SpotTrading: NextPage = () => {
	return (
		<Layout
			title={"Rocket Global Reset password"}
			keywords={"Login, Rocket, Reset password"}
			description={""}
		>
			<div>
				<Header />
				<SpotHistoryGroup isAuthenticated={false} />
			</div>
		</Layout>
	);
};
export default SpotTrading;
