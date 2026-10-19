import app from './server.js';

export default function handler(req, res) {
  // Ensure Express routes match regardless of whether Vercel passes /api/path or /path
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }
  return app(req, res);
}
