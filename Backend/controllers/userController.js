const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/mysql'); 
const logger = require('../config/logger');
const transporter = require('../config/mail');
require('dotenv').config();

module.exports.welcome = async (req, res) => {
  return res.status(200).json({ success: true, message: 'User Auth successfully.' });
}

module.exports.signup = async (req, res) => {
  const { username, email, password } = req.body; 

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Username, email, and password are required.' });
  }

  try {
    const [existingUser] = await pool.query(
      'SELECT * FROM User WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser.length > 0) {
      logger.error('Username or email already exists.');
      return res.status(400).json({ success: false, message: 'Username or email already exists.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await pool.query(
      'INSERT INTO User (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    const token = jwt.sign({ username, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    logger.info('User registered successfully.');
    return res.status(201).json({ success: true, message: 'User registered successfully.', token });
  } catch (error) {
    logger.error('Error during user registration: ' + error.message);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

module.exports.login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    
    const [user] = await pool.query(
      'SELECT * FROM User WHERE username = ? OR email = ?',
      [usernameOrEmail, usernameOrEmail]
    );

    if (user.length === 0) {
      logger.error('Invalid username/email or password.');
      return res.status(401).json({ success: false, message: 'Invalid username/email or password.' });
    }


    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      logger.error('Invalid username/email or password.');
      return res.status(401).json({ success: false, message: 'Invalid username/email or password.' });
    }


    const token = jwt.sign({ userId: user[0].UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });

    logger.info('User logged in successfully.');
    return res.status(200).json({ success: true, message: 'User logged in successfully.', token });
  } catch (error) {
    logger.error('Error during user login: ' + error.message);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};



module.exports.forgotPassword = async (req, res) => {
  const { email } = req.params;

  try {
    const [user] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);

    if (user.length === 0) {
      logger.error('User with this email does not exist.');
      return res.status(404).json({ success: false, message: 'User with this email does not exist.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHashed = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetTokenExpiry = Date.now() + 3600000; 

    await pool.query('UPDATE User SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?', 
      [resetTokenHashed, resetTokenExpiry, email]
    );

    const resetURL = `http://localhost:3000/reset_password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMIAL_ID,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click the following link to reset your password: ${resetURL}. If you did not request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);

    logger.info(`Password reset email sent to ${email}.`);
    return res.status(200).json({ success: true, message: 'Password reset email sent.' });
  } catch (error) {
    logger.error('Error during forgot password: ' + error.message);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};


module.exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;


  if (newPassword !== confirmPassword) {
    logger.error('Password and confirm password do not match.');
    return res.status(400).json({ success: false, message: 'Password and confirm password do not match.' });
  }

  try {

    const resetTokenHashed = crypto.createHash('sha256').update(token).digest('hex');

    const [user] = await pool.query(
      'SELECT * FROM User WHERE reset_password_token = ? AND reset_password_expires > ?',
      [resetTokenHashed, Date.now()]
    );

    if (user.length === 0) {
      logger.error('Invalid or expired reset token.');
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await pool.query(
      'UPDATE User SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE UserID = ?',
      [hashedPassword, user[0].UserID]
    );

    logger.info('Password reset successful.');
    return res.status(200).json({ success: true, message: 'Password reset successful.' });
  } catch (error) {
    logger.error('Error during password reset: ' + error.message);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

