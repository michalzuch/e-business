import React, { useState } from 'react'

const Chat: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [message, setMessage] = useState('')

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const handleQuestion = () => {
    fetch('http://127.0.0.1:5000/api/llama', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })
      .then((response) => response.json().then((data) => ({ status: response.status, body: data })))
      .then((result) => {
        if (result.status === 200) {
          setMessage(result.body.message)
        } else {
          setMessage('Error while getting answer')
        }
      })
      .catch((error) => {
        setMessage('Error while getting answer')
        console.error('Model response failed:', error)
      })
  }

  return (
    <div>
      <h3>ChatGPT Bot</h3>
      <textarea placeholder='Chat here' rows={10} cols={50} value={prompt} onChange={handlePromptChange} />
      <br />
      <button onClick={handleQuestion}>Ask</button>
      <br />
      {message !== '' && <p>{message}</p>}
    </div>
  )
}

export default Chat
