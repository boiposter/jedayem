/**
 * Jedayem — Odds Page Logic
 * Kalshi-inspired design with search and filters
 */
var allMatches = [];
var currentFilter = 'all';
var searchQuery = '';

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

  // Search bar functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      searchQuery = e.target.value.toLowerCase().trim();
      renderOdds();
    });

    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        searchInput.value = '';
        searchQuery = '';
        renderOdds();
      }
    });
  }

  // Load matches
  try {
    showSkeletonLoading(document.getElementById('oddsCards'), 6);
    var data = await apiGet('/api/matches');
    allMatches = data.matches || [];
    renderOdds();
  } catch(e) {
    console.error('Error loading odds:', e);
    const tbody = document.getElementById('oddsBody');
    if (tbody) tbody.innerHTML = '<tr><td colspan="8" class="empty-state">خطأ في تحميل البيانات</td></tr>';
  }

  // Responsive: show cards on mobile
  handleResponsive();
  window.addEventListener('resize', handleResponsive);
});

function handleResponsive() {
  var table = document.querySelector('.table-wrapper');
  var cards = document.getElementById('oddsCards');
  if (window.innerWidth <= 768) {
    if (table) table.style.display = 'none';
    if (cards) cards.style.display = 'grid';
  } else {
    if (table) table.style.display = 'block';
    if (cards) cards.style.display = 'none';
  }
}

function statusText(status) {
  var map = { live: 'مباشر', upcoming: 'قادمة', finished: 'انتهت' };
  return map[status] || status;
}

function matchesSearchQuery(match) {
  if (!searchQuery) return true;
  const q = searchQuery;
  return match.team_home.toLowerCase().includes(q) ||
         match.team_away.toLowerCase().includes(q) ||
         match.sport.toLowerCase().includes(q);
}

function renderOdds() {
  let filtered = currentFilter === 'all' ? allMatches : allMatches.filter(function(m) { return m.status === currentFilter; });
  filtered = filtered.filter(matchesSearchQuery);

  // Table view
  var tbody = document.getElementById('oddsBody');
  if (tbody) {
    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="empty-state">ما في مباريات بهالتصنيف</td></tr>';
    } else {
      tbody.innerHTML = filtered.map(function(m) {
        const homeProb = oddsToPercentage(m.odds_home);
        const drawProb = oddsToPercentage(m.odds_draw);
        const awayProb = oddsToPercentage(m.odds_away);
        return '<tr>' +
          '<td>' + escapeHtml(m.sport) + '</td>' +
          '<td><strong>' + escapeHtml(m.team_home) + '</strong></td>' +
          '<td><strong>' + escapeHtml(m.team_away) + '</strong></td>' +
          '<td style="color:var(--green-400);font-weight:700">' + homeProb + ' <span style="font-size:0.85rem">(' + (m.odds_home || '-') + 'x)</span></td>' +
          '<td style="color:var(--gold-500);font-weight:700">' + drawProb + ' <span style="font-size:0.85rem">(' + (m.odds_draw || '-') + 'x)</span></td>' +
          '<td style="color:var(--green-400);font-weight:700">' + awayProb + ' <span style="font-size:0.85rem">(' + (m.odds_away || '-') + 'x)</span></td>' +
          '<td><span class="match-status status-' + m.status + '">' + statusText(m.status) + '</span></td>' +
          '<td style="font-size:0.85rem;color:var(--gray-400)">' + formatTime(m.start_time) + '</td>' +
          '</tr>';
      }).join('');
    }
  }

  // Cards view
  var cards = document.getElementById('oddsCards');
  if (cards) {
    if (filtered.length === 0) {
      cards.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><p>ما في مباريات بهالتصنيف</p></div>';
    } else {
      cards.innerHTML = filtered.map(function(m) { return renderMatchCard(m); }).join('');
    }
  }
}
