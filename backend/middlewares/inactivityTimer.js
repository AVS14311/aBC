module.exports = (req, res, next) => {
  req.session = req.session || {};
  req.session.lastActivity = Date.now();
  next();
};

// Add this to your server.js after cookieParser
const inactivityTimeout = parseInt(process.env.INACTIVITY_TIMEOUT || '300000'); // 5 minutes

setInterval(() => {
  if (global.sessions) {
    const now = Date.now();
    Object.keys(global.sessions).forEach(sessionId => {
      if (now - global.sessions[sessionId] > inactivityTimeout) {
        delete global.sessions[sessionId];
        console.log(`Session ${sessionId} expired due to inactivity`);
      }
    });
  }
}, 60000); // Check every minute