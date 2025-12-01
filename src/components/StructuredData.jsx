import { memo } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { COMPANY_INFO } from '../data/companyInfo'
import { SITE_INFO } from '../constants/constants'

// Componente para adicionar dados estruturados (Schema.org)
// Melhora SEO e permite Rich Snippets no Google

export const LocalBusinessSchema = memo(function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE_INFO.BUSINESS_ID,
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.fullName,
    description:
      'Empresa especializada em comércio de tecidos e malhas em Goiânia. Oferecemos malhas, tecidos planos e estampados de alta qualidade.',
    image: SITE_INFO.LOGO_URL,
    telephone: `+${COMPANY_INFO.phone}`,
    email: COMPANY_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.state,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: String(COMPANY_INFO.coordinates.lat),
      longitude: String(COMPANY_INFO.coordinates.lng),
    },
    url: SITE_INFO.URL,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '12:00',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: String(COMPANY_INFO.coordinates.lat),
        longitude: String(COMPANY_INFO.coordinates.lng),
      },
      geoRadius: '50000', // 50km
    },
    sameAs: [
      // Adicionar redes sociais quando disponível
      // "https://www.facebook.com/lttextil",
      // "https://www.instagram.com/lttextil"
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
})

export const BreadcrumbSchema = memo(function BreadcrumbSchema({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
})

BreadcrumbSchema.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export const ProductSchema = memo(function ProductSchema({ product }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nome,
    description: `${product.nome} - ${product.cor}. Composição: ${product.composicao}`,
    category: product.categoria,
    brand: {
      '@type': 'Brand',
      name: COMPANY_INFO.name,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'BRL',
      seller: {
        '@type': 'Organization',
        name: COMPANY_INFO.name,
      },
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
})

ProductSchema.propTypes = {
  product: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    cor: PropTypes.string.isRequired,
    composicao: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
  }).isRequired,
}

export const OrganizationSchema = memo(function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.fullName,
    url: SITE_INFO.URL,
    logo: SITE_INFO.LOGO_URL,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${COMPANY_INFO.phone}`,
      contactType: 'customer service',
      email: COMPANY_INFO.email,
      availableLanguage: ['Portuguese'],
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
})
