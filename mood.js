document.getElementById('mood').innerHTML = `
  <h2 class="text-xl font-bold mb-4">😄 Mood Tracker</h2>
  <select id="mood-emoji" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
    <option value="😊">😊 Bahagia</option>
    <option value="😢">😢 Sedih</option>
    <option value="😣">😣 Stres</option>
    <option value="😎">😎 Santai</option>
  </select>
  <input id="mood-cause" type="text" placeholder="Apa penyebabnya?" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <button onclick="addMood()" class="p-2 bg-yellow-500 text-white rounded w-full">Simpan Mood</button>
  <canvas id="mood-chart" class="mt-4"></canvas>
  <button onclick="exportMood()" class="p-2 bg-gray-500 text-white rounded w-full mt-2">Ekspor ke PDF</button>
`;

let moods = DataManager.load('moods');
let moodChart;

function addMood() {
  const emoji = document.getElementById('mood-emoji').value;
  const cause = document.getElementById('mood-cause').value;
  if (emoji && cause) {
    moods.push({ id: Date.now(), date: new Date().toISOString().split('T')[0], emoji, cause });
    DataManager.save('moods', moods);
    renderMoodChart();
  }
}

function renderMoodChart() {
  const currentWeek = Utils.getWeekNumber(new Date());
  const weeklyMoods = moods.filter(m => Utils.getWeekNumber(m.date) === currentWeek);
  const moodCounts = {};
  weeklyMoods.forEach(m => {
    moodCounts[m.emoji] = (moodCounts[m.emoji] || 0) + 1;
  });
  const ctx = document.getElementById('mood-chart').getContext('2d');
  if (moodChart) moodChart.destroy();
  moodChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(moodCounts),
      datasets: [{ data: Object.values(moodCounts), backgroundColor: ['#34d399', '#f87171', '#fb923c', '#60a5fa'] }]
    },
    options: { responsive: true }
  });
}

renderMoodChart();