import Table from "components/table";
import { DataState } from "components/table/enum";
import { loginActivityColumns } from "components/table/UserActivity/data";
import { ITableColumn, ITableData } from "components/table/model";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ActivitySwitch from "components/user-activity/ActivitySwitch";
import { getDateTimeWithoutA, IsJsonString } from "../../constants";
import NavBack from "components/nav-back";
import { ArrowLeft, NavBackIcon } from "assets";
import LoginActivityTable from "components/table/UserActivity/LoginActivityTable";
import MobileLoginActivityTable from "components/table/UserActivity/MobileLoginActivityTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { getLoginActivitiesAsync } from "redux/actions/settings.action";
import { ProfileSettingsLayout } from "components/layout/ProfileSettingLayout";
import { ILoginActivityTableData } from "components/table/UserActivity/model";

const Activity: NextPage = () => {
	const dispatch = useDispatch();
	const { loginActivities } = useSelector((state: RootState) => state.settings);
	const [active, setActive] = useState<string>("Login Activity");
	const [columns, setColumns] = useState<ITableColumn[]>([]);
	const router = useRouter();

	useEffect(() => {
		setColumns(loginActivityColumns);
		dispatch(getLoginActivitiesAsync());
		// eslint-disable-next-line
	}, []);

	const formatLoginActivities = (
		activities: any[]
	): ILoginActivityTableData[] => {
		const activity: ILoginActivityTableData[] = [];
		if (activities.length) {
			activities.map((a) => {
				if (a.geoData != null && IsJsonString(a.geoData)) {
					activity.push({
						id: a.id,
						date_time: a.createdOn,
						ip_address: a.ipAddress,
						source: JSON.parse(a.deviceInfo).client.name,
						location: JSON.parse(a.geoData).city,
					});
				}
			});
		}
		return activity;
	};

	const dataSource: ITableData[] =
		formatLoginActivities(loginActivities) &&
		formatLoginActivities(loginActivities).length > 0
			? formatLoginActivities(loginActivities).map((row) => {
					return {
						key: row.id,
						date_time: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{getDateTimeWithoutA(row.date_time)}
							</div>
						),
						source: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{row.source}
							</div>
						),
						location: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{row.location}
							</div>
						),
						ip_address: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{row.ip_address}
							</div>
						),
					};
			  })
			: [];

	const handleSetActive = (value: string): void => {
		setActive(value);
	};

	return (
		<ProfileSettingsLayout
			title={"Rocket Global Activities"}
			keywords={"Login, Rocket, Activities, Login Activities, Login Devices"}
			description={""}
		>
			<>
				<div className={"hidden sm:block"}>
					<NavBack
						cssClass={
							"sm:py-5 sm:px-8 lg:px-20 flex sm:gap-4 md:text-labels lg:text-sm-regular xl:text-sm-headline font-medium items-center"
						}
						name={"Back to Settings"}
						icon={<ArrowLeft />}
						onClick={() => router.back()}
					/>
				</div>
				<div
					className={
						"w-full user-activity bg-primary-100 sm:bg-white mt-0 md:mt-5 lg:mt-10"
					}
				>
					<div className={"w-full py-6 sm:px-8 px-4 lg:px-20"}>
						<div className={"mobile-nav-back block sm:hidden text-labels"}>
							<NavBack
								name={"Back to Dashboard"}
								icon={<NavBackIcon />}
								onClick={() => router.back()}
							/>
						</div>
						<div className={"sm:flex w-full justify-between"}>
							<div className={"mt-4 mb-4 w-full hidden sm:block"}>
								<ActivitySwitch
									handleSwitch={(value: string) => handleSetActive(value)}
									switchItem={["Login Activity", "Login Devices"]}
									active={active}
								/>
							</div>
							<div className={"text-center sm:hidden"}>
								<div
									className={"font-medium text-md-headline text-neutral-400"}
								>
									Back to Settings
								</div>
								<div
									className={
										"pt-4 mt-4 w-full sm:grid flex justify-center bg-white"
									}
								>
									<ActivitySwitch
										handleSwitch={(value: string) => handleSetActive(value)}
										switchItem={["Login Activity", "Login Devices"]}
										active={active}
									/>
								</div>
							</div>
							<div
								className={
									"sm:bg-transparent bg-white pb-2 pt-4 sm:pb-0 sm:pt-0 sm:mt-4 sm:mb-4 w-full flex items-center justify-center sm:justify-end text-neutral-300 text-x-small lg:text-labels xl:text-sm-regular"
								}
							>
								Unrecognized login activity?{" "}
								<span
									className={"cursor-pointer text-primary-400 pl-2"}
									onClick={() => router.push(`/profile/change-password`).then()}
								>
									Change Password
								</span>
							</div>
						</div>
						{active === "Login Activity" ? (
							<LoginActivityTable cssClass="p-1 xl:p-5 rounded bg-white h-full">
								<div className={"w-full"}>
									<div className={"w-full hidden sm:block"}>
										<Table
											columns={columns}
											dataSource={dataSource}
											showPagination={true}
											showPageSize={true}
										/>
									</div>
									<div className={"w-full md:hidden"}>
										<MobileLoginActivityTable
											data={formatLoginActivities(loginActivities)}
											pageSize={6}
										/>
									</div>
								</div>
							</LoginActivityTable>
						) : (
							<></>
						)}
					</div>
				</div>
			</>
		</ProfileSettingsLayout>
	);
};
export default Activity;
