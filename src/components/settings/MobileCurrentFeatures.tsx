import Button from "./../../components/button";
import { ButtonSize } from "./../../components/button/enum";
import React, { useEffect } from "react";
import { CloseDark } from "./../../assets";

interface MobileCurrentFeaturesProps {
	setShowCurrent: (value: boolean) => void;
	showCurrent: boolean;
	features: Array<{ key: string; value: string }>;
}

export default function MobileCurrentFeatures({
	setShowCurrent,
	showCurrent,
	features,
}: MobileCurrentFeaturesProps) {
	useEffect(() => {
		if (showCurrent) {
			document.body.style.overflow = "hidden";
			window.scrollTo(0, 0);
		} else {
			document.body.style.overflow = "unset";
		}
	}, [showCurrent]);
	return (
		<>
			{showCurrent && (
				<div>
					<div className="fixed top-0 left-0 h-screen w-screen bg-black opacity-30 z-20 "></div>
					<div className="settings__current-features absolute -bottom-0.5 left-0 w-full bg-white opacity-100 z-50 rounded-t-xl">
						<div className="flex justify-between items-center px-8 py-6  border-b border-primary-100">
							<p className="font-bold text-neutral-400">Profile Verification</p>
							<div
								data-testid="rg-current-icon-button"
								onClick={() => setShowCurrent(false)}
							>
								<CloseDark />
							</div>
						</div>
						<div className="mt-5 px-8 ">
							{features.map((feature) => (
								<div className="mb-4" key={feature.key}>
									<p className="mb-3 text-labels text-neutral-400 font-bold">
										{feature.value}
									</p>
									<p className=" text-labels">{feature.key}</p>
								</div>
							))}
							<div data-testid="rg-current-close-button" className="my-9">
								<Button
									onClick={() => setShowCurrent(false)}
									style={{ width: "100%" }}
									size={ButtonSize.lg}
									value="Ok"
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
