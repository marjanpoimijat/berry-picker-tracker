import { ImageSourcePropType } from "react-native";

export interface AlertObject {
	cancellable: boolean;
	confirmText: string;
	infoText: string;
	onPress: () => void;
	title: string;
}

export interface AppHeaderProps {
	text: string;
}

export interface ButtonIconProps {
	color?: string;
	disabled: boolean;
	iconName: string;
}

export interface ButtonProps {
	imageFile: ImageSourcePropType;
	onPress: () => void;
	selected: boolean;
	text: string;
}

export enum BatteryMode {
	Normal = "normal",
	BatterySavingMode = "Battery saving mode",
}

export interface Coordinate {
	latitude: number;
	longitude: number;
}

export interface CoordinatesMarkerProps {
	coordinates: Coordinate | null;
}

export interface DotProps {
	id: number;
}

export enum Language {
	English = "en",
	Finnish = "fi",
	Swedish = "sv",
}

export interface LinkBlockProps {
	link: string;
	text: string;
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

export interface MasterButtonProps {
	color?: string;
	disabled?: boolean;
	handlePress: () => void;
	iconName: string;
	text: string;
	toggled?: boolean;
}

export interface MenuButtonProps {
	iconName: string;
	onPress: () => void;
	routeActive?: boolean;
	text: string;
	visible: boolean;
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

export interface RemoveUserButtonProps {
	handleRemoveUserButtonPress: () => void;
}

export interface Route {
	routeId: string | null;
	showRoute: boolean;
	active: boolean;
}

export interface RouteButtonProps {
	iconName: string;
	onPress: () => void;
	text: string;
}

export interface RouteLineProps {
	id: number;
	waypoints: Array<Waypoint>;
}

export interface RouteVisibleButtonProps {
	locationVisible: boolean;
	routeVisible: boolean;
	handleRouteVisibleChange: () => void;
}

export interface TitleProps {
	text: string;
}

export interface TrackedUser {
	id: number;
	locationVisible: boolean;
	routeVisible: boolean;
	userId: string;
	username: string;
}

export interface TrackedUserListProps {
	users: Array<TrackedUser>;
}

export type TrackedUsers = {
	[key: string]: TrackedUser;
};

export interface TrackedUserRouteProps {
	user: TrackedUser;
}

export interface TrackedUserRoutesProps {
	users: Array<TrackedUser>;
}

export interface TrackingButtonProps {
	iconName: string;
	onPress: () => void;
	text: string;
}

export interface User {
	userId: string | null;
	username: string;
	refreshingFrequency: number;
	trackingFrequency: number;
	sendingFrequency: number;
	mapLifetime: number;
	offlineMode: boolean;
}

export interface UsernameProps {
	username: string;
}

export interface UserToUpdate {
	locationVisible?: boolean;
	routeVisible?: boolean;
	userId: string;
}

export interface Waypoint {
	routeId: string | null;
	latitude: number;
	longitude: number;
	mnc: string | null;
	connection: string | null;
	ts: number;
}

export interface EncryptedWaypoint {
	routeId: string | null;
	latitude: string;
	longitude: string;
	mnc: string | null;
	connection: string | null;
	ts: number;
}

export interface WaypointFromServer {
	route_id: string | null;
	latitude: string;
	longitude: string;
	mnc: string | null;
	connection: string | null;
	ts: number;
}

export interface DecryptedWaypointFromServer {
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
