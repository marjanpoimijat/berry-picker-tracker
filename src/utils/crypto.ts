import CryptoES from "crypto-es";
import * as Crypto from "expo-crypto";
import { DecryptedWaypointFromServer, EncryptedWaypoint, Waypoint, WaypointFromServer } from "../types";

/**
 * Generates a random key in string form. First gets random bytes using the expo-crypto library.
 * These random bytes are used to generate a WordArray, which is converted to a string.
 * @param {number} length The amount of bytes that are needed for the key generation.
 *
 * @returns {string} The key in string form
 */
export const generateKeyString = (length: number) => {
	const byteArray = Crypto.getRandomBytes(length);
	const keyWordArray = CryptoES.lib.WordArray.create(byteArray);
	return CryptoES.enc.Base64.stringify(keyWordArray);
};

/**
 * Encrypt a message using AES encryption.
 * AES encryption needs an initialisation vector (iv).
 * This is generated using the same function as for generating keys (generateKeyString).
 * The string is also converted back into a WordArray for encryption
 * WordArrays are converted to strings when passing them around between functions.
 * They need to be parsed back into WordArrays for use. Base64 enconding is used for this.
 *
 * @param {string} message The message to be encrypted
 * @param {string} keyString The encryption key in string form, which the function will convert to WordArray for use
 *
 * @returns {string}  A string with the ciphertext and iv. Iv is always the last 24 characters of the string.
 */
export const encrypt = (message: string, keyString: string) => {
	const keyWordArray = CryptoES.enc.Base64.parse(keyString);
	const ivString = generateKeyString(16);
	const ivWordArray = CryptoES.enc.Base64.parse(ivString);
	const encrypted = CryptoES.AES.encrypt(message, keyWordArray, { iv: ivWordArray });
	const output = CryptoES.enc.Base64.stringify(encrypted.ciphertext) + CryptoES.enc.Base64.stringify(encrypted.iv);
	return output;
};

/**
 * Decrypts a message using AES decryption
 * @param {string} encryptedMessage A string which contains encrypted message and iv
 * @param {string} keyString The encryption key in string form
 *
 * @returns {string} The decrypted message in string form
 */
export const decrypt = (encryptedMessage: string, keyString: string) => {
	const keyWordArray = CryptoES.enc.Base64.parse(keyString);
	const ciphertext = encryptedMessage.slice(0, -24);
	const iv = encryptedMessage.slice(-24);
	const decrypted = CryptoES.AES.decrypt(ciphertext, keyWordArray, {
		iv: CryptoES.enc.Base64.parse(iv),
	});
	const output = CryptoES.enc.Utf8.stringify(decrypted);
	return output;
};

/**
 * Encrypt a waypoint using AES encryption.
 * AES encryption needs an initialisation vector (iv).
 * This is generated using the same function as for generating keys (generateKeyString).
 * The string is also converted back into a WordArray for encryption
 * WordArrays are converted to strings when passing them around between functions.
 * They need to be parsed back into WordArrays for use. Base64 enconding is used for this.
 *
 * @param {Waypoint} waypoint A waypoint object to be encrypted
 * @param {string} keyString The encryption key in string form, which the function will convert to WordArray for use
 *
 * @returns {EncryptedWaypoint}  An object similar to Waypoint but longitude and latitude are encrypted strings.
 */
export const encryptWaypoint = (waypoint: Waypoint, keyString: string) => {
	const keyWordArray = CryptoES.enc.Base64.parse(keyString);
	const ivLongitudeString = generateKeyString(16);
	const ivLatitudeString = generateKeyString(16);
	const ivLongitudeWordArray = CryptoES.enc.Base64.parse(ivLongitudeString);
	const ivLatitudeWordArray = CryptoES.enc.Base64.parse(ivLatitudeString);
	const longitudeString = waypoint.longitude.toString();
	const latitudeString = waypoint.latitude.toString();
	const encryptedLongitudeData = CryptoES.AES.encrypt(longitudeString, keyWordArray, { iv: ivLongitudeWordArray });
	const encryptedLatitudeData = CryptoES.AES.encrypt(latitudeString, keyWordArray, { iv: ivLatitudeWordArray });
	const encryptedLongitudeOutput =
		CryptoES.enc.Base64.stringify(encryptedLongitudeData.ciphertext) +
		CryptoES.enc.Base64.stringify(encryptedLongitudeData.iv);
	const encryptedLatitudeOutput =
		CryptoES.enc.Base64.stringify(encryptedLatitudeData.ciphertext) +
		CryptoES.enc.Base64.stringify(encryptedLatitudeData.iv);
	const encryptedWaypoint: EncryptedWaypoint = {
		...waypoint,
		latitude: encryptedLatitudeOutput,
		longitude: encryptedLongitudeOutput,
	};
	return encryptedWaypoint;
};

/**
 * Decrypts a message using AES decryption
 * @param {EncryptedWaypoint} encryptedWaypoint A waypoint object to be decrypted
 * @param {string} keyString The encryption key in string form
 *
 * @returns {Waypoint} A decrypted waypoint object
 */
export const decryptWaypoint = (encryptedWaypoint: WaypointFromServer, keyString: string) => {
	const keyWordArray = CryptoES.enc.Base64.parse(keyString);
	const encryptedLongitudeString = encryptedWaypoint.longitude.slice(0, -24);
	const encryptedLatitudeString = encryptedWaypoint.latitude.slice(0, -24);
	const encryptedLongitudeIvString = encryptedWaypoint.longitude.slice(-24);
	const encryptedLatitudeIvString = encryptedWaypoint.latitude.slice(-24);
	const decryptedLongitudeData = CryptoES.AES.decrypt(encryptedLongitudeString, keyWordArray, {
		iv: CryptoES.enc.Base64.parse(encryptedLongitudeIvString),
	});
	const decryptedLatitudeData = CryptoES.AES.decrypt(encryptedLatitudeString, keyWordArray, {
		iv: CryptoES.enc.Base64.parse(encryptedLatitudeIvString),
	});
	const decryptedLongitudeString = CryptoES.enc.Utf8.stringify(decryptedLongitudeData);
	const decryptedLatitudeString = CryptoES.enc.Utf8.stringify(decryptedLatitudeData);
	const decryptedLongitudeNumber = parseFloat(decryptedLongitudeString);
	const decryptedLatitudeNumber = parseFloat(decryptedLatitudeString);
	const waypoint: DecryptedWaypointFromServer = {
		...encryptedWaypoint,
		latitude: decryptedLatitudeNumber,
		longitude: decryptedLongitudeNumber,
	};
	return waypoint;
};
