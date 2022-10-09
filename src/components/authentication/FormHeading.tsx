import { FC, ReactElement } from "react";

export interface FormHeadingProps {
	heading: string;
	subHeading: string | ReactElement;
	svg?: ReactElement;
}

const FormHeading: FC<FormHeadingProps> = ({ heading, subHeading, svg }) => {
	return (
		<div className={"mb-16"} data-testid={"rg-auth-form-heading"}>
			{svg && <>{svg}</>}
			<h2
				className={"font-bold text-l-headline text-neutral-400"}
				data-testid={"heading-2"}
			>
				{heading}
			</h2>
			<p
				className={"text-sm-regular text-neutral-300"}
				data-testid={"subheading"}
			>
				{subHeading}
			</p>
		</div>
	);
};

export { FormHeading };
