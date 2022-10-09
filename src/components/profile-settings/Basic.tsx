import Input from "../input";
import Select from "../input/select";
import { SecurityIcon } from "../../assets";
import Button from "../button";
import { ButtonState } from "../button/enum";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateProfileAsync } from "../../redux/actions";
import { withProvider } from "../../hoc/withProvider";
import { useRouter } from "next/router";
import moment from "moment";
import { basicProfileSchema } from "../../validations";
import { findCountry, generateCities } from "../../utils";

interface BasicInfoProps {
	values: Record<string, any>;
	countries: any[];
}

const Basic: FC<BasicInfoProps> = ({ values, countries }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [countriesSelect, setCountriesSelect] = useState<any[]>([]);
	const [citiesSelect, setCitySelect] = useState([]);

	useEffect(() => {
		const value = countries.map((country) => {
			return {
				text: country.name,
				value: country.name,
			};
		});
		setCountriesSelect(value);
		if (values.country) {
			const foundCountry = findCountry(countries, values.country);
			const cities = generateCities(foundCountry);
			setCitySelect(cities);
		}
	}, [countries, values]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			firstName: values.firstName ? values.firstName : "",
			lastName: values.lastName || "",
			middleName: values.middleName || "",
			dateOfBirth: values.dateOfBirth || "",
			address: values.address || "",
			country: values.country || "",
			gender: values.gender || "",
			city: values.city || "",
			state: values.state || "",
		},
		validationSchema: basicProfileSchema,
		onSubmit: (formValues) => {
			dispatch(
				updateProfileAsync(formValues, () => {
					router.push(`/profile/[tab]`, "/profile/1").then();
				})
			);
		},
	});

	const selectCity = (value: string) => {
		const foundCountry = findCountry(countries, value);
		let cities = generateCities(foundCountry);
		setCitySelect(cities);
	};

	return (
		<>
			<div>
				<form onSubmit={formik.handleSubmit} data-testid={"basic-form"}>
					<div className={"grid  grid-cols-1 md:grid-cols-2 gap-4"}>
						<Input
							name={"firstName"}
							label={"First Name"}
							placeholder={"First Name"}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.firstName}
							autoComplete="off"
						/>
						<Input
							name={"lastName"}
							label={"Last Name"}
							placeholder={"Last Name"}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.lastName}
							autoComplete="off"
						/>
						<Input
							name={"middleName"}
							label={"Other Names"}
							placeholder={"Other Names"}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.middleName}
							autoComplete="off"
						/>
						<Select
							placeholder={"Gender"}
							label={"Gender"}
							name={"gender"}
							options={[
								{ text: "Male", value: "Male" },
								{ text: "Female", value: "Female" },
								{
									text: "Others",
									value: "Others",
								},
							]}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.gender}
							autoComplete="off"
						/>
						<Input
							type={"date"}
							name={"dateOfBirth"}
							label={"Date of Birth"}
							placeholder={"Date of birth"}
							formik={formik}
							onChange={formik.handleChange}
							value={
								formik.values.dateOfBirth &&
								new Date(formik.values.dateOfBirth).toISOString().substr(0, 10)
							}
							autoComplete="off"
							max={moment(new Date())
								.subtract(18, "years")
								.format("YYYY-MM-DD")}
						/>
						<Input
							type={"address"}
							name={"address"}
							label={"Residential Address"}
							placeholder={"Enter your Residential Address"}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.address}
							autoComplete="off"
						/>
						<Select
							label={"Country"}
							name={"country"}
							options={countriesSelect}
							formik={formik}
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								formik.handleChange(e);
								selectCity(e.target.value);
							}}
							value={formik.values.country}
							autoComplete="off"
						/>
						<Select
							label={"City"}
							name={"city"}
							options={citiesSelect}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.city}
							autoComplete="off"
						/>
						<Input
							type={"text"}
							name={"state"}
							label={"State"}
							placeholder={"Enter your State"}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.state}
							autoComplete="off"
						/>
					</div>
					<div
						className={"flex items-center my-10 "}
						data-testid={"security-assurance"}
					>
						<SecurityIcon className="mr-1.5" />
						<p className={"text-neutral-300 text-sm-regular"}>
							Rocket Global will not share your personal details with third
							party applications.
						</p>
					</div>
					<div data-testid={"basic-button-area"}>
						<Button
							disabled={!formik.dirty}
							variant={ButtonState.PRIMARY}
							value={"Continue"}
							style={{ width: "100%" }}
							type={"submit"}
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export default withProvider(Basic);
