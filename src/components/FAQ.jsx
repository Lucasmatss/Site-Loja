import { memo, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'
import { COMPANY_INFO } from '../data/companyInfo'

// Perguntas frequentes da loja
const faqData = [
  {
    question: 'Vocês vendem no atacado e varejo?',
    answer: `Sim! Atendemos tanto clientes finais quanto confecções e revendedores. Temos condições especiais para compras em quantidade.`,
  },
  {
    question: 'Quais tipos de tecidos vocês trabalham?',
    answer:
      'Trabalhamos com uma grande variedade: malhas (cotton, viscolycra, ribana), tecidos planos (tricoline, oxford, sarja), estampados, lisos e muito mais.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer:
      'Aceitamos dinheiro, PIX, cartões de débito e crédito. Para compras no atacado, consulte condições especiais de pagamento.',
  },
  {
    question: 'Vocês fazem entrega?',
    answer: `Sim, fazemos entregas para Goiânia e região. Entre em contato pelo WhatsApp para consultar disponibilidade e valores de frete para sua localidade.`,
  },
  {
    question: 'Qual o horário de funcionamento?',
    answer: `Segunda a sexta: ${COMPANY_INFO.hours.weekdays}. Sábado: ${COMPANY_INFO.hours.saturday}. Domingo: ${COMPANY_INFO.hours.sunday}.`,
  },
  {
    question: 'Onde a loja está localizada?',
    answer: `Estamos localizados na ${COMPANY_INFO.address.full}. Fácil acesso e estacionamento na região.`,
  },
  {
    question: 'Posso ver os tecidos antes de comprar?',
    answer:
      'Claro! Nossa loja física está aberta para você conhecer todos os nossos produtos, sentir a textura e qualidade dos tecidos antes de decidir.',
  },
  {
    question: 'Vocês cortam na medida que eu precisar?',
    answer:
      'Sim, cortamos os tecidos na metragem que você precisar. Temos flexibilidade para atender desde pequenas quantidades até grandes pedidos.',
  },
]

// Schema.org FAQPage para SEO
function FAQSchema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  )
}

// Item individual do FAQ sem animação
const FAQItem = memo(function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-700/50 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 px-4 flex items-center justify-between text-left hover:bg-gray-800/30 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-cyan/50"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-white pr-4">{question}</span>
        <span
          className={`text-primary-cyan flex-shrink-0 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <FaChevronDown className="w-5 h-5" />
        </span>
      </button>

      {isOpen && <div className="px-4 pb-5 text-gray-400 leading-relaxed">{answer}</div>}
    </div>
  )
})

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

// Componente principal FAQ
const FAQ = memo(function FAQ({ showTitle = true, maxItems = null }) {
  const [openIndex, setOpenIndex] = useState(null)

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const displayedFaqs = maxItems ? faqData.slice(0, maxItems) : faqData

  return (
    <section className="py-12" aria-labelledby="faq-title">
      <FAQSchema />

      {showTitle && (
        <div className="text-center mb-10">
          <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-gradient-primary mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos produtos e serviços
          </p>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-dark-secondary/50 rounded-2xl border border-gray-800/50 overflow-hidden">
        {displayedFaqs.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  )
})

FAQ.propTypes = {
  showTitle: PropTypes.bool,
  maxItems: PropTypes.number,
}

export default FAQ
