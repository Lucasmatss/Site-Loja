import { Link, useLocation } from 'react-router-dom'
import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ASSETS, ANIMATIONS } from '../constants/constants'

const Header = memo(function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/catalogo', label: 'Catálogo' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/contato', label: 'Contato' },
  ]

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Focus trap para menu mobile (WCAG 2.1.2)
  useEffect(() => {
    if (!isMenuOpen) return

    const menuElement = menuRef.current
    if (!menuElement) return

    const focusableElements = menuElement.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Foca no primeiro elemento ao abrir
    firstElement?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu()
        menuButtonRef.current?.focus()
        return
      }

      if (e.key !== 'Tab') return

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen, closeMenu])

  return (
    <motion.header
      className="bg-dark-secondary/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: ANIMATIONS.DURATION.slow }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo - lado esquerdo */}
          <Link to="/" className="flex items-center group">
            <motion.img
              src={ASSETS.LOGO}
              alt="LT Textil - Logo da loja de tecidos e malhas em Goiânia"
              className="h-16 w-16 object-cover rounded-full border-2 border-primary-cyan/30"
              whileHover={{ scale: 1.05, borderColor: 'rgba(0, 212, 255, 0.8)' }}
              transition={{ duration: ANIMATIONS.DURATION.fast }}
            />
          </Link>

          {/* Desktop Navigation - centralizado */}
          <nav className="hidden md:flex flex-1 justify-center space-x-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="relative">
                <motion.span
                  className={`block px-4 py-2 text-lg font-medium transition-colors ${
                    isActive(link.path) ? 'text-primary-cyan' : 'text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.span>
                {isActive(link.path) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-cyan to-primary-blue"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Espaço vazio para balancear o layout no desktop */}
          <div className="hidden md:block w-16"></div>

          {/* Mobile menu button */}
          <motion.button
            ref={menuButtonRef}
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:ring-offset-2 focus:ring-offset-dark rounded-lg p-1 relative z-50"
            whileTap={{ scale: 0.9 }}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <motion.div
              animate={isMenuOpen ? 'open' : 'closed'}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: -4 },
                  open: { rotate: 45, y: 0 },
                }}
                className="w-6 h-0.5 bg-current block transition-all origin-center"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="w-6 h-0.5 bg-current block mt-1.5 transition-all"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 4 },
                  open: { rotate: -45, y: -2 },
                }}
                className="w-6 h-0.5 bg-current block mt-1.5 transition-all origin-center"
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              ref={menuRef}
              id="mobile-menu"
              className="md:hidden py-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: ANIMATIONS.DURATION.fast }}
              aria-label="Menu de navegação mobile"
            >
              <div className="space-y-2" role="menu">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={closeMenu}
                      className={`block px-4 py-3 rounded-2xl transition-all ${
                        isActive(link.path)
                          ? 'bg-gradient-to-r from-primary-cyan/20 to-primary-blue/20 text-primary-cyan border-2 border-primary-cyan/30'
                          : 'text-gray-300 hover:bg-gray-800/50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
})

export default Header
