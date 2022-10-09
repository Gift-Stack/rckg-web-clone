import React, { FC, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export interface AuthFormProps {
	children: ReactNode;

	[x: string]: any;
}

const AuthForm: FC<AuthFormProps> = ({ children, handleSubmit, ...rest }) => {
	return (
		<div
			className="flex-1 h-screen px-4"
			data-testid={"rg-auth-form-container"}
			{...rest}
		>
			<form
				className={
					"flex flex-col flex-start mx-auto lg:justify-center h-full auth__form md:justify-start"
				}
				autoComplete="off"
				onSubmit={handleSubmit}
				method={"POST"}
			>
				<div
					className={"mt-10 mb-12  lg:hidden md:flex auth__logoArea"}
					data-testid={"rg-logo-area"}
				>
					<Link href="https://rocketglobal.io/">
						<a>
							<Image
								src={"/img/sm-logo.png"}
								quality={"100"}
								alt={"Rocket global logo"}
								width={94}
								height={62}
								objectFit={"contain"}
								objectPosition={"left"}
							/>
						</a>
					</Link>
				</div>
				{children}
			</form>
		</div>
	);
};

export { AuthForm };
