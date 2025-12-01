import { useState, useEffect, useMemo, useDeferredValue } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '../components/Animated'
import { ButtonWhatsApp, ButtonOutline } from '../components/Button'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import { ProductSchema } from '../components/StructuredData'
import { FaSadTear } from 'react-icons/fa'
import { PRODUCTS, CATEGORIES, filterProducts } from '../data/products'

function Catalogo() {
  const location = useLocation()

  const categoriaInicial = location.state?.categoria || 'Todos'
  const [filtroCategoria, setFiltroCategoria] = useState(categoriaInicial)
  const [busca, setBusca] = useState('')
  // useDeferredValue para evitar re-renders durante digitação rápida (performance)
  const buscaDeferred = useDeferredValue(busca)

  // Sincronizar com estado externo do React Router quando navegação muda
  // Este é um caso legítimo de "Subscribe for updates from external system"
  // conforme documentação oficial: https://react.dev/learn/you-might-not-need-an-effect
  useEffect(() => {
    if (location.state?.categoria && location.state.categoria !== filtroCategoria) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFiltroCategoria(location.state.categoria)
    }
  }, [location.state, filtroCategoria])

  // Filtrar produtos usando a função centralizada (usa busca deferida para performance)
  const produtosFiltrados = useMemo(
    () => filterProducts(PRODUCTS, filtroCategoria, buscaDeferred),
    [filtroCategoria, buscaDeferred]
  )

  return (
    <div className="min-h-screen bg-dark py-12">
      <SEO
        title="Catálogo de Produtos"
        description={`Catálogo completo de tecidos e malhas da LT Textil. ${PRODUCTS.length} produtos disponíveis incluindo malhas, tecidos planos e estampados.`}
        keywords="catálogo tecidos, produtos malhas, comprar tecidos goiânia, malhas cotton, viscolycra, oxford"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6" />

        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient-full">Catálogo de Produtos</span>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore nossa variedade de tecidos e malhas
          </motion.p>
        </AnimatedSection>

        {/* Filtros Modernos */}
        <AnimatedSection delay={0.2}>
          <motion.div
            className="bg-dark-secondary rounded-3xl p-8 mb-12 border border-gray-800 backdrop-blur-lg"
            whileHover={{ borderColor: 'rgba(0, 212, 255, 0.3)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Busca */}
              <div>
                <label className="block text-sm font-medium mb-3 text-primary-cyan">
                  🔍 Buscar
                </label>
                <motion.input
                  type="text"
                  placeholder="Busque por nome ou cor..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full px-6 py-4 bg-dark border-2 border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan transition-all"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              {/* Categorias */}
              <div>
                <label className="block text-sm font-medium mb-3 text-primary-cyan">
                  📁 Categoria
                </label>
                <div className="flex flex-wrap gap-3">
                  {CATEGORIES.map((categoria) => (
                    <motion.button
                      key={categoria}
                      onClick={() => setFiltroCategoria(categoria)}
                      className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                        filtroCategoria === categoria
                          ? 'bg-gradient-to-r from-primary-cyan to-primary-blue text-white shadow-lg shadow-primary-cyan/50'
                          : 'bg-dark border-2 border-gray-700 text-gray-300 hover:border-primary-blue'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {categoria}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contador */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-primary-cyan font-semibold text-lg">
                {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''}{' '}
                encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
              </span>
            </motion.div>
          </motion.div>
        </AnimatedSection>

        {/* Grid de Produtos */}
        <AnimatePresence mode="wait">
          {produtosFiltrados.length > 0 ? (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {produtosFiltrados.map((produto, index) => (
                <motion.div
                  key={produto.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group h-full"
                >
                  {/* Schema.org para Rich Snippets no Google */}
                  <ProductSchema product={produto} />

                  <div className="relative bg-dark-secondary rounded-3xl overflow-hidden border-2 border-gray-800 hover:border-primary-cyan transition-all duration-300 h-full flex flex-col">
                    {/* Imagem/Gradient */}
                    <div className="relative h-72 overflow-hidden">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${produto.gradient}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Overlay com padrão */}
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            backgroundImage:
                              'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
                          }}
                        />
                      </motion.div>

                      {/* Badge de categoria */}
                      <motion.div
                        className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-white"
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        transition={{ delay: index * 0.05 + 0.2 }}
                      >
                        {produto.categoria}
                      </motion.div>

                      {/* Overlay hover */}
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          className="text-white text-6xl"
                        >
                          👁️
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Informações */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-cyan transition-colors min-h-[3.5rem]">
                        {produto.nome}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-400 mb-4 flex-grow">
                        <p className="flex items-center gap-2">
                          <span className="text-primary-cyan">🎨</span>
                          <span className="font-medium">Cor:</span> {produto.cor}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-primary-blue">🧬</span>
                          <span className="font-medium">Composição:</span>
                        </p>
                        <p className="text-gray-400 text-xs ml-7">{produto.composicao}</p>
                        {produto.preco && (
                          <p className="flex items-center gap-2 mt-2">
                            <span className="text-green-500">💰</span>
                            <span className="font-medium">Preço:</span>
                            <span className="text-green-400 font-bold">
                              R$ {produto.preco.toFixed(2).replace('.', ',')}/m
                            </span>
                          </p>
                        )}
                      </div>

                      {/* Botão */}
                      <ButtonWhatsApp
                        message={`Olá! Tenho interesse no produto: ${produto.nome} (${produto.cor})`}
                        className="w-full py-3 mt-auto"
                      >
                        Tenho Interesse
                      </ButtonWhatsApp>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaSadTear className="w-24 h-24 text-gray-700 mx-auto mb-6" />
              </motion.div>
              <p className="text-gray-400 text-xl">
                Nenhum produto encontrado com os filtros aplicados.
              </p>
              <ButtonOutline
                onClick={() => {
                  setFiltroCategoria('Todos')
                  setBusca('')
                }}
                className="mt-6"
              >
                🔄 Limpar Filtros
              </ButtonOutline>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Catalogo
