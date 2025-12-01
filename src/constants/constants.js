// Constantes centralizadas do projeto

// Assets
export const ASSETS = {
  LOGO: '/logo loja.jpeg',
}

// Animações
export const ANIMATIONS = {
  BUTTON: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  },
  BUTTON_SECONDARY: {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  },
  CARD: {
    hover: { y: -4, scale: 1.02 },
    tap: { scale: 0.98 },
  },
  CAROUSEL_INTERVAL: 5000,
  DURATION: {
    fast: 0.3,
    normal: 0.5,
    slow: 1,
  },
}

// Formulário
export const FORM_LIMITS = {
  PHONE_MAX_LENGTH: 15,
  MESSAGE_MAX_LENGTH: 1000,
  TEXTAREA_ROWS: 5,
  SUBJECT_MAX_LENGTH: 100,
  NAME_MAX_LENGTH: 100,
}

// URLs externas
export const EXTERNAL_URLS = {
  GOOGLE_MAPS_BASE: 'https://maps.google.com/maps',
  GOOGLE_MAPS_SEARCH: 'https://www.google.com/maps/search/',
  // URL do site - usar variável de ambiente em produção ou fallback
  SITE_URL: typeof window !== 'undefined' ? window.location.origin : 'https://lttextil.com.br',
}

// SEO e Schema.org
export const SITE_INFO = {
  NAME: 'LT Textil',
  DESCRIPTION: 'Especializada em tecidos e malhas de qualidade em Goiânia',
  URL: EXTERNAL_URLS.SITE_URL,
  BUSINESS_ID: `${EXTERNAL_URLS.SITE_URL}/#business`,
  // Logo URL absoluta para Schema.org
  LOGO_URL:
    typeof window !== 'undefined'
      ? `${window.location.origin}${ASSETS.LOGO}`
      : `https://lttextil.com.br${ASSETS.LOGO}`,
}

// Viewport e breakpoints
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
}

// Z-index layers
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
}
