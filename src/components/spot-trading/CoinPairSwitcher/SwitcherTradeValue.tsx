import { formatToCurrency } from "../../../constants";
import React, { FC } from "react";
import { RateState, ValueState } from "./enum";
import { SwitcherTradeValueProps } from "./model";

const SwitcherTradeValue: FC<SwitcherTradeValueProps> = ({
	rate,
	value,
	valueChange,
	rateState = RateState.DEFAULT,
	valueState = ValueState.DEFAULT,
}) => {
	return (
		<div data-testid="rg-switcher-trade-value">
			<p className={`${rateState} `}>{rate}</p>
			<p className={`${valueState}  text`}>
				{formatToCurrency(value, 2)} {valueChange && valueChange}
			</p>
		</div>
	);
};

export default SwitcherTradeValue;
