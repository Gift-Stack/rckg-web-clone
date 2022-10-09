import { ProfileSettingsLayout } from "../components/layout/ProfileSettingLayout";
import BackComponent from "../components/profile-settings/BackComponent";
import Button from "../components/button";
import { showModal } from "redux/actions/modal.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { ModalTypesEnum } from "../components/modals/modalTypes";

const DisableAccount = () => {
	// const { showModal } = useSelector((state: RootState) => state.modal);
	const dispatch = useDispatch();

	// Initial modal funtion for confirmations
	const confirmSubmit = () => {
		dispatch(showModal(ModalTypesEnum.DISABLE_ACCOUNT_VERIFICATION));
	};

	return (
		<ProfileSettingsLayout
			title={"Rocket Global Profile Settings"}
			keywords={"Rocket global"}
			description={"Rocket"}
		>
			<>
				<BackComponent path={"/settings/account"} />
				<div
					className={
						"bg-white py-10 px-2 lg:px-72 flex flex-col items-center gap-4"
					}
				>
					<h2 className="text-l-headline text-neutral-400 font-bold">
						Disable Account
					</h2>
					<div>
						<p className="text-neutral-300 text-left text-buttonText">
							Why do you want to disable your account?
						</p>
						<textarea
							className="resize-none border w-31 h-40 p-3 focus:outline-none text-sm bg-primary-100 border-primary-100"
							placeholder="Reason"
							style={{ width: "31rem" }}
						/>
					</div>
					<Button
						value={"Disable this account"}
						style={{ width: "31rem" }}
						onClick={confirmSubmit}
					/>
				</div>
			</>
		</ProfileSettingsLayout>
	);
};

export default DisableAccount;
