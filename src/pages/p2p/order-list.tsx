import { Play, List, More } from "assets";
import Footer from "components/footer";
import { footerRowsData } from "components/footer/data";
import { P2pLayout } from "components/layout/P2pLayout";
import { ModalTypesEnum } from "components/modals/modalTypes";
import P2pContainer from "components/p2p/P2pContainer";
import { ITableAction, ITableOption } from "components/table/model";
import OrderListTable from "components/table/OrderListTable";
import {
	orderListTableActions,
	orderListTableOptions,
	orders,
} from "components/table/OrderListTable/data";
import MobileOrderListTable from "components/table/OrderListTable/MobileOrderListTable";
import { IOrder } from "components/table/OrderListTable/model";
import OrderListTableContainer from "components/table/OrderListTable/OrderListTableContainer";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "redux/actions";

const OrderList: NextPage = () => {
	const dispatch = useDispatch();
	const [coin, setCoin] = useState<string>();
	const [orderType, setOrderType] = useState<string>();
	const [status, setStatus] = useState<string>();
	const [initialDate, setInitialDate] = useState<string>();
	const [finalDate, setFinalDate] = useState<string>();
	const [tableOptions, setTableOptions] = useState<ITableOption[]>([]);
	useEffect(() => {
		setTableOptions(orderListTableOptions);
	}, []);

	const _setTableActions = (): ITableAction[] => {
		const data: ITableAction[] = orderListTableActions.map((a) => {
			return {
				name: a.name,
				action: (
					<>
						<div className="flex items-center transaction-select-item text-neutral-400">
							<span className={"ml-2"}>
								{a.name === "Watch Tutorial" ? (
									<Play />
								) : a.name === "Orders" ? (
									<List />
								) : (
									<More />
								)}
							</span>
							<span className="font-normal ml-2 block truncate lg:text-labels text-x-small">
								{a.name}
							</span>
						</div>
					</>
				),
			};
		});
		return data;
	};

	const filterTableOptions = (value: string) => {
		const tableOptions_ = tableOptions.map((option) => {
			return {
				name: option.name,
				isActive: option.name === value ? true : false,
			};
		});
		setTableOptions(tableOptions_);
	};

	const handleTableAction = (value: string) => {};

	const handleCopyAddress = (value: string) => {};

	const handleParty = (value: IOrder) => {};

	const handleAction = (type: string, value: IOrder) => {};

	const handleFilter = () => {
		dispatch(
			showModal(ModalTypesEnum.FILTER_P2P_ORDER_LIST, {
				coin: coin,
				setCoin: setCoin,
				orderType: orderType,
				setOrderType: setOrderType,
				status: status,
				setStatus: setStatus,
				initialDate: initialDate,
				setInitialDate: setInitialDate,
				finalDate: finalDate,
				setFinalDate: setFinalDate,
				performFilter: performFilter,
			})
		);
	};

	const performFilter = () => {};

	const handleDownload = () => {};

	return (
		<P2pLayout
			title={"Rocket Global P2P"}
			keywords={"P2P, Order List, Trasactions"}
			description={""}
		>
			<div>
				<P2pContainer>
					<OrderListTableContainer
						cssClass="sm:py-8 sm:px-0 py-5 px-5 rounded bg-white h-full"
						title="Market"
						tableOptions={tableOptions}
						handleOption={(value) => filterTableOptions(value)}
						tableActions={_setTableActions()}
						handleAction={(value) => handleTableAction(value)}
						filter={handleFilter}
						handleDownload={handleDownload}
					>
						<>
							<div className={"sm:block hidden"}>
								<OrderListTable
									allOrders={orders.length ? orders : []}
									handleCopyAddress={(value) => handleCopyAddress(value)}
									handleParty={(value) => handleParty(value)}
									handleAction={(type, value) => handleAction(type, value)}
									setCoin={setCoin}
									setOrderType={setOrderType}
									setStatus={setStatus}
								/>
							</div>
							<div className={"sm:hidden block"}>
								<MobileOrderListTable
									allOrders={orders.length ? orders : []}
									handleCopyAddress={(value) => handleCopyAddress(value)}
									handleParty={(value) => handleParty(value)}
									handleAction={(type, value) => handleAction(type, value)}
								/>
							</div>
						</>
					</OrderListTableContainer>
				</P2pContainer>
				<Footer rows={footerRowsData} />
			</div>
		</P2pLayout>
	);
};
export default OrderList;
