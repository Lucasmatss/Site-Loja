import { memo } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { ANIMATIONS } from '../constants/constants'

// Componente Card reutilizável para reduzir duplicação de código
// Suporta diferentes variantes e pode ser usado em todo o site

export const Card = memo(function Card({
  children,
  variant,
  padding,
  className,
  animated,
  animationDelay,
}) {
  // Variantes de estilo
  const variants = {
    default: 'bg-dark-secondary border border-gray-800',
    hover:
      'bg-dark-secondary border border-gray-800 hover:border-primary-cyan transition-colors duration-300',
    gradient: 'bg-gradient-to-r from-primary-cyan to-primary-blue border-0',
    bordered: 'bg-dark border-2 border-gray-700',
  }

  // Tamanhos de padding
  const paddings = {
    small: 'p-4',
    normal: 'p-8',
    large: 'p-12',
  }

  const cardClasses = `rounded-lg ${variants[variant]} ${paddings[padding]} ${className}`

  // Se animated=true, retorna com animação
  if (animated) {
    return (
      <motion.div
        className={cardClasses}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: ANIMATIONS.DURATION.slow, delay: animationDelay }}
      >
        {children}
      </motion.div>
    )
  }

  // Caso contrário, retorna card simples
  return <div className={cardClasses}>{children}</div>
})

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'hover', 'gradient', 'bordered']),
  padding: PropTypes.oneOf(['small', 'normal', 'large']),
  className: PropTypes.string,
  animated: PropTypes.bool,
  animationDelay: PropTypes.number,
}

Card.defaultProps = {
  variant: 'default',
  padding: 'normal',
  className: '',
  animated: false,
  animationDelay: 0,
}

// Variante de Card com hover effect de elevação
export const CardFloating = memo(function CardFloating({
  children,
  variant,
  padding,
  className,
  delay,
}) {
  const variants = {
    default: 'bg-dark-secondary border border-gray-800',
    hover:
      'bg-dark-secondary border border-gray-800 hover:border-primary-cyan transition-colors duration-300',
  }

  const paddings = {
    small: 'p-4',
    normal: 'p-8',
    large: 'p-12',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: ANIMATIONS.DURATION.slow, delay }}
      whileHover={{ y: -10, transition: { duration: ANIMATIONS.DURATION.fast } }}
      className={`rounded-lg ${variants[variant]} ${paddings[padding]} ${className}`}
    >
      {children}
    </motion.div>
  )
})

CardFloating.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'hover']),
  padding: PropTypes.oneOf(['small', 'normal', 'large']),
  className: PropTypes.string,
  delay: PropTypes.number,
}

CardFloating.defaultProps = {
  variant: 'default',
  padding: 'normal',
  className: '',
  delay: 0,
}
