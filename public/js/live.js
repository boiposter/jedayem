/**
 * Jedayem — Live Page Logic
 * Real-time match updates with mock data fallback
 */

// Mock data - same 12 matches as odds.js
const MOCK_MATCHES = [
    {
        id: 1,
        sport: 'كرة قدم',
        team_home: 'النصر',
        team_away: 'الهلال',
        odds_home: 2.15,
        odds_draw: 3.50,
        odds_away: 3.20,
        status: 'live',
        start_time: 'الآن',
        score_home: 1,
        score_away: 1,
        volume: 24530,
        participants: 418,
        odds_change: 2.3,
        league: 'الدوري السعودي',
        thumbnail_emoji: '⚽'
    },
    {
        id: 2,
        sport: 'كرة سلة',
        team_home: 'الشرقية للكرة الطائرة',
        team_away: 'جدة للسلة',
        odds_home: 1.85,
        odds_draw: 3.70,
        odds_away: 2.10,
        status: 'live',
        start_time: 'الآن',
        score_home: 78,
        score_away: 72,
        volume: 18920,
        participants: 287,
        odds_change: -1.5,
        league: 'الدوري السعودي للسلة',
        thumbnail_emoji: '🏀'
    },
    {
        id: 3,
        sport: 'تنس',
        team_home: 'عبدالعزيز الدعيع',
        team_away: 'فهد الدعيلج',
        odds_home: 1.92,
        odds_draw: 0.00,
        odds_away: 1.95,
        status: 'live',
        start_time: 'الآن',
        score_home: 2,
        score_away: 1,
        volume: 8750,
        participants: 156,
        odds_change: 0.8,
        league: 'بطولة الخليج للتنس',
        thumbnail_emoji: '🎾'
    },
    {
        id: 4,
        sport: 'كرة قدم',
        team_home: 'الاتحاد',
        team_away: 'الأهلي',
        odds_home: 2.40,
        odds_draw: 3.30,
        odds_away: 2.95,
        status: 'upcoming',
        start_time: 'في 2 ساعة',
        score_home: null,
        score_away: null,
        volume: 15640,
        participants: 342,
        odds_change: -0.5,
        league: 'الدوري السعودي',
        thumbnail_emoji: '⚽'
    },
    {
        id: 5,
        sport: 'كرة قدم',
        team_home: 'الفتح',
        team_away: 'الفيحاء',
        odds_home: 2.05,
        odds_draw: 3.65,
        odds_away: 3.60,
        status: 'upcoming',
        start_time: 'في 4 ساعات',
        score_home: null,
        score_away: null,
        volume: 9280,
        participants: 201,
        odds_change: 1.2,
        league: 'الدوري السعودي',
        thumbnail_emoji: '⚽'
    },
    {
        id: 6,
        sport: 'كرة قدم',
        team_home: 'الشباب',
        team_away: 'الرياض',
        odds_home: 1.95,
        odds_draw: 3.80,
        odds_away: 3.90,
        status: 'upcoming',
        start_time: 'في 6 ساعات',
        score_home: null,
        score_away: null,
        volume: 7540,
        participants: 178,
        odds_change: -2.1,
        league: 'الدوري السعودي',
        thumbnail_emoji: '⚽'
    },
    {
        id: 7,
        sport: 'كرة سلة',
        team_home: 'الرياض للسلة',
        team_away: 'الدمام للسلة',
        odds_home: 1.78,
        odds_draw: 4.10,
        odds_away: 2.25,
        status: 'upcoming',
        start_time: 'في 8 ساعات',
        score_home: null,
        score_away: null,
        volume: 5920,
        participants: 142,
        odds_change: 3.4,
        league: 'الدوري السعودي للسلة',
        thumbnail_emoji: '🏀'
    },
    {
        id: 8,
        sport: 'كرة طائرة',
        team_home: 'الفيحاء للطائرة',
        team_away: 'الأهلي للطائرة',
        odds_home: 2.30,
        odds_draw: 0.00,
        odds_away: 1.70,
        status: 'upcoming',
        start_time: 'في 10 ساعات',
        score_home: null,
        score_away: null,
        volume: 3450,
        participants: 89,
        odds_change: -0.3,
        league: 'دوري الطائرة السعودي',
        thumbnail_emoji: '🏐'
    },
    {
        id: 9,
        sport: 'ملاكمة',
        team_home: 'محمد الذيابي',
        team_away: 'علي الشهري',
        odds_home: 1.88,
        odds_draw: 0.00,
        odds_away: 2.05,
        status: 'upcoming',
        start_time: 'في 12 ساعة',
        score_home: null,
        score_away: null,
        volume: 4120,
        participants: 112,
        odds_change: 1.8,
        league: 'بطولة الملاكمة الخليجية',
        thumbnail_emoji: '🥊'
    },
    {
        id: 10,
        sport: 'كرة قدم',
        team_home: 'الدعيم',
        team_away: 'الوحدة',
        odds_home: 2.50,
        odds_draw: 3.20,
        odds_away: 2.70,
        status: 'finished',
        start_time: 'انتهت',
        score_home: 2,
        score_away: 1,
        volume: 32100,
        participants: 521,
        odds_change: -3.2,
        league: 'الدوري السعودي',
        thumbnail_emoji: '⚽'
    },
    {
        id: 11,
        sport: 'كرة سلة',
        team_home: 'جدة للسلة',
        team_away: 'الخليج للسلة',
        odds_home: 2.15,
        odds_draw: 3.95,
        odds_away: 1.80,
        status: 'finished',
        start_time: 'انتهت',
        score_home: 85,
        score_away: 79,
        volume: 14560,
        participants: 289,
        odds_change: 1.5,
        league: 'الدوري السعودي للسلة',
        thumbnail_emoji: '🏀'
    },
    {
        id: 12,
        sport: 'تنس',
        team_home: 'سارة الشهري',
        team_away: 'ريم العتيبي',
        odds_home: 1.75,
        odds_draw: 0.00,
        odds_away: 2.20,
        status: 'finished',
        start_time: 'انتهت',
        score_home: 2,
        score_away: 0,
        volume: 6840,
        participants: 134,
        odds_change: -1.3,
        league: 'بطولة الخليج للتنس',
        thumbnail_emoji: '🎾'
    }
];

// Store original odds for fluctuation simulation
var originalMatchData = {};
var refreshInterval;

document.addEventListener('DOMContentLoaded', function() {
  // Deep copy mock data to track original odds
  MOCK_MATCHES.forEach(function(m) {
    originalMatchData[m.id] = {
      odds_home: m.odds_home,
      odds_draw: m.odds_draw,
      odds_away: m.odds_away
    };
  });

  loadLiveMatches();
  refreshInterval = setInterval(loadLiveMatches, 30000);
});

async function loadLiveMatches() {
  try {
    // Try to fetch from API
    var allData = await apiGet('/api/matches');
    var allMatches = allData.matches || [];

    // If API returns empty or no data, use mock
    if (!allMatches || allMatches.length === 0) {
      allMatches = MOCK_MATCHES;
    }

    // Filter live and upcoming
    var liveMatches = allMatches.filter(function(m) { return m.status === 'live'; });
    var upcomingMatches = allMatches.filter(function(m) { return m.status === 'upcoming'; });

  } catch(e) {
    console.log('API unavailable, using mock data');
    var liveMatches = MOCK_MATCHES.filter(function(m) { return m.status === 'live'; });
    var upcomingMatches = MOCK_MATCHES.filter(function(m) { return m.status === 'upcoming'; });
  }

  // Apply random odds fluctuation to live matches for realism
  liveMatches = liveMatches.map(function(m) {
    var fluctuatedMatch = JSON.parse(JSON.stringify(m)); // Deep copy

    // Simulate slight odds changes (±0.1 to ±0.3)
    var homeFluc = (Math.random() - 0.5) * 0.4;
    var awayFluc = (Math.random() - 0.5) * 0.4;
    var drawFluc = (Math.random() - 0.5) * 0.4;

    fluctuatedMatch.odds_home = Math.max(1.01, m.odds_home + homeFluc).toFixed(2);
    fluctuatedMatch.odds_away = Math.max(1.01, m.odds_away + awayFluc).toFixed(2);
    if (m.odds_draw > 0) {
      fluctuatedMatch.odds_draw = Math.max(1.01, m.odds_draw + drawFluc).toFixed(2);
    }

    return fluctuatedMatch;
  });

  // Render live matches
  var liveContainer = document.getElementById('liveMatches');
  var liveCountNumber = document.getElementById('liveCountNumber');

  if (liveCountNumber) {
    liveCountNumber.textContent = liveMatches.length;
  }

  document.getElementById('liveCount').textContent = liveMatches.length + ' مباراة مباشرة الحين';

  if (liveMatches.length > 0) {
    liveContainer.innerHTML = liveMatches.map(function(m) { return renderMatchCard(m); }).join('');
  } else {
    liveContainer.innerHTML = '<div class="empty-state" style="grid-column:1/-1">' +
      '<div class="icon">📺</div>' +
      '<p>ما في مباريات مباشرة حالياً</p>' +
      '<p style="font-size:0.85rem;margin-top:0.5rem">ارجع بعد شوي أو شيك على المباريات القادمة تحت</p>' +
      '</div>';
  }

  // Render upcoming matches
  var upContainer = document.getElementById('upcomingMatches');

  if (upcomingMatches.length > 0) {
    upContainer.innerHTML = upcomingMatches.map(function(m) { return renderMatchCard(m); }).join('');
  } else {
    upContainer.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><p>ما في مباريات قادمة حالياً</p></div>';
  }
}
