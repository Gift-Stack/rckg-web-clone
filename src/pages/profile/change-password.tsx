import { ProfileSettingsLayout } from "../../components/layout/ProfileSettingLayout";
import BackComponent from "../../components/profile-settings/BackComponent";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Button from "../../components/button";
import { ButtonState } from "../../components/button/enum";
import Input from "../../components/input";
import { CancelEye, Eye } from "../../assets";
import { changePasswordAsync, togglePasswordInput } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changePasswordSchema } from "../../validations";

const Index = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { email, loading, old_password, new_password } = useSelector(
		(state: RootState) => state.auth
	);

	const formik = useFormik({
		initialValues: {
			password: "",
			old_password: "",
		},
		validationSchema: changePasswordSchema,
		onSubmit: (values) => {
			const changePasswordData = {
				newPassword: values.password,
				oldPassword: values.old_password,
			};
			dispatch(
				changePasswordAsync(
					changePasswordData,
					() => {
						router.push(`/profile/confirm-password`).then();
					},
					() => {}
				)
			);
		},
	});

	return (
		<ProfileSettingsLayout
			title={"Rocket Global Change password"}
			keywords={"Rocket global"}
			description={"Rocket"}
		>
			<>
				<BackComponent path={"/settings/account"} />
				<div className={"bg-white py-10 px-2 lg:px-72"}>
					<div className={"lg:container "}>
						<div>
							<form
								onSubmit={formik.handleSubmit}
								data-testid={"change-password-form"}
								className={"profile__change-password"}
							>
								<div className={"mb-10"}>
									<h3 className={"text-center text-headline text-neutral-400 "}>
										Change account password
									</h3>
									<p
										className={
											"mt-6 text-center text-sm-regular text-neutral-300"
										}
									>
										An OTP will be sent to your registered email address{" "}
										{email && email}. The code expires after a 5 minutes.
									</p>
								</div>
								<div className={"mb-6"}>
									<Input
										name={"old_password"}
										type={old_password ? "text" : "password"}
										label={"Enter Old Password"}
										placeholder={"Enter Old Password"}
										icon={
											old_password ? (
												<CancelEye
													onClick={() =>
														dispatch(togglePasswordInput("old_password"))
													}
												/>
											) : (
												<Eye
													onClick={() =>
														dispatch(togglePasswordInput("old_password"))
													}
												/>
											)
										}
										required={true}
										formik={formik}
										onChange={formik.handleChange}
										value={formik.values.old_password}
									/>
								</div>
								<div className={"mb-6"}>
									<Input
										name={"password"}
										type={new_password ? "text" : "password"}
										label={"Enter New Password"}
										placeholder={"Choose a Password"}
										icon={
											new_password ? (
												<CancelEye
													onClick={() =>
														dispatch(togglePasswordInput("new_password"))
													}
												/>
											) : (
												<Eye
													onClick={() =>
														dispatch(togglePasswordInput("new_password"))
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
								<Button
									disabled={loading}
									variant={ButtonState.PRIMARY}
									value={loading ? "Loading...." : "Continue"}
									style={{ width: "100%" }}
									type={"submit"}
								/>
							</form>
						</div>
					</div>
				</div>
			</>
		</ProfileSettingsLayout>
	);
};

export default Index;
