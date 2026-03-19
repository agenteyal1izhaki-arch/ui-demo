(function () {
  'use strict';

  // === State ===
  let clickCount = 0;
  let fetchCount = 0;
  const startTime = Date.now();

  // === Clock ===
  function updateClock() {
    document.getElementById('clock').textContent =
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  updateClock();
  setInterval(updateClock, 1000);

  // === Uptime ===
  function updateUptime() {
    const secs = Math.floor((Date.now() - startTime) / 1000);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    document.getElementById('statUptime').textContent =
      m > 0 ? `${m}m ${s}s` : `${s}s`;
  }
  updateUptime();
  setInterval(updateUptime, 1000);

  // === Stats sync ===
  function syncStats() {
    document.getElementById('statClicks').textContent = clickCount;
    document.getElementById('statFetches').textContent = fetchCount;
  }

  // === Counter ===
  const countEl = document.getElementById('count');

  document.getElementById('incrementBtn').addEventListener('click', () => {
    clickCount++;
    countEl.textContent = clickCount;
    countEl.classList.remove('bump');
    void countEl.offsetWidth; // reflow to restart animation
    countEl.classList.add('bump');
    syncStats();
    setTimeout(() => countEl.classList.remove('bump'), 150);
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    clickCount = 0;
    countEl.textContent = 0;
    syncStats();
  });

  // === GitHub API Fetch ===
  const fetchBtn    = document.getElementById('fetchBtn');
  const output      = document.getElementById('output');
  const fetchStatus = document.getElementById('fetchStatus');

  function setStatus(state, label) {
    fetchStatus.className = `status-pill status-${state}`;
    fetchStatus.textContent = label;
  }

  fetchBtn.addEventListener('click', () => {
    fetchBtn.disabled = true;
    output.textContent = '';
    setStatus('loading', 'Fetching…');

    fetch('https://api.github.com/repos/agenteyal1izhaki-arch/ui-demo')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        fetchCount++;
        syncStats();
        setStatus('success', 'Success');
        output.textContent = JSON.stringify({
          repo:        data.full_name,
          stars:       data.stargazers_count,
          forks:       data.forks_count,
          open_issues: data.open_issues_count,
          language:    data.language,
          pushed_at:   data.pushed_at,
        }, null, 2);
      })
      .catch(err => {
        setStatus('error', 'Error');
        output.textContent = String(err);
      })
      .finally(() => {
        fetchBtn.disabled = false;
      });
  });

  // === Theme Toggle ===
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = themeToggle.querySelector('.theme-icon');
  const statTheme   = document.getElementById('statTheme');

  themeToggle.addEventListener('click', () => {
    const html   = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const next   = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    statTheme.textContent = isDark ? 'Light' : 'Dark';
  });

})();
