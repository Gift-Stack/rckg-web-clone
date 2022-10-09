import { FC, ReactElement } from "react";
import { ButtonSize, ButtonState } from "./enum";

export interface ButtonProps {
	value?: string | ReactElement;
	variant?: ButtonState;
	size?: ButtonSize;
	icon?: ReactElement;
	cssClass?: string;

	[key: string]: any;
}

const Button: FC<ButtonProps> = ({
	value = "Click Me",
	variant = ButtonState.PRIMARY,
	size = ButtonSize.lg,
	icon,
	cssClass,
	disabled,
	...props
}) => {
	return (
		<button
			data-testid="rg-button"
			className={`${variant} ${size} ${cssClass} disabled:cursor-not-allowed disabled:opacity-50`}
			disabled={disabled}
			{...props}
		>
			{icon && (
				<span data-testid={"rg-icon"} className={"mr-1"}>
					{icon}
				</span>
			)}
			{value}
		</button>
	);
};

export default Button;
