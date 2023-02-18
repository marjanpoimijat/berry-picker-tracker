import * as FileSystem from "expo-file-system";
import { tileCacheDirectory } from "../constants";

/**
 * Makes a directory for map tile caching.
 * Every tile requested from the server will be saved locally
 * for a set amount of time.
 */
export const makeTileCacheDirectory = async () => {
	try {
		console.log("creating tile cache...");
		await FileSystem.makeDirectoryAsync(tileCacheDirectory, {
			intermediates: true,
		});
		console.log("Created tile cache directory at " + tileCacheDirectory);
	} catch (error) {
		console.log("Error creating tile cache directory:", error);
	}
};

export const deleteTileCacheDirectory = async () => {
	try {
		await FileSystem.deleteAsync(tileCacheDirectory, { idempotent: false });
		console.log("Deleted tile cache directory");
	} catch (err) {
		console.log("Map tile deletion error:", err);
	}
};
