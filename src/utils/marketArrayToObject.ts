export const dataArrayToObject = (data: any) => {
	const { heading, values } = data;
	let trans = values?.map((e: any) => {
		let obj: any = {};
		e.forEach((t: any, i: number) => {
			obj[heading[i]] = t;
		});
		return obj;
	});

	return trans;
};
