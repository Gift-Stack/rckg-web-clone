import { ProfileSettingsLayout } from "../../components/layout/ProfileSettingLayout";
import BackComponent from "../../components/profile-settings/BackComponent";
import Progress from "../../components/progress";
import { items } from "../../components/progress/data";
import { useEffect, useState } from "react";
import Basic from "../../components/profile-settings/Basic";
import { useRouter } from "next/router";
import PhoneVerification from "components/profile-settings/PhoneVerification";
import { useDispatch, useSelector } from "react-redux";
import { GetCountries } from "redux/actions";
import { RootState } from "redux/store";
import IdentityVerification from "../../components/profile-settings/IdentityVerification";
import { fetchProfileAsync } from "../../redux/actions/profile.action";

const ProfileSettings = () => {
	const router = useRouter();
	const {
		query: { tab },
	} = router;
	const dispatch = useDispatch();
	const {
		firstName,
		lastName,
		address,
		dateOfBirth,
		middleName,
		country,
		city,
		gender,
		state,
	} = useSelector((state: RootState) => state.profile);
	const { countries } = useSelector((state: RootState) => state.publics);
	const { isPhoneVerify } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		dispatch(GetCountries());
		return () => {};
		//eslint-disable-next-line
	}, []);
	useEffect(() => {
		dispatch(fetchProfileAsync());
		//eslint-disable-next-line
	}, []);

	return (
		<ProfileSettingsLayout
			title={"Rocket Global Profile Settings"}
			keywords={"Rocket global"}
			description={"Rocket"}
		>
			<>
				<BackComponent path={"/settings/account"} />
				<div className={"bg-white py-10 px-2 lg:px-72"}>
					<div className={"lg:container "}>
						<div className={"profile__progressArea mb-10"}>
							<Progress items={items} activeIndex={Number(tab)} />
						</div>
						{Number(tab) === 0 && (
							<Basic
								values={{
									firstName,
									lastName,
									address,
									dateOfBirth,
									middleName,
									country,
									city,
									gender,
									state,
								}}
								countries={countries}
							/>
						)}
						{Number(tab) === 1 && (
							<PhoneVerification
								countries={countries}
								isPhoneVerify={isPhoneVerify}
							/>
						)}
						{Number(tab) === 2 && <IdentityVerification />}
					</div>
				</div>
			</>
		</ProfileSettingsLayout>
	);
};

export default ProfileSettings;
