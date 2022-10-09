/* eslint-disable @next/next/no-img-element */
import useWindowSize from "./../../hooks/useWindowSize";
import React, { useEffect, useState } from "react";
import { CaretDown, InputCancel } from "./../../assets";
import { CryptoT } from "types/crypto-txn.type";
import { ICryptoSwapFeeData } from "redux/reducers/transactions.reducer";

interface CryptoSelectInputProps {
	onChange: (value: number) => void;
	searchChange: (crypto: CryptoT) => void;
	title: "From" | "To" | string;
	cryptoList: Array<CryptoT>;
	crypto: CryptoT;
	showAvailableCrypto?: boolean;
	showMaxButton?: boolean;
	setHasCryptoInputError: (value: boolean) => void;
	cyptoSwapFee?: ICryptoSwapFeeData;
	toggle: boolean;
	setToggle: (bool: boolean) => void;
}

export default function CryptoSelectInput({
	title,
	onChange,
	crypto,
	cryptoList,
	searchChange,
	showAvailableCrypto,
	showMaxButton,
	setHasCryptoInputError,
	cyptoSwapFee,
	toggle,
	setToggle,
}: CryptoSelectInputProps) {
	const { width } = useWindowSize();
	const [inputError, setInputError] = useState("");
	const [searchText, setSearchText] = useState("");

	const [filteredCrypto, setFilteredCrypo] = useState<Array<CryptoT>>([]);

	useEffect(() => {
		setFilteredCrypo(cryptoList);
		//eslint-disable-next-line
	}, [cryptoList]);

	const handleToggle = (): void => {
		setToggle(toggle);
	};

	const { maxValue, minValue, availableBalance, value, name, image } = crypto;

	const handleChange = (e: any) => {
		const _value = e.target.value;
		setInputError("");
		setHasCryptoInputError(false);
		const regex = /^((\d+\.?|\.(?=\d))?\d{0,9})$/;
		if (regex.test(_value)) {
			const _formattedValue = parseFloat(_value);
			if (_formattedValue > crypto.maxValue) {
				setInputError(
					`Maximum allowable amount is ${crypto.maxValue} ${crypto.name}`
				);
				setHasCryptoInputError(true);
				return;
			}
			if (_formattedValue < crypto.minValue) {
				setInputError(
					`Minimum allowable amount is ${crypto.minValue} ${crypto.name}`
				);
				setHasCryptoInputError(true);
				onChange(0);
				return;
			}
			onChange(_value);
		} else if (_value && _value.toString().split(".")[1]?.length > 9) {
			setHasCryptoInputError(true);
			onChange(0);
			return;
		} else {
			setInputError("Crypo values must be numbers");
			setHasCryptoInputError(true);
			return;
		}
	};

	const handleSetMaxValue = () => {
		if (maxValue) {
			onChange(parseFloat(maxValue.toString()));
		}
	};

	const handleSearch = (e?: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e?.target.value ?? "");
		const searchKey = e?.target.value;
		if (searchKey) {
			const _filteredCrypto = filteredCrypto.filter((crypto) =>
				crypto.name.toLowerCase().includes(searchKey.toLocaleLowerCase())
			);
			setFilteredCrypo(_filteredCrypto);
		} else {
			setFilteredCrypo(cryptoList);
			setSearchText("");
		}
	};

	const preventClose = (e: any) => {
		e.stopPropagation();
	};

	return (
		<div
			data-testid={"crypto-select-input"}
			className="crypto-input-select crypto-input-wrapper relative  "
		>
			<h3
				data-testid={"crypto-select-input-title"}
				className="text-neutral-400 font-semibold mb-3 "
			>
				{title}
			</h3>
			<div className="h-12 px-4 bg-white sm:bg-gray-200 rounded flex items-center nowrap">
				<input
					className="placeholder-gray-400 font w-full outline-none bg-transparent flex-1"
					placeholder={
						title === "From"
							? (width as number) > 678 && value === 0
								? `Please enter ${minValue} - ${maxValue}`
								: (width as number) < 678 && value === 0
								? `${minValue} - ${maxValue}`
								: ""
							: ""
					}
					onChange={handleChange}
					value={
						title === "From"
							? value === 0
								? ""
								: value
							: title === "To"
							? cyptoSwapFee && cyptoSwapFee.baseQty
								? cyptoSwapFee.baseQty
								: ""
							: ""
					}
					data-testid="amount-input-field"
					disabled={title === "To"}
				/>
				<div className="flex items-center flex-nowrap">
					{showMaxButton && (
						<span
							className="text-base font-medium  pr-3 cursor-pointer text-primary-400"
							onClick={() => handleSetMaxValue()}
							data-testid={"crypto-max-text-button"}
						>
							MAX
						</span>
					)}
					<div
						onClick={handleToggle}
						data-testid={"crypto-search-icon"}
						className="cursor-pointer flex items-center flex-nowrap border-l border-gray-300"
					>
						{name && image ? (
							<>
								<img
									className="h-4 w-4 rounded-full mx-3"
									src={image}
									alt={"rocket"}
								/>
								<span className="font-medium text-small uppercase">{name}</span>
								<span>
									<CaretDown />
								</span>
							</>
						) : (
							<>
								<span className={"px-3 text-gray-700 text-small"}>
									Select Coin
								</span>
								<span>
									<CaretDown />
								</span>
							</>
						)}
					</div>
				</div>
			</div>
			<div className="flex items-center  mt-3">
				{inputError && (
					<p className="text-error-main mr-3 text-labels flex items-center">
						{inputError}
					</p>
				)}
				{showAvailableCrypto && (
					<p
						data-testid="show-available-crypto"
						className="text-gray-400 text-labels flex items-center"
					>
						Available: {availableBalance} {name}
					</p>
				)}
			</div>
			{title === "From" &&
			cyptoSwapFee &&
			cyptoSwapFee.minRequiredBalance === null ? (
				<div className="flex items-center  mt-3">
					<p className="text-error-main mr-3 text-labels flex items-center">
						The value is too small
					</p>
				</div>
			) : (
				""
			)}
			{toggle && (
				<div
					data-testid={"crypto-search-box"}
					className="crypto-input-select__search absolute top-20  bg-white w-full shadow-gray py-5 rounded"
				>
					<div
						onClick={preventClose}
						className="bg-primary-100 mx-5  flex items-center h-12 px-4 rounded mt-7"
					>
						<input
							className="placeholder-neutral-200 flex-1 outline-none bg-transparent "
							placeholder="Search Crypto here"
							onChange={handleSearch}
							value={searchText}
						/>
						<div className="cursor-pointer" onClick={() => handleSearch()}>
							<InputCancel />
						</div>
					</div>
					<div className="overflow-y-scroll h-52 mt-2">
						{filteredCrypto.map((coin) => (
							<div
								key={coin.name}
								className="px-3 rounded py-3 mx-2 flex items-center cursor-pointer hover:bg-primary-100"
								onClick={() => {
									searchChange(coin);
									handleToggle();
								}}
							>
								<img
									className="h-4 w-4 rounded-full mr-3"
									src={coin.image}
									alt={"coin-img"}
								/>
								<h1>{coin.name}</h1>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
