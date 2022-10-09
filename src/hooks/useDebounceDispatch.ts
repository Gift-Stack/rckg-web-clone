import { useDispatch } from "react-redux";
import { debounce } from "../utils";

function useDebounceDispatch(delay: number) {
	const dispatch = useDispatch();
	return debounce(dispatch, delay);
}

export { useDebounceDispatch };
