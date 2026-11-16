import { useState } from 'react'
import { contact } from '../data/site.js'

const EMAIL_IS_PLACEHOLDER = contact.email.includes('example.com')

export default function Contact() {
  // idle | sending | sent | opened (email app opened) | error | unconfigured
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('_gotcha')) return // spam bots fill the hidden field

    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')

    // Option 1: a form service delivers the message to your inbox.
    if (contact.formEndpoint) {
      setStatus('sending')
      try {
        const res = await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        form.reset()
        setStatus('sent')
      } catch {
        setStatus('error')
      }
      return
    }

    // Option 2: open the visitor's own email app with the message filled in.
    if (EMAIL_IS_PLACEHOLDER) {
      setStatus('unconfigured')
      return
    }
    const subject = `Portfolio message from ${name}`
    const body = `${message}\n\n— ${name} (${email})`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('opened')
  }

  const canShowEmail = !EMAIL_IS_PLACEHOLDER

  return (
    <section className="page page-right">
      <h1 className="page-title">Contact</h1>
      <p className="body-text">Want to work together or just say hi? Send me a message.</p>

      {status === 'sent' ? (
        <p className="notice" role="status">
          Thank you — your message was sent. I'll get back to you soon.
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
          {/* hidden trap for spam bots; real people never see or fill it */}
          <input
            type="text"
            name="_gotcha"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
            className="trap"
          />
          <button type="submit" className="btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'opened' && (
            <p className="notice" role="status">
              Your email app should have opened with the message ready — press send there. Nothing
              opened? Write to {contact.email} directly.
            </p>
          )}
          {status === 'error' && (
            <p className="notice notice-error" role="alert">
              Sorry, the message didn't go through.
              {canShowEmail ? (
                <>
                  {' '}
                  Please try again, or email <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                </>
              ) : (
                ' Please try again in a moment.'
              )}
            </p>
          )}
          {status === 'unconfigured' && (
            <p className="notice notice-error" role="alert">
              Contact isn't set up yet — add your form link or email in <code>src/data/site.js</code>.
            </p>
          )}
        </form>
      )}

      {canShowEmail && status !== 'sent' && (
        <p className="body-text direct">
          Or email me directly: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      )}
    </section>
  )
}