import NetInfo, {
	NetInfoState,
	NetInfoCellularGeneration,
} from "@react-native-community/netinfo";
/**
 * Gets network information state and returns it
 * @returns NetInfoState`
 */
export async function NetworkConnectionInformation(): Promise<NetInfoState> {
	const state = await NetInfo.fetch();
	return state;
}
/**
 * Parses the NetInfoState and returns the cellular generation
 * if phone is connected via cellular type.
 * When using expo defaults to null because it uses wifi!
 * @returns Cellular generation or null`
 */
export function getNetworkCellularGeneration(
	state: NetInfoState
): NetInfoCellularGeneration | null {
	if (state.type === "cellular") {
		return state.details.cellularGeneration;
	}
	return null;
}
