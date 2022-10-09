import { useEffect, useState } from "react";

interface UseTimeLineReturnData {
	days: number | null;
	hrs: number | null;
	minutes: number | null;
	secs: number | null;
}

export default function useTimeLine(date?: string): UseTimeLineReturnData {
	const [days, setDays] = useState<null | number>(null);
	const [hrs, setHrs] = useState<null | number>(null);
	const [minutes, setMinutes] = useState<null | number>(null);
	const [secs, setSecs] = useState<null | number>(null);

	useEffect(() => {
		let timer: NodeJS.Timer;
		if (date) {
			timer = setInterval(() => {
				let timeLeft = calculateTimeLeft(date);
				setDays(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
				setHrs(Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
				setMinutes(Math.floor((timeLeft / 1000 / 60) % 60));
				setSecs(Math.floor((timeLeft / 1000) % 60));
			}, 1000);
		}

		// Clear timeout if the component is unmounted
		return () => clearInterval(timer);
	}, [date]);

	// const calculateTimeLeft = (date: string) => {
	//     const timeLeft = new Date(date).getTime() - Date.now();

	//     return timeLeft <= 0 ? 0 : timeLeft;
	// }
	const calculateTimeLeft = (date: string) => {
		const currentDate = new Date(date);
		const futureDate = new Date(currentDate.getTime() - 3 * 60000);
		const timeLeft = futureDate.getTime() - Date.now();

		return timeLeft <= 0 ? 0 : timeLeft;
	};
	return { days, hrs, minutes, secs };
}
