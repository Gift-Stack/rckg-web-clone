import React, { FC, ReactElement, useState } from "react";
import { MobileTableNavState, MobileTablePageState } from "./enum";
import {
	PagerLeftActive,
	PagerLeftInactive,
	PagerRightActive,
	PagerRightInactive,
} from "../../../assets";
import { MobileTablePaginationProps } from "./model";

const MobileTablePagination: FC<MobileTablePaginationProps> = ({
	pages,
	_setActiveIndex,
}) => {
	const [activeIndex, setActiveIndex] = useState<number>(1);

	const setPage = (): ReactElement[] => {
		const pageComponents: ReactElement[] = [];
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
		for (let i = limit; i <= pages; i++) {
			if (pages > 5 && i === activeIndex + 2 && activeIndex + 2 < pages - 1) {
				i = pages - 2;
				pageComponents.push(
					<span key={"span"} className={MobileTablePageState.DEFAULT}>
						...
					</span>
				);
			} else {
				pageComponents.push(
					<div
						data-testid={"rg-mobile-table-navigation"}
						key={i}
						onClick={() => navigate(i)}
						className={
							activeIndex === i
								? MobileTablePageState.ACTIVE
								: MobileTablePageState.INACTIVE
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
		setActiveIndex(index);
		_setActiveIndex(index);
	};

	return (
		<div
			data-testid={"rg-mobile-table-pagination"}
			className={
				"bg-white p-2 flex items-center justify-center border-t border-gray-200"
			}
		>
			<div className={"flex items-center justify-between"}>
				<div>
					<nav
						className={
							"relative z-0 inline-flex rounded-md shadow-sm space-x-2 lg:space-x-3"
						}
					>
						<div
							data-testid={"rg-mobile-table-pagination-prev"}
							onClick={() => activeIndex !== 1 && navigate(activeIndex - 1)}
							className={
								activeIndex === 1
									? MobileTableNavState.INACTIVE
									: MobileTableNavState.ACTIVE
							}
						>
							{activeIndex === 1 ? <PagerLeftInactive /> : <PagerLeftActive />}
						</div>
						{setPage()}
						<div
							data-testid={"rg-mobile-table-pagination-next"}
							onClick={() => activeIndex !== pages && navigate(activeIndex + 1)}
							className={
								activeIndex === pages
									? MobileTableNavState.INACTIVE
									: MobileTableNavState.ACTIVE
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

export default MobileTablePagination;
