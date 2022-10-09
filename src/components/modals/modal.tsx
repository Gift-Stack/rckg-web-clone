import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Cross, CrossCircle } from "../../assets/svg";
import {
	headerMarginVariants,
	titleVariants,
	svgPositionVariants,
} from "./modal.enum";

type Props = {
	title?: string;
	width?: any;
	padding?: any;
	headingStyles?: any;
	titleStyles?: any;
	onClose: () => void;
	titleVariants?: titleVariants;
	headerMarginVariants?: headerMarginVariants;
	svgPositionVariants?: svgPositionVariants;
	svgCircle?: boolean;
};

const Modal: React.FC<Props> = ({
	children,
	title,
	width,
	padding,
	headingStyles,
	titleStyles,
	onClose,
	titleVariants,
	headerMarginVariants,
	svgPositionVariants,
	svgCircle = false,
	...rest
}) => {
	const styles = {
		maxWidth: width,
		padding: padding,
		...rest,
	};
	//listens for keyboard events
	const listenKeyboardEvent = (event: any) => {
		if (event.key === "Escape" || event.keyCode === 27) {
			onClose();
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", listenKeyboardEvent);
		return () => window.removeEventListener("keydown", listenKeyboardEvent);
		//eslint-disable-next-line
	}, []);

	//stops clicking on the content to affect the modal
	const onDialogueClick = (event: any) => {
		event.stopPropagation();
	};

	//closes modal on overlay click
	const onOverlayClick = () => {
		onClose();
	};

	const modal = (
		<div className="modal-layout" onClick={onOverlayClick}>
			<div className="modal-child" style={styles} onClick={onDialogueClick}>
				<div
					className={`modal__head relative ${
						headerMarginVariants ? headerMarginVariants : "mb-7"
					}`}
				>
					<p
						className={
							titleVariants
								? titleVariants
								: "text-headline font-bold text-gray-700"
						}
						data-testid={"modal-title"}
					>
						{title && title}
					</p>
					<button
						data-testid={"rg-close-button"}
						onClick={onClose}
						className={svgPositionVariants ?? "outline-none absolute right-6"}
					>
						{svgCircle ? <CrossCircle /> : <Cross />}
					</button>
				</div>
				{children}
			</div>
		</div>
	);
	return ReactDOM.createPortal(modal, document.body);
};

export default Modal;
