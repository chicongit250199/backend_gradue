const crypto = require('crypto');

const algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
const key = 'DeMUM2Sr';

export function encrypt (text) {
  const cipher = crypto.createCipher(algorithm, key);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

export function decrypt (encrypted) {
  const decipher = crypto.createDecipher(algorithm, key);
  return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}
