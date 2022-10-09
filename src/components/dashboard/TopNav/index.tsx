import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	Notification,
	UserIcon,
	Contact,
	Headset,
	Logout,
	UserPlus,
	SettingsAlt,
	SpotExchange,
	CryptoSwap,
	P2P,
	Loans,
	LiquidityPool,
	Staking,
	CaretDown,
	Menu,
	Close,
	MarketMenu,
	P2PMenu,
	TradeMenu,
	SwapMenu,
	DefiMenu,
	MoreMenu,
	WalletMenu,
} from "../../../assets";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../../redux/actions/auth.action";
import { storageService } from "../../../services";

interface Props {
	fixed?: boolean;
	wSection?: boolean;
}

const Header: React.FC<Props> = ({ fixed = true, wSection = false }) => {
	const authData = storageService.getAuthData();
	const dispatch = useDispatch();
	const router = useRouter();
	const [isActive, setIsActive] = useState(false);
	const menuToggle = () => {
		setIsActive(!isActive);
	};
	const performLogout = () => {
		router.push("/").then(() => dispatch(logout()));
	};
	return (
		<div data-testid={"rg-dashboard-topnav"}>
			<div
				className={`${
					fixed ? "fixed top-0" : ""
				} z-10 w-full text-white flex shadow-sm p-4 lg:px-20 justify-between items-center dashboard__header  ${
					wSection
						? "bg-headerColor sm:bg-transparent absolute top-0"
						: "bg-headerColor"
				} `}
			>
				<div className="flex space-x-12 ">
					<Link href="https://rocketglobal.io/">
						<a>
							<Image
								src={"/img/logo-white.png"}
								quality={"100"}
								alt={"Rocket global logo"}
								width={69}
								height={48}
							/>
						</a>
					</Link>
					<div className="hidden lg:flex items-center space-x-12">
						<Link href="/market">
							<a className="dashboard__header__link">Markets </a>
						</Link>
						<Link href="/trade/BTC_USDT">
							<a className="dashboard__header__link">Trade </a>
						</Link>
						{/* <div className="user-group relative h-full dashboard__header__link">
							<a href="#" className="flex items-center h-full">
								Trade
								<CaretDown />
							</a>
							<div className="hidden user-group-hover:block absolute pin-r top-full w-48 bg-white">
								<Link href="/crypto-swap">
									<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<CryptoSwap className="mr-2.5" />{" "}
										<span className="dashboard__header__sublink">
											Crypto Swap
										</span>
									</a>
								</Link>
								<Link href="/trade/BTC_USDT">
									<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<SpotExchange className="mr-2.5" />{" "}
										<span className="dashboard__header__sublink">
											Spot Exchange
										</span>
									</a>
								</Link>
								<Link href="/p2p/listings">
									<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<P2P className="mr-2.5" />{" "}
										<span className="dashboard__header__sublink">P2P</span>
									</a>
								</Link>
							</div>
						</div> */}
						<Link href="/p2p/listings">
							<a className="dashboard__header__link">P2P </a>
						</Link>
						<Link href="/crypto-swap">
							<a className="dashboard__header__link">Crypto Swap </a>
						</Link>
						<Link href="/defi-staking">
							<a className="dashboard__header__link">DeFi Staking </a>
						</Link>
						{/* <div className="user-group relative h-full dashboard__header__link">
							<a href="#" className="flex items-center h-full">
								Finance
								<CaretDown />
							</a>
							<div className="hidden user-group-hover:block absolute pin-r top-full w-48 bg-white">
								<Link href="#">
									<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<Loans className="mr-2.5" />{" "}
										<span className="dashboard__header__sublink">Loans</span>
									</a>
								</Link>
								<Link href="#">
									<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<LiquidityPool className="mr-2.5" />{" "}
										<span className="dashboard__header__sublink">
											Liquidity Pool
										</span>
									</a>
								</Link>
								<Link href="#">
									<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<Staking className="mr-2.5" />{" "}
										<span className="dashboard__header__sublink">Staking</span>
									</a>
								</Link>
							</div>
						</div>
						<div className="user-group relative h-full dashboard__header__link">
							<a href="#" className="flex items-center h-full">
								More
								<CaretDown />
							</a>
							<div className="hidden user-group-hover:block absolute pin-r top-full w-48 bg-white">
								<Link href="/dashboard">
									<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<UserIcon className="mr-2.5" />{" "}
										<span className="dashboard__header__sublink">
											Dashboard
										</span>
									</a>
								</Link>
								<Link href="#">
									<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<Contact className="mr-2.5" />{" "}
										<span className="dashboard__header__sublink">
											KYC Verification
										</span>
									</a>
								</Link>
								<Link href="/settings/account">
									<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<SettingsAlt className="mr-2.5" />{" "}
										<span className="dashboard__header__sublink">Settings</span>
									</a>
								</Link>
								<Link href="#">
									<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<UserPlus className="mr-2.5" />{" "}
										<span className="dashboard__header__sublink">Referral</span>
									</a>
								</Link>
								<Link href="#">
									<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<Headset className="mr-2.5" />{" "}
										<span className="dashboard__header__sublink">Support</span>
									</a>
								</Link>
							</div>
						</div> */}
					</div>
				</div>
				<div className="hidden lg:flex items-center space-x-7 text-gray-400 mr-3">
					{authData.access_token ? (
						<>
							<Link href="/wallet">
								<a className="dashboard__header__link">Wallet</a>
							</Link>

							<div className="user-group relative h-full dashboard__header__link">
								<a href="#" className="flex items-center h-full">
									<UserIcon />
									<CaretDown />
								</a>

								<div className="hidden user-group-hover:block absolute pin-r top-full w-48 bg-white">
									<Link href="/dashboard">
										<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
											<UserIcon className="mr-2.5" />{" "}
											<span className="dashboard__header__sublink">
												Dashboard
											</span>
										</a>
									</Link>
									<Link href="/settings/security">
										<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
											<SettingsAlt className="mr-2.5" />{" "}
											<span className="dashboard__header__sublink">
												Settings
											</span>
										</a>
									</Link>
									<Link href="#">
										<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
											<UserPlus className="mr-2.5" />{" "}
											<span className="dashboard__header__sublink">
												Referral
											</span>
										</a>
									</Link>
									<Link href="#">
										<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
											<Headset className="mr-2.5" />{" "}
											<span className="dashboard__header__sublink">
												Support
											</span>
										</a>
									</Link>
									<Link href="#">
										<a
											className="flex border-t border-gray-300 text-left py-3 px-3 text-black hover:text-blue-dark text-small"
											onClick={performLogout}
										>
											<Logout className="mr-2.5" />{" "}
											<span className="dashboard__header__sublink">Logout</span>
										</a>
									</Link>
								</div>
							</div>
						</>
					) : (
						<>
							<Link href="/register">
								<a className="dashboard__header__link">Sign Up</a>
							</Link>
							<Link href="/">
								<a className="dashboard__header__link">Sign In</a>
							</Link>
						</>
					)}
				</div>
				{/* Mobile TopNav buttons */}
				<div className="lg:hidden flex space-x-4 items-center">
					{authData.access_token ? (
						<Link href="/settings/account">
							<a className="flex items-center h-full">
								<UserIcon />
							</a>
						</Link>
					) : (
						""
					)}
					<Menu
						data-testid="rg-topnav-hamburger"
						onClick={menuToggle}
						aria-label={"Open menu Icon"}
					/>
				</div>
			</div>
			{/* mobile menu */}
			<div
				data-testid={"rg-mobile-menu"}
				className={`z-10 lg:hidden bg-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
					!isActive && "-translate-x-full"
				} lg:relative lg:translate-x-0 transition duration-200 ease-in-out`}
			>
				<Close
					data-testid="rg-topnav-close-icon"
					onClick={menuToggle}
					style={{ float: "right", marginRight: "1rem" }}
				/>
				{/* nav */}
				<nav>
					{authData.access_token && authData.uid && (
						<Link href="/dashboard">
							<a className="sidebar__title py-2.5 flex px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-primary-400">
								<span className="w-4 h-4 mr-4"><MoreMenu/></span>Dashboard
							</a>
						</Link>
					)}
					<Link href="/market">
						<a className="sidebar__title py-2.5 flex px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-primary-400">
							<span className="w-4 h-4 mr-4"><MarketMenu/></span>Markets
						</a>
					</Link>
					<Link href="/trade/BTC_USDT">
						<a className="sidebar__title flex py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-primary-400">
							<span className="w-4 h-4 mr-4"><TradeMenu/></span>Trade
						</a>
					</Link>
					{/* <div className="sidebar__tabs">
						<div className="sidebar__tab">
							<div className="relative">
								<input
									className="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6"
									type="checkbox"
									id="chck3"
								/>
								<header className="flex justify-between items-center px-4 py-2.5 cursor-pointer select-none sidebar__tab-label">
									<span className="sidebar__title text-grey-darkest font-thin text-xl">
										Trade
									</span>
									<div className="w-7 h-7 flex items-center justify-center sidebar__tab-icon">
										<CaretDown />
									</div>
								</header>
								<div className="sidebar__tab-content">
									<div className="p-4 text-grey-darkest">
										<ul className="pl-4 pr-4">
											<li className="pb-4 sidebar__subtitle">
												<Link href="/crypto-swap">
													<a>Crypto Swap</a>
												</Link>
											</li>
											<li className="pb-4 sidebar__subtitle">
												<Link href="/trade/BTC_USDT">
													<a>Spot Exchange</a>
												</Link>
											</li>
											<li className="sidebar__subtitle">
												<Link href="/p2p/listings">
													<a>P2P</a>
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div> */}
					<Link href="/p2p/listings">
						<a className="sidebar__title flex py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-primary-400">
							<span className="w-4 h-4 mr-4"><P2PMenu/></span>P2P
						</a>
					</Link>
					<Link href="/crypto-swap">
						<a className="sidebar__title flex py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-primary-400">
							<span className="w-4 h-4 mr-4"><SwapMenu/></span>Crypto Swap
						</a>
					</Link>
					<Link href="/defi-staking">
						<a className="sidebar__title flex py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-primary-400">
							<span className="w-4 h-4 mr-4"><DefiMenu/></span>DeFi Staking
						</a>
					</Link>
					{/* <div className="sidebar__tabs">
						<div className="sidebar__tab">
							<div className="relative">
								<input
									className="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6"
									type="checkbox"
									id="chck3"
								/>
								<header className="flex justify-between items-center px-4 py-2.5 cursor-pointer select-none sidebar__tab-label">
									<span className="sidebar__title text-grey-darkest font-thin text-xl">
										Finance
									</span>
									<div className="w-7 h-7 flex items-center justify-center sidebar__tab-icon">
										<CaretDown />
									</div>
								</header>
								<div className="sidebar__tab-content">
									<div className="p-4 text-grey-darkest">
										<ul className="pl-4 pr-4">
											<li className="pb-4 sidebar__subtitle">
												<Link href="#">
													<a>Loans</a>
												</Link>
											</li>
											<li className="pb-4 sidebar__subtitle">
												<Link href="#">
													<a>Staking</a>
												</Link>
											</li>
											<li className="sidebar__subtitle">
												<Link href="#">
													<a>Liquidity Pool</a>
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div> */}
					{authData.access_token ? (
						<>
							<div className="sidebar__tabs">
								<div className="sidebar__tab">
									<div className="relative">
										<input
											className="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6"
											type="checkbox"
											id="chck3"
										/>
										<header className="flex justify-between items-center px-4 py-2.5 cursor-pointer select-none sidebar__tab-label">
											<span className="sidebar__title flex text-grey-darkest font-thin text-xl">
											 <span className="w-4 h-4 mr-4"><MoreMenu/></span>More
											</span>
											<div className="w-7 h-7 flex items-center justify-center sidebar__tab-icon">
												<CaretDown />
											</div>
										</header>
										<div className="sidebar__tab-content">
											<div className="p-4 text-grey-darkest">
												<ul className="pl-4 pr-4">
													<li className="pb-4 sidebar__subtitle">
														<Link href="/dashboard">
															<a>Dashboard</a>
														</Link>
													</li>
													{/* <li className="pb-4 sidebar__subtitle">
														<Link href="#">
															<a>KYC Verification</a>
														</Link>
													</li> */}
													<li className="pb-4 sidebar__subtitle">
														<Link href="/settings/security">
															<a>Settings</a>
														</Link>
													</li>
													{/* <li className="pb-4 sidebar__subtitle">
														<Link href="#">
															<a>Referral</a>
														</Link>
													</li>
													<li className="pb-4 sidebar__subtitle">
														<Link href="#">
															<a>Support</a>
														</Link>
													</li> */}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<Link href="/wallet">
								<a className="sidebar__title flex py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-primary-400">
									<span className="w-4 h-4 mr-4"><WalletMenu/></span>Wallet
								</a>
							</Link>
							{/* <Link href="#">
								<a className="sidebar__title border-t border-gray-300 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-primary-400">
									Downloads
								</a>
							</Link>
							<Link href="#">
								<a className="sidebar__title block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-primary-400">
									USD
								</a>
							</Link> */}
							<Link href="#">
								<a
									className="sidebar__title block py-2.5 px-4 my-4 rounded transition duration-200 text-white text-center bg-error-main"
									onClick={performLogout}
								>
									Logout
								</a>
							</Link>
						</>
					) : (
						<>
							<Link href="/register">
								<a className="sidebar__title block py-2.5 px-4 mt-4 rounded transition duration-200 text-center hover:bg-blue-700 hover:text-primary-400">
									Sign Up
								</a>
							</Link>
							<Link href="/">
								<a className="sidebar__title block py-2.5 px-4 rounded transition duration-200 text-white text-center bg-primary-400">
									Sign In
								</a>
							</Link>
						</>
					)}
				</nav>
			</div>
		</div>
	);
};

export default Header;
