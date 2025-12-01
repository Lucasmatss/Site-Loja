import { memo } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { COMPANY_INFO } from '../data/companyInfo'
import { ASSETS } from '../constants/constants'

// Componente para gerenciar SEO e meta tags dinâmicas
const SEO = memo(function SEO({ title, description, keywords, image, url, type }) {
  const siteTitle = COMPANY_INFO.name
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const siteUrl = url || window.location.href
  // URL canônica (remove query params e hash)
  const canonicalUrl = siteUrl.split('?')[0].split('#')[0]
  const imageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`

  return (
    <Helmet>
      {/* Favicon */}
      <link rel="icon" type="image/jpeg" href={ASSETS.LOGO} />
      <link rel="apple-touch-icon" href={ASSETS.LOGO} />

      {/* Canonical URL (previne conteúdo duplicado) */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* WhatsApp specific */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Business Info */}
      <meta name="author" content={COMPANY_INFO.name} />
      <meta name="contact" content={COMPANY_INFO.email} />
      <meta name="geo.region" content="BR-GO" />
      <meta name="geo.placename" content={COMPANY_INFO.address.city} />
    </Helmet>
  )
})

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
}

SEO.defaultProps = {
  title: '',
  keywords: '',
  image: ASSETS.LOGO,
  url: '',
  type: 'website',
}

export default SEO
