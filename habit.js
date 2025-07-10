document.getElementById('habit').innerHTML = `
  <h2 class="text-xl font-bold mb-4">📌 Habit Tracker</h2>
  <input id="habit-name" type="text" placeholder="Nama Habit (e.g., Baca Al-Qur'an)" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <input id="habit-emoji" type="text" placeholder="Emoji (e.g., 📖)" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <button onclick="addHabit()" class="p-2 bg-blue-500 text-white rounded w-full">Tambah Habit</button>
  <ul id="habit-list" class="mt-4"></ul>
  <div id="habit-stats" class="mt-4"></div>
  <button onclick="exportHabits()" class="p-2 bg-gray-500 text-white rounded w-full mt-2">Ekspor ke PDF</button>
`;

let habits = DataManager.load('habits');

function addHabit() {
  const name = document.getElementById('habit-name').value;
  const emoji = document.getElementById('habit-emoji').value;
  if (name && emoji) {
    habits.push({ id: Date.now(), name, emoji, completed: [] });
    DataManager.save('habits', habits);
    renderHabits();
  }
}

function editHabit(id) {
  const habit = habits.find(h => h.id === id);
  const name = prompt('Edit nama habit:', habit.name);
  const emoji = prompt('Edit emoji:', habit.emoji);
  if (name && emoji) {
    habit.name = name;
    habit.emoji = emoji;
    DataManager.save('habits', habits);
    renderHabits();
  }
}

function deleteHabit(id) {
  habits = habits.filter(habit => habit.id !== id);
  DataManager.save('habits', habits);
  renderHabits();
}

function toggleHabit(id, date) {
  const habit = habits.find(h => h.id === id);
  if (habit.completed.includes(date)) {
    habit.completed = habit.completed.filter(d => d !== date);
  } else {
    habit.completed.push(date);
  }
  DataManager.save('habits', habits);
  renderHabits();
}

function renderHabits() {
  const habitList = document.getElementById('habit-list');
  habitList.innerHTML = habits.map(habit => `
    <li class="p-2 border-b flex justify-between items-center">
      <span>${habit.emoji} ${habit.name}</span>
      <div>
        <button onclick="toggleHabit(${habit.id}, '${new Date().toISOString().split('T')[0]}')" class="p-1 bg-green-500 text-white rounded">✔️</button>
        <button onclick="editHabit(${habit.id})" class="p-1 bg-yellow-500 text

-white rounded">✏️</button>
        <button onclick="deleteHabit(${habit.id})" class="p-1 bg-red-500 text-white rounded">🗑️</button>
      </div>
    </li>
  `).join('');
  const stats = document.getElementById('habit-stats');
  const currentWeek = Utils.getWeekNumber(new Date());
  const weeklyCompletions = habits.reduce((sum, h) => sum + h.completed.filter(d => Utils.getWeekNumber(d) === currentWeek).length, 0);
  stats.innerHTML = `<p>Statistik: ${habits.length} habit, ${weeklyCompletions} penyelesaian minggu ini</p>`;
}

renderHabits();