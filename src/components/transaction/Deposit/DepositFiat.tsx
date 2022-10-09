import { FC } from "react";
import { TransactionTabState } from "../enum";
import TransactionSelect from "../TransactionSelect";
import TransactionTab from "../TransactionTab";
import TransactionRadio from "../TransactionRadio";
import { DepositFiatProps } from "./model";

const DepositFiat: FC<DepositFiatProps> = ({
	currencySelectToggle,
	setCurrencySelectToggle,
	currencySelectData,
	currencySelectLabel,
	currencySelectPlaceholder,
	networkSelectToggle,
	setNetworkSelectToggle,
	networkSelectData,
	networkSelectLabel,
	networkSelectPlaceholder,
	transactionTabs,
	handleTransactionTabs,
	selectedItem,
	currency,
	paymentTypes,
	handlePaymentType,
}) => {
	const onTab = (value: string) => {
		handleTransactionTabs && handleTransactionTabs(value);
	};

	return (
		<div data-testid={"transaction-deposit-fiat"}>
			<div className={"mt-2"}>
				<TransactionSelect
					toggle={currencySelectToggle}
					setToggle={(bool) => setCurrencySelectToggle(bool)}
					selectItems={currencySelectData}
					label={currencySelectLabel}
					placeholder={currencySelectPlaceholder}
					selectedItem={(index: number) =>
						selectedItem(index, currencySelectLabel)
					}
				/>
			</div>

			<div className={"mt-5"}>
				<TransactionSelect
					toggle={networkSelectToggle}
					setToggle={(bool) => setNetworkSelectToggle(bool)}
					selectItems={networkSelectData}
					label={networkSelectLabel}
					placeholder={networkSelectPlaceholder}
					selectedItem={(index: number) =>
						selectedItem(index, networkSelectLabel)
					}
				/>
			</div>

			<div className={"mt-5"}>
				<div className={"text-left w-full flex justify-center"}>
					<div
						className={
							"w-full md:w-4/6 lg:w-3/6 xl:w-2/6 text-neutral-400 text-labels md:text-sm-headline py-2"
						}
					>
						Pay with
					</div>
				</div>
				<div className={"text-left w-full flex justify-center"}>
					<div
						className={
							"w-full md:w-4/6 lg:w-3/6 xl:w-2/6 text-neutral-400 font-medium text-sm-regular md:text-sm-headline"
						}
					>
						{transactionTabs && transactionTabs?.length && (
							<div className="items-center flex mb-5">
								<div className="flex flex-wrap">
									{transactionTabs.map((tab) => (
										<TransactionTab
											key={Math.random()}
											variant={
												tab.isActive
													? TransactionTabState.PRIMARY
													: TransactionTabState.SECONDARY
											}
											value={tab.name}
											type={"button"}
											tabClick={() => onTab(tab.name)}
										/>
									))}
								</div>
							</div>
						)}
						<div
							data-testid={"transaction-deposit-fiat-radio"}
							className="mt-2 text-neutral-400 font-normal text-sm-regular"
						>
							{paymentTypes && paymentTypes.length ? (
								paymentTypes.map((type) => (
									<TransactionRadio
										key={type.id}
										currency={currency}
										name={"paymentType"}
										value={type.name}
										paymentType={type.payment}
										paymentTypeEnum={type.name}
										onChange={(value: string) => handlePaymentType(value)}
									/>
								))
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DepositFiat;
