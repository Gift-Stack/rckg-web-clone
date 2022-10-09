import AccountCard from "../../components/dashboard/wallet/AccountCard";
import Header from "../../components/dashboard/wallet/header";
import Nav from "../../components/dashboard/wallet/nav";
import { NextPage } from "next";
import { WalletLayout } from "../../components";
import Button from "./../../components/button";
import { ButtonSize, ButtonState } from "./../../components/button/enum";
import Router, { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showModal, hideModal } from "../../redux/actions";
import { ModalTypesEnum } from "../../components/modals/modalTypes";

const WalletOverview: NextPage = () => {
	const dispatch = useDispatch();
	const { pathname } = useRouter();
	const links = [
		{ title: "Overview", uri: "/wallet/overview" },
		{ title: "Spot Account", uri: "/wallet/spot-account" },
		{ title: "P2P", uri: "/wallet/p2p" },
		{ title: "Transaction history", uri: "/wallet/transaction-history" },
	];
	const options = [
		{ title: "Overview", uri: "/wallet/overview" },
		{ title: "Spot Account", uri: "/wallet/spot-account" },
		{ title: "P2P", uri: "/wallet/p2p" },
	];

	const handleDeposit = (): void => {
		dispatch(
			showModal(ModalTypesEnum.DEPOSIT, {
				cryptoDeposit: () => {
					dispatch(hideModal());
					return Router.push("/deposits");
				},
				fiatDeposit: () => {
					dispatch(hideModal());
					return Router.push("/deposits");
				},
			})
		);
	};
	const handleTransfer = (): void => {
		dispatch(showModal(ModalTypesEnum.TRANSFER_CRYPTO));
	};

	return (
		<WalletLayout
			title={"Rocket Global Wallet"}
			keywords={"Wallet, Overview, SpotAccount, P2P, Transaction History"}
			description={""}
			links={links}
		>
			<>
				<div className={"w-full lg:flex md:grid"}>
					<Nav links={links} />
					<Header options={options} pathname={pathname} />
				</div>
				<div className={"w-full mt-12"}>
					<AccountCard
						title={"Spot Account"}
						btc={0.00005}
						button1={
							<Button
								variant={ButtonState.OUTLINE}
								size={ButtonSize.sm}
								value="Deposit"
								onClick={handleDeposit}
								style={{ width: "6rem" }}
							/>
						}
						button2={
							<Button
								variant={ButtonState.OUTLINE}
								size={ButtonSize.sm}
								value="Withdraw"
								onClick={() => Router.push("../withdrawals")}
								style={{ width: "6rem" }}
							/>
						}
						button3={
							<Button
								variant={ButtonState.OUTLINE}
								size={ButtonSize.sm}
								value="Transfer"
								onClick={handleTransfer}
								style={{ width: "6rem" }}
							/>
						}
					/>
					<AccountCard
						title={"P2P"}
						btc={0.00005}
						button1={
							<Button
								variant={ButtonState.OUTLINE}
								size={ButtonSize.sm}
								value="Buy"
								onClick={() => {}}
								style={{ width: "6rem" }}
							/>
						}
						button2={
							<Button
								variant={ButtonState.OUTLINE}
								size={ButtonSize.sm}
								value="Sell"
								onClick={() => {}}
								style={{ width: "6rem" }}
							/>
						}
						button3={
							<Button
								variant={ButtonState.OUTLINE}
								size={ButtonSize.sm}
								value="Transfer"
								onClick={handleTransfer}
								style={{ width: "6rem" }}
							/>
						}
					/>
				</div>
			</>
		</WalletLayout>
	);
};
export default WalletOverview;
