import { NextPage } from "next";
import {
	AuthForm,
	AuthSidePanel,
	FormHeading,
} from "../components/authentication";
import { CancelEye, Eye, ResetPasswordSide } from "../assets";
import { Layout } from "../components";
import Input from "../components/input";
import { resetPasswordAsync, togglePasswordInput } from "../redux/actions";
import Button from "../components/button";
import { ButtonSize, ButtonState } from "../components/button/enum";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { resetPasswordSchema } from "../validations";

const ResetPassword: NextPage = () => {
	const { confirmResetPassword, resetPassword } = useSelector(
		(state: RootState) => state.auth
	);
	const dispatch = useDispatch();
	const router = useRouter();
	const { token }: any = router.query;

	const formik = useFormik({
		initialValues: {
			password: "",
			confirmResetPassword: "",
		},
		validationSchema: resetPasswordSchema,
		onSubmit: (values) => {
			dispatch(
				resetPasswordAsync(
					{ newPassword: values.password, resetPasswordToken: token },
					() => {
						router.push(`/`).then();
					}
				)
			);
		},
	});

	return (
		<Layout
			title={"Rocket Global Reset password"}
			keywords={"Login, Rocket, password, reset"}
			description={""}
		>
			<div className="flex auth">
				<AuthSidePanel svg={<ResetPasswordSide />} />

				<AuthForm handleSubmit={formik.handleSubmit}>
					<FormHeading
						heading={"Create New Password"}
						subHeading={
							"Your new password must be different from previously used passwords."
						}
					/>

					<div className={"mb-8"}>
						<Input
							name={"password"}
							type={resetPassword ? "text" : "password"}
							label={"Enter New Password"}
							placeholder={"Choose a Password"}
							icon={
								resetPassword ? (
									<CancelEye
										onClick={() =>
											dispatch(togglePasswordInput("resetPassword"))
										}
									/>
								) : (
									<Eye
										onClick={() =>
											dispatch(togglePasswordInput("resetPassword"))
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
					<div className={"mb-16"}>
						<Input
							name={"confirmResetPassword"}
							type={confirmResetPassword ? "text" : "password"}
							label={"Confirm Password"}
							placeholder={"Choose a Password"}
							icon={
								confirmResetPassword ? (
									<CancelEye
										onClick={() =>
											dispatch(togglePasswordInput("confirmResetPassword"))
										}
									/>
								) : (
									<Eye
										onClick={() =>
											dispatch(togglePasswordInput("confirmResetPassword"))
										}
									/>
								)
							}
							required={true}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.confirmResetPassword}
						/>
					</div>

					<div className={"auth__btnSection"}>
						<Button
							variant={ButtonState.PRIMARY}
							value={"Create New Password"}
							size={ButtonSize.lg}
							type={"submit"}
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

export default ResetPassword;
