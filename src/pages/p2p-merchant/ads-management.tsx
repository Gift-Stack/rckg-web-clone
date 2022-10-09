import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Meta } from "components";
import Header from "components/dashboard/TopNav";
import SectionHeader from "components/shared/SectionHeader";
import P2PMerchantContainer from "components/p2p-merchant/P2PMerchantContainer";
import P2PLinks from "components/p2p-merchant/links";
import CryptoSelectInput from "components/crypto/CryptoSelectInput";
import { cryptoList } from "components/crypto/crypto-list";

import Stepper from "components/stepper";
import Button from "components/button";
import { ButtonState, ButtonSize } from "components/button/enum";

import { CryptoT } from "types/crypto-txn.type";
import TransactionSelect from "components/transaction/TransactionSelect";
import {
	IPaymentType,
	ITransactionSelectItem,
	ITransactionTab,
} from "components/transaction/model";
import {
	BnbBtc,
	BtcBtc,
	DodgeBtc,
	EthBtc,
	LtcBtc,
	NavBackIcon,
	TransactionCopy,
	TransactionLink,
	USDT,
} from "assets";
import { CoinEnum } from "types/enum/coinEnum";
import { CurrencyEnum } from "types/enum";
import {
	coinSelectItems,
	networkSelectItems,
	currencySelectItems,
} from "components/transaction/data";

const AdsManagement = () => {
	const [coinSelectData, setCoinSelectData] = useState<
		ITransactionSelectItem[]
	>([]);
	const [networkSelectData, setNetworkSelectData] = useState<
		ITransactionSelectItem[]
	>([]);
	const [currencySelectData, setCurrencySelectData] = useState<
		ITransactionSelectItem[]
	>([]);
	const [assetSelectData, setAssetSelectData] = useState<
		ITransactionSelectItem[]
	>([]);
	const [coinSelectToggle, setCoinSelectToggle] = useState<boolean>(false);

	const [assetToggle, setAssetToggle] = useState<boolean>(false);
	const [cashToggle, setCashToggle] = useState<boolean>(false);
	const [priceToggle, setPriceToggle] = useState<boolean>(false);
	const [hopToggle, setHOPToggle] = useState<boolean>(false);

	const [selectedCoin, setSelectedCoin] = useState<any>(null);
	const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
	const [selectedCurrency, setSelectedCurrency] = useState<any>(null);

	const [asset, setAsset] = useState<CryptoT>({
		value: 0,
		maxValue: 0,
		minValue: 0,
		availableBalance: 0.12345,
		name: "",
		image: "",
	});
	const [cash, setCash] = useState<CryptoT>({
		value: 0,
		maxValue: 0,
		minValue: 0,
		availableBalance: 0.12345,
		name: "",
		image: "",
	});

	const handleSelectClose = (): void => {
		coinSelectToggle && setCoinSelectToggle(false);
		assetToggle && setAssetToggle(false);
		cashToggle && setCashToggle(false);
		priceToggle && setPriceToggle(false);
		hopToggle && setHOPToggle(false);
	};

	const _setCoinSelectData = (): ITransactionSelectItem[] => {
		const data: ITransactionSelectItem[] = coinSelectItems.map((c) => {
			return {
				id: c.id,
				item: (
					<>
						<div className="flex items-center transaction-select-item text-neutral-400">
							<span>
								{c.name === CoinEnum.DOGE ? (
									<DodgeBtc />
								) : CoinEnum.LTC ? (
									<LtcBtc />
								) : CoinEnum.BNB ? (
									<BnbBtc />
								) : CoinEnum.BTC ? (
									<BtcBtc />
								) : (
									<EthBtc />
								)}
							</span>
							<span className="font-normal ml-3 block truncate">{c.name}</span>
						</div>
					</>
				),
				selected: false,
				name: c.name,
			};
		});
		return data;
	};

	const _setNetworkSelectData = (): ITransactionSelectItem[] => {
		const data: ITransactionSelectItem[] = networkSelectItems.map((n) => {
			return {
				id: n.id,
				item: (
					<>
						<div className="flex items-center transaction-select-item text-neutral-400">
							<span className="font-normal ml-3 block truncate">{n.name}</span>
						</div>
					</>
				),
				selected: false,
				name: n.name,
			};
		});
		return data;
	};

	const _setCurrencySelectData = (): ITransactionSelectItem[] => {
		const data: ITransactionSelectItem[] = currencySelectItems.map((c) => {
			return {
				id: c.id,
				item: (
					<>
						<div className="flex items-center transaction-select-item text-neutral-400">
							<span>
								{c.name === CurrencyEnum.USDT ? (
									<USDT />
								) : CurrencyEnum.NAIRA ? (
									<USDT />
								) : (
									<USDT />
								)}
							</span>
							<span className="font-normal ml-3 block truncate">{c.name}</span>
						</div>
					</>
				),
				selected: false,
				name: c.name,
			};
		});
		return data;
	};

	const _setAssetSelectData = (): ITransactionSelectItem[] => {
		const data: ITransactionSelectItem[] = cryptoList.map((c, idx) => {
			return {
				id: idx,
				item: (
					<>
						<div className="flex items-center transaction-select-item text-neutral-400">
							<img
								className="h-4 w-4 rounded-full mx-3"
								src={c.image}
								alt={"rocket"}
							/>
							<span className="font-normal ml-3 block truncate">
								{c.name.toUpperCase()}
							</span>
						</div>
					</>
				),
				selected: false,
				name: c.name.toUpperCase(),
			};
		});
		return data;
	};

	useEffect(() => {
		setAsset(cryptoList[4]);
		setCash(cryptoList[4]);
		setAssetSelectData(_setAssetSelectData());
		setCoinSelectData(_setCoinSelectData());
		setNetworkSelectData(_setNetworkSelectData());
		setCurrencySelectData(_setCurrencySelectData());
	}, []);

	const handleSelectedItem = (index: number, select: string) => {
		select === "Coin" &&
			setSelectedCoin(coinSelectData.find((c) => c.id === index));
		select === "Network" &&
			setSelectedNetwork(networkSelectData.find((n) => n.id === index));
		select === "Currency" &&
			setSelectedCurrency(currencySelectData.find((c) => c.id === index));
	};

	return (
		<div onClick={handleSelectClose}>
			<Meta
				title={"Rocket Global P2P Ad Management"}
				keywords={
					"Login, Rocket, Transaction, Withdrawal Crypto, Withdrawal Fiat"
				}
				description={""}
			/>
			<Header wSection={true} />
			<SectionHeader
				title="P2P Merchant Application"
				description="Become a Rocket Global P2P Merchant and enjoy more benefits"
				mobileTitle={"P2P Merchant"}
				wSection={true}
			/>
			<P2PMerchantContainer>
				<P2PLinks />
				<div className="w-full bg-white px-30 py-25 mb-1">
					<p className="text-headline font-bold text-neutral-400">
						Post Normal Ad
					</p>
				</div>
				<div className="w-full bg-white px-30 py-25 mb-1">
					<Stepper />
				</div>
				<div className="w-full bg-white px-30 py-25 mb-1">
					<div className="flex items-center gap-3 mb-30">
						<Button
							value="I want to Buy"
							variant={ButtonState.OUTLINE}
							size={ButtonSize.xs}
							cssClass="font-bold bg-skyblue-light px-2.7"
						/>
						<Button
							value="I want to Sell"
							variant={ButtonState.OUTLINE}
							size={ButtonSize.xs}
							cssClass="font-bold bg-white border-neutral-150 px-2.7"
						/>
					</div>

					<div className="flex items-center gap-14">
						<div className="font-medium text-sm-headline w-136">
							<TransactionSelect
								toggle={assetToggle}
								setToggle={(bool) => setAssetToggle(!assetToggle)}
								selectItems={assetSelectData}
								label={"Asset"}
								placeholder={"Asset"}
								selectedItem={(index: number) =>
									handleSelectedItem(index, "Coin")
								}
								rootCss="ads-management-tnx-root"
								labelRootCss="ads-management-tnx-label"
								labelChildCss="ads-management-tnx-label-child"
								buttonRootCss="ads-management-tnx-button"
								itemCss="ads-management-tnx-dropdown-coin"
							/>
						</div>
						<div className="font-medium text-sm-headline w-136">
							<TransactionSelect
								toggle={cashToggle}
								setToggle={(bool) => setCashToggle(!cashToggle)}
								selectItems={currencySelectData}
								label={"Cash"}
								placeholder={"Cash"}
								selectedItem={(index: number) =>
									handleSelectedItem(index, "Coin")
								}
								rootCss="ads-management-tnx-root"
								labelRootCss="ads-management-tnx-label"
								labelChildCss="ads-management-tnx-label-child"
								buttonRootCss="ads-management-tnx-button"
								itemCss="ads-management-tnx-dropdown"
							/>
						</div>
					</div>
				</div>
				<div className="w-full bg-white px-30 py-25 mb-1">
					<div className="flex gap-14 text-neutral-400">
						<div className="left">
							<div className="mb-8">
								<p className="font-medium text-sm-headline">Your Price</p>
								<p className="font-medium text-p2p-merchant-headline">
									₦ 411.56
								</p>
							</div>
							<div className="font-medium text-sm-headline w-136">
								<TransactionSelect
									toggle={priceToggle}
									setToggle={(bool) => setPriceToggle(!priceToggle)}
									selectItems={networkSelectData}
									label={"Price Type"}
									placeholder={"Price Type"}
									selectedItem={(index: number) =>
										handleSelectedItem(index, "Coin")
									}
									rootCss="ads-management-tnx-root"
									labelRootCss="ads-management-tnx-label"
									labelChildCss="ads-management-tnx-label-child"
									buttonRootCss="ads-management-tnx-button"
									itemCss="ads-management-tnx-dropdown"
								/>
							</div>
						</div>
						<div className="right">
							<div className="mb-8">
								<p className="font-medium text-sm-headline">
									Highest Order Price
								</p>
								<p className="font-medium text-p2p-merchant-headline">
									₦ 568.10
								</p>
							</div>
							<div className="font-medium text-sm-headline w-136">
								<TransactionSelect
									toggle={hopToggle}
									setToggle={(bool) => setHOPToggle(!hopToggle)}
									selectItems={coinSelectData}
									label={"Fixed"}
									placeholder={"Fixed"}
									selectedItem={(index: number) =>
										handleSelectedItem(index, "Network")
									}
									rootCss="ads-management-tnx-root"
									labelRootCss="ads-management-tnx-label"
									labelChildCss="ads-management-tnx-label-child"
									buttonRootCss="ads-management-tnx-button"
									itemCss="ads-management-tnx-dropdown-coin"
								/>
							</div>
						</div>
					</div>
				</div>
			</P2PMerchantContainer>
		</div>
	);
};

export default AdsManagement;
