import { memo, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { COMPANY_INFO } from '../data/companyInfo'
import { EXTERNAL_URLS } from '../constants/constants'

// Componente Google Maps OTIMIZADO para melhor performance
// Usa Intersection Observer para lazy loading do iframe
const GoogleMap = memo(function GoogleMap({ className }) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  // Lazy load: só carrega o mapa quando visível na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' } // Carrega 100px antes de entrar na viewport
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Verifica se tem coordenadas GPS (mais rápido)
  const hasCoordinates = COMPANY_INFO.coordinates?.lat && COMPANY_INFO.coordinates?.lng

  let mapUrl

  if (hasCoordinates) {
    // MODO RÁPIDO: Usa coordenadas GPS diretas (100-200ms)
    const { lat, lng } = COMPANY_INFO.coordinates
    mapUrl = `${EXTERNAL_URLS.GOOGLE_MAPS_BASE}?q=${lat},${lng}&t=&z=17&ie=UTF8&iwloc=&output=embed`
  } else {
    // MODO COMPATÍVEL: Usa endereço (500-800ms)
    const address = encodeURIComponent(COMPANY_INFO.address.full)
    mapUrl = `${EXTERNAL_URLS.GOOGLE_MAPS_BASE}?q=${address}&t=&z=17&ie=UTF8&iwloc=&output=embed`
  }

  // URL para abrir no app Google Maps
  const openMapUrl = hasCoordinates
    ? `${EXTERNAL_URLS.GOOGLE_MAPS_SEARCH}?api=1&query=${COMPANY_INFO.coordinates.lat},${COMPANY_INFO.coordinates.lng}`
    : `${EXTERNAL_URLS.GOOGLE_MAPS_SEARCH}?api=1&query=${encodeURIComponent(COMPANY_INFO.address.full)}`

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {/* Preconnect movido para index.html para melhor performance */}

      {isVisible ? (
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '300px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Localização ${COMPANY_INFO.name}`}
          className="rounded-lg"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      ) : (
        // Placeholder enquanto o mapa não carrega (reduz CLS)
        <div
          className="w-full h-full min-h-[300px] bg-dark-secondary rounded-lg flex items-center justify-center"
          aria-label="Carregando mapa..."
        >
          <div className="text-center text-gray-400">
            <div className="w-8 h-8 border-2 border-primary-cyan border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <span className="text-sm">Carregando mapa...</span>
          </div>
        </div>
      )}

      {/* Overlay com gradiente para melhor visual */}
      <div className="absolute inset-0 pointer-events-none rounded-lg border-2 border-gray-800/50"></div>

      {/* Botão para abrir no Google Maps */}
      <a
        href={openMapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2.5 rounded-lg shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all text-sm font-semibold flex items-center gap-2 group"
      >
        <span className="text-lg">📍</span>
        <span className="hidden sm:inline">Ver no Google Maps</span>
        <span className="sm:hidden">Ver mapa</span>
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  )
})

GoogleMap.propTypes = {
  className: PropTypes.string,
}

GoogleMap.defaultProps = {
  className: '',
}

export default GoogleMap
