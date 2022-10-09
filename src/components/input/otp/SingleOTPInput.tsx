import React, { memo, useRef, useEffect } from "react";

export interface SingleOTPInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	focus?: boolean;
}

export function SingleOTPInputComponent(props: SingleOTPInputProps) {
	const { focus, autoFocus, ...rest } = props;
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			if (focus && autoFocus) {
				inputRef.current.focus();
				inputRef.current.select();
			}
		}
	}, [autoFocus, focus]);

	return <input ref={inputRef} {...rest} />;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
