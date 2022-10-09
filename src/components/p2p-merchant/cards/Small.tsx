import React, { FC } from "react";
import { useRouter } from "next/router";

interface Props {
	icon: any;
	header: string;
	description: string;
	path?: string;
}

export const SmallP2PCard: FC<Props> = ({
	icon,
	header,
	description,
	path,
}) => {
	const { push } = useRouter();
	return (
		<div
			className="w-full min-h-full flex flex-col gap-3 bg-white rounded p-30 cursor-pointer"
			onClick={() => push(`/${path}`)}
		>
			{icon}
			<p className="font-sm-headline font-semibold ">{header}</p>
			<p className="font-sm-headline text-gray-deep">{description}</p>
		</div>
	);
};
