import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Table from ".";
import { ITableData } from "./model";
import { marketTableData, marketTableColumns } from "../table/MarketTable/data";
import { CoinPairEnum, FlowEnum } from "../../types/enum";
import { BnbBtc, BtcBtc, DodgeBtc, EthBtc, LtcBtc } from "../../assets";
import { DataState } from "./enum";

const dataSource: ITableData[] =
	marketTableData && marketTableData.length > 0
		? marketTableData.map((row) => {
				return {
					key: row.id,
					market: (
						<div className="flex items-center">
							<div className="flex items-center w-10 h-10">
								{row.coinPair === CoinPairEnum.DOGE_BTC ? (
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
							</div>

							<div className="ml-4">
								<div className={DataState.DEFAULT}>{row.coinPair}</div>
							</div>
						</div>
					),
					price: (
						<div
							className={
								row.price.flow === FlowEnum.UP
									? DataState.SUCCESS
									: DataState.DANGER
							}
						>
							{row.price.amount}{" "}
							<span className={"text-neutral-400"}>/ $ {row.price.rate}</span>
						</div>
					),
					change: (
						<div
							className={
								row.change.flow === FlowEnum.UP
									? DataState.SUCCESS
									: DataState.DANGER
							}
						>
							{row.change.flow === FlowEnum.UP ? "+" : "-"}
							{row.change.rate}%
						</div>
					),
					high_low: (
						<div className={DataState.DEFAULT}>
							{row.highLow.high} / {row.highLow.low}
						</div>
					),
					volume: row.volume,
					market_cap: row.marketCap,
					option: (
						<div className="flex items-center justify-center">
							<button
								onClick={() => {}}
								className={`bg-neutral-400 rounded text-white font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
							>
								Trade
							</button>
						</div>
					),
				};
		  })
		: [];

describe("Table", () => {
	it("renders properly", async () => {
		render(<Table columns={marketTableColumns} dataSource={dataSource} />);

		const tableContainer = screen.getByTestId("rg-table-container");
		const table = screen.getByTestId("rg-table");
		const tableHead = screen.getByTestId("rg-table-head");
		const tableHeadTr = screen.getByTestId("rg-table-head-tr");
		const tableBody = screen.getByTestId("rg-table-body");

		const tableHeadTh = screen.getAllByTestId("rg-table-head-th");
		const tableBodyTr = screen.getAllByTestId("rg-table-body-tr");

		const sort = screen.getAllByTestId("rg-table-sort");

		act(() => {
			fireEvent.click(sort[0]);
		});

		act(() => {
			fireEvent.click(sort[0]);
		});

		expect(tableContainer).toBeInTheDocument();
		expect(table).toBeInTheDocument();
		expect(tableHead).toBeInTheDocument();
		expect(tableHeadTh.length).toBe(7);
		expect(tableHeadTr).toBeInTheDocument();
		expect(tableBody).toBeInTheDocument();
		expect(tableBodyTr.length).toBe(10);
		expect(sort.length).toBe(7);
	});

	it("renders configured pageSize", async () => {
		render(
			<Table
				pageSize={20}
				columns={marketTableColumns}
				dataSource={dataSource}
			/>
		);
		const tableBodyTr = screen.getAllByTestId("rg-table-body-tr");
		expect(tableBodyTr.length).toBe(20);
	});

	it("renders pagination", async () => {
		render(
			<Table
				showPagination={true}
				columns={marketTableColumns}
				dataSource={dataSource}
			/>
		);
		const pagination = screen.getByTestId("rg-table-pagination");
		const singleNav = screen.getByTestId("rg-table-single-nav");

		expect(pagination).toBeInTheDocument();
		expect(singleNav).toBeInTheDocument();
	});

	it("renders page size", async () => {
		render(
			<Table
				showPagination={true}
				showPageSize={true}
				columns={marketTableColumns}
				dataSource={dataSource}
			/>
		);
		const pageSize = screen.getByTestId("rg-table-page-size");

		expect(pageSize).toBeInTheDocument();
	});
});
