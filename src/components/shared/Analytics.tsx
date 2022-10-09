import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserIP, getUserDevice } from "redux/actions/analytics.action";

export default function Analytics() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUserIP());
		dispatch(getUserDevice());
		//eslint-disable-next-line
	}, []);

	return null;
}
