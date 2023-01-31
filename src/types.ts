export interface Waypoint {
	routeId: string | null;
	latitude: number;
	longitude: number;
	mnc: string | null;
	connection: string | null;
	ts: number;
}

export interface WaypointFromServer {
	route_id: string | null;
	latitude: number;
	longitude: number;
	mnc: string | null;
	connection: string | null;
	ts: number;
}

export interface usersLocationInfo {
	usersWaypoints: Waypoint[];
	usersLatestWaypoint: null | Waypoint;
}

export interface WaypointState {
	routeId: string | null;
	localWaypoints: Array<Waypoint>;
	pendingWaypoints: Array<Waypoint>;
}

export interface Route {
	routeId: string | null;
	showRoute: boolean;
	active: boolean;
}

export interface User {
	userId: string | null;
	trackingInterval: number;
	sendingInterval: number;
	mapLifetime: number;
	offlineMode: boolean;
}

export enum Language {
	English = "en",
	Finnish = "fi",
}
