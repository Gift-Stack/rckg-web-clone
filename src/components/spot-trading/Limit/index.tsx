import Button from "../../button";
import { ButtonSize, ButtonState } from "../../button/enum";
import Step from "../../step";
import { StepDotState, StepLineState } from "../../step/enum";
import React, { FC } from "react";
import { CurrencyEnum } from "../../../types/enum";
import { LimitProps } from "../model";
import TradeInput from "../TradeInput";
import { useDispatch } from "react-redux";
import InputError from "../../../components/formError/InputError";
import { useRouter } from "next/router";
import { withProvider } from "../../../hoc/withProvider";
import { useTradeContext } from "context/trade.context";
import { useGlobalContext } from "context/global.context";
import { useSpotTrade } from "../../../hooks/trading/useSpotTrade";

const Limit: FC<LimitProps | any> = ({ btnState }) => {
	const {
		submitTrade,
		quantity,
		total,
		setPercent,
		availableBalance,
		error,
		loading,
		handleSetQuantity,
		handleSetTotal,
		price,
		setPrice,
		decimalFilter,
		baseStepSize,
		quoteStepSize,
		percentIndexCalc,
		calcTotalFromPercentage,
	} = useSpotTrade(btnState as "BUY" | "SELL", "LIMIT");

	const { spotDetails } = useTradeContext();
	const { setRedirectAfterLoginUri, authorized } = useGlobalContext();
	const { quoteCoin, baseCoin } = spotDetails;
	const { wallet } = useGlobalContext();
	const router = useRouter();

	return (
		<div className={"w-full"} data-testid="rg-trade-limit">
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
				availablePrice={wallet[quoteCoin]?.free}
				availablePriceCurrency={quoteCoin}
				convertedPrice={price}
				convertedPriceCurrency={quoteCoin}
				placeholder={"Price"}
				type={"number"}
				name={"price"}
				onChange={(e: any) => setPrice(e.target.value)}
				value={Number(`${price}`.replace(/,/g, "")) || ""}
			/>
			<TradeInput
				label={`Quantity (${baseCoin})`}
				convertedPriceCurrency={CurrencyEnum.BTC}
				placeholder={"Quantity"}
				type={"number"}
				name={"quantity"}
				onChange={(e: any) => handleSetQuantity(e)}
				onKeyPress={(e: any) => decimalFilter(e, baseStepSize)}
				value={quantity}
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
				value={total}
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
						calcTotalFromPercentage(percentage);
					}}
				/>
			</div> */}

			<div className={"spot__trading__btnSection mt-14"}>
				{authorized ? (
					<Button
						variant={
							btnState === "BUY" ? ButtonState.SUCCESS : ButtonState.ORANGE
						}
						value={loading ? "Loading ..." : `${btnState} ${baseCoin}`}
						size={ButtonSize.sm}
						type={"submit"}
						onClick={() => submitTrade()}
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

export default withProvider(Limit);
