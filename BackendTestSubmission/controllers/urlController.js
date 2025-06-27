const fs = require('fs');
const path = require('path');
const { generateShortCode } = require('../utils/shortCodeGenerator');
const validator = require('validator');

const dataPath = path.join(__dirname, '../data.json');

function readData() {
  if (!fs.existsSync(dataPath)) return [];
  return JSON.parse(fs.readFileSync(dataPath));
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

exports.createShortUrl = (req, res) => {
  const { url, validity, shortcode } = req.body;
  if (!url || !validator.isURL(url)) {
    return res.status(400).json({ message: 'Invalid URL' });
  }

  let data = readData();
  let code = shortcode || generateShortCode();

  if (shortcode && data.find(d => d.shortcode === shortcode)) {
    return res.status(409).json({ message: 'Shortcode already in use' });
  }

  while (!shortcode && data.find(d => d.shortcode === code)) {
    code = generateShortCode();
  }

  const now = new Date();
  const expiry = new Date(now.getTime() + (validity ? validity : 30) * 60000);

  const entry = {
    shortcode: code,
    originalUrl: url,
    createdAt: now.toISOString(),
    expiry: expiry.toISOString(),
    clicks: []
  };

  data.push(entry);
  writeData(data);

  res.status(201).json({
    shortLink: `http://localhost:5000/${code}`,
    expiry: entry.expiry
  });
};

exports.getUrlStats = (req, res) => {
  const { shortcode } = req.params;
  const data = readData();
  const entry = data.find(d => d.shortcode === shortcode);
  if (!entry) {
    return res.status(404).json({ message: 'Shortcode not found' });
  }
  res.json({
    shortLink: `http://localhost:5000/${entry.shortcode}`,
    originalUrl: entry.originalUrl,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    clicks: entry.clicks
  });
};

exports.handleRedirect = (req, res) => {
  const { shortcode } = req.params;
  let data = readData();
  const entry = data.find(d => d.shortcode === shortcode);
  if (!entry) {
    return res.status(404).json({ message: 'Shortcode not found' });
  }

  if (new Date() > new Date(entry.expiry)) {
    return res.status(410).json({ message: 'Link expired' });
  }

  const click = {
    timestamp: new Date().toISOString(),
    referrer: req.get('Referrer') || 'Direct',
    location: req.ip
  };
  entry.clicks.push(click);
  writeData(data);

  res.redirect(entry.originalUrl);
};
