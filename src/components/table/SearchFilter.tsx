import React, { FC } from "react";
import { Search } from "../../assets";
import { SearchFilterProps } from "./model";

const SearchFilter: FC<SearchFilterProps> = ({
	placeholder,
	handleSearch,
	cssClass,
}) => {
	return (
		<div
			data-testid="rg-search-filter"
			className={`${cssClass} sm:grid border border-neutral-150 rounded relative text-gray-600 w-full md:w-2/5 xl:w-1/5`}
		>
			<span className="absolute inset-y-0 left-0 flex items-center pl-2">
				<div className="p-1">
					<Search />
				</div>
			</span>
			<input
				data-testid="rg-search-filter-input"
				type="text"
				name="q"
				className="py-3 text-labels w-full rounded-md pl-10 focus:outline-none bg-white text-gray-900"
				placeholder={placeholder}
				autoComplete="off"
				onChange={(e: React.FormEvent<HTMLInputElement>) =>
					handleSearch(e.currentTarget.value)
				}
			/>
		</div>
	);
};

export default SearchFilter;
