import React from "react";
import Button from "components/button";
import { ButtonState, ButtonSize } from "components/button/enum";

import { CheckmarkCircleOutline, ErrorCircleOutline } from "assets/svg";

export const SecondLargeP2PCard = () => {
	return (
		<div className="w-full min-h-full flex flex-col bg-white rounded p-30">
			<p className="text-gray-deep font-medium mb-18">Requirements</p>
			<div className="flex flex-col gap-3.5">
				<div className="flex items-center gap-5">
					<CheckmarkCircleOutline />
					<div>
						<p className="text-gray-dark font-semibold max-w-340">
							Complete SMS and email authentication
						</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-5">
						<ErrorCircleOutline />
						<div>
							<p className="text-gray-dark font-semibold max-w-340">
								Complete advanced identity verification
							</p>
						</div>
					</div>
					<Button
						variant={ButtonState.OUTLINE}
						size={ButtonSize.xs}
						value="Verify"
						style={{ width: 101 }}
					/>
				</div>
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-5">
						<ErrorCircleOutline />
						<div>
							<p className="text-gray-dark font-semibold max-w-340">
								At least $1000 worth of RCKC must be available on your spot
								account
							</p>
						</div>
					</div>
					<Button
						variant={ButtonState.OUTLINE}
						size={ButtonSize.xs}
						value="Deposit"
						style={{ width: 101 }}
					/>
				</div>
			</div>
		</div>
	);
};
