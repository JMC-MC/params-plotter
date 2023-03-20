// Determining if crypto support is unavailable
let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

// Generating a nonces
let importScenNonce = crypto.randomBytes(16).toString('hex');

// Maybe you'll have some other later
module.exports = { importScenNonce };
