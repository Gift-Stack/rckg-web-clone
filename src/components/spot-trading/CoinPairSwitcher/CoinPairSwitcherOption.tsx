import {
	SwitchCaretUpBlue,
	SwitchCaretUpGray,
	SwitchCaretDownGray,
	SwitchArrowRightGray,
	SwitchLeftwRightGray,
	SearchSmallGray,
	SwitchFavouriteDark,
	CaretDown,
	SwitchCaretDownBlue,
	CloseDark,
} from "assets";

import CustomScrollBar from "components/shared/CustomScrollBar";
import { demicalFormatter } from "../../../constants";
import { useTradeContext } from "context/trade.context";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { TradeAction } from "redux/actions";

interface ITickers {
	description: string;
	pair: string;
	change: number;
	price: number;
}
const CoinPairSwitcherOption: FC<{}> = ({}) => {
	const router = useRouter();
	const [activeFilter, setActiveFilter] = useState<string>("BUSD");
	const [__unFiltered, __setUnFiltered] = useState<ITickers[]>([]);
	const [filter, setFilter] = useState<ITickers[]>([]);
	const { spotDetails } = useTradeContext();

	const [activeSort, setActiveSort] = useState<
		keyof typeof sortFunctions | string
	>("");
	const { symbol } = router.query;
	const parsedSymbol = symbol?.toString().split("_").join("/");

	const handleSwitch = (pair: string): void => {
		router.push(`/trade/${pair.split("/").join("_")}`);
		setShowSelect(false);
	};

	const getSymbolTickers = async () => {
		const res: any[] = await TradeAction.getSymbolTickers();
		const miniTickers: ITickers[] = res
			?.filter((item: any) => item.d.split("/").length > 1 && item)
			.map((item: any) => ({
				pair: item.s,
				description: item.d,
				change: item.pc,
				price: item.p,
			}));
		__setUnFiltered(miniTickers);
		setFilter(
			miniTickers?.filter((item) => item.description.includes(activeFilter))
		);
	};

	const sortFunctions = {
		sortByPriceDesc: (a: ITickers, b: ITickers) => a.price - b.price,
		sortByPriceAsc: (a: ITickers, b: ITickers) => b.price - a.price,
		sortByChangeDesc: (a: ITickers, b: ITickers) => a.change - b.change,
		sortByChangeAsc: (a: ITickers, b: ITickers) => b.change - a.change,
		sortByNameAsc: (a: ITickers, b: ITickers) =>
			a.description.localeCompare(b.description),
		sortByNameDesc: (a: ITickers, b: ITickers) =>
			b.description.localeCompare(a.description),
	};

	useEffect(() => {
		setFilter(
			__unFiltered?.filter((item) => item.description.includes(activeFilter))
		);
	}, [activeFilter, __unFiltered?.length]);

	useEffect(() => {
		// setInterval(() => {
		getSymbolTickers();
		// }, 3000);
	}, []);

	const sortFiltered = (compare: keyof typeof sortFunctions) => {
		const sorted = filter.sort(sortFunctions[compare]);
		setFilter(sorted);
		setActiveSort(compare);
	};

	const [searchText, setSearchText] = useState("");
	const onSearchChange = (e: any) => {
		setSearchText(e.target.value);
		setActiveFilter("");
		setFilter(
			__unFiltered.filter((item) =>
				item.description.toLowerCase().includes(e.target.value.toLowerCase())
			)
		);
	};

	const [showSelect, setShowSelect] = useState(false);

	const _list = [
		{
			name: "BUSD",
			isActive: false,
			sub: [],
		},
		{
			name: "USDT",
		},
		{
			name: "BTC",
		},
		{
			name: "ALTS",
		},
		// {
		// 	name: "FIAT",
		// },
	];
	return (
		<div className="relative group">
			<div
				className="flex items-center gap-3"
				data-testid="rg-cpso"
				onMouseEnter={() => setShowSelect(true)}
				onClick={() => setShowSelect(true)}
				onMouseLeave={() => setShowSelect(false)}
			>
				<div
					className={
						"text-sm-regular sm:text-sm-headline cursor-pointer sm:mr-4 w-full h-full"
					}
				>
					{parsedSymbol}
				</div>
				<div>
					<CaretDown />
				</div>
			</div>
			{showSelect && (
				<div
					onMouseEnter={() => setShowSelect(true)}
					onMouseLeave={() => setShowSelect(false)}
					className="fixed h-3/4 sm:h-fit sm:absolute py-2.5 rounded bottom-0 sm:bottom-0 left-0 sm:top-6 w-screen sm:w-[428px] shadow-gray-200 bg-white z-[3]"
				>
					<div className="flex sm:hidden mx-2.5 py-4 justify-between items-center">
						<h1>Market</h1>
						<div
							className="cursor-pointer"
							onClick={() => setShowSelect(false)}
						>
							<CloseDark />
						</div>
					</div>
					<div className="h-7 mx-2.5 px-2.5 rounded-[2px] p-[6px] flex gap-2 items-center mb-5 bg-gray-800">
						<span className="flex-shrink-0">
							<SearchSmallGray />
						</span>
						<input
							className="outline-none bg-transparent border-0 w-full h-full"
							placeholder="Search"
							value={searchText}
							onChange={onSearchChange}
						/>
					</div>
					<div className="flex items-center px-2.5 gap-3 text-gray-deep">
						{_list.map((l) => (
							<div
								className={`${
									activeFilter === l.name
										? "text-primary-400"
										: "text-gray-deep"
								} text-labels font-semibold cursor-pointer`}
								key={l.name}
								onClick={() => setActiveFilter(l.name)}
							>
								{l.name}
							</div>
						))}
					</div>
					<div className="text-labels">
						<div className="grid grid-cols-3 h-8  px-2.5 items-center">
							<div className="text-left items-center flex font-semibold text-gray-750 text-labels">
								<span className="mr-2">
									<SwitchFavouriteDark />
								</span>
								Pair
								<div className="flex flex-col gap-0.5 ml-1">
									<div
										className="cursor-pointer"
										onClick={() => sortFiltered("sortByNameAsc")}
									>
										{activeSort.includes("sortByNameAsc") ? (
											<SwitchCaretUpBlue />
										) : (
											<SwitchCaretUpGray />
										)}
									</div>
									<div
										className="cursor-pointer"
										onClick={() => sortFiltered("sortByNameDesc")}
									>
										{activeSort.includes("sortByNameDesc") ? (
											<SwitchCaretDownBlue />
										) : (
											<SwitchCaretDownGray />
										)}
									</div>
								</div>
							</div>
							<div className="text-right sm:text-left flex items-center justify-end sm:justify-start  font-semibold text-gray-750 text-labels">
								Last Price
								<div className="flex flex-col gap-0.5 ml-1">
									<div
										className="cursor-pointer"
										onClick={() => sortFiltered("sortByPriceAsc")}
									>
										{activeSort.includes("sortByPriceAsc") ? (
											<SwitchCaretUpBlue />
										) : (
											<SwitchCaretUpGray />
										)}
									</div>
									<div
										className="cursor-pointer"
										onClick={() => sortFiltered("sortByPriceDesc")}
									>
										{activeSort.includes("sortByPriceDesc") ? (
											<SwitchCaretDownBlue />
										) : (
											<SwitchCaretDownGray />
										)}
									</div>
								</div>
							</div>
							<div className="text-right font-semibold justify-end flex items-center text-gray-750 text-labels">
								Change
								<div className="flex flex-col gap-0.5 ml-1">
									<div
										className="cursor-pointer"
										onClick={() => sortFiltered("sortByChangeAsc")}
									>
										{activeSort.includes("sortByChangeAsc") ? (
											<SwitchCaretUpBlue />
										) : (
											<SwitchCaretUpGray />
										)}
									</div>
									<div
										className="cursor-pointer"
										onClick={() => sortFiltered("sortByChangeDesc")}
									>
										{activeSort.includes("sortByChangeDesc") ? (
											<SwitchCaretDownBlue />
										) : (
											<SwitchCaretDownGray />
										)}
									</div>
								</div>
								<div className="flex flex-col gap-0.5 ml-1">
									<SwitchArrowRightGray />
									<SwitchLeftwRightGray />
								</div>
							</div>
						</div>
						<CustomScrollBar height={300}>
							{filter?.map((item) => (
								<div
									onClick={() => handleSwitch(item.description)}
									key={item.pair}
									className="grid h-8 items-center px-2.5 grid-cols-3 cursor-pointer"
								>
									<div className="text-left items-center text-labels flex">
										<span className="mr-2">
											<SwitchFavouriteDark />
										</span>
										<span>{item.description.split("/")[0]}</span>
										<span>/</span>
										<span>{item.description.split("/")[1]}</span>
									</div>
									<div className="text-right sm:text-left  text-labels">
										{demicalFormatter(item.price, 4)}
									</div>
									<div
										className="text-right text-labels"
										style={{
											color: item.change < 0 ? "red" : "green",
										}}
									>
										{demicalFormatter(item.change, 2)}
									</div>
								</div>
							))}
						</CustomScrollBar>
					</div>
				</div>
			)}
		</div>
	);
};
export default CoinPairSwitcherOption;
