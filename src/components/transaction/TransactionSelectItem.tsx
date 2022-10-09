import { CheckIconBlue } from "../../assets";
import { FC } from "react";
import { TransactionSelectItemProps } from "./model";
import { InputCancel } from "./../../assets";

const TransactionSelectItem: FC<TransactionSelectItemProps> = ({
	items,
	handleSelected,
	itemCss,
	showSearch = false,
	handleSearch,
	searchText,
	searchPlaceholder,
}) => {
	return (
		<div className="relative">
			{showSearch && (
				<div className="absolute w-full md:w-4/6 lg:w-3/6 xl:w-2/6 mx-auto left-0 right-0 z-10 ">
					<div className="bg-primary-100 flex items-center h-12 px-4 rounded mt-1">
						<input
							className="placeholder-neutral-200 flex-1 outline-none bg-transparent z-20"
							placeholder={searchPlaceholder ?? "Search"}
							name="search-input"
							onChange={(e) => {
								e.preventDefault();
								handleSearch!(e);
							}}
							value={searchText}
						/>
						<div className="cursor-pointer" onClick={() => handleSearch!()}>
							<InputCancel />
						</div>
					</div>
				</div>
			)}
			<ul
				data-testid={"transaction-select-item"}
				className={`absolute ${
					!showSearch ? "mt-1" : "mt-2"
				} w-full md:w-4/6 lg:w-3/6 xl:w-2/6 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-labels md:text-sm-headline mr-auto ml-auto left-0 right-0 z-10 ${
					showSearch && "top-12"
				} ${itemCss}`}
			>
				{items && items.length ? (
					items.map((item) => (
						<li
							data-testid={"transaction-select-item-list"}
							onClick={() => handleSelected(item.id)}
							key={item.id}
							className={`text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 ${
								item.selected && "bg-gray-faint"
							}`}
						>
							{item.item}
							{item.selected && (
								<span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
									<CheckIconBlue />
								</span>
							)}
						</li>
					))
				) : (
					<></>
				)}
			</ul>
		</div>
	);
};

export default TransactionSelectItem;
