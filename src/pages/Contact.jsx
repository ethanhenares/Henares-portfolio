import { useState } from 'react'
import BodyText from '../components/BodyText.jsx'
import Button from '../components/Button.jsx'
import Field from '../components/Field.jsx'
import Notice from '../components/Notice.jsx'
import Page from '../components/Page.jsx'
import PageTitle from '../components/PageTitle.jsx'
import { contact } from '../data/site.js'

const EMAIL_IS_PLACEHOLDER = contact.email.includes('example.com')

export default function Contact() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('_gotcha')) return 

    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')

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
    <Page>
      <PageTitle>Contact</PageTitle>
      <BodyText>Want to work together or just say hi? Send me a message.</BodyText>

      {status === 'sent' ? (
        <Notice role="status">Thank you — your message was sent. I'll get back to you soon.</Notice>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 grid gap-[1.1rem]">
          <Field label="Name" type="text" name="name" required autoComplete="name" />
          <Field label="Email" type="email" name="email" required autoComplete="email" />
          <Field label="Message" as="textarea" name="message" rows="5" required />

          {/* hidden trap for spam bots; real people never see or fill it */}
          <input
            type="text"
            name="_gotcha"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] size-px opacity-0"
          />

          <Button type="submit" disabled={status === 'sending'} className="justify-self-start">
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </Button>

          {status === 'opened' && (
            <Notice role="status">
              Your email app should have opened with the message ready — press send there. Nothing
              opened? Write to {contact.email} directly.
            </Notice>
          )}
          {status === 'error' && (
            <Notice tone="error" role="alert">
              Sorry, the message didn't go through.
              {canShowEmail ? (
                <>
                  {' '}
                  Please try again, or email <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                </>
              ) : (
                ' Please try again in a moment.'
              )}
            </Notice>
          )}
          {status === 'unconfigured' && (
            <Notice tone="error" role="alert">
              Contact isn't set up yet — add your form link or email in <code>src/data/site.js</code>.
            </Notice>
          )}
        </form>
      )}

      {canShowEmail && status !== 'sent' && (
        <BodyText className="mt-[1.1rem] [&_a]:underline [&_a]:underline-offset-4">
          Or email me directly: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </BodyText>
      )}
    </Page>
  )
}