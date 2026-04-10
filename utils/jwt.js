const jwt = require('jsonwebtoken');

function signToken(payload, expiresIn = '30d') {
  return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
}

module.exports = { signToken, verifyToken };
