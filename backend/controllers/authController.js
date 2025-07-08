const jwt = require('jsonwebtoken');

// Generate this once using: bcrypt.hashSync('yourpassword', 10)
const HASHED_PASSWORD = process.env.APP_PASSWORD_HASH || '$2a$10$XZ8zL2W9cTn7U9bVY5QzO.9mJ6W8vR1kL0dA2B3C4D5E6F7G8H9I0J'; // vishal123
const login = async (req, res) => {
  const { password } = req.body;

  if (password !== process.env.MY_PASSWORD) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({}, process.env.JWT_SECRET, { 
    expiresIn: process.env.JWT_EXPIRE || '5m'
  });

  // Store session activity
  global.sessions = global.sessions || {};
  global.sessions[token] = Date.now();

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 300000 // 5 minutes
  });

  res.json({ success: true });
};

const logout = (req, res) => {
  const token = req.cookies.token;
  if (token && global.sessions) {
    delete global.sessions[token];
  }
  res.clearCookie('token');
  res.json({ success: true });
};

const checkAuth = (req, res) => {
  res.json({ authenticated: true });
};

module.exports = { login, logout, checkAuth };