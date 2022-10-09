import Sidebar from "components/dashboard/Sidebar";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Meta, ErrorUI } from "..";
import Header from "../dashboard/TopNav";

interface Props extends MetaProps {
	children: JSX.Element;
	title: string;
	keywords: string;
	description: string;
}

export const ActivityLayout: FC<Props> = ({
	children,
	title,
	keywords,
	description,
}) => {
	return (
		<div data-testid={"rg-activity-layout"}>
			<Meta title={title} keywords={keywords} description={description} />
			<Header />
			<div className={"w-full"}>
				<div className={"bg-primary-100 overflow-y-auto mt-20"}>
					<ErrorBoundary FallbackComponent={ErrorUI}>{children}</ErrorBoundary>
				</div>
			</div>
		</div>
	);
};
