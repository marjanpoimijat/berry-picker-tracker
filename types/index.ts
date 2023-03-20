export interface AppHeaderProps {
	text: string;
}

export interface ButtonProps {
	disabled: boolean;
	name: string;
}

export interface Coordinate {
	latitude: number;
	longitude: number;
}

export interface DotProps {
	id: number;
}

export interface FindUserRouteContainerProps {
	usersWaypoints: Waypoint[] | null;
	infoText: string;
}

export interface InputContainerProps {
	setUserId: React.Dispatch<React.SetStateAction<string>>;
	userId: string;
	findUserRoute: () => void;
	buttonText: string;
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

export interface NavigatorButtonProps {
	iconName: string;
	path: string;
	text: string;
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

export interface ToggleButtonProps {
	iconName: string;
	onPress: () => void;
	text: string;
}

export interface TrackedUser {
	alias: string;
	locationVisible: boolean;
	routeVisible: boolean;
	userId: string;
}

// Combine with Tracked User
export interface TrackedUserFull {
	id: number;
	locationVisible: boolean;
	routeVisible: boolean;
	userId: string;
	username: string;
}

export type TrackedUsers = {
	[key: string]: {
		alias: string;
		locationVisible: boolean;
		routeVisible: boolean;
		userId: string;
	};
};

export interface TrackedUserRouteProps {
	id: number;
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

export interface UsersLocationInfo {
	usersWaypoints: Waypoint[];
	usersLatestWaypoint: null | Waypoint;
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
