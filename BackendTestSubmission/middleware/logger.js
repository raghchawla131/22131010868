const axios = require('axios');

async function requestLogger(req, res, next) {
  try {
    await axios.post('http://localhost:4000/logs', {
      package: 'BackendTestSubmission',
      method: req.method,
      url: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  } catch {}
  next();
}

async function logEvent(message) {
  try {
    await axios.post('http://localhost:4000/logs', {
      package: 'BackendTestSubmission',
      message,
      timestamp: new Date().toISOString()
    });
  } catch {}
}

module.exports = {
  requestLogger,
  logEvent
};
