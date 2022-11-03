import NetInfo, {
	NetInfoState,
	NetInfoCellularGeneration,
} from "@react-native-community/netinfo";

export async function NetworkConnectionInformation(): Promise<NetInfoState> {
	const state = await NetInfo.fetch();
	return state;
}

export function getNetworkCellularGeneration(
	state: NetInfoState
): NetInfoCellularGeneration | null {
	if (state.type === "cellular") {
		return state.details.cellularGeneration;
	}
	return null;
}
