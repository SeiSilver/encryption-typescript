import {decrypt, encrypt} from "@utils/encryptionUtils";

const originData = "This is the origin data";

console.log(`origin: ${originData}`);

const dataDecrypted = encrypt(originData);

console.log(`decrypted: ${dataDecrypted}`);

const dataEncrypted = decrypt(dataDecrypted);

console.log(`encrypted: ${dataEncrypted}`);
