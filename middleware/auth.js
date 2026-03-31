const jwt = require('jsonwebtoken');
const { getDB } = require('../config/database');

function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'مطلوب تسجيل دخول' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = getDB();
    const user = db.findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'المستخدم غير موجود' });
    }

    req.user = { id: user.id, username: user.username, email: user.email, display_name: user.display_name, balance: user.balance };
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.status(403).json({ error: 'الجلسة انتهت، سجل دخول مرة ثانية' });
  }
}

function optionalAuth(req, res, next) {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = getDB();
    const user = db.findUserById(decoded.userId);
    if (user) req.user = { id: user.id, username: user.username, display_name: user.display_name, balance: user.balance };
  } catch (err) {}
  next();
}

module.exports = { authenticateToken, optionalAuth };
