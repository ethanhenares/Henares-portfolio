import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Draft only: no backend yet. Replace with a real service later.
    setSent(true)
  }

  return (
    <section className="page page-right">
      <h1 className="page-title">Contact</h1>
      <p className="body-text">Want to work together or just say hi? Send me a message.</p>

      {sent ? (
        <p className="notice" role="status">
          Thanks! This is a draft form, so nothing was sent yet — but it works.
        </p>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" required autoComplete="name" />
          </label>
          <label>
            Email
            <input type="email" name="email" required autoComplete="email" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button type="submit" className="btn">
            Send message
          </button>
        </form>
      )}
    </section>
  )
}
