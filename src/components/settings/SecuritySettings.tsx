import {
	SecurityKey,
	Envelop,
	CaretUp,
	PasswordKey,
	CaretDownBlue,
} from "./../../assets";
import Button from "./../../components/button";
import { ButtonState, ButtonSize } from "./../../components/button/enum";
import React, { FC, useCallback, useState } from "react";
import MobileAuthenticator from "./MobileAuthenticator";
import MobileSettingsCard from "./MobileSettingsCard";
import SecurityRating from "./SecurityRating";
import SettingsCard from "./SettingsCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/router";
import { withProvider } from "../../hoc/withProvider";
import {
	toggleEmailAuthAsync,
	toggleSmsAuthAsync,
} from "../../redux/actions/settings.action";
import { useDebounceDispatch } from "../../hooks/useDebounceDispatch";

const SecuritySettings: FC = () => {
	const [showTwoFA, setShowTwoFA] = useState(true);
	const [showAuthSetup, setShowAuthSetup] = useState(false);
	const { isPhoneVerify, isEmailVerify } = useSelector(
		(state: RootState) => state.auth
	);
	const { phoneAuthentication, emailAuthentication, loading } = useSelector(
		(state: RootState) => state.settings
	);

	const router = useRouter();

	const handleSetShowAuthSetUp = () => {
		setShowAuthSetup(!showAuthSetup);
	};
	const debouncedDispatch = useDebounceDispatch(500);

	const handleSmsSetup = useCallback(
		(isVerified: boolean) => {
			if (isVerified) {
				return debouncedDispatch(toggleSmsAuthAsync());
			}
			router.push(`/profile/phone-verification`).then();
		},
		[debouncedDispatch, router]
	);

	const handleEmailAuth = useCallback(
		(isVerified: boolean) => {
			if (isVerified) {
				return debouncedDispatch(toggleEmailAuthAsync());
			}
			return;
			router.push(`/profile/phone-verification`).then();
		},
		[debouncedDispatch, router]
	);

	return (
		<div>
			{!showAuthSetup && (
				<div>
					<h1 className="text-md-headline font-bold mb-3">Security Settings</h1>
					<SecurityRating rating="WEAK" />
					<div className="hidden lg:block">
						<div className={`flex flex-nowrap mt-8 w-full`}>
							<div className="w-12">
								<SecurityKey />
							</div>
							<div className="flex  lg:justify-between w-full items-start lg:items-center flex-row border-b border-primary-100 pb-7">
								<div className="flex-1 mb-3 lg:mb-0">
									<p className="text-sm-headline font-bold text-neutral-400">
										Two-factor Authentication
									</p>
									<p className="text-gray-400 max-w-screen-sm">
										It is used as a safety verification when you log in,
										withdraw or change safety settings. If you can not receive
										SMS code smoothly, you may use google authentication
										instead.
									</p>
								</div>
								<div className="flex w-24 h-10 items-center justify-center cursor-pointer">
									{showTwoFA ? (
										<CaretUp
											onClick={() => setShowTwoFA(false)}
											data-testid={"rg-hide-2fa"}
										/>
									) : (
										<CaretDownBlue
											onClick={() => setShowTwoFA(true)}
											data-testid={"rg-show-2fa"}
										/>
									)}
								</div>
							</div>
						</div>

						{showTwoFA && (
							<div className="lg:ml-11" data-testid={"rg-2fa-area"}>
								<SettingsCard
									title="SMS Setup"
									description="To protect your security, withdrawals."
									icon={<Envelop />}
									button={
										<Button
											variant={ButtonState.OUTLINE}
											size={ButtonSize.sm}
											disabled={loading}
											value={phoneAuthentication ? "Turn Off" : "Turn On"}
											onClick={() => handleSmsSetup(isPhoneVerify)}
											style={{ width: "6rem" }}
										/>
									}
									fullBorderBottom
								/>
								<SettingsCard
									disabled={true}
									title="Google Authentication"
									description="It is used as a safety verification when you log in,
										withdraw or change safety settings. 
										If you can not receive SMS code smoothly, you may use google authentication instead."
									icon={<SecurityKey />}
									button={
										<Button
											variant={ButtonState.OUTLINE}
											size={ButtonSize.sm}
											disabled={true}
											value="Setup"
											onClick={() => {}}
											style={{ width: "6rem" }}
										/>
									}
									fullBorderBottom
								/>
								<SettingsCard
									title="Email Authentication"
									description="It is used as a safety verification when you log in,
                                    withdraw or change safety settings. If you can not receive SMS code smoothly, you may use google authentication instead."
									icon={<SecurityKey />}
									button={
										<Button
											variant={ButtonState.OUTLINE}
											size={ButtonSize.sm}
											value={emailAuthentication ? "Turn Off" : "Turn On"}
											onClick={() => handleEmailAuth(isEmailVerify)}
											style={{ width: "6rem" }}
										/>
									}
									fullBorderBottom
								/>
							</div>
						)}
						<SettingsCard
							title="Password"
							description="When resetting it, you will be logged out automatically"
							icon={<PasswordKey />}
							button={
								<Button
									variant={ButtonState.OUTLINE}
									size={ButtonSize.sm}
									value="Change"
									onClick={() => router.push("/profile/change-password")}
									style={{ width: "6rem" }}
								/>
							}
							partBorderBottom
						/>
					</div>
				</div>
			)}

			{showAuthSetup && (
				<MobileAuthenticator
					handleEmailAuth={handleEmailAuth}
					handleSmsSetup={handleSmsSetup}
					handleSetShowAuthSetUp={handleSetShowAuthSetUp}
					isPhoneVerify={isPhoneVerify}
					isEmailVerify={isEmailVerify}
					phoneAuthentication={phoneAuthentication}
					emailAuthentication={emailAuthentication}
				/>
			)}
			{!showAuthSetup && (
				<div className="lg:hidden">
					<MobileSettingsCard
						title="Two-factor Authentication"
						description="It is used as a safety verification when you log in  or change safety settings."
						icon={<SecurityKey />}
						button={
							<Button
								variant={ButtonState.OUTLINE}
								size={ButtonSize.sm}
								value="Setup"
								onClick={() => setShowAuthSetup(true)}
								style={{ width: "6rem" }}
							/>
						}
						borderBottom
						hideUnsetButton
					/>
					<MobileSettingsCard
						title="Password"
						description="When resetting it, you will be logged out automatically"
						icon={<PasswordKey />}
						button={
							<Button
								variant={ButtonState.OUTLINE}
								size={ButtonSize.sm}
								value="Change"
								onClick={() => router.push("/profile/change-password")}
								style={{ width: "6rem" }}
							/>
						}
						borderBottom
						hideUnsetButton
					/>
				</div>
			)}
		</div>
	);
};

export default withProvider(SecuritySettings);
