import * as FileSystem from "expo-file-system";
import { tileCacheDirectory } from "../constants";

/**
 * Makes a directory for map tile caching.
 * Every tile requested from the server will be saved locally
 * for a set amount of time.
 */
export const makeTileCacheDirectory = () => {
	FileSystem.makeDirectoryAsync(tileCacheDirectory)
		.then(() => {
			console.log("Created tile cache directory at " + tileCacheDirectory);
		})
		.catch(() => {
			//console.log("Tile directory already exists");
		});
};

export const deleteTileCacheDirectory = () => {
	FileSystem.deleteAsync(tileCacheDirectory)
		.then(() => {
			console.log("Deleted tile cache directory");
		})
		.catch((err) => {
			console.log("Map tile deletion error:", err);
		});
};
