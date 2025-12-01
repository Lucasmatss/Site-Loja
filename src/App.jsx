import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import WhatsAppFloat from './components/WhatsAppFloat'
import { LocalBusinessSchema, OrganizationSchema } from './components/StructuredData'

// Lazy load páginas para melhor performance
const Home = lazy(() => import('./pages/Home'))
const Catalogo = lazy(() => import('./pages/Catalogo'))
const Sobre = lazy(() => import('./pages/Sobre'))
const Contato = lazy(() => import('./pages/Contato'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Componente de loading
function PageLoader() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Carregando...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      {/* Schema.org Structured Data */}
      <LocalBusinessSchema />
      <OrganizationSchema />

      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main id="main-content" className="flex-grow" role="main">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/contato" element={<Contato />} />
                {/* Rota 404 - deve ser a última */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />

          {/* Botão flutuante para voltar ao topo */}
          <ScrollToTopButton />

          {/* Botão flutuante do WhatsApp */}
          <WhatsAppFloat />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
