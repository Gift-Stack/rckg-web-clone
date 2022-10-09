import { AngleBar } from "../../../assets";
import Card from "../../card";
import React, { FC } from "react";
import AssetsButton from "./AssetsButton";
import { AssetsButtonSize, AssetsButtonState } from "./enum";

const SpotTradingAssets: FC = () => {
	const handleClick = (type: string): void => {};
	return (
		<div
			data-testid=" rg-spot-trading-assets"
			className={"w-full hidden sm:block"}
		>
			<Card
				title={"Assets"}
				titleCss={"text-neutral-400 text-sm-regular font-medium"}
				cssClass={"px-2 sm:px-5 py-2 rounded h-full bg-lightGrey"}
			>
				<div
					data-testid="rg-assets-buttons-container"
					className={" spot__trading__btnSection mt-14"}
				>
					<div
						data-testid="rg-assets-buttons"
						className={"flex justify-between"}
					>
						<div className={"w-2/5"}>
							<AssetsButton
								variant={AssetsButtonState.DEFAULT}
								value={"Deposit"}
								size={AssetsButtonSize.xxs}
								type={"button"}
								onClick={() => handleClick("deposit")}
							/>
						</div>
						<div className={"w-2/5"}>
							<AssetsButton
								variant={AssetsButtonState.DEFAULT}
								value={"Withdraw"}
								size={AssetsButtonSize.xxs}
								type={"button"}
								onClick={() => handleClick("withdraw")}
							/>
						</div>
					</div>
					<div className={"mt-14 flex justify-end"}>
						<AngleBar />
					</div>
				</div>
			</Card>
		</div>
	);
};

export default SpotTradingAssets;
