/**
 * Jedayem — Home Page Logic
 * Kalshi-inspired design with animated counters
 */
document.addEventListener('DOMContentLoaded', async function() {
  const featuredMatches = document.getElementById('featuredMatches');
  const trendingList = document.getElementById('trending-list');
  const topMovers = document.getElementById('top-movers');

  // Show skeleton loading
  if (featuredMatches) {
    showSkeletonLoading(featuredMatches, 6);
  }

  // Load stats with animated counters
  try {
    const stats = await apiGet('/api/stats');
    const statMatches = document.getElementById('statMatches');
    const statLive = document.getElementById('statLive');
    const statSports = document.getElementById('statSports');

    if (statMatches) animateCounter(statMatches, stats.total_matches);
    if (statLive) animateCounter(statLive, stats.live_now);
    if (statSports) animateCounter(statSports, stats.sports.length);
  } catch(e) {
    console.error('Error loading stats:', e);
  }

  // Load featured matches
  try {
    const data = await apiGet('/api/matches');
    if (featuredMatches) {
      if (data.matches && data.matches.length > 0) {
        const featured = data.matches.slice(0, 6);
        featuredMatches.innerHTML = featured.map(function(m) { return renderMatchCard(m); }).join('');
      } else {
        featuredMatches.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="icon">⚽</div><p>ما في مباريات حالياً</p></div>';
      }
    }
  } catch(e) {
    console.error('Error loading featured matches:', e);
    if (featuredMatches) {
      featuredMatches.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><p>خطأ في تحميل المباريات</p></div>';
    }
  }

  // Load trending sidebar
  if (trendingList) {
    try {
      const data = await apiGet('/api/matches');
      if (data.matches && data.matches.length > 0) {
        const trending = data.matches.slice(0, 5);
        trendingList.innerHTML = trending.map(function(m) {
          const vol = Math.floor(Math.random() * 50) + 5;
          return `
            <div class="trending-item">
              <div class="trending-title">${escapeHtml(m.team_home)} vs ${escapeHtml(m.team_away)}</div>
              <div class="trending-volume">${(vol * 1000).toLocaleString('ar-SA')} مراهنة</div>
            </div>`;
        }).join('');
      }
    } catch(e) {
      console.error('Error loading trending:', e);
    }
  }

  // Load top movers sidebar
  if (topMovers) {
    try {
      const data = await apiGet('/api/matches');
      if (data.matches && data.matches.length > 0) {
        const movers = data.matches.slice(0, 5);
        topMovers.innerHTML = movers.map(function(m) {
          const direction = Math.random() > 0.5 ? 'up' : 'down';
          const movement = Math.floor(Math.random() * 8) + 2;
          return `
            <div class="mover-item">
              <div class="mover-title">${escapeHtml(m.team_home)}</div>
              <div class="mover-change ${direction}">
                <span class="direction-arrow">${direction === 'up' ? '↑' : '↓'}</span>
                ${movement}%
              </div>
            </div>`;
        }).join('');
      }
    } catch(e) {
      console.error('Error loading top movers:', e);
    }
  }
});
