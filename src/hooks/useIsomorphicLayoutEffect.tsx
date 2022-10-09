import React, { useEffect, useLayoutEffect } from "react";

const canUseDOM = typeof window !== "undefined";
export const useIsomorphicLayoutEffect = canUseDOM
	? useLayoutEffect
	: useEffect;
