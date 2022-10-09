import { createContext, useContext, useEffect, useState } from "react";
import { getWalletBalance } from "./../redux/actions";
import { storageService } from "./../services";

type ContextType = {
	redirectAfterLoginUri: string;
	authorized: boolean;
	setRedirectAfterLoginUri: (v: string) => void;
	wallet: IWallet;
	setRefreshWallet: (v: boolean) => void;
};

type IWallet = Record<string, { free: number; locked: number }>;
const GlobalContext = createContext<ContextType>({
	redirectAfterLoginUri: "",
	authorized: false,
	setRedirectAfterLoginUri: () => {},
	wallet: {},
	setRefreshWallet: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider: React.FC = ({ children }) => {
	const [redirectAfterLoginUri, setRedirectAfterLoginUri] = useState("");
	const [authorized, setAuthorized] = useState(false);
	const [wallet, setWallet] = useState<IWallet>({});
	const [reFreshhWallet, setRefreshWallet] = useState(false);

	const { uid } = storageService.getAuthData();
	const authenticate = () =>
		setInterval(() => {
			const authData = storageService.getAuthData();
			if (authData.access_token) {
				setAuthorized(true);
				return;
			}
		}, 3000);

	useEffect(() => {
		authenticate();
		// eslint-disable-next-line
		return () => clearInterval(authenticate());
	}, []);

	const fetchWalllet = async () => {
		const res: { asset: string; free: number; locked: number }[] =
			await getWalletBalance(uid as string);
		if (res && res.length > 0) {
			let __wallet: IWallet = {};
			res.forEach((item) => {
				if (item?.asset) {
					__wallet[item?.asset] = { free: item?.free, locked: item?.locked };
					setWallet(__wallet);
				}
			});
		}
		setRefreshWallet(false);
	};

	useEffect(() => {
		uid && fetchWalllet();
	}, [uid, reFreshhWallet]);

	return (
		<GlobalContext.Provider
			value={{
				redirectAfterLoginUri,
				setRedirectAfterLoginUri,
				authorized,
				wallet,
				setRefreshWallet,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;
