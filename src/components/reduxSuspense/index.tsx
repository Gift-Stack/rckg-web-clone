import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ScaleLoader } from "react-spinners";

interface IProps {
	loading?: boolean;
}
const ReduxSuspense = ({ loading }: IProps) => {
	const suspended =
		useSelector((state: RootState) => state.suspense) || loading;
	return suspended ? (
		<div
			className={
				"fixed h-screen w-screen  left-0 right-0 z-20 overflow-y-hidden"
			}
		>
			<div
				className={
					"bg-white  h-screen w-screen flex flex-column justify-center items-center"
				}
			>
				<ScaleLoader color={"#0069FF"} />
			</div>
		</div>
	) : null;
};

export default ReduxSuspense;
