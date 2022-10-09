import { fireEvent, render, screen } from "@testing-library/react";
import P2PListingTable from ".";
import Table from "..";
import { p2pListingData, P2PListingOptions, p2pListingColumns } from "./data";
import { DataState } from "../enum";
import { ITableData } from "../model";
import { act } from "react-dom/test-utils";

const dataSource: ITableData[] =
	p2pListingData && p2pListingData.length > 0
		? p2pListingData.map((row) => {
				return {
					key: row.id,
					advertiser: (
						<div className="flex">
							<div className="flex justify-center items-center w-5 h-5 rounded-full coins text-sm-regular bg-deepGreen text-white">
								{row.advertiser.name[0]}
							</div>

							<div className="ml-1.5">
								<div
									className={
										"text-sm-headline font-semibold leading-5 text-neutral-500"
									}
								>
									{row.advertiser.name}
								</div>
								<div className={"text-gray-deep text-labels"}>
									{row.advertiser.orders}
									{" orders "}
									{row.advertiser.completion}
									{"% completion"}
								</div>
							</div>
						</div>
					),
					price: (
						<div className={``}>
							<span
								className={`text-sm-headline font-bold leading-5 text-neutral-500`}
							>
								{row.price.amount}
							</span>{" "}
							<span className="text-labels font-normal text-neutral-400">
								{row.price.currency}
							</span>
						</div>
					),
					available: (
						<div className={`grid grid-rows-1`}>
							<div className="text-sm-headline font-medium leading-5 text-neutral-500">
								{row.available.amount} {row.available.coin}
							</div>
							<div className="text-gray-deep text-labels">
								₦{row.available.min}
								{"-"}₦{row.available.max}
							</div>
						</div>
					),
					payment: (
						<div className={`${DataState.DEFAULT}`}>
							<div className={"flex items-center"}>
								<div>{row.payment == "BANK_TRANSFER" && "Bank Transfer"}</div>
							</div>
						</div>
					),
					trade: (
						<button
							onClick={() => {}}
							className={`bg-transparent border border-primary-400 rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
						>
							{row.activity} {row.type}
						</button>
					),
				};
		  })
		: [];

describe("P2PListingTable", () => {
	it("renders properly", async () => {
		const handleOption = jest.fn();
		render(
			<P2PListingTable
				tableOptions={P2PListingOptions}
				cssClass="p-5 rounded bg-white h-full"
				title="P2P Listing Table"
				handleOption={(value) => handleOption(value)}
			>
				<Table
					columns={p2pListingColumns}
					dataSource={dataSource}
					showPagination={true}
					showPageSize={true}
				/>
			</P2PListingTable>
		);

		const P2PListing = screen.getByTestId("rg-P2P-Listing-table");
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

		expect(P2PListing).toBeInTheDocument();
		expect(tableContainer).toBeInTheDocument();
		expect(table).toBeInTheDocument();
		expect(tableHead).toBeInTheDocument();
		expect(tableHeadTh.length).toBe(5);
		expect(tableHeadTr).toBeInTheDocument();
		expect(tableBody).toBeInTheDocument();
		expect(tableBodyTr.length).toBe(5);
		expect(pagination).toBeInTheDocument();
		expect(singleNav).toBeInTheDocument();
		expect(pageSize).toBeInTheDocument();
		expect(handleOption).toHaveBeenCalled();

		fireEvent.click(screen.getByTestId("rg-show-options"));
		let options = await screen.getAllByTestId("rg-select-options");
		expect(options.length).toBe(5);
	});
});
