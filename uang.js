document.getElementById('uang').innerHTML = `
  <h2 class="text-xl font-bold mb-4">💸 Uang Tracker</h2>
  <select id="uang-type" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
    <option value="pemasukan">Pemasukan</option>
    <option value="pengeluaran">Pengeluaran</option>
  </select>
  <input id="uang-amount" type="number" placeholder="Jumlah (Rp)" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <input id="uang-category" type="text" placeholder="Kategori (e.g., Makan)" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <button onclick="addUang()" class="p-2 bg-red-500 text-white rounded w-full">Simpan</button>
  <canvas id="uang-chart" class="mt-4"></canvas>
  <button onclick="exportUang()" class="p-2 bg-gray-500 text-white rounded w-full mt-2">Ekspor ke PDF</button>
`;

let transactions = DataManager.load('transactions');
let uangChart;

function addUang() {
  const type = document.getElementById('uang-type').value;
  const amount = Number(document.getElementById('uang-amount').value);
  const category = document.getElementById('uang-category').value;
  if (amount && category) {
    transactions.push({ id: Date.now(), date: new Date().toISOString().split('T')[0], type, amount, category });
    DataManager.save('transactions', transactions);
    renderUangChart();
  }
}

function renderUangChart() {
  const categories = {};
  transactions.forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + (t.type === 'pemasukan' ? t.amount : -t.amount);
  });
  const ctx = document.getElementById('uang-chart').getContext('2d');
  if (uangChart) uangChart.destroy();
  uangChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(categories),
      datasets: [{ data: Object.values(categories), backgroundColor: ['#34d399', '#f87171', '#fb923c', '#60a5fa'] }]
    },
    options: { responsive: true }
  });
}

renderUangChart();