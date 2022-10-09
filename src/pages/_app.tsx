import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useStore } from "redux/store";
import { ThemeProvider } from "next-themes";
import "../styles/globals.scss";
import React from "react";
import Analytics from "components/shared/Analytics";
import ModalRootContainer from "../components/modals/root";
import ReduxSuspense from "../components/reduxSuspense";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextPage } from "next/types";

import type { ReactElement, ReactNode } from "react";
type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const store = useStore(pageProps.initialReduxState);
	const getLayout = Component.getLayout ?? ((page: any) => page);

	return getLayout(
		<Provider store={store}>
			<ThemeProvider attribute="class" enableSystem={false}>
				<Analytics />
				<ReduxSuspense />
				<ModalRootContainer />
				<ToastContainer />
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
}
