import { memo, useRef } from 'react'
import PropTypes from 'prop-types'
import { motion, useInView } from 'framer-motion'

// Componente unificado que substitui AnimatedSection e FloatingCard
// Reduz duplicação de código e centraliza lógica de animação

function Animated({ children, className, delay, variant, once, amount }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  // Configurações de animação por variante
  const variants = {
    section: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
    },
    card: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] },
      hover: { y: -10, transition: { duration: 0.3 } },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2, delay },
    },
  }

  const config = variants[variant]

  return (
    <motion.div
      ref={ref}
      initial={config.initial}
      animate={isInView ? config.animate : config.initial}
      whileHover={config.hover}
      transition={config.transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

Animated.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  variant: PropTypes.oneOf(['section', 'card', 'fade']),
  once: PropTypes.bool,
  amount: PropTypes.number,
}

Animated.defaultProps = {
  className: '',
  delay: 0,
  variant: 'section',
  once: true,
  amount: 0.3,
}

export default memo(Animated)

// Exports com nomes descritivos para facilitar migração
export const AnimatedSection = (props) => <Animated {...props} variant="section" />
export const AnimatedCard = (props) => <Animated {...props} variant="card" />
export const AnimatedFade = (props) => <Animated {...props} variant="fade" />
