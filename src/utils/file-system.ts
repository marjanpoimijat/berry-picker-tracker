import * as FileSystem from "expo-file-system";
import { tileCacheDirectory } from "../constants";

/**
 * Makes a directory for map tile caching.
 * Every tile requested from the server will be saved locally
 * for a set amount of time.
 */
export const makeTileCacheDirectory = () => {
	FileSystem.makeDirectoryAsync(tileCacheDirectory)
		.then(function () {
			console.log("Created tile cache directory at " + tileCacheDirectory);
		})
		.catch();
};
