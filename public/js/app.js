/**
 * Jedayem — Shared JavaScript
 * Utility functions, API helpers, and shared components
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

// ===== RENDER MATCH CARD =====
function renderMatchCard(match) {
  const m = match;
  const statusClass = `status-${m.status}`;
  const statusLabels = { live: '🔴 مباشر', upcoming: 'قادمة', finished: 'انتهت' };
  const isLive = m.status === 'live';
  const isFinished = m.status === 'finished';
  const hasDraw = m.odds_draw !== null && m.odds_draw !== undefined;

  let scoreSection = '';
  if (isLive || isFinished) {
    scoreSection = `<div class="match-score">${m.score_home} - ${m.score_away}</div>`;
  } else {
    scoreSection = `<div class="match-vs">VS</div>`;
  }

  let oddsHtml = '';
  if (hasDraw) {
    oddsHtml = `
      <div class="match-odds">
        <div class="odd-btn">
          <span class="odd-label">١</span>
          <span class="odd-value">${m.odds_home || '-'}</span>
        </div>
        <div class="odd-btn">
          <span class="odd-label">X</span>
          <span class="odd-value">${m.odds_draw || '-'}</span>
        </div>
        <div class="odd-btn">
          <span class="odd-label">٢</span>
          <span class="odd-value">${m.odds_away || '-'}</span>
        </div>
      </div>`;
  } else {
    oddsHtml = `
      <div class="match-odds two-way">
        <div class="odd-btn">
          <span class="odd-label">١</span>
          <span class="odd-value">${m.odds_home || '-'}</span>
        </div>
        <div class="odd-btn">
          <span class="odd-label">٢</span>
          <span class="odd-value">${m.odds_away || '-'}</span>
        </div>
      </div>`;
  }

  return `
    <div class="match-card">
      <div class="match-header">
        <span class="match-sport">${escapeHtml(m.sport)}</span>
        <span class="match-status ${statusClass}">${statusLabels[m.status] || m.status}</span>
      </div>
      <div class="match-teams">
        <div class="team"><span class="team-name">${escapeHtml(m.team_home)}</span></div>
        ${scoreSection}
        <div class="team"><span class="team-name">${escapeHtml(m.team_away)}</span></div>
      </div>
      ${oddsHtml}
      <div class="match-time">${formatTime(m.start_time)}</div>
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
