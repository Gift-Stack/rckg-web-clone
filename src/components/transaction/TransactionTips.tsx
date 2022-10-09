import { AlertCircleOutline } from "../../assets";
import { FC } from "react";
import { TransactionTipsProps } from "./model";

const TransactionTips: FC<TransactionTipsProps> = ({ tips }) => {
	return (
		<div
			data-testid={"transaction-tips-container"}
			className={"text-left w-full flex justify-center"}
		>
			<div
				data-testid={"transaction-tips-area"}
				className={
					"bg-gray-faint w-full md:w-4/6 lg:w-3/6 xl:w-2/6 text-neutral-400 text-sm-headline py-2 px-3 xl:py-4 xl:px-6"
				}
			>
				<div
					className={
						"pb-2 flex items-center text-x-small md:text-labels xl:text-sm-regular"
					}
				>
					<span className={"mr-2"}>
						<AlertCircleOutline />
					</span>
					Tips
				</div>
				{tips && tips.length ? (
					tips.map((tip, index) => (
						<div
							data-testid={"transaction-tips"}
							key={tip.id}
							className={
								"text-neutral-400 text-x-small md:text-labels xl:text-sm-regular"
							}
						>
							<span className={"mr-1"}>{index + 1}.</span>
							{tip.tip}
						</div>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default TransactionTips;
