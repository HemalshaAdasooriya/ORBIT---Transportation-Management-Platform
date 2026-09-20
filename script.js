/* ═══════════════════════════════════
   STATE
═══════════════════════════════════ */
const state = {
  page: 'home',
  profileTab: 'stats',
  delayed: false,
  voiceEnabled: false,
  theme: 'dark',   // 'dark' | 'light'
};

/* ═══════════════════════════════════
   NAVIGATION
═══════════════════════════════════ */
function nav(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.setAttribute('aria-hidden', 'true');
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });

  const target = document.getElementById('page-' + pageId);
  if (!target) return;
  target.classList.add('active');
  target.removeAttribute('aria-hidden');
  target.scrollIntoView({ behavior: 'instant', block: 'start' });
  window.scrollTo(0, 0);
  state.page = pageId;
}

/* ═══════════════════════════════════
   PROFILE TABS
═══════════════════════════════════ */
function profileTab(tabId) {
  document.querySelectorAll('.profile-tab').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.profile-nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tabId);
  });
  const tab = document.getElementById('tab-' + tabId);
  if (tab) tab.style.display = 'flex';
  else {
    const tab2 = document.getElementById('tab-' + tabId);
    if (tab2) tab2.style.display = 'block';
  }
  // Fix: just show the element
  const el = document.getElementById('tab-' + tabId);
  if (el) el.style.display = '';
  state.profileTab = tabId;
}

function navProfile(tab) {
  nav('profile');
  setTimeout(() => profileTab(tab), 50);
}

/* ═══════════════════════════════════
   DELAY SIMULATION
═══════════════════════════════════ */
function simulateDelay() {
  if (state.delayed) return;
  state.delayed = true;

  // Update guardian
  const msg = document.getElementById('guardian-msg');
  const status = document.getElementById('guardian-status');
  if (msg) msg.textContent = 'Train delayed 8 min. Route recalculated. Shuttle A17 confirmed holding at Gate 3.';
  if (status) {
    status.innerHTML = '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--warn);margin-right:6px"></span> Adjusting';
    status.style.color = 'var(--warn)';
  }

  // Update times
  const depart = document.getElementById('tl-depart');
  const arrive = document.getElementById('tl-arrive');
  const arriveDisplay = document.getElementById('arrive-display');
  const leavesIn = document.getElementById('leaves-in');
  if (depart) depart.textContent = '7:10 PM';
  if (arrive) { arrive.textContent = '7:48 PM · Destination'; }
  if (arriveDisplay) arriveDisplay.textContent = '7:48 PM';
  if (leavesIn) leavesIn.textContent = 'Delayed — new depart 7:10 PM';

  // Disable button
  const btn = document.getElementById('delay-btn');
  if (btn) { btn.disabled = true; btn.style.opacity = '0.4'; btn.textContent = 'Delayed'; }

  // Show inline panel
  const panel = document.getElementById('delay-info-panel');
  if (panel) panel.classList.remove('hidden');

  // Show overlay
  const overlay = document.getElementById('delay-overlay');
  if (overlay) {
    overlay.removeAttribute('aria-hidden');
    overlay.classList.add('show');
  }
}

function closeDelay() {
  const overlay = document.getElementById('delay-overlay');
  if (overlay) {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  }
}

/* ═══════════════════════════════════
   ASK ORBIT
═══════════════════════════════════ */
const answers = {
  walk: "Route adjusted.\n\nWalking reduced to 80 m total.\nArrival: 7:46 PM\nShuttle drops you at the main entrance.",
  missed: "No problem.\n\nNext HyperRail departs Platform 04 in 14 min.\nNew arrival: 7:54 PM\nShuttle connection rebooked automatically.",
  next: "Your next step:\n\nTake the HyperRail from Platform 04.\nDeparts in 6 min · 120 m ahead.\nFollow the indigo floor lights.",
};

function answerOrbit(key) {
  const el = document.getElementById('ask-response');
  if (!el) return;
  el.textContent = answers[key];
  el.classList.add('show');
}

/* ═══════════════════════════════════
   ARRIVAL
═══════════════════════════════════ */
function showArrival() {
  const overlay = document.getElementById('arrival-overlay');
  if (overlay) {
    overlay.removeAttribute('aria-hidden');
    overlay.classList.add('show');
  }
}

function closeArrival() {
  const overlay = document.getElementById('arrival-overlay');
  if (overlay) {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  }
  nav('home');
}

function rateJourney(btn) {
  document.querySelectorAll('#arrival-overlay button.btn-ghost.btn-sm').forEach(b => {
    b.style.background = '';
    b.style.borderColor = '';
    b.style.color = '';
  });
  btn.style.background = 'var(--primary-dim)';
  btn.style.borderColor = 'rgba(99,102,241,0.4)';
  btn.style.color = 'var(--primary)';
}

/* ═══════════════════════════════════
   VOICE
═══════════════════════════════════ */
const voiceLines = {
  live: 'Platform 4 is 120 metres ahead. Your HyperRail departs in 6 minutes.',
  explore: 'ORBIT network map is now active.',
  default: 'Continue to your next waypoint as shown on screen.',
};

function speakInstruction() {
  const text = voiceLines[state.page] || voiceLines.default;
  if ('speechSynthesis' in window && state.voiceEnabled) {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.92;
    speechSynthesis.speak(u);
  }
  toast('🔊 ' + text);
}

/* ═══════════════════════════════════
   TOAST
═══════════════════════════════════ */
function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.removeAttribute('aria-hidden');
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.setAttribute('aria-hidden', 'true'), 300);
  }, 3800);
}

/* ═══════════════════════════════════
   ACCESSIBILITY
═══════════════════════════════════ */
function toggleA(cls, btnId) {
  const active = document.documentElement.classList.toggle(cls);
  const btn = document.getElementById(btnId);
  if (btn) btn.setAttribute('aria-checked', active ? 'true' : 'false');
  saveA11y();
}

function toggleVoice() {
  state.voiceEnabled = !state.voiceEnabled;
  const btn = document.getElementById('toggle-voice');
  if (btn) btn.setAttribute('aria-checked', state.voiceEnabled ? 'true' : 'false');
  toast(state.voiceEnabled ? 'Voice guidance enabled.' : 'Voice guidance disabled.');
  saveA11y();
}

function saveA11y() {
  try {
    localStorage.setItem('orbit-a11y', JSON.stringify({
      largeText: document.documentElement.classList.contains('large-text'),
      highContrast: document.documentElement.classList.contains('high-contrast'),
      reduceMotion: document.documentElement.classList.contains('reduce-motion'),
      voice: state.voiceEnabled,
    }));
  } catch (e) {}
}

function loadA11y() {
  try {
    const d = JSON.parse(localStorage.getItem('orbit-a11y') || '{}');
    if (d.largeText) { document.documentElement.classList.add('large-text'); setToggle('toggle-large', true); }
    if (d.highContrast) { document.documentElement.classList.add('high-contrast'); setToggle('toggle-contrast', true); }
    if (d.reduceMotion) { document.documentElement.classList.add('reduce-motion'); setToggle('toggle-motion', true); }
    if (d.voice) { state.voiceEnabled = true; setToggle('toggle-voice', true); }
  } catch (e) {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduce-motion');
    setToggle('toggle-motion', true);
  }
}

function setToggle(id, val) {
  const el = document.getElementById(id);
  if (el) el.setAttribute('aria-checked', val ? 'true' : 'false');
}

/* ═══════════════════════════════════
   PROFILE TABS INIT
═══════════════════════════════════ */
function initProfileTabs() {
  // Show only active tab
  document.querySelectorAll('.profile-tab').forEach((t, i) => {
    t.style.display = i === 0 ? '' : 'none';
  });
}

/* ═══════════════════════════════════
   DATE INPUT DEFAULT
═══════════════════════════════════ */
function initDateInputs() {
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(i => {
    if (!i.value) i.value = today;
  });
}

/* ═══════════════════════════════════
   OVERLAY DISMISS
═══════════════════════════════════ */
document.addEventListener('click', e => {
  ['delay-overlay', 'arrival-overlay', 'auth-overlay'].forEach(id => {
    const el = document.getElementById(id);
    if (el && e.target === el) {
      el.classList.remove('show');
      el.setAttribute('aria-hidden', 'true');
    }
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['delay-overlay', 'arrival-overlay', 'auth-overlay'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.classList.contains('show')) {
        el.classList.remove('show');
        el.setAttribute('aria-hidden', 'true');
      }
    });
  }
});

/* ═══════════════════════════════════
   THEME TOGGLE
═══════════════════════════════════ */
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  try { localStorage.setItem('orbit-theme', state.theme); } catch(e) {}
}

function applyTheme() {
  const isLight = state.theme === 'light';
  document.documentElement.classList.toggle('light', isLight);
  document.body.classList.toggle('light', isLight);

  const darkIcon = document.querySelector('.theme-icon--dark');
  const lightIcon = document.querySelector('.theme-icon--light');
  if (darkIcon) darkIcon.style.display = isLight ? 'none' : '';
  if (lightIcon) lightIcon.style.display = isLight ? '' : 'none';

  const btn = document.getElementById('theme-toggle');
  if (btn) btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
}

function loadTheme() {
  try {
    const saved = localStorage.getItem('orbit-theme');
    if (saved) {
      state.theme = saved;
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      state.theme = 'light';
    }
  } catch(e) {}
  applyTheme();
}

/* ═══════════════════════════════════
   MOBILE MENU
═══════════════════════════════════ */
function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const btn = document.getElementById('mobile-menu-btn');
  const menuIcon = btn && btn.querySelector('.icon-menu');
  const closeIcon = btn && btn.querySelector('.icon-close');
  const isOpen = drawer && drawer.classList.contains('open');

  if (drawer) {
    drawer.classList.toggle('open', !isOpen);
    drawer.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
  }
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  if (menuIcon) menuIcon.style.display = isOpen ? '' : 'none';
  if (closeIcon) closeIcon.style.display = isOpen ? 'none' : '';
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const btn = document.getElementById('mobile-menu-btn');
  const menuIcon = btn && btn.querySelector('.icon-menu');
  const closeIcon = btn && btn.querySelector('.icon-close');

  if (drawer) { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); }
  if (btn) btn.setAttribute('aria-expanded', 'false');
  if (menuIcon) menuIcon.style.display = '';
  if (closeIcon) closeIcon.style.display = 'none';
}

/* Update mobile nav active state */
const _origNav = nav;
window.nav = function(pageId) {
  _origNav(pageId);
  // sync mobile nav active
  document.querySelectorAll('.mobile-nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });
};

/* ═══════════════════════════════════
   INIT
═══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  loadA11y();
  initProfileTabs();
  initDateInputs();
});

/* ═══════════════════════════════════
   AUTH MODAL
═══════════════════════════════════ */
function openAuth(tab) {
  const overlay = document.getElementById('auth-overlay');
  if (!overlay) return;
  overlay.removeAttribute('aria-hidden');
  overlay.classList.add('show');
  switchAuthTab(tab || 'login');
}

function closeAuth() {
  const overlay = document.getElementById('auth-overlay');
  if (overlay) {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  }
}

function switchAuthTab(tab) {
  const loginPanel = document.getElementById('auth-login');
  const signupPanel = document.getElementById('auth-signup');
  const loginBtn = document.getElementById('tab-login-btn');
  const signupBtn = document.getElementById('tab-signup-btn');
  if (tab === 'login') {
    if (loginPanel) loginPanel.style.display = '';
    if (signupPanel) signupPanel.style.display = 'none';
    if (loginBtn) { loginBtn.classList.add('active'); loginBtn.setAttribute('aria-selected','true'); }
    if (signupBtn) { signupBtn.classList.remove('active'); signupBtn.setAttribute('aria-selected','false'); }
  } else {
    if (loginPanel) loginPanel.style.display = 'none';
    if (signupPanel) signupPanel.style.display = '';
    if (loginBtn) { loginBtn.classList.remove('active'); loginBtn.setAttribute('aria-selected','false'); }
    if (signupBtn) { signupBtn.classList.add('active'); signupBtn.setAttribute('aria-selected','true'); }
  }
}

function submitAuth(e, type) {
  e.preventDefault();
  if (type === 'signup') {
    const pw = document.getElementById('signup-password')?.value;
    const confirm = document.getElementById('signup-confirm')?.value;
    if (pw !== confirm) { toast('Passwords do not match.'); return; }
    const first = document.getElementById('signup-first')?.value || 'Traveller';
    closeAuth();
    toast('Welcome to ORBIT, ' + first + '!');
  } else {
    closeAuth();
    toast('Signed in. Welcome back!');
  }
}

/* ═══════════════════════════════════
   HERO QUICK DESTINATIONS
═══════════════════════════════════ */
function setDest(dest) {
  const input = document.getElementById('hero-dest-input');
  if (input) {
    input.value = dest;
    input.focus();
  }
}

/* expose globals for inline handlers */
window.nav = nav;
window.setDest = setDest;
window.openAuth = openAuth;
window.closeAuth = closeAuth;
window.switchAuthTab = switchAuthTab;
window.submitAuth = submitAuth;
window.profileTab = profileTab;
window.navProfile = navProfile;
window.simulateDelay = simulateDelay;
window.closeDelay = closeDelay;
window.answerOrbit = answerOrbit;
window.showArrival = showArrival;
window.closeArrival = closeArrival;
window.rateJourney = rateJourney;
window.speakInstruction = speakInstruction;
window.toggleA = toggleA;
window.toggleVoice = toggleVoice;
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
