import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

interface IProps {
	setQuotes: (v: any) => void;
	setOrderBookRecord: (v: any) => void;
	parsedSymbol: string;
}
export default function TradeWebsocket({
	setQuotes,
	setOrderBookRecord,
	parsedSymbol,
}: IProps) {
	const socketRef = useRef<any>(null);

	useEffect(() => {
		socketRef.current = io(
			`https://rckg-exchange-staging.rocket.com.ng/?symbol=${parsedSymbol}`,
			{
				path: "/orderbook",
			}
		);
	}, [parsedSymbol]);

	useEffect(() => {
		socketRef.current.on("message", (data: any) => {
			if (data.bids && data.asks) {
				setQuotes({ ...data.quotes, price: data.bids[0].price });
				setOrderBookRecord([
					...data.bids?.map((a: any, idx: any) => ({
						id: idx + 1,
						price: Number(a.price),
						amount: Number(a.qty),
						total: Number(a.price) * Number(a.qty),
						type: "buy",
						activity: 10,
					})),
					...data.asks?.map((a: any, idx: any) => ({
						id: idx + 1,
						price: Number(a.price),
						amount: Number(a.qty),
						total: Number(a.price) * Number(a.qty),
						type: "sell",
						activity: 10,
					})),
				]);
			}
		});
		return () => {
			socketRef?.current?.disconnect();
		};
	}, [parsedSymbol]);

	return <div></div>;
}
