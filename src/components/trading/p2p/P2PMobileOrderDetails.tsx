import { CloseChat, CopyGray, MoreBlue } from "../../../assets/svg";
import Button from "../../../components/button";
import { ModalTypesEnum } from "../../../components/modals/modalTypes";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "../../../redux/actions";
import { copyToClipboard } from "../../../utils";
import ChatSection from "./ChatSection";
import ItemValueCard from "./ItemValueCard";

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
	const [showMore, setShowMore] = useState<boolean>(false);
	const [showChat, setShowChat] = useState<boolean>(false);
	const dispatch = useDispatch();
	return (
		<div
			data-test-id={"container"}
			className="mobile-chat-section block sm:hidden pb-52  box-border"
		>
			<div>
				{showChat ? (
					<div className="px-4 py-6 absolute top-0 bg-white left-0 z-50">
						<div className="w-full flex gap-4 justify-center mb-12">
							<div className="flex w-full flex-nowrap gap-2.5">
								<div className="w-9 flex-shrink-0 font-semibold  bg-headerColor text-white flex justify-center items-center h-9 rounded-full">
									J
								</div>
								<div className="w-full">
									<p className="font-semibold text-sm-headline">
										John doe_exchanger
									</p>
									<p className="font-medium text-labels mt-2">Verified User</p>
									<div className="flex gap-3 w-full mt-4 justify-between">
										<ItemValueCard
											enableBold
											item={"30d Trades"}
											value={"1769"}
										/>
										<ItemValueCard
											enableBold
											item={"30d Completion Rate"}
											value={"80%"}
										/>
									</div>
								</div>
							</div>
							<div
								className="cursor-pointer"
								onClick={() => {
									setShowChat(false);
									setShowMore(false);
								}}
							>
								<CloseChat />
							</div>
						</div>
						<ChatSection />
					</div>
				) : (
					<div>
						<div className="mx-4 my-6">
							<div className="flex justify-between gap-2 items-center mb-1">
								<h2 className="font-semibold text-sm-headline">
									Buy BTC from John Doe
								</h2>
								<div className="relative">
									<div
										className="cursor-pointer "
										onClick={() => setShowMore(!showMore)}
									>
										<MoreBlue />
									</div>
									{showMore && (
										<div
											className="absolute rounded text-neutral-400  z-auto
							bg-white shadow-gray-100 top-6 right-0 w-40 font-semibold text-buttonText"
										>
											<p
												onClick={() => setShowChat(true)}
												className="px-5 py-2.5 border-b-x border-gray-300"
											>
												Chat
											</p>
											<p className="px-5 py-2.5 border-b-x border-gray-300">
												Orders
											</p>
											<p className="px-5 py-2.5 border-b-x border-gray-300">
												Watch Tutorial
											</p>
											<p className="px-5 py-2.5">Payment Settings</p>
										</div>
									)}
								</div>
							</div>
							<p>The order is created, please wait for confirmation</p>
							<div className="flex gap-1 mt-2.5 items-center">
								<div className="w-5  bg-primary-600 text-sm-headline font-semibold text-white  h-5 flex items-center justify-center">
									0
								</div>
								<div className="w-5   bg-primary-600 text-sm-headline font-semibold text-white h-5 flex items-center justify-center">
									1
								</div>
								<div className="text-sm-headline font-semibold ">:</div>
								<div className="w-5 bg-primary-600 text-sm-headline font-semibold text-white  h-5 flex items-center justify-center">
									2
								</div>
								<div className="w-5 bg-primary-600 text-sm-headline font-semibold text-white  h-5 flex items-center justify-center">
									2
								</div>
							</div>
						</div>
						<div className="mx-4 my-6 px-5 py-8 bg-white rounded ">
							<div className="flex flex-col items-start gap-2.5 mb-7 flex-wrap">
								<ItemValueCard
									isMobile
									enableBold
									item={"Amount"}
									value={"₦ 2,000.00"}
								/>
								<ItemValueCard
									enableBold
									item={"Price"}
									value={"23,450,000.00 NGN"}
									isMobile
								/>
								<ItemValueCard
									enableBold
									item={"Quantity"}
									value={"0.00123456 BTC"}
									isMobile
								/>
								<div className="flex w-full flex-col py-7 my-7 border-t-x border-b-x gap-2.5 border-gray-50">
									<ItemValueCard
										item={"Order Reference"}
										isMobile
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
									<ItemValueCard
										enableBold
										item={"Time Created"}
										value={"2021-09-12 14:47:36"}
										isMobile
									/>
								</div>
							</div>
							<div className="flex flex-col gap-3 mb-7 pb-7 border-b-x border-gray-50">
								<p className="text-buttonText font-semibold">
									Transfer the funds to he seller’s account provided below.
								</p>
								<p className="border-l-x h-auto border-primary-light pl-5">
									Bank Transfer
								</p>
								<ItemValueCard item={"Name"} value={"Jennifer Doe"} />
								<ItemValueCard
									item={"Bank Account Number"}
									value={"0012345678"}
								/>
								<ItemValueCard item={"Bank Name"} value={"Zenith Bank"} />
							</div>
							<p className="text-buttonText font-semibold mb-5">
								Please make payment within 15:00 mins, otherwise, the order will
								be canceled
							</p>
							<div className="">
								<Button
									value="I have made payment"
									onClick={() =>
										dispatch(showModal(ModalTypesEnum.CONFIRM_P2P_PAYMENT))
									}
								/>
								<p className="text-sky-deep cursor-pointer mt-4 font-semibold">
									Cancel order
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
