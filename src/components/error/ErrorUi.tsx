export const ErrorUI = ({ error, resetErrorBoundary }: any) => {
	return (
		<div role="alert" data-testid={"rg-error-ui-alert"}>
			<p>Something went wrong!</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	);
};
