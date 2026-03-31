/**
 * Jedayem — Live Page Logic
 */
var refreshInterval;

document.addEventListener('DOMContentLoaded', function() {
  loadLiveMatches();
  refreshInterval = setInterval(loadLiveMatches, 30000);
});

async function loadLiveMatches() {
  try {
    var liveData = await apiGet('/api/matches?status=live');
    var liveContainer = document.getElementById('liveMatches');
    var liveMatches = liveData.matches || [];

    document.getElementById('liveCount').textContent = liveMatches.length + ' \u0645\u0628\u0627\u0631\u0627\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0627\u0644\u062D\u064A\u0646';

    if (liveMatches.length > 0) {
      liveContainer.innerHTML = liveMatches.map(function(m) { return renderMatchCard(m); }).join('');
    } else {
      liveContainer.innerHTML = '<div class="empty-state" style="grid-column:1/-1">' +
        '<div class="icon">\uD83D\uDCFA</div>' +
        '<p>\u0645\u0627 \u0641\u064A \u0645\u0628\u0627\u0631\u064A\u0627\u062A \u0645\u0628\u0627\u0634\u0631\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</p>' +
        '<p style="font-size:0.85rem;margin-top:0.5rem">\u0627\u0631\u062C\u0639 \u0628\u0639\u062F \u0634\u0648\u064A \u0623\u0648 \u0634\u064A\u0651\u0643 \u0639\u0644\u0649 \u0627\u0644\u0645\u0628\u0627\u0631\u064A\u0627\u062A \u0627\u0644\u0642\u0627\u062F\u0645\u0629 \u062A\u062D\u062A</p>' +
        '</div>';
    }

    var upData = await apiGet('/api/matches?status=upcoming');
    var upContainer = document.getElementById('upcomingMatches');
    var upMatches = upData.matches || [];

    if (upMatches.length > 0) {
      upContainer.innerHTML = upMatches.map(function(m) { return renderMatchCard(m); }).join('');
    } else {
      upContainer.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><p>\u0645\u0627 \u0641\u064A \u0645\u0628\u0627\u0631\u064A\u0627\u062A \u0642\u0627\u062F\u0645\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</p></div>';
    }
  } catch(e) {
    console.error('Error loading live matches:', e);
  }
}
