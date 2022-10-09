import React, { FC } from "react";
import { Bullets } from "../../assets";
import { hasCaps, hasDigit, hasSpecialCharacter } from "../../constants";

export interface FormErrorProps {
	errors: Record<string, any>;
	name: string;
	value: string;
}

const FormError: FC<FormErrorProps> = ({ errors, name, value }) => {
	return (
		<div>
			{name === "password" ? (
				<div className={"ml-3 mt-2"} data-testid={"rg-password-error"}>
					{errors && errors[name] && (
						<>
							<div
								data-testid={"rg-password-length-error"}
								className={`flex text-labels ${
									value.length >= 8 ? "text-neutral-400" : "text-neutral-200"
								} items-center mb-2`}
							>
								<Bullets fill={value.length >= 8 ? "#56BC7C" : "#B0C1DA"} />{" "}
								<span className={"ml-2"}>Must be at Least 8 characters</span>
							</div>
							<div
								data-testid={"rg-password-hasCaps"}
								className={`flex text-labels ${
									hasCaps(value) ? "text-neutral-400" : "text-neutral-200"
								}  items-center mb-2`}
							>
								<Bullets fill={hasCaps(value) ? "#56BC7C" : "#B0C1DA"} />
								<span className={"ml-2"}>
									Must be at Least 1 uppercase letter
								</span>
							</div>
							<div
								data-testid={"rg-password-hasSpecialCharacter"}
								className={`flex text-labels ${
									hasSpecialCharacter(value)
										? "text-neutral-400"
										: "text-neutral-200"
								} items-center mb-2`}
							>
								<Bullets
									fill={hasSpecialCharacter(value) ? "#56BC7C" : "#B0C1DA"}
								/>
								<span className={"ml-2"}>Must have 1 special character</span>
							</div>
							<div
								data-testid={"rg-password-hasDigit"}
								className={`flex text-labels  ${
									hasDigit(value) ? "text-neutral-400" : "text-neutral-200"
								} items-center mb-2`}
							>
								<Bullets fill={hasDigit(value) ? "#56BC7C" : "#B0C1DA"} />
								<span className={"ml-2"}></span>Must be at Least 1 number
							</div>
						</>
					)}
				</div>
			) : (
				<p
					className={"text-error-main text-labels mt-2"}
					data-testid={"rg-main-error"}
				>
					{errors && errors[name]}
				</p>
			)}
		</div>
	);
};
export default FormError;
