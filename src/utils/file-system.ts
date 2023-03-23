import * as FileSystem from "expo-file-system";
import { tileCacheDirectory } from "../constants";

/**
 * Makes a directory for map tile caching.
 * Every tile requested from the server will be saved locally
 * for a set amount of time.
 *
 * @returns {void}
 */
export const makeTileCacheDirectory = async () => {
	try {
		await FileSystem.makeDirectoryAsync(tileCacheDirectory, {
			intermediates: true,
		});
	} catch (error) {
		console.log("Error creating tile cache directory:", error);
	}
};

export const deleteTileCacheDirectory = async () => {
	try {
		await FileSystem.deleteAsync(tileCacheDirectory, { idempotent: false });
		console.log("Deleted map tile cache directory");
	} catch (err) {
		console.log("Map tile deletion error:", err);
	}
};
