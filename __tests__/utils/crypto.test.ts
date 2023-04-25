import { decrypt, encrypt, generateKeyString } from "../../src/utils/crypto";

describe("Crypto", () => {
	it("encrypting returns unreadable string", () => {
		const textToEncrypt = "readabletext";
		const encryptionKey = generateKeyString(32);
		const encryptedInfo = encrypt(textToEncrypt, encryptionKey);
		const encryptedText = encryptedInfo.substring(0, -24);
		expect(encryptedText).not.toBe(textToEncrypt);
	});
	it("decrypting returns original text", () => {
		const textToEncrypt = "readabletext";
		const encryptionKey = generateKeyString(32);
		const encryptedInfo = encrypt(textToEncrypt, encryptionKey);
		const decryptedInfo = decrypt(encryptedInfo, encryptionKey);
		expect(decryptedInfo).toBe(textToEncrypt);
	});
});
