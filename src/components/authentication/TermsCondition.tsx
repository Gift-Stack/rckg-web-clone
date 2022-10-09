import React, { FC } from "react";
import Link from "next/link";
import Checkbox from "../input/checkbox";

export interface TermsConditionProps {
	accepted: boolean;
	handleAccepted: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TermsCondition: FC<TermsConditionProps> = ({
	accepted,
	handleAccepted,
}) => {
	return (
		<Checkbox
			accepted={accepted}
			handleAccepted={handleAccepted}
			label={
				<span className="ml-2 text-labels flex flex-wrap">
					By signing up you agree to Rocket Global’s{" "}
					<Link href={"/terms"}>
						<a className={"text-primary-400 lg:ml-1"}>Terms and Conditions</a>
					</Link>
				</span>
			}
		/>
	);
};
export { TermsCondition };
