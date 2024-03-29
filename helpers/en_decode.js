const crypto = require("crypto");
let algorithm = process.env.algorithm; // or any other algorithm supported by OpenSSL
let ivstring = process.env.ivstring;
let key=process.env.key;
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