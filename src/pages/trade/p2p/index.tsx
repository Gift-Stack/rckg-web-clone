import { SwapPayload } from "components/crypto/model";
import SwapCrypto from "components/crypto/swap-crypto/SwapCrypto";
import TransactionContainer from "components/crypto/TransactionContainer";
import Header from "components/dashboard/TopNav";
import SectionHeader from "components/shared/SectionHeader";
import { NextPage } from "next";
import React from "react";

const PeerToPeerTrading: NextPage = () => {
	return (
		<div className="bg-primary-100 h-screen">
			<Header />
			<SectionHeader
				title="P2P Trading"
				description="Peer-to-peer exchange (or P2P exchange) is a marketplace where people can trade crypto directly with each other on their own terms, in virtually any country."
				mobileTitle={"P2P Trading"}
			/>
			<TransactionContainer>
				<SwapCrypto
					allCoins={[]}
					variousAssetsBalance={[]}
					setPayload={() => {}}
					performSwap={() => {}}
					cyptoSwapFee={{
						minRequiredBalance: 10,
						price: "10",
						slippage: "10",
						baseQty: "10",
					}}
					cryptoSwap={{ swapId: 1212 }}
					getSwapList={() => {}}
					swapList={[]}
					fromSelectToggle={true}
					setFromSelectToggle={() => {}}
					toSelectToggle={true}
					setToSelectToggle={() => {}}
				/>
			</TransactionContainer>
		</div>
	);
};
export default PeerToPeerTrading;
