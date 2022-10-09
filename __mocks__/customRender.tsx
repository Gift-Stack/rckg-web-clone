import { render as defaultRender } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Middleware, Dispatch, AnyAction } from "redux";
import React from "react";
import thunk from "redux-thunk";

const customRender = (component: React.ReactElement, initialState: any) => {
	const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [
		thunk,
	];
	const mockStore = configureStore(middlewares);
	const store = mockStore(initialState);
	return defaultRender(<Provider store={store}>{component}</Provider>);
};
export default customRender;
