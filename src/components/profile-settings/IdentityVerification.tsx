import Button from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import React, { useEffect } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import { documentInitAsync } from "../../redux/actions/settings.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/router";
import axios from "axios";

const IdentityVerification = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { documentToken, token } = useSelector(
		(state: RootState) => state.settings
	);
	// const { id } = useSelector((state: RootState) => state.auth);

	// useEffect(() => {
	// 	axios.post(
	// 		`https://api.sumsub.com/resources/applicants/${id}/reset`,
	// 		{},
	// 		{
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				"Access-Control-Allow-Methods": "*",
	// 				"Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_AUTH_BASEURL,
	// 			},
	// 		}
	// 	);
	// }, [id]);

	const handleInit = () => {
		dispatch(documentInitAsync("passport"));
	};

	useEffect(() => {
		handleInit();
		return () => handleInit();
		//eslint-disable-next-line
	}, []);

	const handler = (): any => {
		return Promise.resolve("");
	};

	const messageHandler = () => {};

	const errorHandler = () => {};

	return (
		<div>
			<div className={"w-full"}>
				{token && (
					<div>
						<SumsubWebSdk
							accessToken={documentToken}
							expirationHandler={handler}
							config={{}}
							options={{}}
							onMessage={messageHandler}
							onError={errorHandler}
						/>
					</div>
				)}
				<Button
					variant={ButtonState.SKIP}
					value={"Skip for now"}
					size={ButtonSize.lg}
					onClick={() => router.push("/dashboard")}
					style={{ width: "100%" }}
				/>
			</div>
		</div>
	);
};

export default IdentityVerification;
