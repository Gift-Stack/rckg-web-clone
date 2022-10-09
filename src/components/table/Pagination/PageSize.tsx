import React, { FC } from "react";
import { PageSizeProps } from "./model";

const PageSize: FC<PageSizeProps> = ({ start, end, length }) => {
	return (
		<div data-testid="rg-table-page-size">
			<p className={"text-x-small lg:text-labels font-normal text-gray-deep"}>
				Showing
				<span className={"font-medium text-gray-deep px-1"}>{start}</span>
				to
				<span className={"font-medium text-gray-deep px-1"}>{end}</span>
				of
				<span className={"font-medium text-gray-deep px-1"}>{length}</span>
				results
			</p>
		</div>
	);
};

export default PageSize;
