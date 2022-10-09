import { fireEvent, render, screen } from "@testing-library/react";
import { CoinPairEnum, FlowEnum } from "../../../types/enum";
import TransactionHistoryTable from ".";
import Table from "..";
import {
	transactionHistoryTableData,
	transactionHistoryTableOptions,
	transactionHistoryTableColumns,
} from "../../table/TransactionHistoryTable/data";
import { ITableData } from "../model";
import { act } from "react-dom/test-utils";

const dataSource: ITableData[] =
	transactionHistoryTableData && transactionHistoryTableData.length > 0
		? transactionHistoryTableData.map((row) => {
				return {
					key: row.id,
					asset: row.asset,
					type: row.type,
					time: row.time,
					amount: row.amount,
					destination: row.destination,
					txID: row.txID,
					status: row.status,
				};
		  })
		: [];

describe("MarketTable", () => {
	it("renders properly", async () => {
		const handleOption = jest.fn();
		render(
			<TransactionHistoryTable
				tableOptions={transactionHistoryTableOptions}
				cssClass="p-5 rounded bg-white h-full"
				title="Transaction History"
				handleOption={(value) => handleOption(value)}
			>
				<Table
					columns={transactionHistoryTableColumns}
					dataSource={dataSource}
					showPagination={true}
					showPageSize={true}
				/>
			</TransactionHistoryTable>
		);

		const transactionHistory = screen.getByTestId(
			"rg-transaction-history-table"
		);
		const tableContainer = screen.getByTestId("rg-table-container");
		const table = screen.getByTestId("rg-table");
		const tableHead = screen.getByTestId("rg-table-head");
		const tableHeadTr = screen.getByTestId("rg-table-head-tr");
		const tableBody = screen.getByTestId("rg-table-body");

		const tableHeadTh = screen.getAllByTestId("rg-table-head-th");
		const tableBodyTr = screen.getAllByTestId("rg-table-body-tr");

		const pagination = screen.getByTestId("rg-table-pagination");
		const singleNav = screen.getByTestId("rg-table-single-nav");
		const pageSize = screen.getByTestId("rg-table-page-size");

		const option = screen.getAllByTestId("rg-table-option");
		act(() => {
			fireEvent.click(option[0]);
		});

		expect(transactionHistory).toBeInTheDocument();
		expect(tableContainer).toBeInTheDocument();
		expect(table).toBeInTheDocument();
		expect(tableHead).toBeInTheDocument();
		expect(tableHeadTh.length).toBe(7);
		expect(tableHeadTr).toBeInTheDocument();
		expect(tableBody).toBeInTheDocument();
		expect(tableBodyTr.length).toBe(10);
		expect(pagination).toBeInTheDocument();
		expect(singleNav).toBeInTheDocument();
		expect(pageSize).toBeInTheDocument();
		expect(handleOption).toHaveBeenCalled();
	});
});
