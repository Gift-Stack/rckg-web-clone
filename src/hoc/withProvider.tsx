import React, { FC } from "react";
import { Provider } from "react-redux";
import { getStore } from "../redux/store";

function withProvider<T>(Component: FC<T>) {
	// eslint-disable-next-line react/display-name
	return (props: T) => (
		<Provider store={getStore()}>
			<Component {...props} />
		</Provider>
	);
}

export { withProvider };
