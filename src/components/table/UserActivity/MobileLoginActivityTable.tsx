import { getDateTimeWithoutA } from "../../../constants";
import { FC, useEffect, useState } from "react";
import { MobileTransactionTableProps, ILoginActivityTableData } from "./model";
import MobileTablePagination from "../MobileTablePagination";

const MobileLoginActivityTable: FC<MobileTransactionTableProps> = ({
	data,
	pageSize = 5,
}) => {
	const [_data, _setData] = useState<ILoginActivityTableData[]>([]);
	const [pages, setPages] = useState<number>(0);
	const [activeIndex, setActiveIndex] = useState<number>(1);

	useEffect(() => {
		_setData(
			data.slice(
				(activeIndex - 1) * pageSize,
				activeIndex * pageSize < data.length
					? activeIndex * pageSize
					: (activeIndex - 1) * pageSize +
							(data.length - (activeIndex - 1) * pageSize)
			)
		);
		setPages(Math.ceil(data.length / pageSize));
	}, [activeIndex, data, pageSize]);
	return (
		<div data-testid={"rg-mobile-login-activity-table"}>
			{_data && _data.length ? (
				_data.map((d) => (
					<div
						key={d.id}
						className={"text-labels p-2 border-b border-neutral-50"}
					>
						<div className={"text-neutral-400 py-1 font-bold"}>
							{getDateTimeWithoutA(d.date_time)}
						</div>
						<div
							className={"flex justify-between pt-1 text-x-small font-light"}
						>
							<small className={"text-neutral-350"}>Source</small>
							<small className={"text-neutral-400"}>{d.source}</small>
						</div>
						<div
							className={"flex justify-between pt-1 text-x-small font-light"}
						>
							<small className={"text-neutral-350"}>Location</small>
							<small className={"text-neutral-400"}>{d.location}</small>
						</div>
						<div
							className={"flex justify-between pt-1 text-x-small font-light"}
						>
							<small className={"text-neutral-350"}>IP Address</small>
							<small className={"text-neutral-400"}>{d.ip_address}</small>
						</div>
					</div>
				))
			) : (
				<></>
			)}
			<MobileTablePagination
				pages={pages}
				_setActiveIndex={(index: number) => setActiveIndex(index)}
			/>
		</div>
	);
};

export default MobileLoginActivityTable;
