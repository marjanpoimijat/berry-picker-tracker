import CryptoES from "crypto-es";
import * as Crypto from "expo-crypto";

/**
 * WordArrays are converted to strings. They need to be parsed back into WordArrays for use.
 * The encrypt function returns an array with the ciphertext and with the iv as both are needed for decryption.
 *
 */

export const encrypt = (message: string, keyString: string) => {
	const keyWordArray = CryptoES.enc.Base64.parse(keyString);
	const ivString = generateKeyString(16);
	const ivWordArray = CryptoES.enc.Base64.parse(ivString);
	const encrypted = CryptoES.AES.encrypt(message, keyWordArray, { iv: ivWordArray });
	return [encrypted.ciphertext.toString(CryptoES.enc.Base64), encrypted.iv.toString(CryptoES.enc.Base64)];
};

export const decrypt = (encryptedMessage: Array<string>, keyString: string) => {
	const keyWordArray = CryptoES.enc.Base64.parse(keyString);
	const decrypted = CryptoES.AES.decrypt(encryptedMessage[0], keyWordArray, {
		iv: CryptoES.enc.Base64.parse(encryptedMessage[1]),
	});
	return decrypted.toString(CryptoES.enc.Utf8);
};

export const generateKeyString = (length: number) => {
	const byteArray = Crypto.getRandomBytes(length);
	const keyWordArray = CryptoES.lib.WordArray.create(byteArray);
	return CryptoES.enc.Base64.stringify(keyWordArray);
};
