import { NextPage } from "next";
import React, { useRef } from "react";
import { Layout } from "../components";
import {
	AuthSidePanel,
	FormHeading,
	AuthForm,
} from "../components/authentication";
import { EmailIcon, CheckEmailSide } from "../assets";
import Button from "../components/button";
import { ButtonSize, ButtonState } from "../components/button/enum";
import Link from "next/link";
import { useRouter } from "next/router";

const CheckEmail: NextPage = () => {
	const LinkRef = useRef<any>();
	const router = useRouter();
	const { email }: any = router.query;

	return (
		<Layout
			title={"Rocket Global Check Email"}
			keywords={" Rocket, Check Email"}
			description={""}
		>
			<div className="flex auth">
				<AuthSidePanel svg={<CheckEmailSide />} />

				<AuthForm handleSubmit={(e: HTMLFormElement) => e.preventDefault()}>
					<FormHeading
						svg={
							<div
								className={`auth__formHeadingSvgContainer bg-primary-100 flex justify-center items-center rounded-xl`}
							>
								<EmailIcon />
							</div>
						}
						heading={"Check your mail"}
						subHeading={`We have sent an instruction on how to recover your password to your email ${email}`}
					/>

					<div className={"auth__btnSection"}>
						<a
							href={"https://mail.google.com/"}
							rel="noopener noreferrer"
							target={"_blank"}
							ref={LinkRef}
						/>
						<Button
							variant={ButtonState.PRIMARY}
							value={"Open Email App"}
							size={ButtonSize.lg}
							onClick={() => LinkRef?.current?.click()}
						/>

						<p className={"text-center mt-8 text-sm-regular"}>
							Did not receive any mail? Check your spam filter, or
							<Link href={"/forgot-password"}>
								<a className={"text-primary-400"}> try another email address</a>
							</Link>
						</p>
					</div>
				</AuthForm>
			</div>
		</Layout>
	);
};
export default CheckEmail;
