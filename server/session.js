const cookieSession = require('cookie-session');

if (process.env.NODE_ENV === 'production' && !process.env.SESSION_KEY) {
  throw new Error('SESSION_KEY must be set in production for secure sessions');
}

const sessionMiddleware = cookieSession({
  name: 'nivaran_session',
  keys: [process.env.SESSION_KEY || 'secret_key_change_me'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  secure: process.env.NODE_ENV === 'production', // TRUE in production (Render)
  httpOnly: true, // Secure, no JS access
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' REQUIRED for cross-domain
});

module.exports = sessionMiddleware;
