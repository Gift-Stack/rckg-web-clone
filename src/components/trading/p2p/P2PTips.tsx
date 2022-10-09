import React from "react";

export default function P2PTips() {
	return (
		<div
			data-testid={"rg-p2p-tips-container"}
			className="max-w-2xl text-labels mt-32 pb-60"
		>
			<h1 data-testid={"rg-p2p-tips-header"} className="font-semibold">
				Tips
			</h1>
			<ol className="list-decimal list-inside">
				<li className="mt-3">
					Please do not include any information about BTC, ETH, USDT, BNB and
					other digital asset names in the transfer notes to prevent payment
					from being intercepted or bank funds being frozen.
				</li>
				<li className="mt-3">
					Your payment will go directly to the seller&apos;s account. The
					digital assets sold by the seller during the transaction will be
					handled by the platform
				</li>
				<li className="mt-3">
					Please complete the payment within the specified time, and be sure to
					click “Transferred, Next”. After the seller confirms the payment, the
					system will transfer the digital assets to your account.
				</li>
				<li className="mt-3">
					If the buyer cancels orders 3 times a day, he/she will no longer be
					able to to trade for the rest of the day.
				</li>
				<li className="mt-3">
					After 5 pm on weekdays or during non-working days, please limit each
					transaction within 50,000 CNY, otherwise it will be delayed.
				</li>
			</ol>
		</div>
	);
}
