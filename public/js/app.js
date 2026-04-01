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

// ===== CONVERT TO ARABIC NUMERALS =====
function toArabicNum(num) {
  if (num === null || num === undefined) return '';
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map(digit => {
    return arabicDigits[parseInt(digit, 10)] || digit;
  }).join('');
}

// ===== FORMAT VOLUME (15420 -> 15.4K, 1500000 -> 1.5M) =====
function formatVolume(num) {
  if (!num) return '٠';
  if (num >= 1000000) {
    const val = (num / 1000000).toFixed(1);
    return toArabicNum(val) + 'M';
  }
  if (num >= 1000) {
    const val = (num / 1000).toFixed(1);
    return toArabicNum(val) + 'K';
  }
  return toArabicNum(num);
}

// ===== CONVERT ODDS TO PROBABILITY PERCENTAGE =====
function oddsToPercent(odds) {
  if (!odds || odds <= 0) return 0;
  return Math.round((1 / parseFloat(odds)) * 100);
}

// ===== RENDER MATCH CARD WITH POLYMARKET-STYLE ENHANCEMENTS =====
function renderMatchCard(match) {
  const m = match;
  const statusClass = `status-${m.status}`;
  const statusLabels = { live: 'مباشر', upcoming: 'قادمة', finished: 'انتهت' };
  const statusEmojis = { live: '🔴', upcoming: '🟢', finished: '⚪' };
  const isLive = m.status === 'live';
  const isFinished = m.status === 'finished';
  const hasDraw = m.odds_draw !== null && m.odds_draw !== undefined;

  // Generate random volume and participants if not present
  const volume = m.volume || Math.floor(Math.random() * 500000) + 10000;
  const participants = m.participants || Math.floor(Math.random() * 500) + 50;
  const oddsChange = m.oddsChange || (Math.random() > 0.5 ? 1 : -1) * Math.random().toFixed(2);

  let scoreSection = '';
  if (isLive || isFinished) {
    scoreSection = `<div class="match-score">${m.score_home} - ${m.score_away}</div>`;
  } else {
    scoreSection = `<div class="match-vs">VS</div>`;
  }

  // Sport tag with emoji
  const sportEmoji = {
    'كرة القدم': '⚽',
    'كرة السلة': '🏀',
    'تنس': '🎾',
    'هوكي': '🏒',
    'تنس الطاولة': '🏓'
  };
  const sport = m.sport || 'رياضة';
  const emoji = sportEmoji[sport] || '🏆';

  // Build odds bars (probability visualization)
  let oddsBarsHtml = '';
  if (hasDraw) {
    const homePercent = oddsToPercent(m.odds_home || 1);
    const drawPercent = oddsToPercent(m.odds_draw || 1);
    const awayPercent = oddsToPercent(m.odds_away || 1);
    const total = homePercent + drawPercent + awayPercent;
    const homePercNorm = Math.round((homePercent / total) * 100);
    const drawPercNorm = Math.round((drawPercent / total) * 100);
    const awayPercNorm = Math.round((awayPercent / total) * 100);

    oddsBarsHtml = `
      <div class="odds-bars-container">
        <div class="odds-bar-group">
          <div class="odds-bar home-bar" style="width: ${homePercNorm}%">
            <span class="odds-percent">${homePercNorm}%</span>
          </div>
        </div>
        <div class="odds-bar-group">
          <div class="odds-bar draw-bar" style="width: ${drawPercNorm}%">
            <span class="odds-percent">${drawPercNorm}%</span>
          </div>
        </div>
        <div class="odds-bar-group">
          <div class="odds-bar away-bar" style="width: ${awayPercNorm}%">
            <span class="odds-percent">${awayPercNorm}%</span>
          </div>
        </div>
      </div>`;
  } else {
    const homePercent = oddsToPercent(m.odds_home || 1);
    const awayPercent = oddsToPercent(m.odds_away || 1);
    const total = homePercent + awayPercent;
    const homePercNorm = Math.round((homePercent / total) * 100);
    const awayPercNorm = Math.round((awayPercent / total) * 100);

    oddsBarsHtml = `
      <div class="odds-bars-container two-way">
        <div class="odds-bar-group">
          <div class="odds-bar home-bar" style="width: ${homePercNorm}%">
            <span class="odds-percent">${homePercNorm}%</span>
          </div>
        </div>
        <div class="odds-bar-group">
          <div class="odds-bar away-bar" style="width: ${awayPercNorm}%">
            <span class="odds-percent">${awayPercNorm}%</span>
          </div>
        </div>
      </div>`;
  }

  // Odds change indicator
  const changeSign = parseFloat(oddsChange) > 0 ? '📈' : '📉';
  const changeColor = parseFloat(oddsChange) > 0 ? 'green' : 'red';

  return `
    <div class="match-card fadeInUp">
      <div class="match-header">
        <span class="match-sport-pill">${emoji} ${escapeHtml(sport)}</span>
        <span class="match-status ${statusClass}">${statusEmojis[m.status] || ''} ${statusLabels[m.status] || m.status}</span>
      </div>
      <div class="match-teams">
        <div class="team"><span class="team-name">${escapeHtml(m.team_home)}</span></div>
        ${scoreSection}
        <div class="team"><span class="team-name">${escapeHtml(m.team_away)}</span></div>
      </div>
      ${oddsBarsHtml}
      <div class="match-badges">
        <span class="match-volume-badge">📊 ${toArabicNum(formatVolume(volume))} حجم</span>
        <span class="match-participants">👥 ${toArabicNum(participants)} مشارك</span>
      </div>
      <div class="match-change-footer">
        <span class="odds-change ${changeColor}">${changeSign} ${parseFloat(oddsChange).toFixed(2)}%</span>
        <div class="mini-chart-placeholder">
          <canvas id="chart-${escapeHtml(m.id || Math.random())}" class="mini-chart" width="120" height="40"></canvas>
        </div>
      </div>
      <button class="bet-btn">راهن الحين</button>
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

// ===== DRAW MINI SPARKLINE CHARTS =====
function drawMiniChart(canvasId, data = null) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Generate random sparkline data if not provided
  const values = data || Array.from({ length: 10 }, () => Math.random() * 100);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  // Clear canvas
  ctx.fillStyle = 'rgba(0, 214, 143, 0.1)';
  ctx.fillRect(0, 0, width, height);

  // Draw line
  ctx.strokeStyle = '#00d68f';
  ctx.lineWidth = 2;
  ctx.beginPath();

  values.forEach((val, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((val - min) / range) * height + 5;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();

  // Fill under curve
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fillStyle = 'rgba(0, 214, 143, 0.15)';
  ctx.fill();
}

// Initialize mini charts when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const canvases = document.querySelectorAll('.mini-chart');
  canvases.forEach(canvas => {
    drawMiniChart(canvas.id);
  });
});
