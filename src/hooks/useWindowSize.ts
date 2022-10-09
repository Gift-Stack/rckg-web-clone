import { useState, useEffect } from "react";

interface Size {
	width: number | undefined;
	height: number | undefined;
}

interface ReturnValues extends Size {
	isMobile: boolean;
}

export default function useWindowSize(): ReturnValues {
	const [windowSize, setWindowSize] = useState<Size>({
		width: undefined,
		height: undefined,
	});
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		if ((windowSize.width as number) < 641) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [windowSize.width]);

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return { ...windowSize, isMobile };
}
