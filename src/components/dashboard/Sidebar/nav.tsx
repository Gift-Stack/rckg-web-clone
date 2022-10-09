import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavProps } from "../wallet/model";
import {
	SideBarWallet,
	SideBarStack,
	SideBarDashboard,
	SideBarSettings,
} from "../../../assets/svg";

type Props = {};

const Navbar: React.FC<Props> = () => {
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
		<>
			<div
				className="top-0 lg:hidden bg-white -mt-6 -mx-5 px-5 mb-6"
				data-testid={"rg-dashboard-topnav"}
			>
				<div className="py-3 space-y-14">
					<div className="flex space-x-6 overflow-x-auto">
						{links?.map(({ uri, title, icon, tab }, index) => (
							<div
								key={index}
								className={`${
									pathname.includes(uri) ? "dashboard_nav_link_active" : ""
								}`}
							>
								<Link href={tab ? `${uri}/${tab}` : uri}>
									<a>
										<div
											className={
												"flex text-gray-700 space-x-3 hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
											}
										>
											{icon({
												fill: `${
													pathname.includes(uri) ? "#0069FF" : "#607695"
												}`,
											})}
											<p
												data-testid={`rg-dashboard-topnav-link-${index}`}
												className={`text-sm-regular ${
													pathname.includes(uri)
														? "text-black dashboard_nav_inner_link_active"
														: ""
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
			</div>
		</>
	);
};

export default Navbar;
