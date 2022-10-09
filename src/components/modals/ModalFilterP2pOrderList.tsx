import React, { useContext } from "react";
import Modal from "./modal";
import Button from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import { modalContext } from "./root";
import TableSelect from "../../components/table/TableSelect";
import TableDateRangePicker from "../../components/table/TableDateRangePicker";

interface Props {}

const ModalFilterP2pOrderList: React.FC<Props> = ({}) => {
	const dispatch = useDispatch();
	const modalData = useContext(modalContext);

	const handleReset = () => {
		modalData.setCoin("");
		modalData.setOrderType("");
		modalData.setStatus("");
		modalData.setInitialDate("");
		modalData.setFinalDate("");
	};

	const performFilter = () => {
		modalData.performFilter();
	};
	return (
		<Modal onClose={() => dispatch(hideModal())}>
			<div
				className="flex flex-col justify-center items-center px-5 pb-8 mt-7"
				data-testid="rg-mobile-p2p-order-list-filter"
			>
				<div className="w-full text-left order-list-table-container filter-select">
					<p className={"font-normal text-headline text-black"}>Filter</p>
					<div className={"mt-5"}>
						<TableSelect
							options={["All Coins", "NGN"]}
							label={"Coins"}
							placeholder={"Select Coin"}
							onChange={(value) => {
								modalData.setCoin(value);
							}}
						/>
					</div>
					<div className={"mt-5"}>
						<TableSelect
							options={["Buy/Sell", "Buy", "Sell"]}
							label={"Order Type"}
							placeholder={"Select Order Type"}
							onChange={(value) => {
								modalData.setOrderType(value);
							}}
						/>
					</div>
					<div className={"mt-5"}>
						<TableSelect
							options={["All Status", "Completed"]}
							label={"Status"}
							placeholder={"Select Status"}
							onChange={(value) => {
								modalData.setStatus(value);
							}}
						/>
					</div>
					<div className={"mt-5"}>
						<TableDateRangePicker
							getInitial={(value) => modalData.setInitialDate(value)}
							getFinal={(value) => modalData.setFinalDate(value)}
						/>
					</div>
					<div className={"mt-8"}>
						<Button
							variant={ButtonState.PRIMARY}
							value={"Search"}
							size={ButtonSize.sm}
							style={{ width: "100%" }}
							onClick={() => {
								performFilter();
								dispatch(hideModal());
							}}
						/>
					</div>
					<div className={"mt-4"}>
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

export default ModalFilterP2pOrderList;
