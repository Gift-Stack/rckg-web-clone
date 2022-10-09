import React, { FC, useEffect, useState } from "react";
import { IP2PListingsData, MobileP2PListingProps } from "./model";
import { TransactionStatusVariant } from "../../transaction/enum";
import { formatToCurrency } from "../../../constants";

enum Style {
	TITLE = "text-labels text-gray-deep mb-1",
	BODY = "text-sm-regular font-medium",
}

const MobileP2PListing: FC<MobileP2PListingProps> = ({ data, trade }) => {
	const [dataSet, setDataSet] = useState<IP2PListingsData[]>([]);

	useEffect(() => {
		setDataSet(data);
	}, [data]);
	return (
		<div data-testid="rg-mobile-p2pListing-table">
			{dataSet?.map((row, index) => (
				<div className={"border-b border-neutral-100 pb-10"} key={row.id}>
					<div className="flex justify-between mt-9">
						<div className="flex items-center">
							<div
								className="flex justify-center items-center w-5 h-5 rounded-full coins text-sm-regular bg-deepGreen text-white"
								data-testid={`rg-p2pListing-initial-${index}`}
							>
								<span>{row.advertiser.name[0]}</span>
							</div>

							<div className="ml-1">
								<div
									className={"text-small font-bold leading-5 text-neutral-500"}
								>
									{row.advertiser.name}
								</div>
							</div>
						</div>
						<div className={"text-gray-deep text-labels"}>
							{row.advertiser.orders}
							{" orders "}
							{row.advertiser.completion}
							{"% completion"}
						</div>
					</div>
					<div className={"flex justify-between mt-5 mb-4"}>
						<div>
							<p className={Style.TITLE}>Price</p>
							<p>
								<span
									className={`text-small font-semibold leading-5 text-neutral-500`}
								>
									{formatToCurrency(row.price.amount, 2)}
								</span>{" "}
								<span className="text-labels font-normal text-neutral-400">
									{row.price.currency}
								</span>
							</p>
						</div>
						<div className={""}>
							<p className={Style.TITLE}>Payment</p>
							<p className={`${TransactionStatusVariant[row.payment]}`}>
								{row.payment == "BANK_TRANSFER" && "Bank Transfer"}
							</p>
						</div>
					</div>
					<div>
						<div className={"mt-4"}>
							<p className={Style.TITLE}>Limit/Available</p>
							<div className={"flex justify-between"}>
								<p>
									<span
										className={`text-small font-semibold leading-5 text-neutral-500`}
									>
										{formatToCurrency(row.available.amount, 8)}
									</span>{" "}
									<span className="text-labels font-normal text-neutral-400">
										{row.available.coin}
									</span>
								</p>
								<p>
									<span className="text-neutral-500 text-labels font-medium">
										₦{formatToCurrency(row.available.min, 2)}
										{"-"}₦{formatToCurrency(row.available.max, 2)}
									</span>
								</p>
							</div>
						</div>
					</div>
					<div className="mt-3">
						<button
							data-testid="rg-mobile-p2pListing-table-action-btn"
							onClick={() => trade(row)}
							className={`bg-transparent border border-primary-400 rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
						>
							{row.activity} {row.type}
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default MobileP2PListing;
