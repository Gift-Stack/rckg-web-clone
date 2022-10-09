import React from "react";
import { NG } from "assets/svg";

export const FirstLargeP2PCard = () => {
	return (
		<div className="w-full min-h-full flex flex-col bg-white rounded p-30">
			<div className="flex items-center gap-2.5 text-neutral-500 font-semibold mb-18">
				<div className="h-21 w-21 flex items-center justify-center rounded-full bg-deepGreen text-white">
					P
				</div>
				<p>E***e</p>
			</div>
			<div className="flex flex-col sm:flex-row justify-between">
				<div className="w-full sm:w-2/5">
					<p className="font-medium text-gray-deep font-sm-headline mb-13">
						Country/region
					</p>
					<div className="flex items-center gap-4">
						<NG />
						<p className="font-medium font-sm-headline">Nigeria</p>
					</div>
				</div>
				<div className="w-full sm:w-3/5">
					<p className="font-medium text-gray-deep font-sm-headline mb-13">
						Available currency
					</p>
					<p className="font-medium font-sm-headline">
						USD NGN ZAR KES GHS UGX XOF RWF TZS EUR GBP
					</p>
				</div>
			</div>
		</div>
	);
};
