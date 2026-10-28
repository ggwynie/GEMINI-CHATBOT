const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

let conversationHistory = [];

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  conversationHistory.push({ role: 'user', text: userMessage });

  const botMessageElement = appendMessage('bot', 'Thinking...');

  try {
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

    if (typeof marked !== 'undefined') {
      botMessageElement.innerHTML = marked.parse(botReply);
    } else {
      botMessageElement.textContent = botReply;
    }

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
  
  if (sender === 'bot' && typeof marked !== 'undefined') {
    msg.innerHTML = marked.parse(text);
  } else {
    msg.textContent = text;
  }
  
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}
