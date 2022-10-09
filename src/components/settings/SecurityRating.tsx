import React, { FC } from "react";

interface SecurityRatingProps {
	rating: "WEAK" | "AVERAGE" | "STRONG";
}

export default function SecurityRating({ rating }: SecurityRatingProps) {
	return (
		<div className="flex flex-nowrap items-center mb-4 lg:mb-12 border-b border-primary-100  pb-7 lg:border-0">
			<p className="text-primary-900 text-labels whitespace-nowrap">
				Current Strength:
			</p>
			<p
				data-testid={"rating-text"}
				className={`rounded-xl ml-3 mr-2 px-2 font-bold py-0.5 text-xs ${
					rating === "WEAK" && "bg-error-100 text-error-200"
				}  ${
					rating === "AVERAGE" && "bg-warning bg-opacity-30 text-warning"
				}  ${rating === "STRONG" && "bg-success bg-opacity-30 text-success"}`}
			>
				{rating}
			</p>
			<div
				data-testid={"rating-tab"}
				className="flex gap-2  flex-wrap items-center"
			>
				<div
					className={`w-6 h-1 bg-gray-300 rounded-lg ${
						rating === "WEAK" && "bg-error-200"
					} ${rating === "AVERAGE" && "bg-warning"} ${
						rating === "STRONG" && "bg-success"
					}`}
				/>
				<div
					className={`w-6 h-1 bg-gray-300 rounded-lg ${
						rating === "WEAK" && "bg-error-200"
					} ${rating === "AVERAGE" && "bg-warning"} ${
						rating === "STRONG" && "bg-success"
					}`}
				/>
				<div
					className={`w-6 h-1 rounded-lg bg-gray-300 ${
						rating === "AVERAGE" && "bg-warning"
					} ${rating === "STRONG" && "bg-success"}`}
				/>
				<div
					className={`w-6 h-1 ${
						rating === "STRONG" ? "bg-success" : "bg-gray-300"
					}  rounded-lg`}
				/>
				<div
					className={`w-6 h-1 ${
						rating === "STRONG" ? "bg-success" : "bg-gray-300"
					}  rounded-lg`}
				/>
			</div>
		</div>
	);
}
