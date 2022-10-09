import { storageService } from "../services";
import { useEffect, useState } from "react";

export const useAuth = (): boolean => {
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		const authData = storageService.getAuthData();
		if (authData.access_token) {
			setAuthorized(true);
			return;
		}
		// eslint-disable-next-line
	}, []);

	return authorized;
};
