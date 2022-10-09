import { NextPage } from "next";
import {
	AuthForm,
	AuthSidePanel,
	FormHeading,
} from "../components/authentication";
import { ResetPasswordSide } from "../assets";
import { Layout } from "../components";
import Input from "../components/input";
import Link from "next/link";
import Button from "../components/button";
import { ButtonSize, ButtonState } from "../components/button/enum";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "../validations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { forgotPasswordAsync } from "../redux/actions";
import { useRouter } from "next/router";

const ForgotPassword: NextPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: forgotPasswordSchema,
		onSubmit: (values) => {
			dispatch(
				forgotPasswordAsync(
					values,
					(res: any) => {
						router.push(`/check-email?email=${values.email}`).then();
					},
					(err: any) => {}
				)
			);
		},
	});
	const { loading } = useSelector((state: RootState) => state.auth);
	const isDisabled = formik.values.email === "";

	return (
		<Layout
			title={"Rocket Global Forgot password"}
			keywords={"Rocket,Crypto Forgot password"}
			description={""}
		>
			<div className="flex auth">
				<AuthSidePanel svg={<ResetPasswordSide />} />

				<AuthForm handleSubmit={formik.handleSubmit}>
					<FormHeading
						heading={"Reset Password"}
						subHeading={
							"Kindly enter the email associated with your account and we’ll send a message with instructions to reset your password."
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
							autoComplete="off"
						/>
					</div>

					<div className={"auth__btnSection"}>
						<Button
							variant={ButtonState.PRIMARY}
							value={loading ? "Loading" : "Send Instructions"}
							size={ButtonSize.lg}
							type={"submit"}
							disabled={!!loading || isDisabled}
						/>
						<p className={"text-center mt-8 text-sm-regular"}>
							<Link href={"/"}>
								<a className={"text-primary-400"}>Back to Login</a>
							</Link>
						</p>
					</div>
				</AuthForm>
			</div>
		</Layout>
	);
};
export default ForgotPassword;
