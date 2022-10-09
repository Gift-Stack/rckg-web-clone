import { FC, ReactElement } from "react";
import { NavBackIcon } from "../../assets";

interface NavBackProps {
	name?: string;
	icon?: ReactElement;
	cssClass?: string;
	[key: string]: any;
}

const NavBack: FC<NavBackProps> = ({
	name = "Back to Dashboard",
	icon = <NavBackIcon />,
	cssClass = "sm:py-5 sm:px-8 lg:px-20 flex sm:gap-4 md:text-sm-headline lg:text-md-headline xl:text-headline font-medium items-center",
	...props
}) => {
	return (
		<div
			data-testid={"rg-nav-back"}
			className={
				"w-full nav-back bg-transparent sm:bg-white md:mt-5 lg:mt-10 text-neutral-400"
			}
		>
			<button
				{...props}
				data-testid={"rg-nav-back-button"}
				className={cssClass}
			>
				<span>{icon}</span>
				<span className={"hidden sm:block"}>{name}</span>
			</button>
		</div>
	);
};

export default NavBack;
