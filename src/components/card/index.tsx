import React, { FC } from "react";
import Action from "./Action";
import Tag from "./Tag";
import { ActionState, TagState } from "./enum";
import { Actions, Tags } from "./model";
import Tap from "./Tap";
import { ArrowForward } from "../../assets";

interface Props extends MetaProps {
	children: JSX.Element;
	cssClass: string;
	title?: string;
	titleCss?: string;
	dropTitleActionDown?: boolean;
	actions?: Actions[];
	action?: string;
	tags?: Tags[];
	handleAction?: (value: string) => void;
	handleTag?: (value: string) => void;
	handleTap?: (value: string) => void;
}

const Card: FC<Props> = ({
	children,
	cssClass,
	title,
	titleCss,
	dropTitleActionDown = false,
	actions,
	action,
	tags,
	handleAction,
	handleTag,
	handleTap,
}) => {
	const onAction = (value: any) => {
		handleAction && handleAction(value);
	};

	const onTag = (value: string) => {
		handleTag && handleTag(value);
	};

	const onTap = (value: string) => {
		handleTap && handleTap(value);
	};
	return (
		<div
			className={`${cssClass} flex flex-col shadow-md`}
			data-testid={"rg-card"}
		>
			{title && (
				<div
					className={`items-center justify-between flex-wrap ${
						dropTitleActionDown ? "sm:flex" : "flex"
					} mb-2`}
				>
					<h2
						className={`${
							titleCss
								? titleCss
								: "font-bold md:text-sm-headline text-sm-regular text-neutral-400"
						}`}
					>
						{title}
					</h2>
					{actions && actions?.length && !action ? (
						<div className="flex flex-wrap pt-5 sm:pt-0">
							{actions.map((action, idx) => (
								<Action
									key={idx}
									variant={
										action.isActive
											? ActionState.PRIMARY
											: ActionState.SECONDARY
									}
									value={action.name}
									type={"button"}
									actionClick={() => onAction(action)}
								/>
							))}
						</div>
					) : action ? (
						<Tap
							tapClick={() => onTap(action)}
							value={action}
							icon={<ArrowForward />}
						/>
					) : (
						<div></div>
					)}
				</div>
			)}
			{tags && tags?.length && (
				<div className="items-center flex mb-5">
					<div className="flex flex-wrap">
						{tags.map((tag, idx) => (
							<Tag
								key={idx}
								variant={tag.isActive ? TagState.PRIMARY : TagState.SECONDARY}
								value={tag.name}
								type={"button"}
								tagClick={() => onTag(tag.name)}
							/>
						))}
					</div>
				</div>
			)}
			{children}
		</div>
	);
};

export default Card;
