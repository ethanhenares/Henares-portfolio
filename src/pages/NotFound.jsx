import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page page-right">
      <h1 className="page-title">404</h1>
      <p className="body-text">That page doesn't exist.</p>
      <Link to="/" className="btn">
        Back to home
      </Link>
    </section>
  )
}