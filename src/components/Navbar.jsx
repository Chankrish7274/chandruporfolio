import { useState, useEffect } from 'react'

const navItems = [
  { label: 'Origin', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="nav-logo">CHANDRU.P</a>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {navItems.map(item => (
          <li key={item.href}>
            <a href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          </li>
        ))}
      </ul>
      <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </nav>
  )
}
