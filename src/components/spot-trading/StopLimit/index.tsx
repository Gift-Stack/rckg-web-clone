import Button from "../../button";
import { ButtonSize, ButtonState } from "../../button/enum";
import Step from "../../step";
import { StepDotState, StepLineState } from "../../step/enum";
import { useFormik } from "formik";
import React, { FC } from "react";
import { CurrencyEnum } from "../../../types/enum";
import { StopLimitProps } from "../model";
import TradeInput from "../TradeInput";
import { useGuard } from "./../../../hooks/useGuard";
import { useGlobalContext } from "context/global.context";
import { useTradeContext } from "context/trade.context";
import SpotTrading from "..";
import { useRouter } from "next/router";

const StopLimit: FC<StopLimitProps> = ({
	setValues,
	setTradeRate,
	btnState,
}) => {
	const formik = useFormik({
		initialValues: {
			price: "",
			amount1: "",
			amount2: "",
		},
		onSubmit: (values) => {
			setValues(values);
		},
	});

	const onSubmit = () => {};
	const router = useRouter();
	const { spotDetails } = useTradeContext();
	const { baseCoin, quoteCoin } = spotDetails;
	const { authorized, setRedirectAfterLoginUri } = useGlobalContext();

	return (
		<form
			onSubmit={formik.handleSubmit}
			className={"w-full"}
			data-testid="rg-trade-stop-limit"
		>
			<h1>SPOT LIMIT</h1>
			<TradeInput
				label={"Available"}
				availablePrice={0.00012345}
				availablePriceCurrency={CurrencyEnum.BTC}
				convertedPrice={0.00012345}
				convertedPriceCurrency={CurrencyEnum.USDT}
				placeholder={"Price"}
				type={"tel"}
				name={"price"}
				formik={formik}
				onChange={formik.handleChange}
				value={formik.values.price}
				autoComplete="off"
			/>
			<TradeInput
				label={"Amount (BTC)"}
				convertedPriceCurrency={CurrencyEnum.BTC}
				placeholder={"Amount"}
				type={"tel"}
				name={"amount1"}
				formik={formik}
				onChange={formik.handleChange}
				value={formik.values.amount1}
				autoComplete="off"
			/>
			<TradeInput
				label={"Amount (BTC)"}
				convertedPriceCurrency={CurrencyEnum.BTC}
				placeholder={"Amount"}
				type={"tel"}
				name={"amount2"}
				formik={formik}
				onChange={formik.handleChange}
				value={formik.values.amount2}
				autoComplete="off"
			/>
			{/* <div className={"mt-4"}>
				<Step
					stepLength={5}
					stepDotDefaultState={StepDotState.DEFAULT}
					stepDotActiveState={StepDotState.PRIMARY}
					stepLineDefaultState={StepLineState.DEFAULT}
					stepLineActiveState={StepLineState.PRIMARY}
					setStepLengthPercentage={(percentage: number) =>
						setTradeRate(percentage)
					}
				/>
			</div> */}
			<div className={"spot__trading__btnSection mt-14"}>
				{authorized ? (
					<Button
						variant={
							btnState === "BUY" ? ButtonState.SUCCESS : ButtonState.ORANGE
						}
						value={btnState}
						size={ButtonSize.sm}
						type={"submit"}
						onClick={() => onSubmit()}
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
		</form>
	);
};

export default StopLimit;
