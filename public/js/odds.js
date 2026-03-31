/**
 * Jedayem — Odds Page Logic
 */
var allMatches = [];
var currentFilter = 'all';

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

  // Load matches
  try {
    var data = await apiGet('/api/matches');
    allMatches = data.matches || [];
    renderOdds();
  } catch(e) {
    document.getElementById('oddsBody').innerHTML = '<tr><td colspan="8" class="empty-state">\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</td></tr>';
  }

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
  var map = { live: '\uD83D\uDD34 \u0645\u0628\u0627\u0634\u0631', upcoming: '\u0642\u0627\u062F\u0645\u0629', finished: '\u0627\u0646\u062A\u0647\u062A' };
  return map[status] || status;
}

function renderOdds() {
  var filtered = currentFilter === 'all' ? allMatches : allMatches.filter(function(m) { return m.status === currentFilter; });

  // Table view
  var tbody = document.getElementById('oddsBody');
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-state">\u0645\u0627 \u0641\u064A \u0645\u0628\u0627\u0631\u064A\u0627\u062A \u0628\u0647\u0627\u0644\u062A\u0635\u0646\u064A\u0641</td></tr>';
  } else {
    tbody.innerHTML = filtered.map(function(m) {
      return '<tr>' +
        '<td>' + escapeHtml(m.sport) + '</td>' +
        '<td><strong>' + escapeHtml(m.team_home) + '</strong></td>' +
        '<td><strong>' + escapeHtml(m.team_away) + '</strong></td>' +
        '<td style="color:var(--green-400);font-weight:700">' + (m.odds_home || '-') + '</td>' +
        '<td style="color:var(--gold-500);font-weight:700">' + (m.odds_draw || '-') + '</td>' +
        '<td style="color:var(--green-400);font-weight:700">' + (m.odds_away || '-') + '</td>' +
        '<td><span class="match-status status-' + m.status + '">' + statusText(m.status) + '</span></td>' +
        '<td style="font-size:0.85rem;color:var(--gray-400)">' + formatTime(m.start_time) + '</td>' +
        '</tr>';
    }).join('');
  }

  // Cards view
  var cards = document.getElementById('oddsCards');
  cards.innerHTML = filtered.map(function(m) { return renderMatchCard(m); }).join('');
}
