import axios from 'axios';

export async function logEvent(message) {
  try {
    await axios.post('http://localhost:4000/logs', {
      package: 'FrontendTestSubmission',
      message,
      timestamp: new Date().toISOString()
    });
  } catch {}
}
