import BalanceDetails from "../components/dashboard/balanceDetails";
import LoginTracker from "../components/dashboard/loginTracker";
import TransactionHistory from "../components/dashboard/transactionHistory";
import UpdatesAndAnnouncements from "../components/dashboard/updatesAndAnnouncements";
import { NextPage } from "next";
import { DashboardLayout } from "../components";
import SecuritySettings from "../components/dashboard/securitySettings";
import Commission from "../components/dashboard/commission";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useEffect } from "react";
import {
	GetAppDownload,
	GetBalanceDetails,
	GetLoginTracker,
	GetSecuritySettings,
	GetTransactionHistory,
	GetUpdatesAndAnnouncements,
} from "redux/actions/dashboard.action";
import { _getTokenFromStorage } from "../utils";
import {
	fetchProfileAsync,
	hideModal,
	showModal,
	fetchWalletAssetsBalanceAsync,
	getTotalAssetsBalanceBTC,
	getRateBTCUSDT,
	getDepositTransactionHistoryAsync,
	getWithDrawalTransactionHistoryAsync,
} from "../redux/actions";
import { ModalTypesEnum } from "../components/modals/modalTypes";
import { Activity } from "components/dashboard/loginTracker/model";
import { Transaction } from "components/dashboard/transactionHistory/model";
import {
	AccountType,
	TransactionType,
} from "components/dashboard/transactionHistory/enum";
import {
	getKycStageAsync,
	getLoginActivitiesAsync,
} from "redux/actions/settings.action";
import { formatToCurrency, IsJsonString } from "../constants";

const Dashboard: NextPage = () => {
	const dispatch = useDispatch();
	const {
		balanceDetails,
		updatesAndAnnouncements,
		loginTracker,
		transactionHistory,
		securitySettings,
	} = useSelector((state: RootState) => state.dashboard);
	const { loginActivities, KYCStages } = useSelector(
		(state: RootState) => state.settings
	);
	const { isPhoneVerify } = useSelector((state: RootState) => state.auth);
	const { assets, assetsBalnceInBTC, rateBTCUSDT } = useSelector(
		(state: RootState) => state.wallet
	);
	const { depositTransactionHistory, withdrawalTransactionHistory } =
		useSelector((state: RootState) => state.transactions);

	useEffect(() => {
		const reminder = _getTokenFromStorage("reminder");
		if (reminder) return;
		dispatch(
			fetchProfileAsync((res: any) => {
				setTimeout(() => {
					if (
						res.firstName !== "" &&
						isPhoneVerify &&
						res.usersKYC[0].verified
					) {
						return;
					}
					dispatch(
						showModal(ModalTypesEnum.SECURITY_VERIFICATION, {
							profile: res.firstName ? true : false,
							phone: isPhoneVerify,
							usersKYC: res.usersKYC,
							KYCStages: KYCStages,
						})
					);
				}, 5000);
			})
		);
		//eslint-disable-next-line
	}, [KYCStages, isPhoneVerify]);

	useEffect(
		() => {
			dispatch(GetBalanceDetails());
			dispatch(GetUpdatesAndAnnouncements());
			dispatch(GetLoginTracker());
			dispatch(GetTransactionHistory());
			dispatch(GetSecuritySettings());
			dispatch(GetAppDownload());
			dispatch(getLoginActivitiesAsync());
			dispatch(getKycStageAsync());
			dispatch(getTotalAssetsBalanceBTC());
			dispatch(getRateBTCUSDT());
			dispatch(fetchWalletAssetsBalanceAsync());
			dispatch(getDepositTransactionHistoryAsync({ type: "deposit" }));
			dispatch(getWithDrawalTransactionHistoryAsync({ type: "withdraw" }));
		},
		//eslint-disable-next-line
		[]
	);

	const formatLoginActivities = (activities: any[]): Activity[] => {
		const activity: Activity[] = [];
		if (activities.length) {
			activities.map((a) => {
				if (a.geoData != null && IsJsonString(a.geoData)) {
					activity.push({
						id: a.id,
						activity: `Logged in from ${JSON.parse(a.geoData).city}, ${
							JSON.parse(a.geoData).country
						}`,
						date: a.createdOn,
						address: a.ipAddress,
					});
				}
			});
		}
		return activity.slice(0, 4);
	};

	const formatChartData = (assets: any[]) => {
		const filteredChartData: any = [];
		const colors: any = ["#56BC7C", "#FF9100", "#F74876"];
		const assetsTotal = { value: 0 };
		const temp = [...assets];
		const walletAssets = temp.filter((asset) => asset.usdtValue > 0);
		const result = walletAssets.slice(0, 3).map((a: any, i: number) => {
			assetsTotal.value = assetsTotal.value + a.usdtValue;
			if (assetsTotal.value > 0) {
				filteredChartData.push({
					id: i + 1,
					currency: a.asset,
					amount: a.free,
					percentage: (a.free / assetsTotal.value) * 100,
					color: colors[i],
				});
			}
		});
		return filteredChartData;
	};

	const formatTransactions = (history: any[]): Transaction[] => {
		const transaction: Transaction[] = [];
		if (history.length) {
			history.map((a) => {
				if (a.asset != null) {
					transaction.push({
						id: a.id,
						narration: `Funded ${a.asset} Wallet`,
						date: a.createdOn,
						amount: a.amount,
						currency: a.asset,
						user: {
							id: a.id,
							walletId: a.address,
						},
						transactionType: TransactionType["CREDIT"],
						accountType: AccountType["BTC_WALLET"],
					});
				} else {
					transaction.push({
						id: a.id,
						narration: `${a.currency} Sent`,
						date: a.createdOn,
						amount: a.amount,
						currency: a.currency,
						user: {
							id: a.id,
							walletId: a.address,
						},
						transactionType: TransactionType["DEBIT"],
						accountType: AccountType["NAIRA_WALLET"],
					});
				}
			});
		}
		return transaction.slice(0, 4);
	};

	return (
		<DashboardLayout
			title={"Rocket Global Dashboard"}
			keywords={"Rocket, Dashboard"}
			description={""}
		>
			<>
				<div className={"w-full lg:flex md:grid"}>
					<BalanceDetails
						cardActions={balanceDetails?.cardActions}
						cardTags={balanceDetails?.cardTags}
						wallets={formatChartData(assets)}
						btcBalance={parseFloat(assetsBalnceInBTC.totalAssetOfBtc)}
						usdtBalance={formatToCurrency(
							parseFloat(assetsBalnceInBTC.totalAssetOfBtc) *
								parseFloat(rateBTCUSDT.price),
							2
						)}
					/>
					<UpdatesAndAnnouncements updates={[]} />
				</div>
				<div className={"w-full lg:flex md:grid"}>
					<LoginTracker
						activities={formatLoginActivities(loginActivities)}
						devices={loginTracker?.devices}
						cardTags={loginTracker?.cardTags}
					/>
					<TransactionHistory
						depositTransactions={formatTransactions(depositTransactionHistory)}
						withdrawalTransactions={formatTransactions(
							withdrawalTransactionHistory
						)}
						cardTags={transactionHistory?.cardTags}
					/>
				</div>
				<div className={"w-full lg:flex md:grid"}>
					<SecuritySettings allSettings={securitySettings?.allSettings} />
					<Commission />
				</div>
			</>
		</DashboardLayout>
	);
};
export default Dashboard;
