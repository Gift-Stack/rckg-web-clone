import React, { useContext } from "react";
import Modal from "./modal";
import Button from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import { modalContext } from "./root";

interface Props {}

const ModalWalletTransactionHistoryFilter: React.FC<Props> = ({}) => {
	const dispatch = useDispatch();
	const modalData = useContext(modalContext);

	const handleReset = () => {
		// modalData.setTypeKey("");
		modalData.setTimeKey("");
		modalData.setAssetKey("");
		modalData.setStatusKey("");
		modalData.setTxIDKey("");
	};
	return (
		<Modal onClose={() => dispatch(hideModal())}>
			<div
				className="flex flex-col justify-center items-center px-5 pb-8 mt-7"
				data-testid="rg-mobile-transaction-history-table-filter"
			>
				<div className="w-full text-left">
					<p className={"font-normal text-headline text-black"}>Filter</p>
					<div className={"mt-5"}>
						<span className={"font-normal text-gray-deep leading-4 text-small"}>
							Type
						</span>
						<div className="sm:grid border border-neutral-150 rounded relative text-gray-600 w-full">
							<select
								defaultValue={modalData.typeKey}
								className="py-3 text-labels w-full rounded-md pl-3 focus:outline-none bg-white text-gray-900"
								onChange={(e: React.FormEvent<HTMLSelectElement>) =>
									modalData.setTypeKey(e.currentTarget.value)
								}
							>
								{/* <option value="">All</option> */}
								<option value="deposit">Deposit</option>
								<option value="withdrawal">Withdrawal</option>
							</select>
						</div>
					</div>
					<div className={"mt-5"}>
						<span className={"font-normal text-gray-deep leading-4 text-small"}>
							Time
						</span>
						<div className="sm:grid border border-neutral-150 rounded relative text-gray-600 w-full">
							<select
								defaultValue={modalData.timeKey}
								className="py-3 text-labels w-full rounded-md pl-3 focus:outline-none bg-white text-gray-900"
								onChange={(e: React.FormEvent<HTMLSelectElement>) =>
									modalData.setTimeKey(e.currentTarget.value)
								}
							>
								<option value="">All</option>
								<option value="day">a Day</option>
								<option value="week">a Week</option>
								<option value="month">a Month</option>
							</select>
						</div>
					</div>
					<div className={"mt-5"}>
						<span className={"font-normal text-gray-deep leading-4 text-small"}>
							Asset
						</span>
						<div className="sm:grid border border-neutral-150 rounded relative text-gray-600 w-full">
							<select
								defaultValue={modalData.assetKey}
								className="py-3 text-labels w-full rounded-md pl-3 focus:outline-none bg-white text-gray-900"
								onChange={(e: React.FormEvent<HTMLSelectElement>) =>
									modalData.setAssetKey(e.currentTarget.value)
								}
							>
								<option value="">All</option>
								<option value="DOGE">DOGE</option>
								<option value="LTC">LTC</option>
								<option value="BNB">BNB</option>
								<option value="BTC">BTC</option>
							</select>
						</div>
					</div>
					<div className={"mt-5"}>
						<span className={"font-normal text-gray-deep leading-4 text-small"}>
							Status
						</span>
						<div className="sm:grid border border-neutral-150 rounded relative text-gray-600 w-full">
							<select
								defaultValue={modalData.statusKey}
								className="py-3 text-labels w-full rounded-md pl-3 focus:outline-none bg-white text-gray-900"
								onChange={(e: React.FormEvent<HTMLSelectElement>) =>
									modalData.setStatusKey(e.currentTarget.value)
								}
							>
								<option value="">All</option>
								<option value="1">Successful</option>
								<option value="2">Failed</option>
								<option value="0">Pending</option>
							</select>
						</div>
					</div>
					<div className={"mt-5"}>
						<span className={"font-normal text-gray-deep leading-4 text-small"}>
							TxID
						</span>
						<div className="sm:grid border border-neutral-150 rounded relative text-gray-600 w-full">
							<input
								type="text"
								className="py-3 text-labels w-full rounded-md pl-3 focus:outline-none bg-white text-gray-900"
								placeholder={"Enter TxID"}
								autoComplete="off"
								defaultValue={modalData.txIDKey}
								onChange={(e: React.FormEvent<HTMLInputElement>) =>
									modalData.setTxIDKey(e.currentTarget.value)
								}
							/>
						</div>
					</div>
					<div className={"mt-8"}>
						<Button
							variant={ButtonState.TERTIARY}
							value={"Reset"}
							size={ButtonSize.sm}
							style={{ width: "100%" }}
							onClick={() => {
								handleReset();
								dispatch(hideModal());
							}}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ModalWalletTransactionHistoryFilter;
