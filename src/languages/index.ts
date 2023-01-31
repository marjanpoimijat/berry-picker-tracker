import { Language } from "../types";

type Languages = {
	[key: string]: {
		[key in Language]: string;
	};
};

export const languages: Languages = {
	Map: {
		en: "Map",
		fi: "Kartta",
		sv: "Karta",
	},
};
