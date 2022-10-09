import UserIPService from "./userIPService";
import CountryService from "./countryService";
import ApiService from "./axios";
import IdentityService from "./identityService";
import StorageService from "./storageService";
import CoreService from "./coreService";
import WithdrawalService from "./withdrawalService";
import WalletService from "./walletService";
import RouterService from "./routerService";
import TransactionsService from "./transactionsService";
import ExchangeService from "./exchangeService";

//Service container
export const userIpService = new UserIPService(
	process.env.NEXT_PUBLIC_USER_LOCATION_BASEURL
);
export const countryService = new CountryService(
	process.env.NEXT_PUBLIC_COUNTRIES_BASEURL
);
export const storageService = new StorageService();
export const routerService = new RouterService();

export const identityService = new IdentityService(
	new ApiService(process.env.NEXT_PUBLIC_AUTH_BASEURL, routerService),
	storageService
);

export const withdrawalService = new WithdrawalService(
	new ApiService(process.env.NEXT_PUBLIC_EXCHANGE_BASEURL, routerService),
	storageService
);

export const walletService = new WalletService(
	new ApiService(process.env.NEXT_PUBLIC_EXCHANGE_BASEURL, routerService),
	storageService
);

export const coreService = new CoreService(
	new ApiService(process.env.NEXT_PUBLIC_CORE_SERVICE_URL, routerService),
	storageService
);

export const exchangeService = new ExchangeService(
	new ApiService(
		process.env.NEXT_PUBLIC_EXCHANGE_BASEURL,
		// process.env.NEXT_PUBLIC_EXCHANGE_SERVICE_BASEURL,
		routerService
	)
);

export const transactionsService = new TransactionsService(
	new ApiService(process.env.NEXT_PUBLIC_EXCHANGE_BASEURL, routerService),
	storageService
);
