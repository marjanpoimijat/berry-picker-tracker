import { useEffect, useRef } from "react";

/**
 * Calls function using the interval determined as a param
 * which can be dynamically changed.
 * @param callback function to be called in certain intervals
 * @param interval as a number in milliseconds
 */
function useInterval(callback: () => void, interval: number) {
	const savedCallback = useRef<() => void>();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (interval !== null) {
			const id = setInterval(tick, interval);
			return () => clearInterval(id);
		}
	}, [interval]);
}

export default useInterval;
