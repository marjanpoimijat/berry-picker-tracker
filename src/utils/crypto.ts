import CryptoES from "crypto-es";
import * as Crypto from "expo-crypto";
import { EncryptedWaypoint, Waypoint } from "../types";

/**
 * Encrypt a message using AES encryption.
 * AES encryption needs an initialisation vector (iv).
 * This is generated using the same function as for generating keys (generateKeyString).
 * The string is also converted back into a WordArray for encryption
 * WordArrays are converted to strings when passing them around between functions.
 * They need to be parsed back into WordArrays for use. Base64 enconding is used for this.
 *
 * @param {Waypoint} waypoint The waypoint object to be encrypted
 * @param {string} keyString The encryption key in string form, which the function will convert to WordArray for use
 *
 * @returns {EncryptedWaypoint}  An object similar to Waypoint but longitude and latitude are strings.
 */
export const encrypt = (waypoint: Waypoint, keyString: string) => {
	const keyWordArray = CryptoES.enc.Utf8.parse(keyString);
	const ivLongitudeString = generateKeyString(16);
	const ivLatitudeString = generateKeyString(16);
	const ivLongitudeWordArray = CryptoES.enc.Base64.parse(ivLongitudeString);
	const ivLatitudeWordArray = CryptoES.enc.Base64.parse(ivLatitudeString);
	const longitudeString = waypoint.longitude.toString();
	const latitudeString = waypoint.latitude.toString();
	const encryptedLongitudeData = CryptoES.AES.encrypt(longitudeString, keyWordArray, { iv: ivLongitudeWordArray });
	const encryptedLatitudeData = CryptoES.AES.encrypt(latitudeString, keyWordArray, { iv: ivLatitudeWordArray });
	const encryptedLongitudeOutput =
		encryptedLongitudeData.ciphertext.toString(CryptoES.enc.Base64) +
		encryptedLongitudeData.iv.toString(CryptoES.enc.Base64);
	const encryptedLatitudeOutput =
		encryptedLatitudeData.ciphertext.toString(CryptoES.enc.Base64) +
		encryptedLatitudeData.iv.toString(CryptoES.enc.Base64);
	const encryptedWaypoint: EncryptedWaypoint = {
		...waypoint,
		latitude: encryptedLatitudeOutput,
		longitude: encryptedLongitudeOutput,
	};
	return encryptedWaypoint;
};

/**
 * Decrypts a message using AES encryption
 * @param {Array<string>} encryptedMessage An array which contains encrypted message and the iv in string form
 * @param {string} keyString The encryption key in string form
 *
 * @returns {string} The decrypted message in string form
 */
// export const decrypt = (encryptedWaypoint: EncryptedWaypoint, keyString: string) => {
// 	const keyWordArray = CryptoES.enc.Utf8.parse(keyString);
// 	const decrypted = CryptoES.AES.decrypt(encryptedMessage[0], keyWordArray, {
// 		iv: CryptoES.enc.Base64.parse(encryptedMessage[1]),
// 	});
// 	return decrypted.toString(CryptoES.enc.Utf8);
// };

export const decrypt = (encryptedWaypoint: EncryptedWaypoint, keyString: string) => {
	try {
		console.log("keyString:", keyString);
		const keyWordArray = CryptoES.enc.Utf8.parse(keyString);
		console.log("keyWordArray:", keyWordArray);

		const encryptedLongitudeString = encryptedWaypoint.longitude.slice(0, -24);
		const encryptedLatitudeString = encryptedWaypoint.latitude.slice(0, -24);
		console.log("encryptedLongitudeString:", encryptedLongitudeString);

		const encryptedLongitudeIvString = encryptedWaypoint.longitude.slice(-24);
		const encryptedLatitudeIvString = encryptedWaypoint.latitude.slice(-24);
		console.log("encryptedLongitudeIvString:", encryptedLongitudeIvString);

		const decryptedLongitudeData = CryptoES.AES.decrypt(encryptedLongitudeString, keyWordArray, {
			iv: CryptoES.enc.Base64.parse(encryptedLongitudeIvString),
		});
		const decryptedLatitudeData = CryptoES.AES.decrypt(encryptedLatitudeString, keyWordArray, {
			iv: CryptoES.enc.Base64.parse(encryptedLatitudeIvString),
		});
		console.log("decryptedLongitudeData:", decryptedLongitudeData);

		const decryptedLongitudeString = decryptedLongitudeData.toString(CryptoES.enc.Utf8);
		const decryptedLatitudeString = decryptedLatitudeData.toString(CryptoES.enc.Utf8);
		console.log("decryptedLongitudeString:", decryptedLongitudeString); //ei palauta mitään

		const decryptedLongitudeNumber = parseFloat(decryptedLongitudeString);
		const decryptedLatitudeNumber = parseFloat(decryptedLatitudeString);
		//console.log('decryptedLongitudeNumber:', decryptedLongitudeNumber)

		const waypoint: Waypoint = {
			...encryptedWaypoint,
			latitude: decryptedLatitudeNumber,
			longitude: decryptedLongitudeNumber,
		};
		return waypoint;
	} catch (error) {
		console.log(error);
		return null;
	}
};

/**
 * Generates a key in string form. First gets random bytes using the expo-crypto library.
 * These random bytes are used to generate a WordArray, which is converted to a string.
 * @param {number} length The amount of bytes that are needed for the key generation.
 * @param {boolean} utf8 Boolean value to determine whether resulting key is encoded into utf-8 or Base64.
 *
 * @returns {string} The key in string form
 */
export const generateKeyString = (length: number, utf8 = false) => {
	const byteArray = Crypto.getRandomBytes(length);
	const keyWordArray = CryptoES.lib.WordArray.create(byteArray);
	if (utf8) {
		return CryptoES.enc.Utf8.stringify(keyWordArray);
	} else {
		return CryptoES.enc.Base64.stringify(keyWordArray);
	}
};
