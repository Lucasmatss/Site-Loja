import { memo } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { FaChevronRight, FaHome } from 'react-icons/fa'
import { BreadcrumbSchema } from './StructuredData'
import { EXTERNAL_URLS } from '../constants/constants'

// Mapeamento de rotas para nomes amigáveis
const ROUTE_NAMES = {
  '/': 'Início',
  '/catalogo': 'Catálogo',
  '/sobre': 'Sobre',
  '/contato': 'Contato',
}

const Breadcrumbs = memo(function Breadcrumbs({ className = '' }) {
  const location = useLocation()
  const pathname = location.pathname

  // Não mostrar breadcrumbs na home
  if (pathname === '/') return null

  // Construir array de breadcrumbs
  const breadcrumbs = [
    { name: 'Início', path: '/' },
    { name: ROUTE_NAMES[pathname] || pathname.slice(1), path: pathname },
  ]

  // Schema.org items para SEO
  const schemaItems = breadcrumbs.map((item) => ({
    name: item.name,
    url: `${EXTERNAL_URLS.SITE_URL}${item.path}`,
  }))

  return (
    <>
      {/* Schema.org Breadcrumb */}
      <BreadcrumbSchema items={schemaItems} />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-sm text-gray-400 ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1

            return (
              <li key={crumb.path} className="flex items-center">
                {index > 0 && (
                  <FaChevronRight className="w-3 h-3 mx-2 text-gray-600" aria-hidden="true" />
                )}

                {isLast ? (
                  <span className="text-primary-cyan font-medium" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="hover:text-primary-cyan transition-colors flex items-center gap-1"
                  >
                    {index === 0 && <FaHome className="w-3 h-3" aria-hidden="true" />}
                    {crumb.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
})

Breadcrumbs.propTypes = {
  className: PropTypes.string,
}

Breadcrumbs.defaultProps = {
  className: '',
}

export default Breadcrumbs
