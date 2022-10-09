import { CheckMarkGreen } from "./../../assets";
import Button from "./../../components/button";
import { ButtonSize, ButtonState } from "./../../components/button/enum";
import React from "react";

interface MobileBasicFeaturesProps {
	isCompleted: boolean;
	features: Array<{ tag: string; key: string; value: string }>;
	requirements: Array<string>;
	handleClick: Function;
}

export default function MobileBasicFeatures({
	isCompleted,
	features = [],
	requirements = [],
	handleClick,
}: MobileBasicFeaturesProps) {
	return (
		<div data-testid={"rg-mobile-verified-features"}>
			<div className="flex justify-between items-center mt-6 flex-wrap">
				<h1 className="text-neutral-400 font-semibold">Requirements</h1>
				<div>
					{isCompleted && (
						<div className="flex items-center h-9 px-3 rounded-l-full bg-success bg-opacity-20  -mr-4">
							<CheckMarkGreen />
							<div className="ml-2 text-success">Completed</div>
						</div>
					)}
				</div>
			</div>
			<div className="mt-4">
				<p className="text-buttonText text-gray-400 mb-4">Proof of address</p>
			</div>
			<div>
				<div data-testid={"rg-basic-requirements"} className="mt-4">
					{requirements.map((requirement) => (
						<p key={requirement} className="text-labels text-gray-400 mb-4">
							{requirement}
						</p>
					))}
				</div>
				<h1 className="mt-8 mb-5 text-neutral-400 font-semibold">
					Features and Limits
				</h1>
				<div data-testid={"rg-basic-features"}>
					{features.map((item) => {
						return (
							<div key={item.tag}>
								<div className="flex items-center mt-8 mb-5">
									<div className="w-3 h-3 rounded-xl bg-primary-400 mr-2" />
									<h1 className=" text-neutral-400 font-semibold">
										{item.tag}
									</h1>
								</div>
								<div className="flex justify-between mt-4">
									<p className="text-gray-400">{item.key}</p>
									<p className=" text-neutral-400 text-buttonText font-bold">
										{item.value}
									</p>
								</div>
							</div>
						);
					})}
				</div>
				<div className="mt-5">
					{isCompleted ? (
						<div data-testid={"rg-completed-button"}>
							<Button
								style={{ width: "100%" }}
								size={ButtonSize.lg}
								variant={ButtonState.DISABLED}
								value="Completed"
							/>
						</div>
					) : (
						<div data-testid={"rg-not-completed-button"}>
							<Button
								style={{ width: "100%" }}
								size={ButtonSize.lg}
								value="Start Now"
								onClick={handleClick}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
