/**
 * Jedayem — Shared JavaScript
 * Utility functions, API helpers, and shared components
 * Kalshi-inspired design
 */

// ===== NAV TOGGLE (Mobile) =====
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const nav = document.getElementById('navLinks');
      nav.classList.toggle('open');
    });
  }
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  const nav = document.getElementById('navLinks');
  const toggle = document.querySelector('.nav-toggle');
  if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// ===== API HELPERS =====
async function apiGet(url) {
  const res = await fetch(url, { credentials: 'same-origin' });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.errors?.[0] || 'خطأ غير معروف');
  return data;
}

async function apiPost(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.errors?.[0] || 'خطأ غير معروف');
  return data;
}

// ===== SECURITY: Escape HTML =====
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ===== FORMAT TIME =====
function formatTime(dateStr) {
  if (!dateStr) return '--';
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isTomorrow = d.toDateString() === tomorrow.toDateString();

    const time = d.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', hour12: true });

    if (isToday) return `اليوم ${time}`;
    if (isTomorrow) return `بكرة ${time}`;
    return d.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' }) + ' ' + time;
  } catch(e) {
    return dateStr;
  }
}

// ===== CONVERT ODDS TO PERCENTAGE =====
function oddsToPercentage(odds) {
  if (!odds || odds === '-') return '-';
  const num = parseFloat(odds);
  if (isNaN(num) || num <= 0) return '-';
  const prob = Math.round((1 / num) * 100);
  return `${prob}%`;
}

// ===== ANIMATED COUNTER =====
function animateCounter(element, finalValue, duration = 1500) {
  if (!element || isNaN(finalValue)) return;
  const start = parseInt(element.textContent) || 0;
  const range = finalValue - start;
  const increment = range / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= finalValue) || (increment < 0 && current <= finalValue)) {
      element.textContent = finalValue;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ===== SKELETON LOADING HELPERS =====
function createSkeletonCard() {
  return `
    <div class="skeleton match-card">
      <div class="skeleton-line" style="height:12px;margin-bottom:8px;width:40%"></div>
      <div class="skeleton-line" style="height:16px;margin-bottom:12px;width:60%"></div>
      <div class="skeleton-line" style="height:14px;width:80%"></div>
    </div>`;
}

function showSkeletonLoading(container, count = 3) {
  if (!container) return;
  let html = '';
  for (let i = 0; i < count; i++) {
    html += createSkeletonCard();
  }
  container.innerHTML = html;
}

function hideSkeletonLoading(container) {
  if (!container) return;
  container.querySelectorAll('.skeleton').forEach(el => el.remove());
}

// ===== SEARCH BAR FUNCTIONALITY =====
function setupSearchBar(inputSelector, listSelector, callback) {
  const input = document.querySelector(inputSelector);
  const list = document.querySelector(listSelector);
  if (!input || !list) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (callback) callback(query);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      if (callback) callback('');
    }
  });
}

// ===== RENDER MATCH CARD - KALSHI STYLE =====
function renderMatchCard(match) {
  const m = match;
  const statusClass = `status-${m.status}`;
  const statusLabels = { live: 'مباشر', upcoming: 'قادمة', finished: 'انتهت' };
  const isLive = m.status === 'live';
  const isFinished = m.status === 'finished';
  const hasDraw = m.odds_draw !== null && m.odds_draw !== undefined;

  // Sport tag
  const sportTag = `<span class="sport-tag">${escapeHtml(m.sport)}</span>`;

  // Live pulse indicator
  const livePulse = isLive ? '<span class="live-pulse"></span>' : '';

  // Score/VS section
  let scoreSection = '';
  if (isLive || isFinished) {
    scoreSection = `<div class="match-score">${m.score_home} - ${m.score_away}</div>`;
  } else {
    scoreSection = `<div class="match-vs">VS</div>`;
  }

  // Percentage odds pills
  let oddsHtml = '';
  const homeProb = oddsToPercentage(m.odds_home);
  const awayProb = oddsToPercentage(m.odds_away);
  const drawProb = oddsToPercentage(m.odds_draw);

  if (hasDraw) {
    oddsHtml = `
      <div class="odds-pills">
        <div class="odds-pill home-pill">
          <div class="odds-prob">${homeProb}</div>
          <div class="odds-payout">${m.odds_home || '-'}x</div>
        </div>
        <div class="odds-pill draw-pill">
          <div class="odds-prob">${drawProb}</div>
          <div class="odds-payout">${m.odds_draw || '-'}x</div>
        </div>
        <div class="odds-pill away-pill">
          <div class="odds-prob">${awayProb}</div>
          <div class="odds-payout">${m.odds_away || '-'}x</div>
        </div>
      </div>`;
  } else {
    oddsHtml = `
      <div class="odds-pills two-way">
        <div class="odds-pill home-pill">
          <div class="odds-prob">${homeProb}</div>
          <div class="odds-payout">${m.odds_home || '-'}x</div>
        </div>
        <div class="odds-pill away-pill">
          <div class="odds-prob">${awayProb}</div>
          <div class="odds-payout">${m.odds_away || '-'}x</div>
        </div>
      </div>`;
  }

  // Volume (random realistic number in Arabic numerals)
  const baseVolume = Math.floor(Math.random() * 50) + 5;
  const volume = `${(baseVolume * 1000).toLocaleString('ar-SA')} مراهنة`;

  return `
    <div class="match-card kalshi-card hover-lift">
      <div class="card-header">
        ${sportTag}
        ${livePulse}
        <span class="match-status ${statusClass}">${statusLabels[m.status] || m.status}</span>
      </div>
      <div class="match-teams">
        <div class="team home-team"><span class="team-name">${escapeHtml(m.team_home)}</span></div>
        ${scoreSection}
        <div class="team away-team"><span class="team-name">${escapeHtml(m.team_away)}</span></div>
      </div>
      ${oddsHtml}
      <div class="card-footer">
        <div class="volume-indicator">${volume}</div>
        <div class="match-time">${formatTime(m.start_time)}</div>
      </div>
    </div>`;
}

// ===== CHECK AUTH ON LOAD (update navbar) =====
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await apiGet('/api/auth/me');
    if (data.user) {
      var navAuth = document.getElementById('navAuth');
      if (navAuth && !window.location.pathname.includes('/account')) {
        navAuth.innerHTML = '';
        var a = document.createElement('a');
        a.href = '/account';
        a.className = 'btn btn-outline';
        a.style.cssText = 'padding:0.4rem 1rem;font-size:0.85rem';
        var icon = document.createElement('i');
        icon.className = 'fas fa-user';
        a.appendChild(icon);
        a.appendChild(document.createTextNode(' ' + (data.user.display_name || data.user.username)));
        navAuth.appendChild(a);
      }
    }
  } catch(e) {
    // Not logged in — keep default nav
  }
});
