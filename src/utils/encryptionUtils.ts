import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY as string; // key need to be 32 length
const iv = crypto.randomBytes(16);
const algorithm = 'aes-256-gcm';

export const encrypt = (text: string): string => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return encrypted + authTag;
}

export const decrypt = (encryptedText: string): string => {
    const authTag = encryptedText.slice(-32);
    const encryptedData = encryptedText.slice(0, -32);
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}