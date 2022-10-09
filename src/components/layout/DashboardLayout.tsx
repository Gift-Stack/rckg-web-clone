import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Meta, ErrorUI } from "../../components";
import Sidebar from "../dashboard/Sidebar";
import Header from "../dashboard/TopNav";
import Navbar from "../dashboard/Sidebar/nav";
import { useGuard } from "../../hooks/useGuard";

interface Props extends MetaProps {
	children: JSX.Element;
	title: string;
	keywords: string;
	description: string;
}

export const DashboardLayout: FC<Props> = ({
	children,
	title,
	keywords,
	description,
}) => {
	useGuard();
	return (
		<div data-testid={"rg-dashboard-layout"}>
			<Meta title={title} keywords={keywords} description={description} />
			<Header />
			<div className={"layout__dashboardFrame"}>
				<Sidebar />
				<div className={"bg-primary-100 overflow-y-auto mt-20"}>
					<Navbar />
					<ErrorBoundary FallbackComponent={ErrorUI}>{children}</ErrorBoundary>
				</div>
			</div>
		</div>
	);
};
