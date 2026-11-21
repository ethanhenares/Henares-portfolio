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
    <div className="relative isolate min-h-svh">
      <Backdrop />
      <Header />
      <main
        key={pathname}
        className="animate-rise px-5 motion-reduce:animate-none md:min-h-svh md:px-10"
      >
        <Outlet />
      </main>
      <Footer />
      <Intro />
    </div>
  )
}