import { storageService } from "services";
import { SwapPayload } from "components/crypto/model";
import SwapCrypto from "components/crypto/swap-crypto/SwapCrypto";
import TransactionContainer from "components/crypto/TransactionContainer";
import Header from "components/dashboard/TopNav";
import { CryptoSwapLayout } from "components/layout/CryptoSwapLayout";
import SectionHeader from "components/shared/SectionHeader";
import { NextPage } from "next";
import Table from "components/table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataState } from "components/table/enum";
import { formatToCurrency, getDateTimeFormatUK } from "../constants";
import { transactionHistoryTableConvertColumns } from "components/table/TransactionHistoryTable/data";
import { TransactionStatusVariant } from "components/transaction/enum";
import {
	getCoinsAsync,
	getCryptoSwapFeeAsync,
	getSwapListAsync,
	getVariousAssetsBalanceAsync,
	swapCyptoAsync,
	getCryptoSwapHistoryAsync,
} from "redux/actions";
import { RootState } from "redux/store";
import * as types from "../redux/types";
import { ITableColumn, ITableData } from "components/table/model";
import TransactionTable from "components/table/TransactionTable";
import MobileTransactionTable from "components/table/TransactionTable/MobileTransactionTable";

const CryptoSwap: NextPage = () => {
	const authData = storageService.getAuthData();
	const [payload, setPayload] = useState<SwapPayload>();
	const [fromSelectToggle, setFromSelectToggle] = useState<boolean>(false);
	const [toSelectToggle, setToSelectToggle] = useState<boolean>(false);
	const dispatch = useDispatch();
	const {
		allCoins,
		variousAssetsBalance,
		swapList,
		cyptoSwapFee,
		cryptoSwap,
		cryptoSwapHistory,
	} = useSelector((state: RootState) => state.transactions);

	const [_allCoins, _setAllCoins] = useState([]);
	const [columns, setColumns] = useState<ITableColumn[]>([]);

	useEffect(() => {
		dispatch(getCoinsAsync());
		dispatch(getVariousAssetsBalanceAsync());
		if (authData.access_token && authData.uid)
			dispatch(getCryptoSwapHistoryAsync({}));
		setColumns(transactionHistoryTableConvertColumns);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch({ type: types.GET_CRYPTO_SWAP_FEE.SUCCESS, payload: null });
		if (payload) dispatch(getCryptoSwapFeeAsync(payload));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [payload]);

	useEffect(() => {
		dispatch(getVariousAssetsBalanceAsync());
		dispatch({ type: types.GET_CRYPTO_SWAP_FEE.SUCCESS, payload: null });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cryptoSwap]);

	const getSwapList = (coin: string) => {
		dispatch({ type: types.GET_CRYPTO_SWAP_FEE.SUCCESS, payload: null });
		dispatch(getSwapListAsync({ coin }));
	};

	const performSwap = () => {
		payload && dispatch(swapCyptoAsync(payload));
	};

	const closePopup = () => {
		fromSelectToggle && setFromSelectToggle(false);
		toSelectToggle && setToSelectToggle(false);
	};

	useEffect(() => {
		_setAllCoins(allCoins);
	}, [allCoins]);

	const dataSource: ITableData[] =
		cryptoSwapHistory && cryptoSwapHistory.length > 0
			? cryptoSwapHistory.map((row: any) => {
					return {
						key: row.swapId,
						date: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{getDateTimeFormatUK(row.swapTime)}
							</div>
						),
						pair: (
							<div className="flex items-center pt-2 xl:pt-5">
								{/* <div className="flex items-center w-10 h-10 coins">
																		{row.pair === CoinPairEnum.DOGE_BTC ? (
																				<DodgeBtc />
																		) : CoinPairEnum.LTC_BTC ? (
																				<LtcBtc />
																		) : CoinPairEnum.BNB_BTC ? (
																				<BnbBtc />
																		) : CoinPairEnum.BTC_BTC ? (
																				<BtcBtc />
																		) : (
																				<EthBtc />
																		)}
																</div> */}

								<div className="">
									<div className={DataState.DEFAULT}>
										{row.quoteAsset}
										{row.baseAsset}
									</div>
								</div>
							</div>
						),
						type: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{row.type ? row.type : "market"}
							</div>
						),
						from: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{formatToCurrency(row.quoteQty, 6)} {row.quoteAsset}
							</div>
						),
						to: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{formatToCurrency(row.baseQty, 6)} {row.baseAsset}
							</div>
						),
						price: (
							<div
								className={`pt-2 xl:pt-5 grid grid-rows-1 ${DataState.DEFAULT}`}
							>
								<div>{`1 ${row.quoteAsset} = ${formatToCurrency(
									1 / row.price,
									6
								)} ${row.baseAsset}`}</div>
								<div>{`1 ${row.baseAsset} = ${formatToCurrency(row.price, 6)} ${
									row.quoteAsset
								}`}</div>
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

	return (
		<CryptoSwapLayout>
			<div className="bg-primary-100 h-screen">
				<Header />
				<SectionHeader
					title="Crypto Swap"
					description="Swap Bitcoin, BNB, with other Cryptocurrencies conveniently"
					mobileTitle={"Swap"}
				/>
				<TransactionContainer onClick={closePopup}>
					<SwapCrypto
						allCoins={_allCoins}
						variousAssetsBalance={variousAssetsBalance}
						getSwapList={(coin) => getSwapList(coin)}
						swapList={swapList}
						setPayload={setPayload}
						cyptoSwapFee={cyptoSwapFee}
						performSwap={performSwap}
						cryptoSwap={cryptoSwap}
						fromSelectToggle={fromSelectToggle}
						setFromSelectToggle={(bool) => setFromSelectToggle(!bool)}
						toSelectToggle={toSelectToggle}
						setToSelectToggle={(bool) => setToSelectToggle(!bool)}
					/>
				</TransactionContainer>
				{authData.access_token && authData.uid ? (
					<div className={"w-full py-6 px-8 lg:px-20 bg-primary-100"}>
						<TransactionTable
							cssClass="p-1 xl:p-5 rounded bg-white h-full"
							title={"Recent Transactions"}
						>
							<div className={"w-full"}>
								<div className={"w-full hidden sm:block"}>
									<Table
										columns={columns}
										dataSource={dataSource}
										showPagination={true}
										showPageSize={true}
										// setCurrentPage={(value: number) => setPage(value)}
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
				) : (
					""
				)}
			</div>
		</CryptoSwapLayout>
	);
};
export default CryptoSwap;
