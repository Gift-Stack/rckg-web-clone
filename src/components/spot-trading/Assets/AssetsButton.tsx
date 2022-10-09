import { FC } from "react";
import { AssetsButtonSize, AssetsButtonState } from "./enum";

export interface ButtonProps {
	value?: string;
	variant?: AssetsButtonState;
	size?: AssetsButtonSize;
	onClick: () => void;
	[key: string]: any;
}

const AssetsButton: FC<ButtonProps> = ({
	value = "Click Me",
	variant = AssetsButtonState.PRIMARY,
	size = AssetsButtonSize.sm,
	onClick,
	...props
}) => {
	return (
		<button
			onClick={onClick}
			data-testid="rg-assets-button"
			className={`${variant} ${size}`}
			{...props}
		>
			{value}
		</button>
	);
};

export default AssetsButton;
