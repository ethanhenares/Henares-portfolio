import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Backdrop from './Backdrop.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Intro from './Intro.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="shell">
      <Backdrop />
      <Header />
      <main className="main" key={pathname}>
        <Outlet />
      </main>
      <Footer />
      <Intro />
    </div>
  )
}