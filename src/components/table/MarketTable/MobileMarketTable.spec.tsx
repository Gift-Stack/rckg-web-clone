import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { marketTableData } from "../../table/MarketTable/data";

import MobileMarketTable from "./MobileMarketTable";
import { CoinPairEnum } from "../../../types/enum";
import { BnbBtc, BtcBtc, DodgeBtc, EthBtc, LtcBtc } from "../../../assets";
import React from "react";

describe("MobileMarketTable", () => {
	it.todo("test mobile market table");
	// it("renders properly", async () => {
	//     const handleTrade = jest.fn();
	//     render(<MobileMarketTable trade={handleTrade} data={marketTableData}/>);
	//     marketTableData.map((row, index) => {
	//         let svg;
	//         let id = screen.getByTestId(`rg-marketTable-coin-pair-${index}`)
	//         row.coinPair === CoinPairEnum.DOGE_BTC ?
	//             svg = <DodgeBtc/>
	//             : CoinPairEnum.LTC_BTC ?
	//                 svg = <LtcBtc/>
	//                 :
	//                 CoinPairEnum.BNB_BTC ?
	//                     svg = <BnbBtc/>
	//                     :
	//                     CoinPairEnum.BTC_BTC ?
	//                         svg = <BtcBtc/>
	//                         :
	//                         svg = <EthBtc/>
	//         expect(id.children).toHaveLength(1)
	//     })
	//     const market = screen.getByTestId("rg-mobile-market-table");
	//     const btns = screen.getAllByTestId("rg-mobile-market-table-trade-btn");
	//     act(() => {
	//         fireEvent.click(btns[0]);
	//     });
	//     expect(market).toBeInTheDocument();
	//     expect(market.children.length).toBe(marketTableData.length);
	//     expect(market.innerHTML).toContain("text-sm-regular font-medium");
	//     expect(market.innerHTML).toContain("text-labels text-gray-deep mb-1");
	//     expect(handleTrade).toHaveBeenCalled();
	// });
});
