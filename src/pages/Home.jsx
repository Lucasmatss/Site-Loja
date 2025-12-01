import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { AnimatedSection, AnimatedCard } from '../components/Animated'
import { ButtonPrimary, ButtonWhatsApp, ButtonSecondary } from '../components/Button'
import SEO from '../components/SEO'
import FAQ from '../components/FAQ'
import { FaChevronDown } from 'react-icons/fa'
import { ANIMATIONS } from '../constants/constants'

// Imagens do carrossel hero (constante fora do componente para evitar re-criação)
const HERO_IMAGES = [
  {
    src: '/images/hero/tecidos-1.jpg',
    alt: 'Variedade de tecidos coloridos de alta qualidade - LT Textil',
  },
  {
    src: '/images/hero/tecidos-2.jpg',
    alt: 'Malhas premium para confecção - LT Textil',
  },
  {
    src: '/images/hero/tecidos-3.jpg',
    alt: 'Rolos de tecido em diversas cores e texturas - LT Textil',
  },
  {
    src: '/images/hero/tecidos-4.jpg',
    alt: 'Tecidos estampados exclusivos - LT Textil',
  },
]

// Partículas flutuantes (valores pré-calculados para evitar Math.random em render)
const PARTICLES = Array.from({ length: 5 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 2 + Math.random() * 2,
  delay: Math.random() * 2,
}))

function Home() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Carrossel automático com pause on hover (WCAG 2.2.2)
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length)
    }, ANIMATIONS.CAROUSEL_INTERVAL) // Muda a cada 5 segundos

    return () => clearInterval(timer)
  }, [isPaused]) // Pausa quando hover/focus

  const diferenciais = [
    {
      titulo: 'Qualidade Garantida',
      descricao: 'Tecidos de primeira linha para suas confecções',
    },
    {
      titulo: 'Variedade',
      descricao: 'Grande variedade de tecidos, cores e estampas',
    },
    {
      titulo: 'Atendimento Personalizado',
      descricao: 'Atendemos suas necessidades específicas',
    },
  ]

  return (
    <div className="overflow-hidden">
      <SEO
        title="Início"
        description="LT Textil - Tecidos e Malhas de qualidade em Goiânia. Malhas, tecidos planos e estampados para confecção. Variedade, qualidade e atendimento personalizado."
        keywords="tecidos, malhas, confecção, goiânia, tecidos planos, malhas estampadas, loja de tecidos"
      />

      {/* Hero Section com Carrossel */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        aria-roledescription="carrossel"
        aria-label="Apresentação de imagens de tecidos"
      >
        {/* Carrossel de Imagens de Fundo */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={HERO_IMAGES[currentImage].src}
              alt={HERO_IMAGES[currentImage].alt}
              className="absolute inset-0 w-full h-full object-cover"
              width={1920}
              height={1080}
              loading={currentImage === 0 ? 'eager' : 'lazy'}
              fetchPriority={currentImage === 0 ? 'high' : 'auto'}
              decoding="async"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>

          {/* Overlay escuro para legibilidade */}
          <div className="absolute inset-0 bg-black/70"></div>

          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/30 via-primary-blue/20 to-transparent"></div>
        </div>

        {/* Indicadores do Carrossel */}
        <div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-3"
          role="tablist"
          aria-label="Navegação do carrossel de imagens"
        >
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-dark ${
                currentImage === index ? 'bg-primary-cyan w-8' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir para imagem ${index + 1} de ${HERO_IMAGES.length}`}
              aria-selected={currentImage === index}
              role="tab"
            />
          ))}
        </div>

        {/* Conteúdo */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-gradient-full">LT Textil</span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-4">Tecidos e Malhas de Qualidade</p>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Transforme suas ideias em realidade com nossos tecidos premium
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <ButtonPrimary to="/catalogo" className="text-lg px-10 py-5">
              📦 Explorar Catálogo
            </ButtonPrimary>

            <ButtonWhatsApp
              message="Olá! Vim pelo site e gostaria de mais informações."
              className="text-lg px-10 py-5"
            >
              Fale Conosco
            </ButtonWhatsApp>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-36 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaChevronDown className="w-6 h-6 text-white/80" />
        </motion.div>
      </section>

      {/* Diferenciais com Layout Assimétrico */}
      <section className="py-32 bg-dark-secondary relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-full">
              Por que escolher a LT Textil?
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {diferenciais.map((diferencial, index) => (
              <AnimatedCard key={index} delay={index * 0.15}>
                <div className="relative">
                  <div className="relative bg-dark border border-gray-800 rounded-3xl p-10 hover:border-primary-cyan transition-colors duration-300">
                    <div className="text-6xl mb-6">✨</div>
                    <h3 className="text-2xl font-bold mb-4 text-primary-cyan">
                      {diferencial.titulo}
                    </h3>
                    <p className="text-gray-400 leading-relaxed select-text">
                      {diferencial.descricao}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <FAQ />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Final com Background Animado */}
      <section className="relative py-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-cyan via-primary-blue to-primary-indigo"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ backgroundSize: '200% 200%' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Pronto para conhecer nossos produtos?
            </h2>
            <p className="text-xl mb-10 text-white/90">
              Entre em contato e descubra as melhores opções em tecidos e malhas
            </p>
            <ButtonSecondary
              to="/contato"
              className="border-white hover:border-white text-lg px-12 py-5"
            >
              💬 Fale Conosco Agora
            </ButtonSecondary>
          </AnimatedSection>
        </div>

        {/* Partículas flutuantes */}
        {PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </section>
    </div>
  )
}

export default Home
