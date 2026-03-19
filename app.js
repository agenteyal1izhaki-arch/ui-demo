(function () {
  'use strict';

  // === GitHub API Fetch ===
  document.getElementById('fetchBtn').addEventListener('click', () => {
    const output = document.getElementById('output');
    const status = document.getElementById('status');
    output.textContent = 'Loading…';
    status.textContent = 'Status: fetching…';
    fetch('https://api.github.com/repos/agenteyal1izhaki-arch/ui-demo')
      .then(res => res.json())
      .then(data => {
        status.textContent = 'Status: fetched ✓';
        output.textContent = JSON.stringify({
          full_name: data.full_name,
          stars: data.stargazers_count,
          forks: data.forks_count,
          open_issues: data.open_issues_count,
          pushed_at: data.pushed_at,
        }, null, 2);
      })
      .catch(err => {
        status.textContent = 'Status: error ✗';
        output.textContent = String(err);
      });
  });

  // === Click Counter ===
  let count = 0;
  const countEl = document.getElementById('count');

  document.getElementById('incrementBtn').addEventListener('click', () => {
    count++;
    countEl.textContent = count;
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    count = 0;
    countEl.textContent = count;
  });

  // === Live Clock ===
  function updateClock() {
    document.getElementById('clock').textContent =
      new Date().toLocaleTimeString();
  }
  updateClock();
  setInterval(updateClock, 1000);

  // === Theme Toggle ===
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
  });
})();
