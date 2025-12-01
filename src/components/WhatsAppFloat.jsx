import { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaTimes } from 'react-icons/fa'
import { URLS } from '../data/companyInfo'

// Botão flutuante do WhatsApp - sempre visível para facilitar contato
const WhatsAppFloat = memo(function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isNearFooter, setIsNearFooter] = useState(false)

  // Detecta se está próximo do footer para ajustar posição
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer')
      if (!footer) return

      const footerRect = footer.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Se o footer estiver visível, move o botão para cima
      setIsNearFooter(footerRect.top < windowHeight - 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mostra tooltip após 3 segundos na primeira visita
  useEffect(() => {
    const hasSeenTooltip = sessionStorage.getItem('whatsapp-tooltip-seen')
    if (!hasSeenTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(true)
        sessionStorage.setItem('whatsapp-tooltip-seen', 'true')
        // Esconde tooltip após 5 segundos
        setTimeout(() => setShowTooltip(false), 5000)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div
      className={`fixed left-4 z-40 transition-all duration-300 ${
        isNearFooter ? 'bottom-24' : 'bottom-6'
      }`}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="absolute left-16 bottom-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-2"
          >
            <span className="font-medium">Fale conosco!</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="Fechar tooltip"
            >
              <FaTimes className="w-3 h-3" />
            </button>
            {/* Seta do tooltip */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão principal */}
      <motion.a
        href={URLS.whatsapp('Olá! Vim pelo site e gostaria de mais informações.')}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg shadow-green-500/30 transition-colors focus:outline-none focus:ring-4 focus:ring-green-500/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Conversar no WhatsApp"
        title="Fale conosco no WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <FaWhatsapp className="w-7 h-7 text-white" />

        {/* Animação de pulso */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></span>
      </motion.a>

      {/* Badge "Online" */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
        <span className="sr-only">Online</span>
      </div>
    </div>
  )
})

export default WhatsAppFloat
