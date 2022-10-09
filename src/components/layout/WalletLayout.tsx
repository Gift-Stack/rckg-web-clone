import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Meta, ErrorUI } from "../../components";
import WalletSidebar from "../dashboard/wallet/sidebar";
import Header from "../dashboard/TopNav";
import { useGuard } from "../../hooks/useGuard";

interface Props extends MetaProps {
	children: JSX.Element;
	title: string;
	keywords: string;
	description: string;
	links: any;
}

export const WalletLayout: FC<Props> = ({
	children,
	title,
	keywords,
	description,
	links,
}) => {
	useGuard();
	return (
		<div data-testid={"rg-wallet-layout"}>
			<Meta title={title} keywords={keywords} description={description} />
			<Header />
			<div className={"layout__dashboardFrame"}>
				<WalletSidebar links={links} />
				<div className={"bg-primary-100 overflow-y-auto mt-20"}>
					<ErrorBoundary FallbackComponent={ErrorUI}>{children}</ErrorBoundary>
				</div>
			</div>
		</div>
	);
};
