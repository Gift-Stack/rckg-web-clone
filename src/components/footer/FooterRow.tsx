import Link from "next/link";
import React, { FC } from "react";
import { FooterRowProps } from "./model";

const FooterRow: FC<FooterRowProps> = ({ row }) => {
	return (
		<div data-testid={"rg-footer-row"} className={"flex flex-col"}>
			<span className={"font-medium text-x-sm-headline text-white mb-2"}>
				{row?.title}
			</span>
			{row?.links?.map((link) => (
				<span key={link.name} className={"my-2"}>
					<Link href={link.path}>
						<a
							className={
								"text-sm-regular text-neutral-200 font-light hover:text-blue-500"
							}
						>
							{link.name}
						</a>
					</Link>
				</span>
			))}
		</div>
	);
};

export default FooterRow;
