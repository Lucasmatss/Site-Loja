import { Link } from 'react-router-dom'
import { AnimatedSection } from '../components/Animated'
import ContactInfo from '../components/ContactInfo'
import { Card } from '../components/Card'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import GoogleMap from '../components/GoogleMap'
import { FaCheckCircle, FaUsers, FaBolt } from 'react-icons/fa'
import { COMPANY_INFO } from '../data/companyInfo'
import { ASSETS } from '../constants/constants'

function Sobre() {
  const valores = [
    {
      titulo: 'Qualidade',
      descricao:
        'Trabalhamos apenas com tecidos de primeira linha, garantindo a satisfação dos nossos clientes.',
      icone: <FaCheckCircle className="w-12 h-12" />,
    },
    {
      titulo: 'Compromisso',
      descricao: 'Estamos comprometidos em atender as necessidades específicas de cada cliente.',
      icone: <FaUsers className="w-12 h-12" />,
    },
    {
      titulo: 'Inovação',
      descricao:
        'Sempre buscando as últimas tendências em tecidos e malhas para oferecer o melhor.',
      icone: <FaBolt className="w-12 h-12" />,
    },
  ]

  return (
    <div className="min-h-screen bg-dark py-12">
      <SEO
        title="Sobre Nós"
        description={`Conheça a ${COMPANY_INFO.name} - ${COMPANY_INFO.fullName}. Empresa especializada em comércio de tecidos e malhas em ${COMPANY_INFO.address.city}. Qualidade, variedade e atendimento personalizado.`}
        keywords="sobre lt textil, loja tecidos goiânia, empresa tecidos, matos e oliveira"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6" />

        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
            Sobre a {COMPANY_INFO.name}
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">{COMPANY_INFO.fullName}</p>
        </AnimatedSection>

        {/* Quem Somos */}
        <AnimatedSection delay={0.2}>
          <Card variant="default" padding="large" className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary-cyan">Quem Somos</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    A <span className="text-white font-semibold">{COMPANY_INFO.name}</span> é uma
                    empresa especializada em comércio de tecidos e malhas, localizada em{' '}
                    {COMPANY_INFO.address.city} - {COMPANY_INFO.address.state}. Com o compromisso de
                    fornecer produtos de alta qualidade, atendemos tanto clientes finais quanto
                    confecções que buscam excelência em seus projetos.
                  </p>
                  <p>
                    Nossa missão é oferecer uma ampla variedade de tecidos que atendam às mais
                    diversas necessidades, desde malhas confortáveis até tecidos planos
                    sofisticados, sempre com foco na qualidade e no atendimento personalizado.
                  </p>
                  <p>
                    Trabalhamos com diferentes tipos de materiais, incluindo malhas, tecidos planos
                    e estampados, proporcionando aos nossos clientes inúmeras opções para dar vida
                    às suas criações.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <img
                  src={ASSETS.LOGO}
                  alt={`Logo da ${COMPANY_INFO.name} - Empresa especializada em tecidos e malhas desde Goiânia`}
                  className="w-64 h-64 object-cover rounded-full border-4 border-primary-cyan/30"
                  width={256}
                  height={256}
                  loading="lazy"
                />
              </div>
            </div>
          </Card>
        </AnimatedSection>

        {/* Nossos Valores */}
        <AnimatedSection delay={0.3}>
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-10 text-center text-gradient-primary">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valores.map((valor, index) => (
                <Card key={index} variant="hover" className="text-center">
                  <div className="text-primary-cyan mb-4 flex justify-center">{valor.icone}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{valor.titulo}</h3>
                  <p className="text-gray-400 leading-relaxed">{valor.descricao}</p>
                </Card>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Localização */}
        <AnimatedSection delay={0.4}>
          <Card variant="default" padding="large">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary-cyan">
              Nossa Localização
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ContactInfo variant="compact" />

              <div className="h-64 md:h-full min-h-[400px]">
                <GoogleMap />
              </div>
            </div>
          </Card>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.5}>
          <section className="mt-16 text-center">
            <Card variant="gradient" padding="large">
              <h2 className="text-3xl font-bold mb-4 text-dark">Vamos trabalhar juntos?</h2>
              <p className="text-lg mb-8 text-dark/80 max-w-2xl mx-auto">
                Entre em contato conosco e descubra como podemos ajudar seu negócio com os melhores
                tecidos e malhas.
              </p>
              <Link
                to="/contato"
                className="inline-block bg-dark hover:bg-dark/90 text-white font-semibold px-10 py-4 rounded-lg transition-all transform hover:scale-105"
              >
                Entre em Contato
              </Link>
            </Card>
          </section>
        </AnimatedSection>
      </div>
    </div>
  )
}

export default Sobre
