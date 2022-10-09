import React, { FC, useEffect, useState } from "react";
import { CancelEye, Eye } from "assets";
import Card from "components/card";
import { Actions, Tags } from "components/card/model";
import { useDispatch, useSelector } from "react-redux";
import { ToggleTotalBalance } from "redux/actions/dashboard.action";
import { RootState } from "redux/store";
import BalanceDetailsUI from "./BalanceDetailsUI";
import { BalanceDetailsProps } from "./model";
import Router from "next/router";

const BalanceDetails: FC<BalanceDetailsProps> = ({
	cardTags,
	wallets,
	btcBalance,
	usdtBalance,
}) => {
	const [actions, setActions] = useState<Actions[]>([]);
	const [tags, setTags] = useState<Tags[]>([]);
	const { showTotalBalance } = useSelector(
		(state: RootState) => state.dashboard
	);

	useEffect(() => {
		setTags(cardTags);
		cardTags?.map((tag) => {
			if (tag.isActive === true) {
				setActions(tag.actions);
			}
		});
	}, [cardTags]);

	const dispatch = useDispatch();

	const filterActions = (value: any) => {
		Router.push(value.link);
	};

	const filterTags = (value: string) => {
		const tags_ = tags.map((tag) => {
			return {
				name: tag.name,
				actions: tag.actions,
				isActive: tag.name === value ? true : false,
			};
		});
		tags.map((tag) => {
			if (tag.name === value) {
				setActions(tag.actions);
			}
		});

		setTags(tags_);
	};

	return (
		<div className={"m-2 lg:w-3/5 balance__details"}>
			<Card
				actions={actions}
				// tags={tags}
				title="Balance Details"
				dropTitleActionDown={true}
				cssClass="p-5 rounded bg-white h-full"
				handleAction={(value) => filterActions(value)}
				// handleTag={(value) => filterTags(value)}
			>
				<BalanceDetailsUI
					icon={showTotalBalance ? <CancelEye /> : <Eye />}
					value={showTotalBalance ? "Hide Balance" : "Show Balance"}
					onClick={() => dispatch(ToggleTotalBalance())}
					showTotalBalance={showTotalBalance}
					wallets={wallets}
					btcBalance={btcBalance}
					usdtBalance={usdtBalance}
				/>
			</Card>
		</div>
	);
};

export default BalanceDetails;
