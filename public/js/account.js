/**
 * Jedayem — Account Page Logic
 * Auth functionality with Kalshi-inspired design
 */

document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (target === 'login') {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
      } else {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
      }
    });
  });

  // Login form
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    const errEl = document.getElementById('loginError');
    errEl.style.display = 'none';
    btn.disabled = true;
    btn.textContent = 'جاري الدخول...';

    try {
      const data = await apiPost('/api/auth/login', {
        login: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
      });
      showToast(data.message, 'success');
      showProfile(data.user);
    } catch(err) {
      errEl.textContent = err.message;
      errEl.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.textContent = 'دخول';
    }
  });

  // Register form
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('registerBtn');
    const errEl = document.getElementById('registerError');
    errEl.style.display = 'none';

    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regPasswordConfirm').value;

    if (password !== confirm) {
      errEl.textContent = 'كلمة السر ما تطابق';
      errEl.style.display = 'block';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'جاري التسجيل...';

    try {
      const data = await apiPost('/api/auth/register', {
        username: document.getElementById('regUsername').value,
        email: document.getElementById('regEmail').value,
        password: password,
        display_name: document.getElementById('regDisplayName').value || undefined
      });
      showToast(data.message, 'success');
      showProfile(data.user);
    } catch(err) {
      errEl.textContent = err.message;
      errEl.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.textContent = 'سجّل الحين';
    }
  });

  // Logout button
  var logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await apiPost('/api/auth/logout', {});
        showToast('تم تسجيل الخروج', 'success');
        setTimeout(function() { location.reload(); }, 500);
      } catch(e) {
        location.reload();
      }
    });
  }

  // Check if already logged in
  checkAuthState();
});

async function checkAuthState() {
  try {
    const data = await apiGet('/api/auth/me');
    if (data.user) {
      showProfile(data.user);
    }
  } catch(e) {
    // Not logged in
  }
}

function showProfile(user) {
  document.getElementById('authSection').style.display = 'none';
  document.getElementById('profileSection').style.display = 'block';
  document.getElementById('profileAvatar').textContent = (user.display_name || user.username).charAt(0);
  document.getElementById('profileName').textContent = user.display_name || user.username;
  document.getElementById('profileEmail').textContent = user.email || '@' + user.username;
  document.getElementById('profileBalance').textContent = (user.balance || 0).toFixed(2);

  var navAuth = document.getElementById('navAuth');
  navAuth.innerHTML = '';
  var span = document.createElement('span');
  span.style.cssText = 'color:var(--green-400);font-weight:600';
  span.textContent = 'أهلاً ' + (user.display_name || user.username);
  navAuth.appendChild(span);
}
