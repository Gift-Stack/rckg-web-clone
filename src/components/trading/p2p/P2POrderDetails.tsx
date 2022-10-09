import {
	CopyGray,
	InfoOutlined,
	P2PDivider,
	P2PMore,
	P2POrder,
	P2PYoutube,
} from "./../../../assets";
import Button from "./../../../components/button";
import React from "react";
import { copyToClipboard } from "./../../../utils";
import ChatSection from "./ChatSection";
import ItemValueCard from "./ItemValueCard";
import P2PTips from "./P2PTips";

interface IProps {
	isCancelled: boolean;
	hasMadePayment: boolean;
	handleCancel: () => void;
	handlePayment: () => void;
}
export default function P2POrderDetails({
	isCancelled,
	hasMadePayment,
	handleCancel,
	handlePayment,
}: IProps) {
	return (
		<div
			data-testid={"rg-order-details-container"}
			className="hidden sm:block p2p-details box-border"
		>
			<div className="mb-6 mt-10 relative">
				<h1 className="text-center text-l-headline font-bold ">Buy BTC</h1>
				<div className="flex gap-6 items-center font-semibold text-labels absolute top-3 right-0">
					<div className="flex items-center gap-2 flex-nowrap cursor-pointer">
						<P2PYoutube />
						<p>Watch Tutorial</p>
					</div>
					<div className="flex items-center gap-2 flex-nowrap cursor-pointer">
						<P2POrder />
						<p>Orders</p>
					</div>
					<div className="flex items-center gap-2 flex-nowrap cursor-pointer">
						<P2PMore />
						<p>More</p>
					</div>
				</div>
			</div>
			<div className="px-5 py-8 bg-white rounded ">
				<div className="flex items-center gap-12 mb-8 flex-wrap">
					<ItemValueCard enableBold item={"Amount"} value={"₦ 2,000.00"} />
					<ItemValueCard
						enableBold
						item={"Price"}
						value={"23,450,000.00 NGN"}
					/>
					<ItemValueCard
						enableBold
						item={"Quantity"}
						value={"0.00123456 BTC"}
					/>
					<ItemValueCard
						enableBold
						item={"Time Created"}
						value={"2021-09-12 14:47:36"}
					/>
					<ItemValueCard
						item={"Order Reference"}
						value={
							<div className="flex items-center gap-2">
								<p>20270366732128591872</p>
								<div
									className="cursor-pointer"
									onClick={() => copyToClipboard("tukuyoma is my name")}
								>
									<CopyGray />
								</div>
							</div>
						}
					/>
				</div>
				<div className="flex justify-between gap-11 md:flex-wrap lg:flex-nowrap">
					<div className="w-full">
						{isCancelled ? (
							<div data-testid={"rg-p2p-cancelled"} className="font-medium">
								<div className="border-x border-neutral-60 shadow-gray-300 p-6 rounded">
									<p className="text-neutral-400  ">
										Payment method can no longer be displayed for this
										particular order.
									</p>
								</div>
								<h3 className="text-black text-md-headline mb-1 mt-7 ">
									Order Cancelled
								</h3>
								<p className="text-gray-deep text-labels">
									If you have any complaint, please contact our customer
									service.
								</p>
							</div>
						) : (
							<div data-testid={"rg-p2p-not-cancelled"} className="">
								<div className="bg-gray-faint p-5 mb-9 rounded text-neutral-400 text-small">
									<div className="flex items-center mb-2.5">
										<InfoOutlined />
										<span className="ml-2.5">Tips</span>
									</div>
									<p className="">
										The following user’s payment info. Please make sure the
										money is transferred from an account you own, which matched
										with your verified name on this platform. Money will not be
										transferred automatically by the platform.
									</p>
								</div>
								<div className="flex border-b-x border-neutral-60 pb-7 gap-20">
									<div>
										<p className="border-l-2 h-auto border-primary-light pl-5">
											Bank Transfer
										</p>
									</div>
									<div className="flex gap-12">
										<ItemValueCard item={"Name"} value={"Jennifer Doe"} />
										<ItemValueCard
											item={"Bank Account Number"}
											value={"0012345678"}
										/>
										<ItemValueCard item={"Bank Name"} value={"Zenith Bank"} />
									</div>
								</div>
								{hasMadePayment ? (
									<div data-testid={"rg-p2p-has-made-payment"}>
										<div className="mt-8">
											<div className="flex items-center text-md-headline font-medium gap-4 mb-1 leading-7">
												<h3 className="font-medium">To be released</h3>
												<h3 className="text-sky-deep">00:11:20</h3>
											</div>
											<p>You will receive the asset in 15mins</p>
										</div>
										<div className="flex mt-5 items-center">
											<button
												onClick={() => alert("handle routing to dispute")}
												className="outline-none text-sky-deep cursor-pointer font-semibold "
											>
												Open dispute
											</button>

											<P2PDivider className="mx-3" />
											<button
												onClick={handleCancel}
												className="outline-none  text-sky-deep cursor-pointer font-semibold"
											>
												Cancel order
											</button>
										</div>
									</div>
								) : (
									<div data-testid={"p2p-has-not-made-payments"}>
										<div className="mt-8">
											<div className="flex items-center text-md-headline font-medium gap-4 mb-1 leading-7">
												<h3 className="font-medium">Payment to be made</h3>
												<h3 className="text-sky-deep">00:11:20</h3>
											</div>
											<p>
												Please make payment within 15:00 mins, otherwise, the
												order will be canceled
											</p>
										</div>
										<div className="flex gap-9 mt-5 items-center">
											<Button
												value="I have made payment"
												data-testid={"rg-p2p-made-payment"}
												onClick={handlePayment}
											/>
											<button
												onClick={handleCancel}
												data-testid={"rg-p2p-cancel-order"}
												className="text-sky-deep outline-none cursor-pointer font-semibold"
											>
												Cancel order
											</button>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
					<div className="chat__section flex-shrink-0">
						<ChatSection />
					</div>
				</div>
			</div>
			<P2PTips />
		</div>
	);
}
