document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ai-chat').innerHTML = `
    <select id="ai-mode" class="mb-2 p-2 border rounded">
      <option value="mentor">Mentor</option>
      <option value="curhat">Curhat</option>
      <option value="evaluasi">Evaluasi</option>
      <option value="keuangan">Keuangan</option>
    </select>
    <div id="chat-container" class="mb-4 h-60 overflow-y-auto p-2 border rounded bg-white"></div>
    <input id="ai-input" type="text" placeholder="Tulis pertanyaanmu..." class="p-2 border rounded w-full mb-2" />
    <button id="send-btn" class="p-2 bg-blue-600 text-white rounded w-full">Kirim</button>
  `;

  const chatContainer = document.getElementById('chat-container');
  const sendBtn = document.getElementById('send-btn');

  function appendMessage(text, isUser = false) {
    const bubble = document.createElement('div');
    bubble.className = `p-2 my-1 rounded ${isUser ? 'bg-blue-500 text-white text-right' : 'bg-gray-200 text-left'}`;
    bubble.textContent = text;
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  async function sendChat() {
    const input = document.getElementById('ai-input');
    const prompt = input.value.trim();
    const mode = document.getElementById('ai-mode').value;

    if (!prompt) return;

    appendMessage(prompt, true);
    input.value = '';
    sendBtn.disabled = true;
    sendBtn.textContent = '⏳ Tunggu...';

    const prompts = {
      mentor: `Sebagai mentor Muslim, beri nasihat Islami untuk: ${prompt}`,
      curhat: `Dengarkan curhatan ini & beri respons Islami: ${prompt}`,
      evaluasi: `Evaluasi situasi ini secara objektif & Islami: ${prompt}`,
      keuangan: `Berikan saran keuangan Islami dan praktis untuk: ${prompt}`,
    };

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompts[mode] })
      });

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ Gagal mendapatkan jawaban.';

      appendMessage(reply);
    } catch (err) {
      appendMessage('⚠️ Error koneksi atau server.');
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Kirim';
    }
  }

  sendBtn.onclick = sendChat;
  document.getElementById('ai-input').addEventListener('keypress', e => {
    if (e.key === 'Enter') sendChat();
  });
});
