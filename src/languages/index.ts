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
	Find: {
		en: "Find",
		fi: "Etsi",
		sv: "insert_Swedish_here",
	},
	Settings: {
		en: "Settings",
		fi: "Asetukset",
		sv: "insert_Swedish_here",
	},
};
