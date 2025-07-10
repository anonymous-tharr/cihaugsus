document.getElementById('gym').innerHTML = `
  <h2 class="text-xl font-bold mb-4">🏋️ Gym Tracker</h2>
  <input id="gym-exercise" type="text" placeholder="Latihan (e.g., Push-up)" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <input id="gym-reps" type="number" placeholder="Repetisi" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <button onclick="addExercise()" class="p-2 bg-gray-500 text-white rounded w-full">Simpan Latihan</button>
  <ul id="gym-list" class="mt-4"></ul>
`;

let exercises = DataManager.load('exercises');

function addExercise() {
  const exercise = document.getElementById('gym-exercise').value;
  const reps = Number(document.getElementById('gym-reps').value);
  if (exercise && reps) {
    exercises.push({ id: Date.now(), date: new Date().toISOString().split('T')[0], exercise, reps });
    DataManager.save('exercises', exercises);
    renderExercises();
  }
}

function editExercise(id) {
  const ex = exercises.find(e => e.id === id);
  const exercise = prompt('Edit latihan:', ex.exercise);
  const reps = Number(prompt('Edit repetisi:', ex.reps));
  if (exercise && reps) {
    ex.exercise = exercise;
    ex.reps = reps;
    DataManager.save('exercises', exercises);
    renderExercises();
  }
}

function deleteExercise(id) {
  exercises = exercises.filter(e => e.id !== id);
  DataManager.save('exercises', exercises);
  renderExercises();
}

function renderExercises() {
  const currentWeek = Utils.getWeekNumber(new Date());
  const weeklyExercises = exercises.filter(e => Utils.getWeekNumber(e.date) === currentWeek);
  document.getElementById('gym-list').innerHTML = weeklyExercises.map(e => `
    <li class="p-2 border-b">
      <span>${Utils.formatDate(e.date)}: ${e.exercise} (${e.reps} reps)</span>
      <div>
        <button onclick="editExercise(${e.id})" class="p-1 bg-yellow-500 text-white rounded">✏️</button>
        <button onclick="deleteExercise(${e.id})" class="p-1 bg-red-500 text-white rounded">🗑️</button>
      </div>
    </li>
  `).join('');
}

renderExercises();