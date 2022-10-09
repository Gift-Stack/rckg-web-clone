import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Meta, ErrorUI } from "../../components";

interface Props extends MetaProps {
	children: JSX.Element;
	title: string;
	keywords: string;
	description: string;
}

export const Layout: FC<Props> = ({
	children,
	title,
	keywords,
	description,
}) => {
	return (
		<div data-testid={"rg-default-layout"}>
			<Meta title={title} keywords={keywords} description={description} />
			<main>
				<ErrorBoundary FallbackComponent={ErrorUI}>{children}</ErrorBoundary>
			</main>
		</div>
	);
};
