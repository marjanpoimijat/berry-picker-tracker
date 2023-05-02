import { formatDate } from "./date";

describe("Date", () => {
	it("unix time 0 returns the right date", () => {
		const timestamp = formatDate(0);
		expect(timestamp).toBe("1970-01-01 00:00:00");
	});
	it("unix time 1200000000 returns the right date", () => {
		const timestamp = formatDate(1200000000000);
		expect(timestamp).toBe("2008-01-10 21:20:00");
	});
});
