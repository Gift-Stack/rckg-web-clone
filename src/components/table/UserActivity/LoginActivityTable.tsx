import React, { FC } from "react";
import { LoginActivityTableProps } from "./model";

const LoginActivityTable: FC<LoginActivityTableProps> = ({
	children,
	cssClass,
}) => {
	return (
		<div data-testid={"rg-login-activity-table"}>
			<div className={`${cssClass} flex flex-col card_shadow`}>{children}</div>
		</div>
	);
};

export default LoginActivityTable;
