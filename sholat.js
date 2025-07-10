document.getElementById('sholat').innerHTML = `
  <h2 class="text-xl font-bold mb-4">🕌 Waktu Shalat</h2>
  <input id="location" type="text" placeholder="Masukkan kota (e.g., Jakarta)" class="p-2 border rounded w-full mb-2 dark:bg-gray-700">
  <button onclick="getPrayerTimes()" class="p-2 bg-green-500 text-white rounded w-full">Cek Waktu Shalat</button>
  <div id="prayer-times" class="mt-4"></div>
`;

async function getPrayerTimes() {
  const location = document.getElementById('location').value || DataManager.load('defaultLocation', 'Jakarta');
  try {
    const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${location}&country=Indonesia`);
    const data = await response.json();
    const timings = data.data.timings;
    DataManager.save('defaultLocation', location);
    document.getElementById('prayer-times').innerHTML = `
      <p>Subuh: ${timings.Fajr}</p>
      <p>Dzuhur: ${timings.Dhuhr}</p>
      <p>Ashar: ${timings.Asr}</p>
      <p>Maghrib: ${timings.Maghrib}</p>
      <p>Isya: ${timings.Isha}</p>
    `;
    startCountdown(timings);
  } catch (error) {
    document.getElementById('prayer-times').innerHTML = '<p>Gagal memuat waktu shalat. Cek koneksi!</p>';
  }
}

function startCountdown(timings) {
  const times = [
    { name: 'Subuh', time: timings.Fajr },
    { name: 'Dzuhur', time: timings.Dhuhr },
    { name: 'Ashar', time: timings.Asr },
    { name: 'Maghrib', time: timings.Maghrib },
    { name: 'Isya', time: timings.Isha }
  ];
  setInterval(() => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    let nextPrayer = null;
    for (const prayer of times) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      if (prayerTime > currentTime) {
        nextPrayer = prayer;
        break;
      }
    }
    if (nextPrayer) {
      const [hours, minutes] = nextPrayer.time.split(':').map(Number);
      const timeLeft = (hours * 60 + minutes) - currentTime;
      const hoursLeft = Math.floor(timeLeft / 60);
      const minutesLeft = timeLeft % 60;
      document.getElementById('prayer-times').innerHTML += `<p class="mt-2">⏰ ${nextPrayer.name} dalam ${hoursLeft} jam ${minutesLeft} menit! Jangan lupa siap-siap ya! 😎</p>`;
    }
  }, 60000); // Update setiap menit
}

getPrayerTimes();