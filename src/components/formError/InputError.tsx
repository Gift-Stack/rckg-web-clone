import { nanoid } from "nanoid";
import React from "react";
import { ErrorRed } from "../../assets";

interface InputErrorProps {
	error?: string;
	errors?: Array<string | any>;
}

export default function InputError({ error, errors }: InputErrorProps) {
	return (
		<div>
			{error && error.length && typeof error === "string" ? (
				<div
					data-testid="input-error-container"
					className="text-red-600 text-xs my-2.5  flex"
				>
					<div
						data-testid={"input-error-box"}
						className="text-red-600 items-center flex mr-1 flex-shrink-0 pt-0.5"
					>
						<div className="input-error__icon mr-2">
							<ErrorRed />
						</div>
						{error}
					</div>
				</div>
			) : null}
			{errors?.length ? (
				<div
					data-testid="input-errors-container"
					className="flex flex-col justify-start items-start"
				>
					{errors.map((error) => (
						<div
							data-testid={"input-errors-box"}
							className="text-red-600 items-center flex mr-1 flex-shrink-0 pt-0.5"
							key={nanoid()}
						>
							<div className="input-error__icon mr-2">
								<ErrorRed />
							</div>
							{error}
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}
