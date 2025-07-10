document.getElementById('settings').innerHTML = `
  <h2 class="text-xl font-bold mb-4">⚙️ Pengaturan</h2>
  <input id="default-location" type="text" placeholder="Lokasi default shalat" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <button onclick="saveSettings()" class="p-2 bg-gray-600 text-white rounded w-full">Simpan</button>
  <button onclick="clearData()" class="p-2 bg-red-500 text-white rounded w-full mt-2">Hapus Semua Data</button>
`;

function saveSettings() {
  const location = document.getElementById('default-location').value;
  if (location) {
    DataManager.save('defaultLocation', location);
    alert('Pengaturan disimpan!');
  }
}

function clearData() {
  if (confirm('Yakin ingin menghapus semua data?')) {
    DataManager.clear('habits');
    DataManager.clear('jurnals');
    DataManager.clear('moods');
    DataManager.clear('transactions');
    DataManager.clear('library');
    DataManager.clear('notes');
    DataManager.clear('refleksi');
    DataManager.clear('exercises');
    DataManager.clear('apiKey');
    alert('Semua data dihapus!');
    location.reload();
  }
}