import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavProps } from "./model";

const Sidebar: React.FC<NavProps> = ({ links }) => {
	const { pathname } = useRouter();

	return (
		<>
			<div
				className="top-0 lg:hidden bg-white -mt-6 -mx-5 px-5 mb-6"
				data-testid={"rg-wallet-topnav"}
			>
				<div className="py-3 space-y-14">
					<div className="flex justify-between">
						{links?.map(({ uri, title }, index) => (
							<div
								key={index}
								className={`${
									pathname === uri ? "wallet_nav_link_active" : ""
								}`}
							>
								<Link href={uri}>
									<a>
										<div
											className={
												"text-gray-700 hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
											}
										>
											<p
												data-testid={`rg-wallet-topnav-link-${index}`}
												className={`text-sm-regular ${
													pathname === uri ? "text-black" : ""
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

export default Sidebar;
