document.getElementById('refleksi').innerHTML = `
  <h2 class="text-xl font-bold mb-4">🔁 Refleksi Mingguan</h2>
  <textarea id="refleksi-text" placeholder="Apa yang baik minggu ini? Apa yang perlu diperbaiki?" class="p-2 border rounded w-full mb-2 dark:bg-gray-700"></textarea>
  <button onclick="addRefleksi()" class="p-2 bg-orange-500 text-white rounded w-full">Simpan Refleksi</button>
  <ul id="refleksi-list" class="mt-4"></ul>
  <button onclick="exportRefleksi()" class="p-2 bg-gray-500 text-white rounded w-full mt-2">Ekspor ke PDF</button>
`;

let refleksi = DataManager.load('refleksi');

function addRefleksi() {
  const text = document.getElementById('refleksi-text').value;
  if (text) {
    refleksi.push({ id: Date.now(), week: Utils.getWeekNumber(new Date()), date: new Date().toISOString().split('T')[0], text });
    DataManager.save('refleksi', refleksi);
    renderRefleksi();
  }
}

function editRefleksi(id) {
  const ref = refleksi.find(r => r.id === id);
  const text = prompt('Edit refleksi:', ref.text);
  if (text) {
    ref.text = text;
    DataManager.save('refleksi', refleksi);
    renderRefleksi();
  }
}

function deleteRefleksi(id) {
  refleksi = refleksi.filter(r => r.id !== id);
  DataManager.save('refleksi', refleksi);
  renderRefleksi();
}

function renderRefleksi() {
  document.getElementById('refleksi-list').innerHTML = refleksi.map(r => `
    <li class="p-2 border-b">
      <span>Minggu ${r.week} (${Utils.formatDate(r.date)}): ${r.text}</span>
      <div>
        <button onclick="editRefleksi(${r.id})" class="p-1 bg-yellow-500 text-white rounded">✏️</button>
        <button onclick="deleteRefleksi(${r.id})" class="p-1 bg-red-500 text-white rounded">🗑️</button>
      </div>
    </li>
  `).join('');
}

renderRefleksi();