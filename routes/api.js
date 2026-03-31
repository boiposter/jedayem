const express = require('express');
const { getDB } = require('../config/database');
const { optionalAuth } = require('../middleware/auth');
const { sanitizeInput } = require('../middleware/sanitize');

const router = express.Router();
router.use(sanitizeInput);

// Get all matches
router.get('/matches', optionalAuth, (req, res) => {
  try {
    const db = getDB();
    const { status, sport } = req.query;
    const filters = {};
    if (status && ['live', 'upcoming', 'finished'].includes(status)) filters.status = status;
    if (sport) filters.sport = sport;

    const matches = db.getMatches(filters);
    res.json({ matches });
  } catch (err) {
    console.error('Matches error:', err);
    res.status(500).json({ error: 'صار خطأ في جلب المباريات' });
  }
});

// Get single match
router.get('/matches/:id', (req, res) => {
  try {
    const db = getDB();
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'رقم مباراة غير صحيح' });

    const match = db.getMatchById(id);
    if (!match) return res.status(404).json({ error: 'المباراة غير موجودة' });

    res.json({ match });
  } catch (err) {
    res.status(500).json({ error: 'صار خطأ' });
  }
});

// Get live matches
router.get('/live', (req, res) => {
  try {
    const db = getDB();
    const matches = db.getMatches({ status: 'live' });
    res.json({ matches });
  } catch (err) {
    res.status(500).json({ error: 'صار خطأ في جلب المباريات المباشرة' });
  }
});

// Stats
router.get('/stats', (req, res) => {
  try {
    const db = getDB();
    const all = db.getMatches();
    const live = all.filter(m => m.status === 'live');
    const sports = [...new Set(all.map(m => m.sport))];
    res.json({
      total_matches: all.length,
      live_now: live.length,
      sports,
      last_updated: new Date().toISOString()
    });
  } catch(err) {
    res.status(500).json({ error: 'خطأ' });
  }
});

module.exports = router;
