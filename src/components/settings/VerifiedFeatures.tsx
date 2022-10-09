import React from "react";
import { ErrorRed } from "./../../assets";
import Button from "./../../components/button";
import { ButtonSize, ButtonState } from "./../../components/button/enum";

interface VerifiedFeaturesProps {
	requirements: string[];
	isCompleted: boolean;
	shouldStart: boolean;
	features: Array<{ key: string; value: string }>;
}

export default function VerifiedFeatures({
	requirements,
	isCompleted,
	shouldStart,
	features,
}: VerifiedFeaturesProps) {
	const isError = false;
	return (
		<div className="flex-1 p-5">
			<div className="h-64 flex-nowrap flex flex-col justify-between">
				<div>
					<h3 className="font-bold text-sm-headline mb-8">Verified Plus</h3>
					<div
						data-testid={"rg-verified-requirements"}
						className="flex items-start flex-col"
					>
						{requirements.map((item) => (
							<p key={item} className="text-labels text-gray-400 mb-4">
								{item}
							</p>
						))}
					</div>
				</div>
				<div>
					{isError && (
						<div className="flex items-center flex-nowrap mb-4">
							<ErrorRed />
							<span className="text-error-200 ml-3">Verification Failed</span>
						</div>
					)}
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
							variant={
								!shouldStart ? ButtonState.DISABLED : ButtonState.PRIMARY
							}
							value="Start Now"
							data-testid={"rg-not-completed-button"}
						/>
					)}
				</div>
			</div>
			<div data-testid={"rg-verified-features"} className="mt-8">
				{features.map((feature) => (
					<div className="mb-4" key={feature.key}>
						<p className="mb-3 text-labels">{feature.key}</p>
						<p className="text-labels text-neutral-400 font-bold">
							{feature.value}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
