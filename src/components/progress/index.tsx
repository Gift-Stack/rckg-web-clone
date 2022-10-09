import React, { FC, useEffect, useState } from "react";
import { ProgressActiveState, ProgressInactiveState } from "./enum";
import { ProgressItem, ProgressProps } from "./model";
import ProgressTitle from "./ProgressTitle";
import ActiveProgress from "./ActiveProgress";

const Progress: FC<ProgressProps> = ({
	items,
	activeIndex,
	active = ProgressActiveState.PRIMARY,
	inactive = ProgressInactiveState.PRIMARY,
}) => {
	const [item, setItem] = useState<ProgressItem>();
	useEffect(() => {
		if (activeIndex < 0) {
			setItem(items[0]);
		} else if (activeIndex > items.length - 1) {
			setItem(items[items.length - 1]);
		} else {
			setItem(items[activeIndex]);
		}
	}, [items, activeIndex]);

	const setProgress = (): ProgressItem[] => {
		const _items: ProgressItem[] = [];
		if (items && items.length > 0) {
			const index =
				activeIndex < 0
					? 0
					: activeIndex > items.length - 1
					? items.length - 1
					: activeIndex;
			for (let i = 0; i <= index; i++) {
				_items.push(items[i]);
			}
		}
		return _items;
	};
	return (
		<div data-testid="rg-progress">
			<div className={"relative pt-1"}>
				{item && (
					<ProgressTitle
						title={item.title}
						activeIndex={
							activeIndex < 0
								? 0
								: activeIndex > items.length - 1
								? items.length - 1
								: activeIndex
						}
						length={items.length}
					/>
				)}
				<div
					className={`overflow-hidden h-1 mb-4 text-xs flex rounded space-x-2 ${inactive}`}
				>
					{setProgress().map((item) => (
						<ActiveProgress
							key={item.id}
							length={items.length}
							state={active}
						/>
					))}
				</div>
			</div>
			{item?.info && (
				<p className={"text-neutral-300 text-sm-regular w-96"}>{item?.info}</p>
			)}
		</div>
	);
};

export default Progress;
