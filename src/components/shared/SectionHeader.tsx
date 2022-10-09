import { BackIconGray } from "./../../assets";
import React from "react";
import { useRouter } from "next/router";

interface SectionHeaderProps {
	title: string;
	description: string;
	mobileTitle: string;
	wSection?: boolean;
}
export default function SectionHeader({
	title,
	description,
	mobileTitle,
	wSection = false,
}: SectionHeaderProps) {
	const router = useRouter();
	return (
		<div>
			<div
				data-testid="section-header"
				className={`hidden sm:flex section-header ${
					wSection ? "section-header__WSection" : "section-header__WOSection"
				} bg-headerColor items-center flex-col justify-center`}
			>
				<h1
					data-testid="section-header-title"
					className="section-header__title "
				>
					{title}
				</h1>
				<p
					data-testid="section-header-description"
					className="section-header__description text-white mt-4 max-w-3xl text-center"
				>
					{description}
				</p>
			</div>
			<div
				className={`sm:hidden section-header flex justify-center items-center relative mt-20`}
			>
				<div className="absolute left-4 top-8" onClick={() => router.back()}>
					<BackIconGray />
				</div>
				<p className="font-semibold text-headline text-center">{mobileTitle}</p>
			</div>
		</div>
	);
}
