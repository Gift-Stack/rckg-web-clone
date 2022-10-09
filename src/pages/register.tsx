import { NextPage } from "next";
import Link from "next/link";
import { AccountSide, CancelEye, Eye } from "../assets";
import Input from "../components/input";
import Button from "../components/button";
import { ButtonSize, ButtonState } from "../components/button/enum";
import { useState } from "react";
import { useFormik } from "formik";
import { SignupSchemaEmail } from "../validations";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { registerAsync, togglePasswordInput } from "../redux/actions";

import {
	AuthForm,
	AuthSidePanel,
	FormHeading,
	TermsCondition,
} from "../components/authentication";

import { Layout } from "../components";
import { useRouter } from "next/router";

const Register: NextPage = () => {
	const [accepted, setAccepted] = useState<boolean>(false);
	const { loading, signupPassword } = useSelector(
		(state: RootState) => state.auth
	);
	const dispatch = useDispatch();
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: SignupSchemaEmail,
		onSubmit: (values) => {
			dispatch(
				registerAsync(values, async (res: any) => {
					formik.resetForm();
					await router.push(
						`/email-verification?email=${res.email}&uid=${res.id}`
					);
				})
			);
		},
	});
	return (
		<Layout
			title={"Rocket Global Register"}
			keywords={"Register, Rocket"}
			description={""}
		>
			<div className="flex auth">
				<AuthSidePanel
					svg={<AccountSide />}
					heading={"Trade without limits"}
					paragraph={
						"Don't be restricted to trades within your country. " +
						"With Rocket Global you get unlimited access to unlimited trades at the best rates ever!"
					}
				/>

				<AuthForm handleSubmit={formik.handleSubmit}>
					<FormHeading
						heading={"Create Account"}
						subHeading={
							"Kindly register with your email address or phone number"
						}
					/>

					<div className={"mb-8"}>
						<Input
							name={"email"}
							type={"email"}
							label={"Email Address"}
							placeholder={"Enter your email address"}
							required={true}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
					</div>
					<div className={"mb-9"}>
						<Input
							name={"password"}
							type={signupPassword ? "text" : "password"}
							label={"Password"}
							placeholder={"Choose a Password"}
							icon={
								signupPassword ? (
									<CancelEye
										onClick={() =>
											dispatch(togglePasswordInput("signupPassword"))
										}
									/>
								) : (
									<Eye
										onClick={() =>
											dispatch(togglePasswordInput("signupPassword"))
										}
									/>
								)
							}
							required={true}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
					</div>
					<TermsCondition
						accepted={accepted}
						handleAccepted={(e) => setAccepted(!accepted)}
					/>
					<div className={"auth__btnSection"}>
						<Button
							variant={ButtonState.PRIMARY}
							value={loading ? "Loading...." : "Create Account"}
							size={ButtonSize.lg}
							type={"Submit"}
							disabled={!!loading || !accepted}
						/>
						<p className={"text-center mt-8 text-sm-regular"}>
							Have an account already?{" "}
							<Link href={"/"}>
								<a className={"text-primary-400"}>Login</a>
							</Link>
						</p>
					</div>
				</AuthForm>
			</div>
		</Layout>
	);
};
export default Register;
