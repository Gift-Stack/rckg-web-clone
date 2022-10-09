import Button from "./../../components/button";
import { ButtonSize } from "./../../components/button/enum";
import React from "react";

interface BasicFeaturesProps {
	isCompleted: boolean;
	features: Array<{ tag?: string; key: string; value: string }>;
	requirements: Array<string>;
	handleClick: Function;
}

export default function BasicFeatures({
	isCompleted,
	requirements,
	features,
	handleClick,
}: BasicFeaturesProps) {
	return (
		<div className="flex-1 p-5 flex-shrink-0">
			<div className="h-64 flex-nowrap flex flex-col justify-between">
				<div>
					<h3 className="font-bold text-sm-headline mb-8">Basic Profile</h3>
					<div
						data-testid={"rg-basic-requirements"}
						className="flex items-start flex-col"
					>
						{requirements.map((requirement) => (
							<p key={requirement} className="text-labels text-gray-400 mb-4">
								{requirement}
							</p>
						))}
					</div>
				</div>
				{!isCompleted && (
					<div data-testid="rg-not-completed-button">
						<Button
							style={{ width: "100%" }}
							size={ButtonSize.lg}
							value="Start Now"
							onClick={handleClick}
						/>
					</div>
				)}
				{isCompleted && (
					<div
						data-testid="rg-completed-button"
						className="w-32 h-10 flex items-center justify-center bg-success bg-opacity-20 rounded-full text-success"
					>
						Completed
					</div>
				)}
			</div>
			<div data-testid={"rg-basic-features"} className="mt-8">
				{features.map((feature) => {
					return (
						<div className="mb-4" key={feature.key}>
							<p className="mb-3 text-labels">{feature.key}</p>
							<p className="text-labels text-neutral-400 font-bold">
								{feature.value}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
