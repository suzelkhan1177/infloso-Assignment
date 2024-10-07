const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const logger = require('./logger');
require('dotenv').config();

const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const cookieHeader = req.headers.cookie && cookie.parse(req.headers.cookie).token;

  const tokenCookie = authorizationHeader
    ? authorizationHeader.replace('Bearer ', '').trim()
    : cookieHeader;

  if (!tokenCookie) {
    logger.error('Access denied. No token provided.');
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  jwt.verify(tokenCookie, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.error('Invalid token.');
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
    req.userId = decoded.userId;

    logger.info('User authenticated successfully.');
    next();
  });
};

module.exports = auth;
