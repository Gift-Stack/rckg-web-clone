import React from "react";

const Stepper = () => {
	return (
		<div className="w-full" data-testid={"rocket-stepper"}>
			<div className="py-5 pr-12">
				<div className="mr-14 pr-12 py-4">
					<div className="flex items-center">
						<div className="flex items-center text-purple-500 relative">
							<div
								className="
									absolute
									top-0
									-ml-0
									text-center
									-mt-10
									w-32
									font-semibold
									font-sm-headline
									text-neutral-500
								"
							>
								Set Type & Price
							</div>
							<div className="rounded-full transition duration-500 ease-in-out h-21 w-21 border-2 border-primary-400 bg-primary-400 text-white text-center font-md-regular">
								<p className="-mt-1">1</p>
							</div>
						</div>
						<div
							className="
								flex-auto
								border-t-2
								transition
								duration-500
								ease-in-out
								border-gray-300
							"
						></div>
						<div className="flex items-center text-gray-500 relative">
							<div
								className="
									rounded-full
									transition
									duration-500
									ease-in-out
									h-21
									w-21
									border-2 border-gray-300 bg-gray-300 text-white text-center font-md-regular
								"
							>
								<p className="-mt-1">2</p>
							</div>
							<div
								className="
									absolute
									top-0
									-ml-32
									text-center
									-mt-10
									w-72
									font-semibold
									font-sm-headline
									text-neutral-500
								"
							>
								Set Total Amount & Payment Method
							</div>
						</div>
						<div
							className="
								flex-auto
								border-t-2
								transition
								duration-500
								ease-in-out
								border-gray-300
							"
						></div>
						<div className="flex items-center text-gray-500 relative">
							<div
								className="
									rounded-full
									transition
									duration-500
									ease-in-out
									h-21
									w-21
									border-2 border-gray-300 bg-gray-300 text-white text-center font-md-regular
								"
							>
								<p className="-mt-1">3</p>
							</div>
							<div
								className="
									absolute
									top-0
									-ml-32
									text-center
									-mt-10
									w-72
									font-semibold
									font-sm-headline
									text-neutral-500
								"
							>
								Set Remarks & Automatic Response
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Stepper;
