import SectionHeader from "components/shared/SectionHeader";
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

export const P2pLayout: FC<Props> = ({
	children,
	title,
	keywords,
	description,
}) => {
	return (
		<div data-testid={"rg-p2p-layout"} className="bg-primary-100 h-screen">
			<Meta title={title} keywords={keywords} description={description} />
			<Header wSection={true} />
			<SectionHeader
				title="P2P Trading"
				description="Peer-to-peer exchange (or P2P exchange) is a marketplace where people can trade crypto directly with each other on their own terms, in virtually any country."
				mobileTitle={"P2P Trading"}
				wSection={true}
			/>
			<div className={"w-full"}>
				<div className={"bg-primary-100 overflow-y-auto"}>
					<ErrorBoundary FallbackComponent={ErrorUI}>{children}</ErrorBoundary>
				</div>
			</div>
		</div>
	);
};
