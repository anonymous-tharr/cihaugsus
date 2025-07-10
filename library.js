document.getElementById('library').innerHTML = `
  <h2 class="text-xl font-bold mb-4">📚 Library Elite</h2>
  <input id="youtube-url" type="text" placeholder="URL YouTube" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <button onclick="addYouTube()" class="p-2 bg-teal-500 text-white rounded w-full">Tambah YouTube</button>
  <input id="pdf-file" type="file" accept=".pdf" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <button onclick="addPDF()" class="p-2 bg-teal-500 text-white rounded w-full">Upload PDF</button>
  <input id="link-url" type="text" placeholder="URL Favorit" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <input id="link-name" type="text" placeholder="Nama Link" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <button onclick="addLink()" class="p-2 bg-teal-500 text-white rounded w-full">Tambah Link</button>
  <div id="library-content" class="mt-4"></div>
`;

let library = DataManager.load('library');

function addYouTube() {
  const url = document.getElementById('youtube-url').value;
  if (url.includes('youtube.com')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    library.push({ id: Date.now(), type: 'youtube', url: `https://www.youtube.com/embed/${videoId}` });
    DataManager.save('library', library);
    renderLibrary();
  }
}

function addPDF() {
  const file = document.getElementById('pdf-file').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      library.push({ id: Date.now(), type: 'pdf', name: file.name, data: reader.result });
      DataManager.save('library', library);
      renderLibrary();
    };
    reader.readAsDataURL(file);
  }
}

function addLink() {
  const url = document.getElementById('link-url').value;
  const name = document.getElementById('link-name').value;
  if (url && name) {
    library.push({ id: Date.now(), type: 'link', url, name });
    DataManager.save('library', library);
    renderLibrary();
  }
}

function deleteLibraryItem(id) {
  library = library.filter(item => item.id !== id);
  DataManager.save('library', library);
  renderLibrary();
}

function renderLibrary() {
  document.getElementById('library-content').innerHTML = library.map(item => {
    if (item.type === 'youtube') {
      return `<div class="p-2 border-b"><iframe src="${item.url}" class="w-full h-64"></iframe><button onclick="deleteLibraryItem(${item.id})" class="p-1 bg-red-500 text-white rounded">🗑️</button></div>`;
    } else if (item.type === 'pdf') {
      return `<div class="p-2 border-b"><a href="${item.data}" download="${item.name}">${item.name}</a><button onclick="deleteLibraryItem(${item.id})" class="p-1 bg-red-500 text-white rounded">🗑️</button></div>`;
    } else {
      return `<div class="p-2 border-b"><a href="${item.url}" target="_blank">${item.name}</a><button onclick="deleteLibraryItem(${item.id})" class="p-1 bg-red-500 text-white rounded">🗑️</button></div>`;
    }
  }).join('');
}

renderLibrary();