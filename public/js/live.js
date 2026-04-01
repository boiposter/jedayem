/**
 * Jedayem — Live Page Logic
 * Kalshi-inspired design with live pulse and odds movement
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

    const liveCountEl = document.getElementById('liveCount');
    if (liveCountEl) {
      const countText = liveMatches.length === 1 ? 'مباراة مباشرة الحين' : 'مباريات مباشرة الحين';
      liveCountEl.textContent = liveMatches.length + ' ' + countText;
    }

    if (liveMatches.length > 0) {
      liveContainer.innerHTML = liveMatches.map(function(m) {
        const cardHtml = renderMatchCard(m);
        // Add odds movement indicators to live cards
        return cardHtml.replace('</div>\n      </div>', function(match) {
          const direction = Math.random() > 0.5 ? 'up' : 'down';
          const movement = Math.floor(Math.random() * 5) + 1;
          return `
        <div class="odds-movement ${direction}">
          <span class="movement-arrow">${direction === 'up' ? '↑' : '↓'}</span>
          ${movement}%
        </div>\n      </div>`;
        });
      }).join('');
    } else {
      liveContainer.innerHTML = '<div class="empty-state" style="grid-column:1/-1">' +
        '<div class="icon">📺</div>' +
        '<p>ما في مباريات مباشرة حالياً</p>' +
        '<p style="font-size:0.85rem;margin-top:0.5rem">ارجع بعد شوي أو شيّك على المباريات القادمة تحت</p>' +
        '</div>';
    }

    var upData = await apiGet('/api/matches?status=upcoming');
    var upContainer = document.getElementById('upcomingMatches');
    var upMatches = upData.matches || [];

    if (upMatches.length > 0) {
      upContainer.innerHTML = upMatches.map(function(m) { return renderMatchCard(m); }).join('');
    } else {
      upContainer.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><p>ما في مباريات قادمة حالياً</p></div>';
    }
  } catch(e) {
    console.error('Error loading live matches:', e);
  }
}
