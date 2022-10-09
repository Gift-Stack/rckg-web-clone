import { LoginActivity, MobileDevice, User } from "./../../assets";
import Button from "./../../components/button";
import { ButtonSize, ButtonState } from "./../../components/button/enum";
import React, { FC } from "react";
import SettingsCard from "./SettingsCard";
import { useRouter } from "next/router";

export interface AccountSettingsProps {
	firstName: string;
	email: string;
	phone: string;
}

const AccountSettings: FC<AccountSettingsProps> = ({
	firstName,
	email,
	phone,
}) => {
	const router = useRouter();

	return (
		<div>
			<h1
				data-testid="rg-account-headline"
				className="text-md-headline font-bold mb-4 lg:mb-12"
			>
				Account Settings
			</h1>
			<div className="flex flex-nowrap items-center">
				<div className="mr-1 mt-1">
					<User />
				</div>
				<p data-testid={"rg-account-username"} className="font-bold ml-3 ">
					Username
				</p>
			</div>
			<div
				data-testid={"rg-account-email-phone"}
				className="border-b pb-5 border-primary-100 mt-8 flex gap-3 lg:gap-32 flex-col lg:flex-row"
			>
				<div
					data-testid={"rg-account-name"}
					className="flex items-center justify-between lg:block"
				>
					<p className="text-labels mb-1 mr-5">Name</p>
					<h3 className="font-bold mt-px break-all">
						{firstName && firstName}
					</h3>
				</div>
				<div
					data-testid={"rg-account-email"}
					className="flex items-center justify-between lg:block"
				>
					<p className="text-labels mb-1">Email</p>
					<h3 className="font-bold mt-px">{email && email}</h3>
				</div>
				<div
					data-testid={"rg-account-phone"}
					className="flex items-center justify-between lg:block"
				>
					<p className="text-labels mb-1">Phone number</p>
					<h3 className="font-bold mt-px">{phone ? phone : null}</h3>
				</div>
			</div>
			<SettingsCard
				title="Device Management"
				description="Manage devices allowed to access your account."
				icon={<MobileDevice />}
				button={
					<Button
						variant={ButtonState.OUTLINE}
						size={ButtonSize.sm}
						value="Manage"
						onClick={() => router.push("/profile/login-activities")}
						style={{ width: "6rem" }}
					/>
				}
				partBorderBottom
			/>
			<SettingsCard
				disabled={true}
				title="Account Activity"
				description="Last login: 2021-08-05 12:09:21"
				icon={<LoginActivity />}
				text={
					<p className="text-primary-600">
						<span className="text-gray-600 cursor-pointer">
							Suspicious account activity?{" "}
						</span>
						<span
							className="text-primary-400 cursor-pointer underline"
							onClick={() => router.push(`/disable-account`)}
						>
							Disable account
						</span>
					</p>
				}
				button={
					<Button
						disabled={true}
						variant={ButtonState.OUTLINE}
						size={ButtonSize.sm}
						value="View"
						onClick={() => router.push(`/disable-account`)}
						style={{ width: "6rem" }}
					/>
				}
			/>
		</div>
	);
};
export default AccountSettings;
