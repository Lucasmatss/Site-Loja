import { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa'

// Componente Toast para notificações
const Toast = memo(function Toast({
  message,
  type = 'success',
  isVisible,
  onClose,
  duration = 5000,
}) {
  // Auto-fechar após duration
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const types = {
    success: {
      icon: FaCheckCircle,
      bg: 'bg-green-600',
      border: 'border-green-500',
    },
    error: {
      icon: FaExclamationCircle,
      bg: 'bg-red-600',
      border: 'border-red-500',
    },
    info: {
      icon: FaInfoCircle,
      bg: 'bg-primary-cyan',
      border: 'border-primary-cyan',
    },
  }

  const { icon: Icon, bg, border } = types[type] || types.success

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-24 right-4 z-50 max-w-sm"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          role="alert"
          aria-live="polite"
        >
          <div
            className={`${bg} ${border} border-2 rounded-xl shadow-2xl p-4 flex items-start gap-3`}
          >
            <Icon className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-white font-medium">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Fechar notificação"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info']),
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
}

export default Toast
