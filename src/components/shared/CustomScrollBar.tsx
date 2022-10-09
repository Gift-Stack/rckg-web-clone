import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Scrollbars } from "react-custom-scrollbars";
interface IProps {
	children: React.ReactChildren | React.ReactChild | React.ReactElement[];
	height?: number | string;
}
export default function CustomScrollBar({ children, height }: IProps) {
	// return (
	// 	<div style={{ height }} className=" overflow-y-auto w-full">
	// 		{children}
	// 	</div>
	// );
	return <Scrollbars style={{ height }}>{children}</Scrollbars>;
	// return <PerfectScrollbar style={{ height }}>{children}</PerfectScrollbar>;
}
