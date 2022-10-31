export interface Waypoint {
	route_id: string;
	latitude: number;
	longitude: number;
	mnc: string | null;
	ts: number;
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
