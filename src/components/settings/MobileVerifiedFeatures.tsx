import React from "react";
import { CheckMarkGreen, ErrorRed } from "./../../assets";
import Button from "./../../components/button";
import { ButtonSize, ButtonState } from "./../../components/button/enum";

interface MobileVerifiedFeaturesProps {
	isCompleted: boolean;
	isFailedVerification: boolean;
	requirements: string[];
	features: Array<{
		tag: string;
		key: string;
		value: string;
	}>;
}

export default function MobileVerifiedFeatures({
	isCompleted,
	features = [],
	isFailedVerification,
	requirements,
}: MobileVerifiedFeaturesProps) {
	return (
		<div data-testid={"rg-mobile-verified-features"}>
			<div className="flex justify-between items-center mt-6 flex-wrap">
				<h1 className="text-neutral-400 font-semibold">Requirements</h1>
				<div data-testid={"verification-status"}>
					{isFailedVerification && !isCompleted && (
						<div className="flex items-center h-9 px-3 rounded-l-full bg-error-100 -mr-4">
							<div className="">
								<ErrorRed />
							</div>
							<span className="ml-2 text-error-200">Verification Failed</span>
						</div>
					)}
					{isCompleted && (
						<div className="flex items-center h-9 px-3 rounded-l-full bg-success bg-opacity-20  -mr-4">
							<div className="">
								<CheckMarkGreen />
							</div>
							<span className="ml-2 text-success">Completed</span>
						</div>
					)}
				</div>
			</div>
			<div data-testid={"rg-verified-requirements"} className="mt-4">
				{requirements.map((requirement) => (
					<p key={requirement} className="text-labels text-gray-400 mb-4">
						{requirement}
					</p>
				))}
			</div>
			<div>
				<h1 className="mt-8 mb-5 text-neutral-400 font-semibold">
					Features and Limits
				</h1>
				<div data-testid={"rg-verified-features"}>
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
						<Button
							style={{ width: "100%" }}
							size={ButtonSize.lg}
							variant={ButtonState.DISABLED}
							value="Completed"
							data-testid={"rg-completed-button"}
						/>
					) : (
						<Button
							style={{ width: "100%" }}
							size={ButtonSize.lg}
							variant={ButtonState.DISABLED}
							value="Start Now"
							data-testid={"rg-not-completed-button"}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
