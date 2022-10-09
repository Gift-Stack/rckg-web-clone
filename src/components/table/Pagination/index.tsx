import React, { FC, ReactElement, useState } from "react";
import { NavState, PageState } from "./enum";
import {
	PagerLeftActive,
	PagerLeftInactive,
	PagerRightActive,
	PagerRightInactive,
} from "../../../assets";
import PageSize from "./PageSize";
import { PaginationProps } from "./model";
import SingleNav from "./SingleNav";

const Pagination: FC<PaginationProps> = ({
	pages,
	pageSize,
	rowsLength,
	_activeIndex = 1,
	_setActiveIndex,
	showPageSize,
	expand,
	handleExpand,
}) => {
	const [activeIndex, setActiveIndex] = useState<number>(_activeIndex);

	const setPage = (): ReactElement[] => {
		let limit = 0;
		if (pages > 5) {
			if (activeIndex <= pages - 4) {
				limit = activeIndex;
			} else {
				limit = pages - 4;
			}
		} else {
			limit = 1;
		}
		const pageComponents: ReactElement[] = [];
		for (let i = limit; i <= pages; i++) {
			if (
				pages > 5 &&
				i === activeIndex + 2 &&
				activeIndex + 2 < pages - 1 &&
				!expand
			) {
				i = pages - 2;
				pageComponents.push(
					<span
						onClick={() => handleExpand(true)}
						key={"span"}
						className={PageState.DEFAULT}
					>
						...
					</span>
				);
			} else {
				pageComponents.push(
					<div
						data-testid={"rg-table-navigation"}
						key={i}
						onClick={() => navigate(i)}
						className={
							activeIndex === i ? PageState.ACTIVE : PageState.INACTIVE
						}
					>
						{i}
					</div>
				);
			}
		}
		return pageComponents;
	};

	const navigate = (index: number): void => {
		handleExpand(false);
		setActiveIndex(index);
		_setActiveIndex(index);
	};

	return (
		<div
			data-testid="rg-table-pagination"
			className={
				"bg-white px-2 py-3 flex items-center justify-between border-t border-gray-200 sm:px-4"
			}
		>
			<SingleNav
				next={() => activeIndex !== pages && navigate(activeIndex + 1)}
				prev={() => activeIndex !== 1 && navigate(activeIndex - 1)}
			/>
			<div
				className={
					"hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
				}
			>
				{showPageSize ? (
					<PageSize
						start={(activeIndex - 1) * pageSize + 1}
						end={
							activeIndex * pageSize < rowsLength
								? activeIndex * pageSize
								: (activeIndex - 1) * pageSize +
								  (rowsLength - (activeIndex - 1) * pageSize)
						}
						length={rowsLength}
					/>
				) : (
					<div></div>
				)}
				<div>
					<nav
						className={
							"relative z-0 inline-flex rounded-md shadow-sm space-x-2 lg:space-x-3 cursor-pointer"
						}
					>
						<div
							data-testid={"rg-table-pagination-prev"}
							onClick={() => activeIndex !== 1 && navigate(activeIndex - 1)}
							className={
								activeIndex === 1 ? NavState.INACTIVE : NavState.ACTIVE
							}
						>
							{activeIndex === 1 ? <PagerLeftInactive /> : <PagerLeftActive />}
						</div>
						{setPage()}
						<div
							data-testid={"rg-table-pagination-next"}
							onClick={() => activeIndex !== pages && navigate(activeIndex + 1)}
							className={
								activeIndex === pages ? NavState.INACTIVE : NavState.ACTIVE
							}
						>
							{activeIndex === pages ? (
								<PagerRightInactive />
							) : (
								<PagerRightActive />
							)}
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
