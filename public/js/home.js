/**
 * Jedayem — Home Page Logic
 */
document.addEventListener('DOMContentLoaded', async function() {
  // Load stats
  try {
    var stats = await apiGet('/api/stats');
    document.getElementById('statMatches').textContent = stats.total_matches;
    document.getElementById('statLive').textContent = stats.live_now;
    document.getElementById('statSports').textContent = stats.sports.length;
  } catch(e) {}

  // Load featured matches
  try {
    var data = await apiGet('/api/matches');
    var container = document.getElementById('featuredMatches');
    if (data.matches && data.matches.length > 0) {
      container.innerHTML = data.matches.slice(0, 6).map(function(m) { return renderMatchCard(m); }).join('');
    } else {
      container.innerHTML = '<div class="empty-state"><div class="icon">\u26BD</div><p>\u0645\u0627 \u0641\u064A \u0645\u0628\u0627\u0631\u064A\u0627\u062A \u062D\u0627\u0644\u064A\u0627\u064B</p></div>';
    }
  } catch(e) {
    document.getElementById('featuredMatches').innerHTML = '<div class="empty-state"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0631\u064A\u0627\u062A</p></div>';
  }
});
