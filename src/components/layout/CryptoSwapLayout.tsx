import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorUI } from "../../components";
import { useGuard } from "../../hooks/useGuard";

interface Props extends MetaProps {
	children: JSX.Element;
}

export const CryptoSwapLayout: FC<Props> = ({ children }) => {
	// useGuard();
	return <ErrorBoundary FallbackComponent={ErrorUI}>{children}</ErrorBoundary>;
};
