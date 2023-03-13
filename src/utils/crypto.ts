import CryptoES from "crypto-es";

export function encrypt(message: string, key: string) {
	const encrypted = CryptoES.AES.encrypt(message, key).toString();
	console.log(encrypted);
	return encrypted;
}

export function decrypt(encryptedMessage: string, key: string) {
	const decrypted = CryptoES.AES.decrypt(encryptedMessage, key);
	console.log("decrypted: ");
	console.log(decrypted.toString(CryptoES.enc.Utf8));
	return decrypted;
}
