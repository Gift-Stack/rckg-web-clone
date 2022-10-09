import { exchangeService } from './../../services';
import { showErrorMessage } from '.';

export const postSpotTrade = async (id: string, values:any) => {
 
        try {
            const res: any = await exchangeService.postSpotTrade(id, values)
  
            return res
        } catch (e: any) {
                      showErrorMessage(e)
                      throw e
        }
  
};

export const getTradeHistory = async (id: string) => {
           try {
            const res: any = await exchangeService.getTradeHistory(id)
            return res
        } catch (e: any) {
                showErrorMessage(e)
        }
    
};

export const getOrderHistory = async (id: string) => {
           try {
            const res: any = await exchangeService.getOrderHistory(id)
            return res
        } catch (e: any) {
                showErrorMessage(e)
                throw e
        }
    
};

export const getCoinPairRate = async (symbol: string) => {
           try {
            const res: any = await exchangeService.getCoinPairRate(symbol)
                         return res
        } catch (e: any) {
                showErrorMessage(e)
        }
    
};

export const getOpenOrders = async (id: string, symbol: string) => {
           try {
                   const res: any = await exchangeService.getOpenOrders(id, symbol)
            return res
        } catch (e: any) {
                showErrorMessage(e)
        }
    
};

export const cancelOpenOrder = async (id: string, symbol: string, orderId: string) => {
           try {
            const res: any = await exchangeService.cancelOpenOrder(id, symbol, orderId)
            return res
        } catch (e: any) {
                showErrorMessage(e)
        }
    
};
export const cancelAllOpenOrder = async (id: string, symbol: string,) => {
           try {
            const res: any = await exchangeService.cancelAllOpenOrder(id, symbol)
            return res
        } catch (e: any) {
                showErrorMessage(e)
        }
    
};

export const getStepSize = async (symbol: string) => {
           try {
            const res: any = await exchangeService.getStepSize(symbol)
            return res
        } catch (e: any) {
                showErrorMessage(e)
        }
    
};


export const getSymbolTickers = async () => {
      try {
            const res: any = await exchangeService.getSymbolTickers()
                  return res.data
      } catch (e: any) {
             showErrorMessage(e)
      }
};






export const getWalletBalance = async (id: string) => {
    try {
     const res: any = await exchangeService.getWalletBalance(id)
     return res.data
 } catch (e: any) {
         showErrorMessage(e)
 }

};

export const TradeAction = {
    getCoinPairRate,
    cancelOpenOrder,
    getStepSize,
    cancelAllOpenOrder,
    getTradeHistory,
    getSymbolTickers,
    getOpenOrders,
    getWalletBalance,
 }