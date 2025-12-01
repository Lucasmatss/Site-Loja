// Utilitários de validação para formulários

export const validators = {
  // Validar nome completo (pelo menos 2 partes)
  nomeCompleto: (value) => {
    const trimmed = value.trim()
    if (!trimmed) return 'Nome é obrigatório'
    if (trimmed.length < 3) return 'Nome muito curto'
    if (!/^[a-záàâãéèêíïóôõöúçñ\s]+$/i.test(trimmed)) {
      return 'Nome deve conter apenas letras'
    }
    const parts = trimmed.split(' ').filter((p) => p.length > 0)
    if (parts.length < 2) return 'Digite seu nome completo'
    return null
  },

  // Validar e-mail
  email: (value) => {
    const trimmed = value.trim()
    if (!trimmed) return 'E-mail é obrigatório'

    // Regex mais robusto para e-mail
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(trimmed)) {
      return 'E-mail inválido'
    }

    // Verificar domínios comuns mal digitados
    const commonTypos = {
      'gmail.com': ['gmal.com', 'gmial.com', 'gmail.con'],
      'hotmail.com': ['hotmal.com', 'hotmail.con'],
      'outlook.com': ['outlook.con', 'outlok.com'],
    }

    const domain = trimmed.split('@')[1]?.toLowerCase()
    for (const [correct, typos] of Object.entries(commonTypos)) {
      if (typos.includes(domain)) {
        return `Você quis dizer @${correct}?`
      }
    }

    return null
  },

  // Validar telefone brasileiro
  telefone: (value) => {
    const trimmed = value.trim()
    if (!trimmed) return 'Telefone é obrigatório'

    // Remove caracteres não numéricos
    const numbers = trimmed.replace(/\D/g, '')

    // Telefone brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    if (numbers.length < 10 || numbers.length > 11) {
      return 'Telefone inválido (use DDD + número)'
    }

    // Validar DDD
    const ddd = parseInt(numbers.substring(0, 2))
    const validDDDs = [
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19, // SP
      21,
      22,
      24, // RJ
      27,
      28, // ES
      31,
      32,
      33,
      34,
      35,
      37,
      38, // MG
      41,
      42,
      43,
      44,
      45,
      46, // PR
      47,
      48,
      49, // SC
      51,
      53,
      54,
      55, // RS
      61, // DF
      62,
      64, // GO
      63, // TO
      65,
      66, // MT
      67, // MS
      68, // AC
      69, // RO
      71,
      73,
      74,
      75,
      77, // BA
      79, // SE
      81,
      87, // PE
      82, // AL
      83, // PB
      84, // RN
      85,
      88, // CE
      86,
      89, // PI
      91,
      93,
      94, // PA
      92,
      97, // AM
      95, // RR
      96, // AP
      98,
      99, // MA
    ]

    if (!validDDDs.includes(ddd)) {
      return 'DDD inválido'
    }

    return null
  },

  // Validar assunto
  assunto: (value) => {
    if (!value || value === '') return 'Selecione um assunto'
    return null
  },

  // Validar mensagem
  mensagem: (value) => {
    const trimmed = value.trim()
    if (!trimmed) return 'Mensagem é obrigatória'
    if (trimmed.length < 10) return 'Mensagem muito curta (mínimo 10 caracteres)'
    if (trimmed.length > 1000) return 'Mensagem muito longa (máximo 1000 caracteres)'
    return null
  },
}

// Formatar telefone brasileiro
export const formatTelefone = (value) => {
  const numbers = value.replace(/\D/g, '')

  if (numbers.length === 0) return ''
  if (numbers.length <= 2) return `(${numbers}`
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
  }
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

// Sanitizar entrada (remover caracteres perigosos)
export const sanitizeInput = (value) => {
  return value
    .replace(/[<>]/g, '') // Remove < e >
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}
