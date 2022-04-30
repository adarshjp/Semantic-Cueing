const crypto = require("crypto");
let algorithm = process.env.algorithm; // or any other algorithm supported by OpenSSL
let iv = new Buffer.from(crypto.randomBytes(16));
let ivstring = iv.toString("hex").slice(0, 16);
const secret = process.env.secret;
let key=crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
exports.encodeMsg = (msg) => {
  var cipher = crypto.createCipheriv(algorithm, key, ivstring);
  var encrypted = cipher.update(msg, "utf8", "hex") + cipher.final("hex");
  return encrypted;
}
exports.decodeMsg = (msg) => {
  var decipher = crypto.createDecipheriv(algorithm,key, ivstring);
  var decrypted = decipher.update(msg, "hex", "utf8") + decipher.final("utf8");
  return decrypted;
}