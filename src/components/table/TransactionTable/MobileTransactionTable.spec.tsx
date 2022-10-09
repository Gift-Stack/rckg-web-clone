import { render, screen } from "@testing-library/react";
import { CoinEnum } from "../../../types/enum";
import { BnbBtc, BtcBtc, DodgeBtc, EthBtc, LtcBtc } from "../../../assets";
import React from "react";
import MobileTransactionTable from "./MobileTransactionTable";
import { ITableData } from "../model";
import { DataState } from "../enum";
import { formatToCurrency } from "../../../constants";
import { capitalize } from "../../../utils";
import { TransactionStatusVariant } from "../../transaction/enum";
import { transactionTableData } from "../../table/TransactionTable/data";

const dataSource: ITableData[] =
	transactionTableData && transactionTableData.length > 0
		? transactionTableData.map((row) => {
				return {
					key: row.id,
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
					deposit_amount: (
						<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
							{formatToCurrency(row.deposit_amount, 6)}
						</div>
					),
					status: (
						<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
							<div className={"flex items-center"}>
								<div
									className={`h-2 w-2 rounded-full mr-2 ${
										TransactionStatusVariant[row.status]
									}`}
								></div>
								<div>{capitalize(row.status)}</div>
							</div>
						</div>
					),
				};
		  })
		: [];

describe("MobileTransactionTable", () => {
	it("renders properly", async () => {
		render(<MobileTransactionTable dataSource={dataSource} pageSize={5} />);
		const transaction = screen.getByTestId("rg-mobile-transaction-table");
		expect(transaction).toBeInTheDocument();
		expect(transaction.children.length).toBe(7);
	});
});
