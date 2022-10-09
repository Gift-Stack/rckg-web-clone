import Button from "../../button";
import { ButtonSize, ButtonState } from "../../button/enum";
import Step from "../../step";
import { StepDotState, StepLineState } from "../../step/enum";
import React, { FC, useState } from "react";
import { CurrencyEnum } from "../../../types/enum";
import { MarketProps } from "../model";
import TradeInput from "../TradeInput";
import { useRouter } from "next/router";
import InputError from "../../../components/formError/InputError";
import { withProvider } from "../../../hoc/withProvider";
import { useTradeContext } from "context/trade.context";
import { useGlobalContext } from "context/global.context";
import { useSpotTrade } from "../../../hooks/trading/useSpotTrade";

const Market: FC<MarketProps> = ({ btnState }) => {
	const {
		submitTrade,
		quantity,
		total,
		setPercent,
		percentIndexCalc,
		availableBalance,
		error,
		loading,
		handleSetQuantity,
		handleSetTotal,
		decimalFilter,
		baseStepSize,
		quoteStepSize,
	} = useSpotTrade(btnState as "BUY" | "SELL", "MARKET");

	const { spotDetails } = useTradeContext();
	const { setRedirectAfterLoginUri, authorized } = useGlobalContext();

	const { quoteCoin, baseCoin } = spotDetails;
	const { wallet } = useGlobalContext();
	const router = useRouter();

	return (
		<div className={"w-full"} data-testid="rg-trade-market">
			<div className={"text-labels flex justify-between w-full px-1 pb-1 mb-4"}>
				<small className={"text-gray-700"}>Available</small>
				<small className={"text-neutral-400"}>
					{btnState === "BUY"
						? wallet[quoteCoin]?.free || 0
						: wallet[baseCoin]?.free || 0}{" "}
					{btnState === "BUY" ? quoteCoin : baseCoin}
				</small>
			</div>
			<TradeInput
				label={`Price (${quoteCoin})`}
				availablePrice={availableBalance}
				availablePriceCurrency={btnState === "BUY" ? quoteCoin : baseCoin}
				convertedPriceCurrency={btnState === "BUY" ? quoteCoin : baseCoin}
				placeholder={"MARKET"}
				type={"number"}
				name={"price"}
				value={"MARKET"}
				disabled
			/>
			<TradeInput
				label={`Quantity (${baseCoin})`}
				convertedPriceCurrency={CurrencyEnum.BTC}
				placeholder={"Quantity"}
				type={"number"}
				name={"quantity"}
				onChange={(e: any) => handleSetQuantity(e)}
				value={quantity}
				onKeyPress={(e: any) => decimalFilter(e, baseStepSize)}
				id="qtyId"
			/>
			<TradeInput
				label={`Total (${quoteCoin})`}
				convertedPriceCurrency={CurrencyEnum.BTC}
				placeholder={"Total"}
				type={"number"}
				name={"total"}
				onChange={(e: any) => handleSetTotal(e)}
				onKeyPress={(e: any) => decimalFilter(e, quoteStepSize)}
				vaonKeyPress={(e: any) => decimalFilter(e, quoteStepSize)}
				lue={total}
				id={"totalId"}
			/>

			<InputError error={error} />
			{/* <div className={"mt-4"}>
				<Step
					stepLength={5}
					stepDotDefaultState={StepDotState.DEFAULT}
					stepDotActiveState={StepDotState.PRIMARY}
					stepLineDefaultState={StepLineState.DEFAULT}
					stepLineActiveState={StepLineState.PRIMARY}
					index={percentIndexCalc()}
					setStepLengthPercentage={(percentage: number) => {
						setPercent(percentage);
					}}
				/>
			</div> */}

			<div className={"spot__trading__btnSection mt-14"}>
				{authorized ? (
					<Button
						variant={
							btnState === "BUY" ? ButtonState.SUCCESS : ButtonState.ORANGE
						}
						size={ButtonSize.sm}
						type={"submit"}
						onClick={() => submitTrade()}
						value={loading ? "Loading ..." : `${btnState} ${baseCoin}`}
						disabled={loading}
					/>
				) : (
					<Button
						variant={
							btnState === "BUY" ? ButtonState.SUCCESS : ButtonState.ORANGE
						}
						value={"Login to Trade"}
						size={ButtonSize.sm}
						type={"submit"}
						onClick={() => {
							setRedirectAfterLoginUri(
								`/trade/${
									quoteCoin && baseCoin
										? `${baseCoin}_${quoteCoin}`
										: "BTC_USDT"
								}`
							);

							router.push("/");
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default withProvider(Market);
