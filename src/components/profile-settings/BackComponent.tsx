import { FC } from "react";
import { CaretLeft } from "../../assets";
import { useRouter } from "next/router";

export interface BackComponentProps {
	path: string;
}

const BackComponent: FC<BackComponentProps> = ({ path }) => {
	const router = useRouter();
	return (
		<div
			className={"hidden lg:flex bg-white backComponent cursor-pointer"}
			data-testid={"backComponent"}
			onClick={() => router.push(path)}
		>
			<CaretLeft />
			<h3
				className={
					"text-neutral-400 font-bold text-sm-headline mr-4 hidden md:block"
				}
			>
				Back to Settings
			</h3>
		</div>
	);
};

export default BackComponent;
