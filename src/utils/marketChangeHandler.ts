export const handleMarketChange = (bigArray: any, smallArray: any) => {
	if (bigArray.length === 0 || smallArray.length === 0) {
		if (bigArray.length === 0) {
			return smallArray;
		} else {
			return bigArray;
		}
	} else {
		const bigObj: any = {};

		for (let i = 0; i < bigArray.length; i++) {
			bigObj[bigArray[i].symbol] = { idx: i, val: bigArray[i].symbol };
		}
		const newArr = smallArray.map((el: any) => {
			if (bigObj[el.symbol] && el.symbol == bigObj[el.symbol].val) {
				const [findsmall] = smallArray.filter(
					(i: any) => bigObj[el.symbol].val == i.symbol
				);
				if (findsmall) {
					return { ...findsmall };
				}
				return el;
			}
		});
		const mainArr: any = [];
		bigArray.forEach((it: any) => {
			const x = bigArray[bigObj[it.symbol].idx];
			const [fil] = smallArray.filter((sm: any) => sm.symbol === x.symbol);
			if (!fil) {
				mainArr.push(it);
			}
		});
		const result = [...newArr, ...mainArr];
		return result;
	}
};
