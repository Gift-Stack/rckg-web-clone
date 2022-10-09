import * as Yup from "yup";
import moment from "moment";

const max = moment(new Date()).subtract(18, "years").format("YYYY-MM-DD");

export const basicProfileSchema = () => {
	return Yup.object().shape({
		firstName: Yup.string().required("Please Enter your First Name"),
		lastName: Yup.string().required("Please Enter your Last Name"),
		middleName: Yup.string(),
		dateOfBirth: Yup.date().max(max, "You must be at least 18 years of age"),
		address: Yup.string().required("Enter a valid address"),
		country: Yup.string().required("Select a country"),
		gender: Yup.string().required("Select a gender"),
		city: Yup.string().required("Select a city"),
		state: Yup.string().required("Select a State"),
	});
};
