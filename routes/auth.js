const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { getDB } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { sanitizeInput } = require('../middleware/sanitize');

const router = express.Router();
router.use(sanitizeInput);

// Register
router.post('/register', [
  body('username')
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_\u0600-\u06FF]+$/)
    .withMessage('اسم المستخدم لازم يكون بين ٣ و ٢٠ حرف'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('الإيميل غير صحيح'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
    .withMessage('كلمة السر لازم تكون ٨ أحرف على الأقل وفيها حروف وأرقام'),
  body('display_name')
    .optional()
    .isLength({ max: 50 })
    .withMessage('الاسم طويل مرة')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(e => e.msg) });
    }

    const { username, email, password, display_name } = req.body;
    const db = getDB();

    // Check existing user
    const existing = db.findUserByUsernameOrEmail(username, email);
    if (existing) {
      return res.status(409).json({ error: 'اسم المستخدم أو الإيميل مستخدم قبل' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = db.createUser({ username, email, password: hashedPassword, display_name });

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: 'تم التسجيل بنجاح! أهلاً فيك',
      user: { id: user.id, username, display_name: user.display_name }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'صار خطأ، حاول مرة ثانية' });
  }
});

// Login
router.post('/login', [
  body('login').notEmpty().withMessage('ادخل اسم المستخدم أو الإيميل'),
  body('password').notEmpty().withMessage('ادخل كلمة السر')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(e => e.msg) });
    }

    const { login, password } = req.body;
    const db = getDB();
    const user = db.findUserByLogin(login);

    if (!user) {
      return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: 'أهلاً ومرحبا!',
      user: { id: user.id, username: user.username, display_name: user.display_name, balance: user.balance }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'صار خطأ، حاول مرة ثانية' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
  res.json({ message: 'تم تسجيل الخروج' });
});

// Get current user profile
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
