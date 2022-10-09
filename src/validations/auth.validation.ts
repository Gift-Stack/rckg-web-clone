import * as Yup from "yup";
import { passwordRegExp, phoneRegExp } from "../constants";

export const SignupSchemaEmail = () => {
	return Yup.object().shape({
		email: Yup.string()
			.email("A valid email address is required")
			.required("A valid email address is required"),
		password: Yup.string()
			.required("Please Enter your password")
			.matches(
				passwordRegExp,
				"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
			),
	});
};

export const SignupSchemaPhone = () => {
	return Yup.object().shape({
		phone: Yup.string()
			.matches(phoneRegExp, "Phone number is not valid")
			.required("Phone number is required"),
		password: Yup.string()
			.required("Please Enter your password")
			.matches(
				passwordRegExp,
				"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
			),
	});
};

export const loginSchemaPhone = () => {
	return Yup.object().shape({
		phone: Yup.string()
			.matches(phoneRegExp, "Phone number is not valid")
			.required("Phone number is required"),
		// loginPassword: Yup.string()
		// 	.required("Please Enter your password")
		// 	.matches(
		// 		passwordRegExp,
		// 		"Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 special  Character"
		// 	),
	});
};

export const loginSchemaEmail = () => {
	return Yup.object().shape({
		email: Yup.string()
			.email("Please enter a valid email address")
			.required("Please enter a valid email address"),
		// loginPassword: Yup.string()
		// 	.required("Please Enter your password")
		// 	.matches(
		// 		passwordRegExp,
		// 		"Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 special  Character"
		// 	),
	});
};

export const forgotPasswordSchema = () => {
	return Yup.object().shape({
		email: Yup.string()
			.email("Please enter a valid email address")
			.required("Email is required"),
	});
};

export const changePasswordSchema = () => {
	return Yup.object().shape({
		old_password: Yup.string().required("Please Enter your old password"),
		password: Yup.string()
			.required("Please a new ¥ password")
			.matches(
				passwordRegExp,
				"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
			),
	});
};

export const resetPasswordSchema = () => {
	return Yup.object({
		password: Yup.string()
			.required("Password is required")
			.matches(
				passwordRegExp,
				"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
			),
		confirmResetPassword: Yup.string().oneOf(
			[Yup.ref("password"), null],
			"Passwords must match"
		),
	});
};
