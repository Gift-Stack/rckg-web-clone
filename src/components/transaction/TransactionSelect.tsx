import { ChevronDown } from "../../assets";
import { FC, useEffect, useState } from "react";
import { ITransactionSelectItem, TransactionSelectProps } from "./model";
import TransactionSelectItem from "./TransactionSelectItem";

const TransactionSelect: FC<TransactionSelectProps> = ({
	selectItems,
	label,
	placeholder,
	toggle,
	setToggle,
	selectedItem,
	rootCss,
	labelRootCss,
	labelChildCss,
	buttonRootCss,
	itemCss,
	showSearch,
	handleSearch,
	searchText,
	searchPlaceholder,
}) => {
	const [items, setItems] = useState<ITransactionSelectItem[]>([]);
	const [selected, setSelected] = useState<any>(null);

	useEffect(() => {
		setItems(selectItems);
	}, [selectItems]);

	const handleToggle = (): void => {
		setToggle(toggle);
	};

	const handleSelected = (id: number) => {
		const items_ = items.map((item) => {
			return {
				...item,
				selected: item.id === id ? true : false,
			};
		});
		setItems(items_);
		const selected: any = items.find((item) => item.id === id)?.item;
		setSelected(selected);
		selectedItem(id);
	};

	return (
		<div
			data-testid={"transaction-select"}
			className={`mt-1 relative w-full text-center transaction-select ${rootCss}`}
		>
			<div className={`text-left w-full flex justify-center ${labelRootCss}`}>
				<div
					className={`w-full md:w-4/6 lg:w-3/6 xl:w-2/6 text-neutral-400 text-labels md:text-sm-headline py-2 ${labelChildCss}`}
				>
					{label}
				</div>
			</div>
			<button
				data-testid={"transaction-select-button"}
				onClick={handleToggle}
				type="button"
				className={`relative w-full md:w-4/6 lg:w-3/6 xl:w-2/6 bg-gray-faint rounded-md shadow-sm pl-3 pr-10 py-2 text-left text-labels md:text-sm-headline ${buttonRootCss}`}
			>
				{selected ? (
					<>{selected}</>
				) : (
					<div className="flex items-center">
						<span className="block truncate text-gray-drop text-labels md:text-sm-headline py-1">
							{placeholder}
						</span>
					</div>
				)}
				<span className="ml-3 absolute inset-y-0 right-2 flex items-center pr-2 pointer-events-none">
					<ChevronDown />
				</span>
			</button>
			{toggle && (
				<TransactionSelectItem
					items={items}
					handleSelected={(id) => handleSelected(id)}
					itemCss={itemCss}
					showSearch={showSearch}
					handleSearch={handleSearch}
					searchText={searchText}
					searchPlaceholder={searchPlaceholder}
				/>
			)}
		</div>
	);
};

export default TransactionSelect;
