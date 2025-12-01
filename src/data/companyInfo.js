// Informações centralizadas da empresa
export const COMPANY_INFO = {
  name: 'LT Textil',
  fullName: 'Matos e Oliveira Comércio de Tecidos',
  cnpj: '11.267.322/0001-18',
  phone: '5562982517417',
  phoneFormatted: '(62) 98251-7417',
  email: 'Matoseoliveiratextil@hotmail.com',

  address: {
    street: 'Rua M, N°40',
    neighborhood: 'Setor Centro Oeste',
    city: 'Goiânia',
    state: 'GO',
    full: 'Rua M, N°40 - Setor Centro Oeste - Goiânia/GO',
  },

  // Coordenadas GPS exatas da loja (para melhor performance do mapa)
  coordinates: {
    lat: -16.66283574769984,
    lng: -49.27716239736883,
  },

  whatsapp: {
    number: '5562982517417',
    formatted: '(62) 98251-7417',
    url: 'https://wa.me/5562982517417',
  },

  social: {
    // Adicionar futuramente se necessário
    instagram: '',
    facebook: '',
  },

  hours: {
    weekdays: '8h às 18h',
    saturday: '8h às 12h',
    sunday: 'Fechado',
  },
}

// URLs úteis
export const URLS = {
  whatsapp: (message = '') =>
    message
      ? `https://wa.me/${COMPANY_INFO.whatsapp.number}?text=${encodeURIComponent(message)}`
      : COMPANY_INFO.whatsapp.url,
  email: `mailto:${COMPANY_INFO.email}`,
  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address.full)}`,
}
