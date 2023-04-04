import { getNetworkStateAsync, NetworkState } from "expo-network";
import { CellularGeneration, getCellularGenerationAsync } from "expo-cellular";

/**
 * Gets network information state and returns it.
 *
 * @returns {Promise} NetworkState.
 */
export async function NetworkConnectionInformation(): Promise<NetworkState> {
	const state = await getNetworkStateAsync();
	return state;
}

/**
 * Parses the NetworkState and returns the cellular generation
 * if phone is connected via cellular type.
 * When using Expo defaults to null because it uses Wi-Fi!
 *
 * @param {NetworkState} state State.
 * @returns {Promise<CellularGeneration> | null} Cellular generation or null.
 */
export function getNetworkCellularGeneration(state: NetworkState): Promise<CellularGeneration> | null {
	if (state.type === "CELLULAR") {
		const generation = getCellularGenerationAsync();
		return generation;
	}
	return null;
}
/**
 *
 * @param {number | null} generation The value of CellularGeneration enum or null if connection type is not cellular.
 * @returns {string | null } Returns connection type as string or null.
 */
export const getGenerationString = (generation: number | null) => {
	switch (generation) {
	case 1:
		return "2G";
	case 2:
		return "3G";
	case 3:
		return "4G";
	case 4:
		return "5G";
	}
	return null;
};
