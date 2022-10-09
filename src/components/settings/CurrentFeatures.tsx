import { Info } from "./../../assets";
import React from "react";

interface CurrentFeaturesProps {
	isCompleted: boolean;
	features: Array<{ key: string; value: string }>;
}
export default function CurrentFeatures({
	isCompleted,
	features,
}: CurrentFeaturesProps) {
	return (
		<div className="w-80 bg-gray-200 h-screen p-5 lg:mr-8">
			<h3 className="font-bold text-sm-headline ">Current Features</h3>

			{isCompleted ? (
				<div data-testid="rg-current-completed" className="mt-8">
					{features.map((feature) => (
						<div className="mb-4" key={feature.key}>
							<p className="mb-3 text-labels text-neutral-400 font-bold">
								{feature.value}
							</p>
							<p className=" text-labels">{feature.key}</p>
						</div>
					))}
				</div>
			) : (
				<div
					data-testid={"rg-current-not-completed"}
					className="flex items-center flex-col"
				>
					<div className="mt-24 mb-4">
						<Info />
					</div>
					<p className="mt-0.5 text-center text-labels font-bold text-neutral-400 mb-2">
						Your account is currently not verified.
					</p>
					<p className="text-center text-labels text-gray-400 ">
						Complete verification to access services on Rocket Global
					</p>
				</div>
			)}
		</div>
	);
}
