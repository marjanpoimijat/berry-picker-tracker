export interface Waypoint {
	routeId: string | null;
	latitude: number;
	longitude: number;
	mnc: string | null;
	ts: number;
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
}
