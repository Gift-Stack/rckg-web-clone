import { fireEvent, render, screen } from "@testing-library/react";
import { BnbBtc, BtcBtc, DodgeBtc, EthBtc, LtcBtc } from "../../../assets";
import { CoinPairEnum, FlowEnum } from "../../../types/enum";
import MarketTable from ".";
import Table from "..";
import {
	marketTableData,
	marketTableFilters,
	marketTableOptions,
	marketTableColumns,
} from "../../table/MarketTable/data";
import { DataState } from "../enum";
import { ITableData } from "../model";
import { act } from "react-dom/test-utils";

// const dataSource: ITableData[] =
// 	marketTableData && marketTableData.length > 0
// 		? marketTableData.map((row) => {
// 				return {
// 					key: row.id,
// 					market: (
// 						<div className="flex items-center">
// 							<div className="flex items-center w-10 h-10">
// 								{row.coinPair === CoinPairEnum.DOGE_BTC ? (
// 									<DodgeBtc />
// 								) : CoinPairEnum.LTC_BTC ? (
// 									<LtcBtc />
// 								) : CoinPairEnum.BNB_BTC ? (
// 									<BnbBtc />
// 								) : CoinPairEnum.BTC_BTC ? (
// 									<BtcBtc />
// 								) : (
// 									<EthBtc />
// 								)}
// 							</div>

// 							<div className="ml-4">
// 								<div className={DataState.DEFAULT}>{row.coinPair}</div>
// 							</div>
// 						</div>
// 					),
// 					price: (
// 						<div
// 							className={
// 								row.price.flow === FlowEnum.UP
// 									? DataState.SUCCESS
// 									: DataState.DANGER
// 							}
// 						>
// 							{row.price.amount}{" "}
// 							<span className={"text-neutral-400"}>/ $ {row.price.rate}</span>
// 						</div>
// 					),
// 					change: (
// 						<div
// 							className={
// 								row.change.flow === FlowEnum.UP
// 									? DataState.SUCCESS
// 									: DataState.DANGER
// 							}
// 						>
// 							{row.change.flow === FlowEnum.UP ? "+" : "-"}
// 							{row.change.rate}%
// 						</div>
// 					),
// 					high_low: (
// 						<div className={DataState.DEFAULT}>
// 							{row.highLow.high} / {row.highLow.low}
// 						</div>
// 					),
// 					volume: row.volume,
// 					market_cap: row.marketCap,
// 					option: (
// 						<div className="flex items-center justify-center">
// 							<button
// 								onClick={() =>{}}
// 								className={`bg-neutral-400 rounded text-white font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
// 							>
// 								Trade
// 							</button>
// 						</div>
// 					),
// 				};
// 		  })
// 		: [];

describe("MarketTable", () => {
	it.todo("market table");
	// it("renders properly", async () => {
	// 	const handleFilter = jest.fn();
	// 	const handleOption = jest.fn();
	// 	const handleSearch = jest.fn();
	// 	render(
	// 		<MarketTable
	// 			tableFilters={marketTableFilters}
	// 			tableOptions={marketTableOptions}
	// 			cssClass="p-5 rounded bg-white h-full"
	// 			title="Market"
	// 			handleFilter={(value) => handleFilter(value)}
	// 			handleOption={(value) => handleOption(value)}
	// 			handleSearch={(value) => handleSearch(value)}
	// 		>
	// 			<Table
	// 				columns={marketTableColumns}
	// 				dataSource={dataSource}
	// 				showPagination={true}
	// 				showPageSize={true}
	// 			/>
	// 		</MarketTable>
	// 	);

	// 	const market = screen.getByTestId("rg-market-table");
	// 	const tableContainer = screen.getByTestId("rg-table-container");
	// 	const table = screen.getByTestId("rg-table");
	// 	const tableHead = screen.getByTestId("rg-table-head");
	// 	const tableHeadTr = screen.getByTestId("rg-table-head-tr");
	// 	const tableBody = screen.getByTestId("rg-table-body");

	// 	const tableHeadTh = screen.getAllByTestId("rg-table-head-th");
	// 	const tableBodyTr = screen.getAllByTestId("rg-table-body-tr");

	// 	const pagination = screen.getByTestId("rg-table-pagination");
	// 	const singleNav = screen.getByTestId("rg-table-single-nav");
	// 	const pageSize = screen.getByTestId("rg-table-page-size");

	// 	const filter = screen.getAllByTestId("rg-table-filter");
	// 	const option = screen.getAllByTestId("rg-table-option");
	// 	const search = screen.getByTestId("rg-search-filter-input");
	// 	act(() => {
	// 		fireEvent.click(filter[0]);
	// 		fireEvent.click(option[0]);
	// 		fireEvent.change(search, { target: { value: "Coin" } });
	// 	});

	// 	expect(market).toBeInTheDocument();
	// 	expect(tableContainer).toBeInTheDocument();
	// 	expect(table).toBeInTheDocument();
	// 	expect(tableHead).toBeInTheDocument();
	// 	expect(tableHeadTh.length).toBe(7);
	// 	expect(tableHeadTr).toBeInTheDocument();
	// 	expect(tableBody).toBeInTheDocument();
	// 	expect(tableBodyTr.length).toBe(10);
	// 	expect(pagination).toBeInTheDocument();
	// 	expect(singleNav).toBeInTheDocument();
	// 	expect(pageSize).toBeInTheDocument();
	// 	expect(handleFilter).toHaveBeenCalled();
	// 	expect(handleOption).toHaveBeenCalled();
	// 	expect(handleSearch).toHaveBeenCalled();
	// 	expect(search).toHaveProperty("value", "Coin");
});
