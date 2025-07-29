import React, { useState } from 'react';
import './App.css';

const functionUrl = 'https://xxxxxxxxx.lambda-url.eu-west-2.on.aws/';

type Message = {
  text: string;
  sender: 'ai' | 'user';
};

// Optional: Set your system prompt
const SYSTEM_PROMPT = "You are a helpful assistant.";

function App() {
  const [newInputValue, setNewInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false); // Optional, for UX

  const newMessage: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const input = newInputValue.trim();
    if (!input || loading) return;

    setNewInputValue('');
    const newMessages: Message[] = [
      ...messages,
      { text: input, sender: 'user' }
    ];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Most OpenAI wrappers expect { role, content } for messages.
          // Your backend may adapt, but adjust if needed.
          messages: newMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          })),
          systemPrompt: SYSTEM_PROMPT
        })
      });
      const data = await response.json();
      setMessages([
        ...newMessages,
        { sender: 'ai', text: data.body } // Adjust .body if your handler returns something else
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: 'ai', text: 'Network error. Try again!' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <a href='App.tsx' className='heading-link'>
        <h1 className='heading'>ChatBot</h1>
      </a>
      <div className='message-container'>
        {messages.map((message, index) => (
          <p key={index} className={"message " + message.sender}>
            {message.text}
          </p>
        ))}
        {loading && <p className="message ai">Thinking...</p>}
      </div>
      <form className="input-form" onSubmit={newMessage}>
        <input
          type="text"
          placeholder="Message"
          value={newInputValue}
          onChange={e => setNewInputValue(e.currentTarget.value)}
          disabled={loading}
          className='search-bar'
        />
        <input type="submit" className = 'button' value={loading ? "Sending..." : "Send"} disabled={loading} />
      </form>
    </main>
  );
}

export default App;
