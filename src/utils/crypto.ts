import CryptoES from "crypto-es";
import * as Crypto from "expo-crypto";

/**
 * WordArrays are converted to strings. They need to be parsed back into WordArrays for use.
 *
 */

export const encrypt = (message: string, keyString: string) => {
	const keyWordArray = CryptoES.enc.Base64.parse(keyString);
	const ivString = generateKeyString(16);
	const ivWordArray = CryptoES.enc.Base64.parse(ivString);
	const encrypted = CryptoES.AES.encrypt(message, keyWordArray, { iv: ivWordArray }).toString();
	console.log(encrypted);
	return encrypted;
};

export const decrypt = (encryptedMessage: string, keyString: string) => {
	const keyWordArray = CryptoES.enc.Base64.parse(keyString);
	const decrypted = CryptoES.AES.decrypt(encryptedMessage, keyWordArray);
	console.log("decrypted: ");
	console.log(decrypted.toString(CryptoES.enc.Utf8));
	return decrypted;
};

export const generateKeyString = (length: number) => {
	const byteArray = Crypto.getRandomBytes(length);
	const keyWordArray = CryptoES.lib.WordArray.create(byteArray);
	return CryptoES.enc.Base64.stringify(keyWordArray);
};
