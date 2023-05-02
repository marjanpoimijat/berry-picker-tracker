import { decrypt, decryptWaypoint, encrypt, encryptWaypoint, generateKeyString } from "./crypto";
import { Waypoint, WaypointFromServer } from "../types";

describe("Crypto", () => {
	it("encrypting a message returns unreadable string", () => {
		const textToEncrypt = "readabletext";
		const encryptionKey = generateKeyString(32);
		const encryptedInfo = encrypt(textToEncrypt, encryptionKey);
		const encryptedText = encryptedInfo.substring(0, -24);
		expect(encryptedText).not.toBe(textToEncrypt);
	});
	it("decrypting a message returns original text", () => {
		const textToEncrypt = "readabletext";
		const encryptionKey = generateKeyString(32);
		const encryptedInfo = encrypt(textToEncrypt, encryptionKey);
		const decryptedInfo = decrypt(encryptedInfo, encryptionKey);
		expect(decryptedInfo).toBe(textToEncrypt);
	});
	it("Encrypting a waypoint returns unreadable string", () => {
		const waypointToEncrypt: Waypoint = {
			connection: "2",
			latitude: 3,
			longitude: 3,
			mnc: "a",
			routeId: "1",
			ts: 1,
		};
		const encryptionKey = generateKeyString(32);
		const encryptedWaypoint = encryptWaypoint(waypointToEncrypt, encryptionKey);
		expect(encryptedWaypoint.latitude).not.toBe(3);
		expect(encryptedWaypoint.longitude).not.toBe(3);
	});
	it("Decrypting a waypoint returns readable values", () => {
		const waypointToEncrypt: Waypoint = {
			connection: "2",
			latitude: 3,
			longitude: 3,
			mnc: "a",
			routeId: "1",
			ts: 1,
		};
		const encryptionKey = generateKeyString(32);
		const encryptedWaypoint = encryptWaypoint(waypointToEncrypt, encryptionKey);
		const encryptedWaypointFromServer: WaypointFromServer = {
			...encryptedWaypoint,
		};
		const decryptedWaypoint = decryptWaypoint(encryptedWaypointFromServer, encryptionKey);
		expect(decryptedWaypoint.latitude).toBe(3);
		expect(decryptedWaypoint.longitude).toBe(3);
	});
});
