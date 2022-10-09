import React, { FC } from "react";
import AccountVisibility from "./AccountVisibility";
import { AccountDetailsUIProps } from "./model";
import Router, { useRouter } from "next/router";

const AccountDetailsUI: FC<AccountDetailsUIProps> = ({
	icon,
	value,
	pathname,
	showTotalBalance,
	options,
	onClick,
	button1,
	button2,
	button3,
	btcBalance,
	usdtBalance,
}) => {
	return (
		<div
			data-testid="rg-account-details"
			className={"md:flex w-full md:mt-5 mt-0"}
		>
			<div className={"md:w-1/2 w-full"}>
				<div className={"flex items-center"}>
					<small className={"text-white text-labels"}></small>
					<select
						value={pathname}
						onChange={(e) => Router.push(e.target.value)}
						className={`select__account p-0.5 text-white`}
					>
						{options?.map(({ uri, title }, index) => (
							<option
								value={uri}
								key={index}
								data-testid="rg-account-details-option"
							>
								{title}
							</option>
						))}
					</select>
					<AccountVisibility icon={icon} value={value} onClick={onClick} />
				</div>
				<h1
					className={
						"xl:text-xl-heading md:text-headline text-md-headline font-bold mt-4 mb-4 text-white"
					}
				>
					{"$"}
					{showTotalBalance
						? usdtBalance
							? usdtBalance
							: 0.0
						: "xxxxxxxxx"}{" "}
					<span
						className={"text-labels sm:text-sm-headline font-medium text-white"}
					>
						{showTotalBalance ? (btcBalance ? btcBalance : 0.0) : "xxxxxxxxx"}
						BTC
					</span>
				</h1>
			</div>
			<div className={"md:w-1/2 w-full md:flex items-end"}>
				<div className={"w-full space-x-1.5 flex justify-end"}>
					{button1}
					{button2}
					{button3}
				</div>
			</div>
		</div>
	);
};

export default AccountDetailsUI;
