const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getUrlStats,
  handleRedirect
} = require('../controllers/urlController');

router.post('/shorturls', createShortUrl);
router.get('/shorturls/:shortcode', getUrlStats);
router.get('/:shortcode', handleRedirect);

module.exports = router;
