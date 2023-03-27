export interface AppHeaderProps {
	text: string;
}

export interface ButtonProps {
	disabled: boolean;
	iconName: string;
}

export interface Coordinate {
	latitude: number;
	longitude: number;
}

export interface CoordinatesMarkerProps {
	coordinates: Coordinate;
}

export interface DotProps {
	id: number;
}

export enum Language {
	English = "en",
	Finnish = "fi",
	Swedish = "sv",
}

export interface LocationVisibleButtonProps {
	locationVisible: boolean;
	handleLocationVisibleChange: () => void;
}

export enum Map {
	nlsTopographic = "nlstopographic",
	openStreetMap = "osmapi",
	nlsPlain = "nlsplain",
	nlsAerial = "nlsaerial",
}

export interface MapLocation {
	coords: {
		latitude: number;
		longitude: number;
		latitudeDelta: number;
		longitudeDelta: number;
	};
}

export interface MyRoutesButtonProps {
	iconName: string;
	onPress: () => void;
	text: string;
}

export interface NavigatorButtonProps {
	iconName: string;
	path: string;
	text: string;
}

export interface RemoveButtonProps {
	handleRemoveButtonPress: () => void;
}

export interface Route {
	routeId: string | null;
	showRoute: boolean;
	active: boolean;
}

export interface RouteButtonProps {
	onPress: () => void;
	text: string;
}

export interface RouteVisibleButtonProps {
	locationVisible: boolean;
	routeVisible: boolean;
	handleRouteVisibleChange: () => void;
}

export interface ShareButtonProps {
	onPress: () => void;
	text: string;
}

export interface TrackedUser {
	id: number;
	locationVisible: boolean;
	routeVisible: boolean;
	userId: string;
	username: string;
}

export type TrackedUsers = {
	[key: string]: TrackedUser;
};

export interface TrackedUserRouteProps {
	user: TrackedUser;
}

export interface TrackingButtonProps {
	iconName: string;
	onPress: () => void;
	text: string;
}

export interface User {
	userId: string | null;
	username: string;
	trackingInterval: number;
	sendingInterval: number;
	mapLifetime: number;
	offlineMode: boolean;
}

export interface UsernameProps {
	username: string;
}

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

export interface WaypointState {
	routeId: string | null;
	localWaypoints: Array<Waypoint>;
	pendingWaypoints: Array<Waypoint>;
}
