import React from "react";
import Link from "next/link";
import AppDownload from "../appDownload";
import { AppIcon } from "../appDownload/enum";
import { useRouter } from "next/router";
import { NavProps } from "./model";

const Sidebar: React.FC<NavProps> = ({ links }) => {
	const { pathname } = useRouter();

	const handleClick = () => {};
	return (
		<div
			className="sticky top-0 h-screen hidden lg:flex flex-col justify-between bg-white shadow-2xl"
			data-testid={"rg-wallet-sidebar"}
		>
			<div className="px-3 pb-8 space-y-14 pt-32">
				<div className="space-y-4">
					{links?.map(({ uri, title }, index) => (
						<div
							key={index}
							className={`${
								pathname === uri
									? "wallet__sidebar__link--active"
									: "wallet__sidebar__link"
							}`}
						>
							<Link href={uri}>
								<a>
									<div className="flex wallet__sidebar__link__parent text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
										<p
											data-testid={`rg-wallet-sidebar-link-${index}`}
											className={`${
												pathname === uri
													? "wallet__sidebar__link__title--active text-black"
													: "wallet__sidebar__link__title"
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
				handleClick={handleClick}
			/>
		</div>
	);
};

export default Sidebar;
