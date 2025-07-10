document.getElementById('jurnal').innerHTML = `
  <h2 class="text-xl font-bold mb-4">📓 Jurnal Harian</h2>
  <textarea id="jurnal-text" placeholder="Tulis cerita hari ini..." class="p-2 border rounded w-full mb-2 dark:bg-gray-700"></textarea>
  <select id="jurnal-emoji" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
    <option value="😊">😊 Bahagia</option>
    <option value="😢">😢 Sedih</option>
    <option value="😎">😎 Keren</option>
  </select>
  <input id="jurnal-color" type="color" class="p-2 rounded w-full mb-2">
  <button onclick="addJurnal()" class="p-2 bg-purple-500 text-white rounded w-full">Simpan Jurnal</button>
  <input id="jurnal-filter" type="date" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <ul id="jurnal-list" class="mt-4"></ul>
  <button onclick="exportJurnal()" class="p-2 bg-gray-500 text-white rounded w-full mt-2">Ekspor ke PDF</button>
`;

let jurnals = DataManager.load('jurnals');

function addJurnal() {
  const text = document.getElementById('jurnal-text').value;
  const emoji = document.getElementById('jurnal-emoji').value;
  const color = document.getElementById('jurnal-color').value;
  if (text) {
    jurnals.push({ id: Date.now(), date: new Date().toISOString().split('T')[0], text, emoji, color });
    DataManager.save('jurnals', jurnals);
    renderJurnals();
  }
}

function editJurnal(id) {
  const jurnal = jurnals.find(j => j.id === id);
  const text = prompt('Edit jurnal:', jurnal.text);
  const emoji = prompt('Edit emoji:', jurnal.emoji);
  const color = prompt('Edit warna (hex, e.g., #ff0000):', jurnal.color);
  if (text && emoji && color) {
    jurnal.text = text;
    jurnal.emoji = emoji;
    jurnal.color = color;
    DataManager.save('jurnals', jurnals);
    renderJurnals();
  }
}

function deleteJurnal(id) {
  jurnals = jurnals.filter(jurnal => jurnal.id !== id);
  DataManager.save('jurnals', jurnals);
  renderJurnals();
}

function renderJurnals() {
  const filter = document.getElementById('jurnal-filter').value;
  const filteredJurnals = filter ? jurnals.filter(j => j.date === filter) : jurnals;
  document.getElementById('jurnal-list').innerHTML = filteredJurnals.map(jurnal => `
    <li class="p-2 border-b" style="background-color: ${jurnal.color}20">
      <span>${jurnal.emoji} ${Utils.formatDate(jurnal.date)}: ${jurnal.text}</span>
      <div>
        <button onclick="editJurnal(${jurnal.id})" class="p-1 bg-yellow-500 text-white rounded">✏️</button>
        <button onclick="deleteJurnal(${jurnal.id})" class="p-1 bg-red-500 text-white rounded">🗑️</button>
      </div>
    </li>
  `).join('');
}

renderJurnals();