const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

const defaultData = {
  users: [],
  matches: [
    { id: 1, sport: 'كرة قدم', team_home: 'الهلال', team_away: 'النصر', odds_home: 1.85, odds_draw: 3.40, odds_away: 4.20, status: 'live', start_time: '2026-03-31T20:00:00', score_home: 1, score_away: 0 },
    { id: 2, sport: 'كرة قدم', team_home: 'الأهلي', team_away: 'الاتحاد', odds_home: 2.10, odds_draw: 3.20, odds_away: 3.50, status: 'live', start_time: '2026-03-31T21:00:00', score_home: 2, score_away: 2 },
    { id: 3, sport: 'كرة قدم', team_home: 'الشباب', team_away: 'الفيحاء', odds_home: 1.60, odds_draw: 3.80, odds_away: 5.50, status: 'upcoming', start_time: '2026-04-01T18:00:00', score_home: 0, score_away: 0 },
    { id: 4, sport: 'كرة قدم', team_home: 'الرائد', team_away: 'الطائي', odds_home: 2.40, odds_draw: 3.10, odds_away: 3.00, status: 'upcoming', start_time: '2026-04-01T20:00:00', score_home: 0, score_away: 0 },
    { id: 5, sport: 'كرة قدم', team_home: 'ضمك', team_away: 'الفتح', odds_home: 2.20, odds_draw: 3.30, odds_away: 3.20, status: 'upcoming', start_time: '2026-04-02T19:00:00', score_home: 0, score_away: 0 },
    { id: 6, sport: 'كرة قدم', team_home: 'الوحدة', team_away: 'أبها', odds_home: 1.90, odds_draw: 3.50, odds_away: 4.00, status: 'finished', start_time: '2026-03-30T20:00:00', score_home: 3, score_away: 1 },
    { id: 7, sport: 'كرة سلة', team_home: 'الاتحاد', team_away: 'الهلال', odds_home: 1.75, odds_draw: null, odds_away: 2.10, status: 'upcoming', start_time: '2026-04-01T21:30:00', score_home: 0, score_away: 0 },
    { id: 8, sport: 'كرة سلة', team_home: 'النصر', team_away: 'الأهلي', odds_home: 2.00, odds_draw: null, odds_away: 1.80, status: 'live', start_time: '2026-03-31T22:00:00', score_home: 45, score_away: 42 }
  ],
  nextUserId: 1
};

let db = null;

function initDB() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(DB_PATH)) {
    try {
      db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    } catch(e) {
      db = JSON.parse(JSON.stringify(defaultData));
      saveDB();
    }
  } else {
    db = JSON.parse(JSON.stringify(defaultData));
    saveDB();
  }
  return db;
}

function saveDB() {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

function getDB() {
  if (!db) initDB();
  return {
    // Users
    findUserByLogin(login) {
      return db.users.find(u => (u.username === login || u.email === login) && u.is_active);
    },
    findUserById(id) {
      return db.users.find(u => u.id === id && u.is_active);
    },
    findUserByUsernameOrEmail(username, email) {
      return db.users.find(u => u.username === username || u.email === email);
    },
    createUser({ username, email, password, display_name }) {
      const user = {
        id: db.nextUserId++,
        username,
        email,
        password,
        display_name: display_name || username,
        balance: 0,
        is_active: true,
        created_at: new Date().toISOString()
      };
      db.users.push(user);
      saveDB();
      return user;
    },

    // Matches
    getMatches({ status, sport } = {}) {
      let matches = [...db.matches];
      if (status) matches = matches.filter(m => m.status === status);
      if (sport) matches = matches.filter(m => m.sport === sport);
      return matches.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
    },
    getMatchById(id) {
      return db.matches.find(m => m.id === id);
    }
  };
}

module.exports = { initDB, getDB };
