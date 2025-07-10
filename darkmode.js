document.getElementById('toggle-dark-mode').addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  DataManager.save('darkMode', document.documentElement.classList.contains('dark'));
});

document.addEventListener('DOMContentLoaded', () => {
  if (DataManager.load('darkMode', false)) {
    document.documentElement.classList.add('dark');
  }
});