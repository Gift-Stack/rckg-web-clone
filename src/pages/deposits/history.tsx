import {
	BnbBtc,
	BtcBtc,
	DodgeBtc,
	EthBtc,
	LtcBtc,
	NavBackIcon,
	TransactionCopy,
	TransactionLink,
} from "../../assets";
import Footer from "../../components/footer";
import { footerRowsData } from "../../components/footer/data";
import Table from "../../components/table";
import { DataState } from "../../components/table/enum";
import {
	depositTransactionTableColumns,
	depositHistoryDummy,
} from "../../components/table/TransactionTable/data";
import { ITableColumn, ITableData } from "../../components/table/model";
import TransactionTable from "../../components/table/TransactionTable";
import MobileTransactionTable from "../../components/table/TransactionTable/MobileTransactionTable";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { capitalize, centeredEllipsis } from "../../utils";
import { TransactionStatusVariant } from "../../components/transaction/enum";
import { CoinEnum } from "../../types/enum/coinEnum";
import { formatToCurrency, getDateTimeWithoutA } from "../../constants";
import { TransactionLayout } from "../../components/layout/TransactionLayout";
import NavBack from "../../components/nav-back";
import { useRouter } from "next/router";
import { getDepositHistoryAsync } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IHistoryTable } from "../../services/transactionsService";

const DepositHistory: NextPage = () => {
	const [columns, setColumns] = useState<ITableColumn[]>([]);
	const [page, setPage] = useState<number>(1);
	const router = useRouter();
	const dispatch = useDispatch();
	const { depositHistory } = useSelector(
		(state: RootState) => state.transactions
	);

	useEffect(() => {
		setColumns(depositTransactionTableColumns);
	}, []);

	useEffect(() => {
		const data: IHistoryTable = {
			page,
		};
		dispatch(getDepositHistoryAsync(data));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const dataSource: ITableData[] =
		depositHistoryDummy && depositHistoryDummy.length > 0
			? depositHistoryDummy.map((row: any) => {
					return {
						key: row.insertTime,
						coin: (
							<div className="flex items-center pt-2 xl:pt-5">
								<div className="flex items-center w-10 h-10 coins">
									{row.coin === CoinEnum.DOGE ? (
										<DodgeBtc />
									) : CoinEnum.LTC ? (
										<LtcBtc />
									) : CoinEnum.BNB ? (
										<BnbBtc />
									) : CoinEnum.BTC ? (
										<BtcBtc />
									) : (
										<EthBtc />
									)}
								</div>

								<div className="ml-1">
									<div className={DataState.DEFAULT}>{row.coin}</div>
								</div>
							</div>
						),
						date_time: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{getDateTimeWithoutA(new Date(row.insertTime).toISOString())}
							</div>
						),
						deposit_amount: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{row.amount}
							</div>
						),
						destination: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								<div className={"flex items-center"}>
									<div>{centeredEllipsis(row.address)}</div>
									<div
										onClick={() => handleLink("destination", row.address)}
										className={`ml-2 cursor-pointer`}
									>
										<TransactionLink />
									</div>
									<div
										onClick={() => handleCopy("destination", row.address)}
										className={`ml-2 cursor-pointer`}
									>
										<TransactionCopy />
									</div>
								</div>
							</div>
						),
						tx_id: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								<div className={"flex items-center"}>
									<div>{centeredEllipsis(row.txId)}</div>
									<div
										onClick={() => handleLink("tx_id", row.txId)}
										className={`ml-2 cursor-pointer`}
									>
										<TransactionLink />
									</div>
									<div
										onClick={() => handleCopy("tx_id", row.txId)}
										className={`ml-2 cursor-pointer`}
									>
										<TransactionCopy />
									</div>
								</div>
							</div>
						),
						status: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								<div className={"flex items-center"}>
									<div
										className={`h-2 w-2 rounded-full mr-2 ${
											row.status === 1
												? TransactionStatusVariant.SUCCESSFUL
												: row.status === 2
												? TransactionStatusVariant.FAILED
												: TransactionStatusVariant.PENDING
										}`}
									></div>
									<div>
										{row.status === 1
											? "Successful"
											: row.status === 2
											? "Failed"
											: "Pending"}
									</div>
								</div>
							</div>
						),
					};
			  })
			: [];

	const handleLink = (type: string, link: string): void => {};

	const handleCopy = (type: string, copy: string): void => {};

	return (
		<TransactionLayout
			title={"Rocket Global Transaction"}
			keywords={"Login, Rocket, Transaction, Deposit Crypto, Deposit Fiat"}
			description={""}
		>
			<>
				<div className={"hidden sm:block"}>
					<NavBack
						name={"Back to Deposit"}
						icon={<NavBackIcon />}
						onClick={() => router.back()}
					/>
				</div>
				<div className={"w-full transaction bg-white mt-0 sm:mt-10"}>
					<div className={"w-full py-6 px-8 lg:px-20"}>
						<div className={"mobile-nav-back block sm:hidden"}>
							<NavBack
								name={"Back to Deposit"}
								icon={<NavBackIcon />}
								onClick={() => router.back()}
							/>
						</div>

						<TransactionTable
							cssClass="p-1 xl:p-5 rounded bg-white h-full"
							title={"Deposits History"}
						>
							<div className={"w-full"}>
								<div className={"w-full hidden sm:block"}>
									<Table
										columns={columns}
										dataSource={dataSource}
										showPagination={true}
										showPageSize={true}
										setCurrentPage={(value: number) => setPage(value)}
									/>
								</div>
								<div className={"w-full md:hidden"}>
									<MobileTransactionTable
										dataSource={dataSource}
										pageSize={5}
									/>
								</div>
							</div>
						</TransactionTable>
					</div>
					<Footer rows={footerRowsData} />
				</div>
			</>
		</TransactionLayout>
	);
};
export default DepositHistory;
