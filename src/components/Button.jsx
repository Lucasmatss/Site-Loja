import { memo } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { URLS } from '../data/companyInfo'
import { ANIMATIONS } from '../constants/constants'

// Botão Primário - Ações principais
export const ButtonPrimary = memo(function ButtonPrimary({
  children,
  to,
  href,
  onClick,
  className,
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full transition-all text-base'

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      whileHover={ANIMATIONS.BUTTON.hover}
      whileTap={ANIMATIONS.BUTTON.tap}
    >
      {children}
    </motion.button>
  )
})

ButtonPrimary.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

ButtonPrimary.defaultProps = {
  className: '',
  to: null,
  href: null,
  onClick: null,
}

// Botão WhatsApp
export const ButtonWhatsApp = memo(function ButtonWhatsApp({ children, message, className }) {
  const url = URLS.whatsapp(message)

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full transition-all text-base ${className}`}
      whileHover={ANIMATIONS.BUTTON.hover}
      whileTap={ANIMATIONS.BUTTON.tap}
    >
      <FaWhatsapp className="w-5 h-5" />
      {children}
    </motion.a>
  )
})

ButtonWhatsApp.propTypes = {
  children: PropTypes.node.isRequired,
  message: PropTypes.string,
  className: PropTypes.string,
}

ButtonWhatsApp.defaultProps = {
  message: '',
  className: '',
}

// Botão Secundário - Ações alternativas
export const ButtonSecondary = memo(function ButtonSecondary({
  children,
  to,
  href,
  onClick,
  className,
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 bg-dark hover:bg-dark-secondary text-white border-2 border-primary-cyan hover:border-primary-blue font-semibold px-8 py-4 rounded-full transition-all text-base'

  if (to) {
    return (
      <motion.div
        whileHover={ANIMATIONS.BUTTON.hover}
        whileTap={ANIMATIONS.BUTTON.tap}
        className="inline-block"
      >
        <Link to={to} className={`${baseClasses} ${className}`}>
          {children}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
        whileHover={ANIMATIONS.BUTTON.hover}
        whileTap={ANIMATIONS.BUTTON.tap}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      whileHover={ANIMATIONS.BUTTON.hover}
      whileTap={ANIMATIONS.BUTTON.tap}
    >
      {children}
    </motion.button>
  )
})

ButtonSecondary.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

ButtonSecondary.defaultProps = {
  className: '',
  to: null,
  href: null,
  onClick: null,
}

// Botão Outline - Ações sutis
export const ButtonOutline = memo(function ButtonOutline({ children, onClick, className }) {
  return (
    <motion.button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 bg-transparent border-2 border-gray-700 hover:border-primary-cyan text-gray-300 hover:text-primary-cyan font-semibold px-6 py-3 rounded-full transition-all text-sm ${className}`}
      whileHover={ANIMATIONS.BUTTON.hover}
      whileTap={ANIMATIONS.BUTTON.tap}
    >
      {children}
    </motion.button>
  )
})

ButtonOutline.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

ButtonOutline.defaultProps = {
  onClick: null,
  className: '',
}
