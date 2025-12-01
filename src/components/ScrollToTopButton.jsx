import { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'

// Botão flutuante para voltar ao topo da página
const ScrollToTopButton = memo(function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Mostrar botão quando scroll passar de 400px
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-primary-cyan hover:bg-primary-blue text-dark p-3 rounded-full shadow-lg shadow-primary-cyan/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-dark"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Voltar ao topo da página"
          title="Voltar ao topo"
        >
          <FaArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
})

export default ScrollToTopButton
