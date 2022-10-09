import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Layout } from "../components";
import { AccountSide, CancelEye, Eye } from "../assets";
import { Switch } from "../components/";
import {
	FormHeading,
	AuthSidePanel,
	AuthForm,
} from "../components/authentication/";
import Input from "../components/input";
import Button from "../components/button";
import { ButtonSize, ButtonState } from "../components/button/enum";
import Link from "next/link";
import { useFormik } from "formik";
import { loginSchemaEmail, loginSchemaPhone } from "../validations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loginAsync, togglePasswordInput } from "../redux/actions";
import { getUserDevice, getUserIP } from "redux/actions/analytics.action";
import { useRouter } from "next/router";
import { isEmail } from "../utils";

const Home: NextPage = () => {
	const [active, setActive] = useState<string>("email");
	const { signinPassword, loading } = useSelector(
		(state: RootState) => state.auth
	);
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		dispatch(getUserIP());
		dispatch(getUserDevice());
	}, [dispatch]);

	const formik = useFormik({
		initialValues: {
			email: "",
			loginPassword: "",
			phone: "",
		},
		validationSchema: active === "email" ? loginSchemaEmail : loginSchemaPhone,
		onSubmit: (values) => {
			dispatch(
				loginAsync(
					active === "email"
						? {
								identifier: values.email,
								password: values.loginPassword,
						  }
						: {
								identifier: values.phone,
								password: values.loginPassword,
						  },
					async (res: any) => {
						let authType;
						if (isEmail(res.identifier)) {
							authType = "email";
						} else {
							authType = "phone";
						}
						router
							.push(
								`verify-login?identifier=${res.identifier}&authType=${authType}`
							)
							.then();
					},
					() => {
						router.push(
							`/email-verification?email=${values.email}&verifyType=registered`
						);
					}
				)
			);
		},
	});
	return (
		<Layout
			title={"Rocket Global Login"}
			keywords={"Login, Rocket"}
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
						heading={"Welcome back!"}
						subHeading={"Please login to access your account"}
					/>
					<div className={"mb-8"}>
						<Switch
							handleSwitch={(value: string) => setActive(value)}
							switchItem={[
								{ text: "Email Address", value: "email" },
								{ text: " Mobile Number", value: "phone" },
							]}
							active={active}
						/>
					</div>
					<div className={"mb-8"}>
						{active.toLowerCase().includes("email") ? (
							<Input
								name={"email"}
								type={"email"}
								label={"Email Address"}
								placeholder={"Enter your email address"}
								required={true}
								formik={formik}
								onChange={formik.handleChange}
								value={formik.values.email}
								autoComplete="off"
							/>
						) : (
							<Input
								name={"phone"}
								type={"tel"}
								label={"Mobile Number"}
								placeholder={"Enter your mobile number"}
								required={true}
								formik={formik}
								onChange={formik.handleChange}
								value={formik.values.phone}
								autoComplete="off"
							/>
						)}
					</div>
					<div className={"mb-16"}>
						<Input
							name={"loginPassword"}
							type={signinPassword ? "text" : "password"}
							label={"Password"}
							placeholder={"Enter your Password"}
							id="loginPassword"
							icon={
								signinPassword ? (
									<CancelEye
										onClick={() =>
											dispatch(togglePasswordInput("signinPassword"))
										}
									/>
								) : (
									<Eye
										onClick={() =>
											dispatch(togglePasswordInput("signinPassword"))
										}
									/>
								)
							}
							onChange={formik.handleChange}
							value={formik.values.loginPassword}
						/>
						<Link href={"/forgot-password"}>
							<a className={"auth__link text-primary-400"}>Forget Password?</a>
						</Link>
					</div>

					<div className={"auth__btnSection"}>
						<Button
							variant={ButtonState.PRIMARY}
							value={loading ? "Loading....." : "Login"}
							size={ButtonSize.lg}
							type={"Submit"}
							disabled={!!loading}
						/>
						<p className={"text-center mt-8 text-sm-regular"}>
							Don’t have an account?{" "}
							<Link href={"/register"}>
								<a className={"text-primary-400"}>Signup</a>
							</Link>
						</p>
					</div>
				</AuthForm>
			</div>
		</Layout>
	);
};

export default Home;
