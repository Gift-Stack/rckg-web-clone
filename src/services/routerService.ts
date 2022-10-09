import Router from "next/router";

class RouterService {
	navigate(path: string) {
		Router.push(path).then();
	}
}

export default RouterService;
