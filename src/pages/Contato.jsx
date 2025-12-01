import { useState, useCallback } from 'react'
import { AnimatedFade } from '../components/Animated'
import ContactInfo from '../components/ContactInfo'
import { Card } from '../components/Card'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import Toast from '../components/Toast'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { COMPANY_INFO, URLS } from '../data/companyInfo'
import { validators, formatTelefone, sanitizeInput } from '../utils/validation'
import { FORM_LIMITS } from '../constants/constants'

function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' })

  const showToast = useCallback((message, type = 'success') => {
    setToast({ isVisible: true, message, type })
  }, [])

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target

    // Formatação especial para telefone
    const formattedValue = name === 'telefone' ? formatTelefone(value) : sanitizeInput(value)

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))

    // Validar em tempo real se o campo já foi tocado
    setTouched((prevTouched) => {
      if (prevTouched[name]) {
        const error = validators[name]?.(formattedValue)
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error,
        }))
      }
      return prevTouched
    })
  }, [])

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    // Validar ao sair do campo
    const error = validators[name]?.(value)
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }, [])

  const validateForm = () => {
    const newErrors = {}

    Object.keys(formData).forEach((field) => {
      const error = validators[field]?.(formData[field])
      if (error) newErrors[field] = error
    })

    setErrors(newErrors)
    setTouched({
      nome: true,
      email: true,
      telefone: true,
      assunto: true,
      mensagem: true,
    })

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar todo o formulário
    if (!validateForm()) {
      // Scroll para o primeiro erro
      const firstError = Object.keys(errors)[0]
      document.getElementById(firstError)?.focus()
      return
    }

    setIsSubmitting(true)

    try {
      // Simular delay para mostrar loading
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Criar mensagem para WhatsApp
      const mensagemWhatsApp = `
*Nova mensagem do site ${COMPANY_INFO.name}*

*Nome:* ${formData.nome}
*E-mail:* ${formData.email}
*Telefone:* ${formData.telefone}
*Assunto:* ${formData.assunto}

*Mensagem:*
${formData.mensagem}
      `.trim()

      const whatsappUrl = URLS.whatsapp(mensagemWhatsApp)
      window.open(whatsappUrl, '_blank')

      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: '',
      })
      setErrors({})
      setTouched({})

      // Mostrar toast de sucesso
      showToast('Mensagem enviada! Você será redirecionado para o WhatsApp.', 'success')
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao enviar:', error)
      }
      showToast('Erro ao processar. Tente novamente.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark py-12">
      {/* Toast de notificação */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <SEO
        title="Contato"
        description={`Entre em contato com a ${COMPANY_INFO.name}. WhatsApp: ${COMPANY_INFO.whatsapp.formatted}. Endereço: ${COMPANY_INFO.address.full}. Atendimento de seg-sex ${COMPANY_INFO.hours.weekdays}.`}
        keywords="contato lt textil, whatsapp tecidos goiânia, telefone loja tecidos, endereço lt textil"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6" />

        {/* Header */}
        <AnimatedFade className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
            Entre em Contato
          </h1>
          <p className="text-gray-400 text-lg">Estamos prontos para atender você!</p>
        </AnimatedFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <AnimatedFade>
            <Card variant="default">
              <h2 className="text-2xl font-bold mb-6 text-primary-cyan">Envie sua Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-2 text-gray-300">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-dark border-2 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.nome && touched.nome
                          ? 'border-red-500 focus:border-red-500'
                          : touched.nome && !errors.nome
                            ? 'border-green-500 focus:border-green-500'
                            : 'border-gray-700 focus:border-primary-cyan'
                      }`}
                      placeholder="João da Silva"
                    />
                    {touched.nome && !errors.nome && (
                      <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                    )}
                  </div>
                  {errors.nome && touched.nome && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <FaExclamationCircle /> {errors.nome}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                    E-mail *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-dark border-2 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.email && touched.email
                          ? 'border-red-500 focus:border-red-500'
                          : touched.email && !errors.email
                            ? 'border-green-500 focus:border-green-500'
                            : 'border-gray-700 focus:border-primary-cyan'
                      }`}
                      placeholder="seu@email.com"
                    />
                    {touched.email && !errors.email && (
                      <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                    )}
                  </div>
                  {errors.email && touched.email && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <FaExclamationCircle /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    Telefone/WhatsApp *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      required
                      value={formData.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-dark border-2 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.telefone && touched.telefone
                          ? 'border-red-500 focus:border-red-500'
                          : touched.telefone && !errors.telefone
                            ? 'border-green-500 focus:border-green-500'
                            : 'border-gray-700 focus:border-primary-cyan'
                      }`}
                      placeholder="(62) 98251-7417"
                      maxLength={FORM_LIMITS.PHONE_MAX_LENGTH}
                    />
                    {touched.telefone && !errors.telefone && (
                      <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                    )}
                  </div>
                  {errors.telefone && touched.telefone && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <FaExclamationCircle /> {errors.telefone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium mb-2 text-gray-300">
                    Assunto *
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    required
                    value={formData.assunto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 bg-dark border-2 rounded-lg text-white focus:outline-none transition-colors ${
                      errors.assunto && touched.assunto
                        ? 'border-red-500 focus:border-red-500'
                        : touched.assunto && !errors.assunto
                          ? 'border-green-500 focus:border-green-500'
                          : 'border-gray-700 focus:border-primary-cyan'
                    }`}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="Orçamento">Orçamento</option>
                    <option value="Dúvidas sobre produtos">Dúvidas sobre produtos</option>
                    <option value="Parceria comercial">Parceria comercial</option>
                    <option value="Outros">Outros</option>
                  </select>
                  {errors.assunto && touched.assunto && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <FaExclamationCircle /> {errors.assunto}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="mensagem"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    Mensagem *{' '}
                    <span className="text-gray-400 text-xs">
                      ({formData.mensagem.length}/{FORM_LIMITS.MESSAGE_MAX_LENGTH})
                    </span>
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={FORM_LIMITS.TEXTAREA_ROWS}
                    value={formData.mensagem}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={FORM_LIMITS.MESSAGE_MAX_LENGTH}
                    className={`w-full px-4 py-3 bg-dark border-2 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors resize-none ${
                      errors.mensagem && touched.mensagem
                        ? 'border-red-500 focus:border-red-500'
                        : touched.mensagem && !errors.mensagem
                          ? 'border-green-500 focus:border-green-500'
                          : 'border-gray-700 focus:border-primary-cyan'
                    }`}
                    placeholder="Descreva sua necessidade..."
                  ></textarea>
                  {errors.mensagem && touched.mensagem && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <FaExclamationCircle /> {errors.mensagem}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-full transition-all flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FaWhatsapp className="w-5 h-5" />
                      Enviar via WhatsApp
                    </>
                  )}
                </motion.button>

                <p className="text-sm text-gray-400 text-center">* Campos obrigatórios</p>
              </form>
            </Card>
          </AnimatedFade>

          {/* Informações de Contato */}
          <AnimatedFade>
            <div className="space-y-6">
              {/* Contato Direto */}
              <Card variant="default">
                <h2 className="text-2xl font-bold mb-6 text-primary-cyan">
                  Fale Diretamente Conosco
                </h2>
                <ContactInfo variant="default" />
              </Card>

              {/* Horário de Atendimento */}
              <Card variant="default">
                <h2 className="text-2xl font-bold mb-6 text-primary-cyan">
                  Horário de Atendimento
                </h2>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                    <span>Segunda a Sexta</span>
                    <span className="font-semibold text-white">{COMPANY_INFO.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                    <span>Sábado</span>
                    <span className="font-semibold text-white">{COMPANY_INFO.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Domingo</span>
                    <span className="font-semibold text-red-400">{COMPANY_INFO.hours.sunday}</span>
                  </div>
                </div>
              </Card>
            </div>
          </AnimatedFade>
        </div>
      </div>
    </div>
  )
}

export default Contato
