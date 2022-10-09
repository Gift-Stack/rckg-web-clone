import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

export interface AuthSidePanelProps {
	svg: JSX.Element;
	heading?: string;
	paragraph?: string;
}

const AuthSidePanel: FC<AuthSidePanelProps> = ({ svg, heading, paragraph }) => {
	return (
		<div
			className="flex-1 bg-mediumpurple h-screen px-9 hidden lg:flex"
			data-testid={"rg-auth-side-panel"}
		>
			<div className={"mt-10"} data-testid={"rg-logo-area"}>
				<Link href="https://rocketglobal.io/">
					<a>
						<Image
							src={"/img/logo.png"}
							quality={"100"}
							alt={"Rocket global logo"}
							width={62}
							height={62}
						/>
					</a>
				</Link>
			</div>
			<div className="flex flex-col justify-center items-center mt-7">
				{svg}
				{heading && <h1 className="auth__heading mt-8">{heading}</h1>}
				{paragraph && <p className="auth__desc mt-2">{paragraph}</p>}
			</div>
		</div>
	);
};

export { AuthSidePanel };
