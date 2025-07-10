document.getElementById('dashboard').innerHTML = `
  <h2 class="text-xl font-bold mb-4">📊 AtharMeter Dashboard</h2>
  <div id="dashboard-stats" class="grid grid-cols-1 gap-4">
    <div class="p-4 bg-blue-100 dark:bg-blue-900 rounded">
      <h3>XP</h3>
      <p id="xp">0</p>
    </div>
    <div class="p-4 bg-yellow-100 dark:bg-yellow-900 rounded">
      <h3>Gold</h3>
      <p id="gold">0</p>
    </div>
    <div class="p-4 bg-green-100 dark:bg-green-900 rounded">
      <h3>Statistik</h3>
      <p id="stats"></p>
    </div>
  </div>
`;

function renderDashboard() {
  const habits = DataManager.load('habits');
  const moods = DataManager.load('moods');
  const transactions = DataManager.load('transactions');
  const xp = habits.reduce((sum, h) => sum + h.completed.length * 10, 0) + moods.length * 5;
  const gold = transactions.reduce((sum, t) => sum + (t.type === 'pemasukan' ? t.amount : -t.amount), 0) / 1000;
  document.getElementById('xp').textContent = xp;
  document.getElementById('gold').textContent = gold.toFixed(2);
  document.getElementById('stats').innerHTML = `
    <p>Habit: ${habits.length} (Selesai: ${habits.reduce((sum, h) => sum + h.completed.length, 0)})</p>
    <p>Mood: ${moods.length} entri</p>
    <p>Transaksi: ${transactions.length} entri</p>
  `;
}

renderDashboard();