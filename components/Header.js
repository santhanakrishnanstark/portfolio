import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HiMenu, HiX } from 'react-icons/hi'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href) => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="container-max section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gradient">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-600 ${
                  isActive(item.href)
                    ? 'text-primary-600'
                    : scrolled
                    ? 'text-gray-700'
                    : 'text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Resume Download */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <HiX className="h-6 w-6" aria-hidden="true" />
            ) : (
              <HiMenu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-medium transition-colors duration-200 hover:text-primary-600 ${
                    isActive(item.href) ? 'text-primary-600' : 'text-gray-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm w-fit"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download Resume
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}