import { memo } from 'react'
import PropTypes from 'prop-types'
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { COMPANY_INFO, URLS } from '../data/companyInfo'

// Componentes atômicos reutilizáveis

const ContactItem = ({ icon: Icon, title, children, href, variant }) => {
  const variants = {
    default: 'flex items-start gap-4 p-4 bg-dark rounded-lg border border-gray-700',
    compact: 'flex items-start gap-4',
    footer: 'flex items-start gap-2',
    card: 'flex items-start gap-4 p-4 bg-dark rounded-lg border border-gray-700 hover:border-green-600 transition-colors',
  }

  const iconSizes = {
    default: 'w-8 h-8',
    compact: 'w-6 h-6',
    footer: 'w-5 h-5',
  }

  const Wrapper = href ? 'a' : 'div'
  const linkProps = href
    ? {
        href,
        target: href.startsWith('http') ? '_blank' : undefined,
        rel: href.startsWith('http') ? 'noopener noreferrer' : undefined,
      }
    : {}

  return (
    <Wrapper className={variants[variant]} {...linkProps}>
      <div
        className={`text-primary-cyan mt-1 flex-shrink-0 ${variant === 'card' ? 'text-green-500' : ''}`}
      >
        <Icon className={iconSizes[variant] || iconSizes.default} />
      </div>
      <div className="flex-1">
        {title && <h3 className="text-lg font-semibold mb-1 text-white">{title}</h3>}
        {children}
      </div>
    </Wrapper>
  )
}

// Componentes específicos para cada tipo de contato

export const WhatsAppContact = ({
  variant = 'default',
  showTitle = true,
  showDescription = false,
}) => (
  <ContactItem
    icon={FaWhatsapp}
    title={showTitle ? 'WhatsApp' : null}
    href={URLS.whatsapp()}
    variant={variant === 'default' ? 'card' : variant}
  >
    <p className="text-gray-400">{COMPANY_INFO.whatsapp.formatted}</p>
    {showDescription && <p className="text-sm text-gray-400 mt-1">Clique para conversar agora</p>}
  </ContactItem>
)

export const EmailContact = ({ variant = 'default', showTitle = true }) => (
  <ContactItem icon={FaEnvelope} title={showTitle ? 'E-mail' : null} variant={variant}>
    <a
      href={URLS.email}
      className="text-gray-400 hover:text-primary-cyan transition-colors break-all"
    >
      {COMPANY_INFO.email}
    </a>
  </ContactItem>
)

export const AddressContact = ({ variant = 'default', showTitle = true }) => (
  <ContactItem icon={FaMapMarkerAlt} title={showTitle ? 'Endereço' : null} variant={variant}>
    <p className="text-gray-400">
      {COMPANY_INFO.address.street} - {COMPANY_INFO.address.neighborhood}
      <br />
      {COMPANY_INFO.address.city} - {COMPANY_INFO.address.state}
    </p>
  </ContactItem>
)

// Componente principal com variantes predefinidas
function ContactInfo({ variant = 'default', className = '' }) {
  // Variante 'default' - Cards completos com hover
  if (variant === 'default') {
    return (
      <div className={`space-y-6 ${className}`}>
        <WhatsAppContact variant="default" showDescription />
        <EmailContact variant="default" />
        <AddressContact variant="default" />
      </div>
    )
  }

  // Variante 'compact' - Lista simples
  if (variant === 'compact') {
    return (
      <div className={`space-y-4 ${className}`}>
        <AddressContact variant="compact" />
        <WhatsAppContact variant="compact" />
        <EmailContact variant="compact" />
      </div>
    )
  }

  // Variante 'footer' - Lista minimalista
  if (variant === 'footer') {
    return (
      <ul className={`space-y-3 text-gray-400 text-sm ${className}`}>
        <li>
          <AddressContact variant="footer" showTitle={false} />
        </li>
        <li>
          <EmailContact variant="footer" showTitle={false} />
        </li>
        <li>
          <WhatsAppContact variant="footer" showTitle={false} />
        </li>
      </ul>
    )
  }

  return null
}

ContactItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'compact', 'footer', 'card']),
}

ContactItem.defaultProps = {
  title: null,
  href: null,
  variant: 'default',
}

WhatsAppContact.propTypes = {
  variant: PropTypes.oneOf(['default', 'compact', 'footer', 'card']),
  showTitle: PropTypes.bool,
  showDescription: PropTypes.bool,
}

WhatsAppContact.defaultProps = {
  variant: 'default',
  showTitle: true,
  showDescription: false,
}

EmailContact.propTypes = {
  variant: PropTypes.oneOf(['default', 'compact', 'footer', 'card']),
  showTitle: PropTypes.bool,
}

EmailContact.defaultProps = {
  variant: 'default',
  showTitle: true,
}

AddressContact.propTypes = {
  variant: PropTypes.oneOf(['default', 'compact', 'footer', 'card']),
  showTitle: PropTypes.bool,
}

AddressContact.defaultProps = {
  variant: 'default',
  showTitle: true,
}

ContactInfo.propTypes = {
  variant: PropTypes.oneOf(['default', 'compact', 'footer']),
  className: PropTypes.string,
}

ContactInfo.defaultProps = {
  variant: 'default',
  className: '',
}

export default memo(ContactInfo)
