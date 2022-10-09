import React, { FC } from "react";
import { CancelEye, Eye } from "../../../assets/svg";
import Card from "../../card";
import { useDispatch, useSelector } from "react-redux";
import { ToggleTotalBalance } from "../../../redux/actions/dashboard.action";
import { RootState } from "../../../redux/store";
import AccountDetailsUI from "./AccountDetailsUI";
import { HeaderProps } from "./model";

const Header: FC<HeaderProps> = ({
	pathname,
	options,
	button1,
	button2,
	button3,
	btcBalance,
	usdtBalance,
}) => {
	const { showTotalBalance } = useSelector(
		(state: RootState) => state.dashboard
	);

	const dispatch = useDispatch();

	return (
		<div className={"w-full balance__details"} data-testid={"rg-wallet-header"}>
			<Card cssClass="p-5 rounded bg-headerColor shadow-inner wallet-header h-full">
				<AccountDetailsUI
					icon={
						showTotalBalance ? (
							<CancelEye style={{ stroke: "white" }} />
						) : (
							<Eye style={{ stroke: "white" }} />
						)
					}
					value={showTotalBalance ? " Hide Balance" : " Show Balance"}
					onClick={() => dispatch(ToggleTotalBalance())}
					options={options}
					pathname={pathname}
					showTotalBalance={showTotalBalance}
					button1={button1}
					button2={button2}
					button3={button3}
					btcBalance={btcBalance}
					usdtBalance={usdtBalance}
				/>
			</Card>
		</div>
	);
};

export default Header;
