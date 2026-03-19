document.getElementById('fetchBtn').addEventListener('click', () => {
  const output = document.getElementById('output');
  output.textContent = 'Loading...';
  fetch('https://api.github.com/repos/openclaw/openclaw')
    .then(res => res.json())
    .then(data => {
      document.getElementById('status').textContent = 'Status: fetched';
      output.textContent = JSON.stringify({ full_name: data.full_name, stargazers: data.stargazers_count }, null, 2);
    })
    .catch(err => {
      document.getElementById('status').textContent = 'Status: error';
      output.textContent = String(err);
    });
});
