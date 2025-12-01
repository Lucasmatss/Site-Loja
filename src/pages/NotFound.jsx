import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { ButtonPrimary, ButtonWhatsApp } from '../components/Button'
import { FaHome, FaSearch } from 'react-icons/fa'

function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <SEO
        title="Página não encontrada"
        description="A página que você está procurando não existe ou foi movida. Volte para a página inicial da LT Textil."
      />

      <div className="max-w-2xl w-full text-center">
        {/* Animação do 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl md:text-[12rem] font-bold text-gradient-primary leading-none">
            404
          </h1>
        </motion.div>

        {/* Mensagem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Página não encontrada</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            Ops! Parece que esta página não existe ou foi movida. Não se preocupe, vamos te ajudar a
            encontrar o que procura.
          </p>
        </motion.div>

        {/* Ações */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ButtonPrimary to="/" className="gap-2">
            <FaHome className="w-4 h-4" />
            Voltar ao Início
          </ButtonPrimary>

          <ButtonPrimary to="/catalogo" className="gap-2 bg-primary-blue hover:bg-primary-indigo">
            <FaSearch className="w-4 h-4" />
            Ver Catálogo
          </ButtonPrimary>
        </motion.div>

        {/* Contato */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-gray-500 mb-4">Precisa de ajuda? Entre em contato conosco</p>
          <ButtonWhatsApp className="px-6 py-3">Falar no WhatsApp</ButtonWhatsApp>
        </motion.div>

        {/* Links úteis */}
        <motion.div
          className="mt-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p>Páginas disponíveis:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link to="/" className="text-primary-cyan hover:underline">
              Início
            </Link>
            <Link to="/catalogo" className="text-primary-cyan hover:underline">
              Catálogo
            </Link>
            <Link to="/sobre" className="text-primary-cyan hover:underline">
              Sobre
            </Link>
            <Link to="/contato" className="text-primary-cyan hover:underline">
              Contato
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
