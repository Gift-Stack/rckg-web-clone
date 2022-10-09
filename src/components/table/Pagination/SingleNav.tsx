import React, { FC } from "react";
import { SingleNavProps } from "./model";

const SingleNav: FC<SingleNavProps> = ({ next, prev }) => {
	return (
		<div
			data-testid="rg-table-single-nav"
			className={"flex-1 flex justify-between sm:hidden"}
		>
			<div
				data-testid="rg-table-single-nav-prev"
				onClick={prev}
				className={
					"relative inline-flex items-center px-4 py-2 border border-gray-300 text-x-small font-normal rounded-md text-gray-700 bg-white hover:bg-gray-50"
				}
			>
				Prev
			</div>
			<div
				data-testid="rg-table-single-nav-next"
				onClick={next}
				className={
					"ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-x-small font-normal rounded-md text-gray-700 bg-white hover:bg-gray-50"
				}
			>
				Next
			</div>
		</div>
	);
};

export default SingleNav;
