const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Array untuk menyimpan riwayat percakapan
let conversationHistory = [];

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  // Tambahkan pesan user ke riwayat
  conversationHistory.push({ role: 'user', text: userMessage });

  // Tampilkan pesan "Thinking..." sementara
  const botMessageElement = appendMessage('bot', 'Thinking...');

  try {
    // Kirim pesan user ke backend Node.js / Express
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversation: conversationHistory
      })
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();
    const botReply = data.result || 'Sorry, no response received.';

    // Ganti teks "Thinking..." dengan balasan dari AI
    botMessageElement.textContent = botReply;

    // Simpan balasan AI ke riwayat percakapan agar AI ingat obrolan sebelumnya
    if (data.result) {
      conversationHistory.push({ role: 'model', text: botReply });
    }
  } catch (error) {
    console.error('Error fetching chat:', error);
    botMessageElement.textContent = 'Failed to get response from server.';
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg; // Kembalikan elemen DOM agar teksnya bisa kita update nanti
}
