/**
 * Jedayem — Odds Page Logic
 * Mock data fallback for reliable UX
 */

// Mock data - same as home.js with 12 matches covering all sports
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

var allMatches = [];
var currentFilter = 'all';
var searchTerm = '';

document.addEventListener('DOMContentLoaded', async function() {
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderOdds();
    });
  });

  // Search input
  var searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      searchTerm = this.value.toLowerCase();
      renderOdds();
    });
  }

  // Load matches: try API first, fallback to mock data
  try {
    var data = await apiGet('/api/matches');
    if (data && data.matches && data.matches.length > 0) {
      allMatches = data.matches;
    } else {
      allMatches = MOCK_MATCHES;
    }
  } catch(e) {
    console.log('API unavailable, using mock data');
    allMatches = MOCK_MATCHES;
  }

  renderOdds();

  // Responsive: show cards on mobile
  handleResponsive();
  window.addEventListener('resize', handleResponsive);
});

function handleResponsive() {
  var table = document.querySelector('.table-wrapper');
  var cards = document.getElementById('oddsCards');
  if (window.innerWidth <= 768) {
    table.style.display = 'none';
    cards.style.display = 'grid';
  } else {
    table.style.display = 'block';
    cards.style.display = 'none';
  }
}

function statusText(status) {
  var map = { live: '🔴 مباشر', upcoming: 'قادمة', finished: 'انتهت' };
  return map[status] || status;
}

function filterMatches() {
  var filtered = allMatches;

  // Apply status/sport filter
  if (currentFilter !== 'all') {
    filtered = filtered.filter(function(m) {
      // Check if it's a status filter
      if (['live', 'upcoming', 'finished'].includes(currentFilter)) {
        return m.status === currentFilter;
      }
      // Check if it's a sport filter
      return m.sport === currentFilter;
    });
  }

  // Apply search filter
  if (searchTerm) {
    filtered = filtered.filter(function(m) {
      var teamHome = m.team_home.toLowerCase();
      var teamAway = m.team_away.toLowerCase();
      return teamHome.includes(searchTerm) || teamAway.includes(searchTerm);
    });
  }

  return filtered;
}

function renderOdds() {
  var filtered = filterMatches();

  // Table view
  var tbody = document.getElementById('oddsBody');
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-state">ما في مباريات بهالتصنيف</td></tr>';
  } else {
    tbody.innerHTML = filtered.map(function(m) {
      var homePercent = oddsToPercent(m.odds_home || 1);
      var drawPercent = m.odds_draw > 0 ? oddsToPercent(m.odds_draw || 1) : 0;
      var awayPercent = oddsToPercent(m.odds_away || 1);

      return '<tr>' +
        '<td>' + escapeHtml(m.sport) + '</td>' +
        '<td><strong>' + escapeHtml(m.team_home) + '</strong></td>' +
        '<td><strong>' + escapeHtml(m.team_away) + '</strong></td>' +
        '<td style="color:var(--green-400);font-weight:700">' + homePercent + '%</td>' +
        '<td style="color:var(--gold-500);font-weight:700">' + (drawPercent > 0 ? drawPercent + '%' : '-') + '</td>' +
        '<td style="color:var(--green-400);font-weight:700">' + awayPercent + '%</td>' +
        '<td><span class="match-status status-' + m.status + '">' + statusText(m.status) + '</span></td>' +
        '<td style="font-size:0.85rem;color:var(--gray-400)">' + formatTime(m.start_time) + '</td>' +
        '</tr>';
    }).join('');
  }

  // Cards view
  var cards = document.getElementById('oddsCards');
  cards.innerHTML = filtered.map(function(m) { return renderMatchCard(m); }).join('');
}
