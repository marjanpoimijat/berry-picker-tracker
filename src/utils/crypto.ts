import CryptoES from "crypto-es";
import * as Crypto from "expo-crypto";

export const encrypt = (message: string, key: string) => {
	const encrypted = CryptoES.AES.encrypt(message, key).toString();
	console.log(encrypted);
	return encrypted;
};

export const decrypt = (encryptedMessage: string, key: string) => {
	const decrypted = CryptoES.AES.decrypt(encryptedMessage, key);
	console.log("decrypted: ");
	console.log(decrypted.toString(CryptoES.enc.Utf8));
	return decrypted;
};

export const generateWordArray = (length: number) => {
	const byteArray = Crypto.getRandomBytes(length);
	return CryptoES.lib.WordArray.create(byteArray);
};
