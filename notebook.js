document.getElementById('notebook').innerHTML = `
  <h2 class="text-xl font-bold mb-4">🗒️ Notebook Pribadi</h2>
  <textarea id="note-text" placeholder="Tulis ide..." class="p-2 border rounded w-full mb-2 dark:bg-gray-700"></textarea>
  <input id="note-tags" type="text" placeholder="Tag (pisahkan dengan koma)" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <input id="note-color" type="color" class="p-2 rounded w-full mb-2">
  <button onclick="addNote()" class="p-2 bg-indigo-500 text-white rounded w-full">Simpan Catatan</button>
  <input id="note-search" type="text" placeholder="Cari catatan..." class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <ul id="note-list" class="mt-4"></ul>
`;

let notes = DataManager.load('notes');

function addNote() {
  const text = document.getElementById('note-text').value;
  const tags = document.getElementById('note-tags').value.split(',').map(t => t.trim());
  const color = document.getElementById('note-color').value;
  if (text) {
    notes.push({ id: Date.now(), text, tags, color });
    DataManager.save('notes', notes);
    renderNotes();
  }
}

function editNote(id) {
  const note = notes.find(n => n.id === id);
  const text = prompt('Edit catatan:', note.text);
  const tags = prompt('Edit tag (pisahkan dengan koma):', note.tags.join(','));
  const color = prompt('Edit warna (hex, e.g., #ff0000):', note.color);
  if (text && tags && color) {
    note.text = text;
    note.tags = tags.split(',').map(t => t.trim());
    note.color = color;
    DataManager.save('notes', notes);
    renderNotes();
  }
}

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  DataManager.save('notes', notes);
  renderNotes();
}

function renderNotes() {
  const search = document.getElementById('note-search').value.toLowerCase();
  const filteredNotes = notes.filter(n => n.text.toLowerCase().includes(search) || n.tags.some(t => t.toLowerCase().includes(search)));
  document.getElementById('note-list').innerHTML = filteredNotes.map(note => `
    <li class="p-2 border-b" style="background-color: ${note.color}20">
      <span>${note.text} <br><small>Tag: ${note.tags.join(', ')}</small></span>
      <div>
        <button onclick="editNote(${note.id})" class="p-1 bg-yellow-500 text-white rounded">✏️</button>
        <button onclick="deleteNote(${note.id})" class="p-1 bg-red-500 text-white rounded">🗑️</button>
      </div>
    </li>
  `).join('');
}

renderNotes();