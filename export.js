function exportToPDF(data, filename) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(JSON.stringify(data, null, 2), 10, 10);
  doc.save(filename);
}

function exportToJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportHabits() {
  const habits = DataManager.load('habits');
  exportToPDF(habits, 'habits.pdf');
  exportToJSON(habits, 'habits.json');
}

function exportJurnal() {
  const jurnals = DataManager.load('jurnals');
  exportToPDF(jurnals, 'jurnal.pdf');
  exportToJSON(jurnals, 'jurnal.json');
}

function exportMood() {
  const moods = DataManager.load('moods');
  exportToPDF(moods, 'mood.pdf');
  exportToJSON(moods, 'mood.json');
}

function exportUang() {
  const transactions = DataManager.load('transactions');
  exportToPDF(transactions, 'uang.pdf');
  exportToJSON(transactions, 'uang.json');
}

function exportRefleksi() {
  const refleksi = DataManager.load('refleksi');
  exportToPDF(refleksi, 'refleksi.pdf');
  exportToJSON(refleksi, 'refleksi.json');
}