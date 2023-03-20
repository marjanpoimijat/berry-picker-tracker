import { Language } from "../types";

import translations from "./translations.json";

type Languages = {
	[key: string]: {
		[key in Language]: string;
	};
};

export const languages: Languages = translations;
