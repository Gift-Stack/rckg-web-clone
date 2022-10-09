import React from "react";
import Link from "next/link";
import {
	SideBarWallet,
	SideBarStack,
	SideBarDashboard,
	SideBarSettings,
} from "../../../assets/svg";
import AppDownload from "../appDownload";
import { AppIcon } from "../appDownload/enum";
import { useRouter } from "next/router";

type Props = {};

const Sidebar: React.FC<Props> = () => {
	const links = [
		{
			title: "Dashboard",
			uri: "/dashboard",
			icon: (props: any) => <SideBarDashboard {...props} />,
		},
		{
			title: "Transactions",
			uri: "/transactions",
			icon: (props: any) => <SideBarStack {...props} />,
		},
		// {
		// 	title: "Payments",
		// 	uri: "/payments",
		// 	icon: (props: any) => <SideBarWallet {...props} />,
		// },
		{
			title: "Wallet",
			uri: "/wallet",
			icon: (props: any) => <SideBarWallet {...props} />,
		},
		{
			title: "Settings",
			uri: "/settings",
			tab: "account",
			icon: (props: any) => <SideBarSettings {...props} />,
		},
	];
	const { pathname } = useRouter();

	return (
		<div
			className="sticky top-0 h-screen hidden lg:flex flex-col justify-between bg-white shadow-2xl"
			data-testid={"rg-dashboard-sidebar"}
		>
			<div className="px-3 pb-8 space-y-14 pt-32">
				<div className="space-y-4">
					{links?.map(({ uri, title, icon, tab }, index) => (
						<div
							key={index}
							className={`${
								pathname.includes(uri)
									? "sidebar__link--active"
									: "sidebar__link"
							}`}
						>
							<Link href={tab ? `${uri}/${tab}` : uri}>
								<a>
									<div className="flex sidebar__link__parent text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
										{icon({
											fill: `${pathname.includes(uri) ? "#0069FF" : "#607695"}`,
										})}
										<p
											className={`${
												pathname.includes(uri)
													? "sidebar__link__title--active"
													: "sidebar__link__title"
											}`}
										>
											{title}
										</p>
									</div>
								</a>
							</Link>
						</div>
					))}
				</div>
			</div>

			{/*    */}
			<AppDownload
				apps={[
					{
						id: 1,
						name: "App Store",
						icon: AppIcon.APP_STORE,
						url: "https://facebook.com",
					},
					{
						id: 2,
						name: "Play Store",
						icon: AppIcon.PLAY_STORE,
						url: "https://facebook.com",
					},
				]}
				handleClick={() => null}
			/>
		</div>
	);
};

export default Sidebar;
