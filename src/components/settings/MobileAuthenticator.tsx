import React, { FC, MouseEventHandler } from "react";
import { ArrowLeftGray, Envelop, SecurityKey } from "./../../assets";
import Button from "./../../components/button";
import { ButtonState, ButtonSize } from "./../../components/button/enum";
import MobileSettingsCard from "./MobileSettingsCard";

interface MobileAuthenticatorProps {
	handleSetShowAuthSetUp: MouseEventHandler;
	handleEmailAuth: Function;
	handleSmsSetup: Function;
	isPhoneVerify: boolean;
	emailAuthentication: boolean;
	phoneAuthentication: boolean;
	isEmailVerify: boolean;
}

const MobileAuthenticator: FC<MobileAuthenticatorProps> = ({
	isEmailVerify,
	handleSetShowAuthSetUp,
	handleEmailAuth,
	handleSmsSetup,
	isPhoneVerify,
	emailAuthentication,
	phoneAuthentication,
}) => {
	return (
		<>
			<div data-testid={"authenticator"}>
				<div className="relative">
					<div
						data-testid="rg-authenticator-back-button"
						className="absolute top-3 left-1"
						onClick={handleSetShowAuthSetUp}
					>
						<ArrowLeftGray />
					</div>
					<p className="w-full text-center font-bold text-neutral-400 text-headline">
						Authenticator
					</p>
				</div>
				<MobileSettingsCard
					title="SMS Setup"
					description="To protect your security, withdrawals."
					icon={<Envelop />}
					button={
						<Button
							variant={ButtonState.OUTLINE}
							size={ButtonSize.sm}
							value={phoneAuthentication ? "Turn Off" : "Turn On"}
							onClick={() => handleSmsSetup(isPhoneVerify)}
							style={{ width: "6rem" }}
						/>
					}
					borderBottom
				/>
				<MobileSettingsCard
					disabled={true}
					title="Google Authentication"
					description="It is used as a safety verification when you log in,
                    withdraw or change safety settings. 
                    If you can not receive SMS code smoothly, you may use google authentication instead."
					icon={<SecurityKey />}
					button={
						<Button
							disabled={true}
							variant={ButtonState.OUTLINE}
							size={ButtonSize.sm}
							value="Setup"
							onClick={() => {}}
							style={{ width: "6rem" }}
						/>
					}
					borderBottom
				/>
				<MobileSettingsCard
					title="Email Authentication"
					description="It is used as a safety verification when you log in, withdraw or change safety settings. If you can not receive SMS code smoothly, you may use google authentication instead."
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
				/>
			</div>
		</>
	);
};

export default MobileAuthenticator;
