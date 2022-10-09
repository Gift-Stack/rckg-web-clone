import Card from "../../card";
import React, { FC } from "react";

const Commission: FC = () => {
	return (
		<div data-testid="rg-commission" className={"m-2 lg:w-2/5"}>
			<Card
				title={"Earn up to 30% Commission"}
				titleCss={"text-white md:text-sm-headline text-sm-regular font-medium"}
				cssClass={
					"p-5 rounded h-full bg-gradient-to-r from-cyan-light to-cyan-deep"
				}
			>
				<div className={"text-white md:text-small text-labels"}>
					Invite friends to join and get rewarded with cash. The more you refer
					the more reward you get
				</div>
			</Card>
		</div>
	);
};

export default Commission;
