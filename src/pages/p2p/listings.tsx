import Footer from "components/footer";
import { footerRowsData } from "components/footer/data";
import { Layout } from "components/layout/Layout";
import Header from "components/dashboard/TopNav";
import SectionHeader from "components/shared/SectionHeader";
import P2PListingTable from "components/table/P2PListings";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";

import {
	P2PListingOptions,
	p2pListingColumns,
	p2pListingData,
} from "../../components/table/P2PListings/data";
import Table from "../../components/table";
import { IP2PListingsData } from "components/table/P2PListings/model";
import { DataState } from "../../components/table/enum";
import { formatToCurrency } from "../../constants";
import { TransactionStatusVariant } from "../../components/transaction/enum";
import {
	ITableColumn,
	ITableData,
	ITableOption,
} from "../../components/table/model";
import P2PFAQ from "components/p2p/faq";
import { FAQData } from "components/p2p/faq/data";
import MobileP2PListing from "components/table/P2PListings/MobileP2PListing";

const P2PListings: NextPage = () => {
	const [tableOptions, setTableOptions] = useState<ITableOption[]>([]);
	const [columns, setColumns] = useState<ITableColumn[]>([]);
	const [showSell, setShowSell] = useState<boolean>(false);
	let filteredP2PListingsBuyData = p2pListingData?.filter((data: any) =>
		data.activity.toLowerCase().includes("Buy".toLocaleLowerCase())
	);
	let filteredP2PListingsSellData = p2pListingData?.filter((data: any) =>
		data.activity.toLowerCase().includes("Sell".toLocaleLowerCase())
	);
	useEffect(() => {
		setTableOptions(P2PListingOptions);
		setColumns(p2pListingColumns);
	}, []);

	const handleTrade = (row: IP2PListingsData): void => {
		return;
	};

	const filterTableOptions = (value: string) => {
		const tableOptions_ = tableOptions.map((option) => {
			return {
				name: option.name,
				isActive: option.name === value ? true : false,
			};
		});
		setTableOptions(tableOptions_);
		setShowSell(!showSell);
	};

	const buyDataSource: ITableData[] =
		filteredP2PListingsBuyData && filteredP2PListingsBuyData.length > 0
			? filteredP2PListingsBuyData.map((row) => {
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
									{formatToCurrency(row.price.amount, 2)}
								</span>{" "}
								<span className="text-labels font-normal text-neutral-400">
									{row.price.currency}
								</span>
							</div>
						),
						available: (
							<div className={`grid grid-rows-1`}>
								<div className="text-sm-headline font-medium leading-5 text-neutral-500">
									{formatToCurrency(row.available.amount, 8)}{" "}
									{row.available.coin}
								</div>
								<div className="text-gray-deep text-labels">
									₦{formatToCurrency(row.available.min, 2)}
									{"-"}₦{formatToCurrency(row.available.max, 2)}
								</div>
							</div>
						),
						payment: (
							<div className={`${DataState.DEFAULT}`}>
								<div className={"flex items-center"}>
									<div className={`${TransactionStatusVariant[row.payment]}`}>
										{row.payment == "BANK_TRANSFER" && "Bank Transfer"}
									</div>
								</div>
							</div>
						),
						trade: (
							<button
								onClick={() => handleTrade(row)}
								className={`bg-transparent border border-primary-400 rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
							>
								{row.activity} {row.type}
							</button>
						),
					};
			  })
			: [];
	const sellDataSource: ITableData[] =
		filteredP2PListingsSellData && filteredP2PListingsSellData.length > 0
			? filteredP2PListingsSellData.map((row) => {
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
									{formatToCurrency(row.price.amount, 2)}
								</span>{" "}
								<span className="text-labels font-normal text-neutral-400">
									{row.price.currency}
								</span>
							</div>
						),
						available: (
							<div className={`grid grid-rows-1`}>
								<div className="text-sm-headline font-medium leading-5 text-neutral-500">
									{formatToCurrency(row.available.amount, 8)}{" "}
									{row.available.coin}
								</div>
								<div className="text-gray-deep text-labels">
									₦{formatToCurrency(row.available.min, 2)}
									{"-"}₦{formatToCurrency(row.available.max, 2)}
								</div>
							</div>
						),
						payment: (
							<div className={`${DataState.DEFAULT}`}>
								<div className={"flex items-center"}>
									<div className={`${TransactionStatusVariant[row.payment]}`}>
										{row.payment == "BANK_TRANSFER" && "Bank Transfer"}
									</div>
								</div>
							</div>
						),
						trade: (
							<button
								onClick={() => handleTrade(row)}
								className={`bg-transparent border border-primary-400 rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
							>
								{row.activity} {row.type}
							</button>
						),
					};
			  })
			: [];
	return (
		<Layout
			title={"Rocket Global P2P"}
			keywords={"Login, Rocket, Market, Trade, Top Gainer, Top Looser"}
			description={""}
		>
			<>
				<div className={"bg-primary-100 w-full"}>
					<Header wSection={true} />
					<SectionHeader
						title="P2P Trading"
						description="Peer-to-peer exchange (or P2P exchange) is a marketplace where people can trade crypto directly with each other on their own terms, in virtually any country."
						mobileTitle={"P2P Trading"}
						wSection={true}
					/>
					<div className="text-l-headline py-40 text-center font-semibold">
						<p>Coming soon...</p>
					</div>
					{/* <div className={"w-full sm:py-10 py-6 px-8 lg:px-20"}>
						<P2PListingTable
							tableOptions={tableOptions}
							cssClass="p-5 rounded bg-white h-full"
							handleOption={(value) => {filterTableOptions(value)}}
						>
							<div className={"w-full"}>
								<div className={"md:grid-cols-5 gap-4 mt-6 hidden md:grid"}>
									
								</div>
								<div className={"w-full hidden sm:block"}>
									<Table
										columns={columns}
										dataSource={showSell ? sellDataSource : buyDataSource}
										showPagination={true}
										showPageSize={true}
									/>
								</div>
								<div className={"w-full md:hidden"}>
									<MobileP2PListing 
										trade={(value: IP2PListingsData) => handleTrade(value)}
										data={showSell ? filteredP2PListingsSellData : filteredP2PListingsBuyData}
									/>
								</div>
							</div>
						</P2PListingTable>
						<P2PFAQ FAQS={FAQData}/>
					</div> */}
					<Footer rows={footerRowsData} />
				</div>
			</>
		</Layout>
	);
};
export default P2PListings;
