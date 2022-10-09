import { useGuard } from "hooks/useGuard";
import { Fragment, FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Meta, ErrorUI } from "../../components";
import Sidebar from "../dashboard/Sidebar";
import Header from "../dashboard/TopNav";

interface Props extends MetaProps {
	children: JSX.Element;
	title: string;
	keywords: string;
	description: string;
}

export const ProfileSettingsLayout: FC<Props> = ({
	children,
	title,
	keywords,
	description,
}) => {
	useGuard();
	return (
		<div data-testid={"rg-profile-layout"} className={"bg-primary-100"}>
			<Meta title={title} keywords={keywords} description={description} />
			<Header fixed={false} />
			<div className={"layout__profileSettingsFrame"}>
				<div>
					<ErrorBoundary FallbackComponent={ErrorUI}>{children}</ErrorBoundary>
				</div>
			</div>
		</div>
	);
};
