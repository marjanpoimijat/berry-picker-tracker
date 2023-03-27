import CryptoES from "crypto-es";
import * as Crypto from "expo-crypto";

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
 * @returns {Array<string>}  An array with the ciphertext and iv in string form as both are needed for decryption.
 */
export const encrypt = (message: string, keyString: string) => {
	const keyWordArray = CryptoES.enc.Base64.parse(keyString);
	const ivString = generateKeyString(16);
	const ivWordArray = CryptoES.enc.Base64.parse(ivString);
	const encrypted = CryptoES.AES.encrypt(message, keyWordArray, { iv: ivWordArray });
	return [encrypted.ciphertext.toString(CryptoES.enc.Base64), encrypted.iv.toString(CryptoES.enc.Base64)];
};

/**
 * Decrypts a message using AES encryption
 * @param {Array<string>} encryptedMessage An array which contains encrypted message and the iv in string form
 * @param {string} keyString The encryption key in string form
 *
 * @returns {string} The decrypted message in string form
 */
export const decrypt = (encryptedMessage: Array<string>, keyString: string) => {
	const keyWordArray = CryptoES.enc.Base64.parse(keyString);
	const decrypted = CryptoES.AES.decrypt(encryptedMessage[0], keyWordArray, {
		iv: CryptoES.enc.Base64.parse(encryptedMessage[1]),
	});
	return decrypted.toString(CryptoES.enc.Utf8);
};

/**
 * Generates a key in string form. First gets random bytes using the expo-crypto library.
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
