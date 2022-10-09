import { identityService, storageService } from "../services";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { suspend } from "../redux/actions/suspense.action";
import { useRouter } from "next/router";
import { setAuthData } from "../redux/actions";

export const useGuard = (): boolean => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		dispatch(suspend(true));
		const authData = storageService.getAuthData();
		if (!authData.access_token) {
			router.push("/").then();
		}
		identityService
			.isAuthenticated()
			.then((authorized) => {
				if (!authorized) {
					router.push("/").then();
				}
				dispatch(setAuthData(authorized));
				setAuthorized(authorized);
			})
			.finally(() => {
				dispatch(suspend(false));
			});
		// eslint-disable-next-line
	}, []);

	return authorized;
};
