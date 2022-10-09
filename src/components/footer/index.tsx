import {
	RocketGlobalBlueIcon,
	EnvelopNeutral,
	InstagramNeutral,
	TwitterNeutral,
	RedditNeutral,
	TelegramNeutral,
	MediumNeutral,
} from "../../assets";
import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import { FooterProps } from "./model";

const Footer: FC<FooterProps> = ({ rows }) => {
	const socials = [
		{
			name: "instagram",
			link: "https://instagram.com/myrocketglobal?utm_medium=copy_link",
			icon: <InstagramNeutral />,
		},
		{
			name: "twitter",
			link: "https://twitter.com/myrocketglobal?s=21",
			icon: <TwitterNeutral />,
		},
		// {
		// 	name: "reddit",
		// 	link: "https://instagram.com/myrocketglobal?utm_medium=copy_link",
		// 	icon: <RedditNeutral />,
		// },
		// {
		// 	name: "medium",
		// 	link: "https://instagram.com/myrocketglobal?utm_medium=copy_link",
		// 	icon: <MediumNeutral />,
		// },
		{
			name: "telegram",
			link: "https://t.me/myrocketglobal",
			icon: <TelegramNeutral />,
		},
	];

	return (
		<footer
			data-testid={"rg-footer"}
			className="bg-headerColor text-white p-4 lg:p-0"
		>
			<section className="max-w-[1141px] flex-wrap pt-16 pb-[106px]  mx-auto flex flex-col justify-between sm:flex-row">
				<div className="max-w-[255px] mb-2.5 sm:mb-0">
					{/* <RocketGlobalBlueIcon /> */}
					<Image
						src={"/img/logo-white.png"}
						quality={"100"}
						alt={"Rocket global logo"}
						width={69}
						height={48}
					/>
					<p className="text-neutral-300 my-3 text-x-sm-headline">
						The next-generation hybrid Cryptocurrency Exchange, High Yield
						Protocol and NFT Marketplace.
					</p>
					<p className="text-neutral-200 text-x-sm-headline font-normal mb-5">
						© {new Date().getFullYear()} Rocket Global. All rights reserved.
					</p>
				</div>
				<div className="max-w-[200px] mb-2.5 sm:mb-0 sm:ml-11">
					<h3 className="text-white font-bold mb-5">Company</h3>
					<ul className=" list-none">
						<li className="text-neutral-200 mb-5 text-x-sm-headline font-normal">
							<Link href={"https://www.rocketglobal.io/about-us"}>
								About Us
							</Link>
						</li>
						{/* <li className="text-neutral-200 mb-5 text-x-sm-headline font-normal">
							Careers
						</li> */}
					</ul>
				</div>
				<div className="max-w-[200px] mb-2.5 sm:mb-0">
					<h3 className="text-white font-bold mb-5">Legal</h3>
					<ul className=" list-none">
						<li className=" text-neutral-200 mb-5 text-x-sm-headline font-normal">
							<a href="https://drive.google.com/file/d/1IDNxybeXNIe3RRoHrH6McLtyXMX1g5W2/view?usp=sharing">
								Terms of Service
							</a>
						</li>
						<li className=" text-neutral-200 mb-5 text-x-sm-headline font-normal">
							<a href="https://drive.google.com/file/d/1IDNxybeXNIe3RRoHrH6McLtyXMX1g5W2/view?usp=sharing">
								Privacy Policy
							</a>
						</li>
					</ul>
				</div>
				<div className="max-w-[200px] mb-2.5 sm:mb-0">
					<h3 className="text-white font-bold mb-5">Resources</h3>
					<ul className=" list-none">
						<li className=" text-neutral-200 mb-5 text-x-sm-headline font-normal">
							FAQs
						</li>
						<li className=" text-neutral-200 mb-5 text-x-sm-headline font-normal">
							Blog
						</li>
					</ul>
				</div>
				<div className="mb-2.5 sm:mb-0">
					<h3 className="text-white font-bold mb-5">Get in Touch</h3>
					<div className=" flex items-start gap-6 mb-5">
						{socials.map((s) => (
							<a
								target="_blank"
								key={s.name}
								href={s.link}
								rel="noopener noreferrer"
							>
								<div className="flex justify-center items-center h-10 w-10 rounded-full bg-neutral-270">
									{s.icon}
								</div>
							</a>
						))}
					</div>
					<ul className=" list-none">
						<li className=" text-neutral-200 mb-5 text-x-sm-headline font-normal flex items-center">
							<a
								className="flex items-center"
								href="mailto:info@rocketglobal.io"
							>
								<span className="mr-2">
									<EnvelopNeutral />
								</span>
								info@rocketglobal.io
							</a>
						</li>
						<li className=" text-neutral-200 mb-5 text-x-sm-headline font-normal flex items-center">
							<a
								className="flex items-center"
								href="mailto:support@rocketglobal.io"
							>
								<span className="mr-2">
									<EnvelopNeutral />
								</span>
								support@rocketglobal.io
							</a>
						</li>
					</ul>
				</div>
			</section>
		</footer>
		// Deprecated Footer
		// <footer
		// 	data-testid={"rg-footer"}
		// 	className={
		// 		"footer bg-headerColor relative pt-1 border-b-2 border-blue-700 sm:pb-16 sm:pt-10"
		// 	}
		// >
		// 	<div className={"container mx-auto px-6"}>
		// 		<div className={"sm:flex sm:mt-8"}>
		// 			<div
		// 				className={
		// 					"mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between"
		// 				}
		// 			>
		// 				{rows?.map((row) => (
		// 					<FooterRow key={row.id} row={row} />
		// 				))}
		// 			</div>
		// 		</div>
		// 	</div>
		// 	<div className={"container mx-auto px-6"}>
		// 		<div className={"mt-16 flex flex-col items-center"}>
		// 			<div className={"sm:w-2/3 text-center sm:pb-0 pb-6"}>
		// 				<AppIconName />
		// 				<p className={"text-sm-headline text-white font-light my-5"}>
		// 					© 2020 Rocket Global. All rights reserved.
		// 				</p>
		// 				<div
		// 					data-testid={"rg-footer-social"}
		// 					className={"flex gap-6 justify-center"}
		// 				>
		// 					<Link href="#">
		// 						<a>
		// 							<Facebook />
		// 						</a>
		// 					</Link>
		// 					<Link href="#">
		// 						<a>
		// 							<Twitter />
		// 						</a>
		// 					</Link>
		// 					<Link href="#">
		// 						<a>
		// 							<Instagram />
		// 						</a>
		// 					</Link>
		// 					<Link href="#">
		// 						<a>
		// 							<Oval />
		// 						</a>
		// 					</Link>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </footer>
	);
};

export default Footer;
