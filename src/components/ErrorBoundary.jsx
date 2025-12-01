import React from 'react'
import PropTypes from 'prop-types'
import { COMPANY_INFO, URLS } from '../data/companyInfo'

// Error Boundary para capturar erros de React e mostrar UI amigável
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(_error) {
    // Atualiza o state para mostrar a UI de fallback
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log do erro apenas em desenvolvimento (segurança)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }

    this.setState({
      error,
      errorInfo,
    })

    // Aqui você pode enviar para serviço de monitoramento (Sentry, etc)
    // Exemplo: logErrorToService(error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {/* Card de erro */}
            <div className="bg-dark-secondary rounded-3xl p-8 md:p-12 border-2 border-red-500/30 text-center">
              {/* Ícone de erro */}
              <div className="text-8xl mb-6 animate-pulse">😕</div>

              {/* Título */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
                Oops! Algo deu errado
              </h1>

              {/* Mensagem */}
              <p className="text-gray-400 text-lg mb-8">
                Desculpe pelo inconveniente. Encontramos um erro inesperado.
              </p>

              {/* Detalhes do erro (apenas em desenvolvimento) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-8 text-left bg-dark rounded-lg p-4 border border-gray-700">
                  <summary className="cursor-pointer text-primary-cyan font-semibold mb-2">
                    Detalhes técnicos (dev only)
                  </summary>
                  <pre className="text-sm text-red-400 overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              {/* Ações */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReload}
                  className="bg-gradient-to-r from-primary-cyan to-primary-blue text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-all"
                >
                  🔄 Recarregar Página
                </button>

                <button
                  onClick={this.handleGoHome}
                  className="bg-dark border-2 border-gray-700 text-white font-bold px-8 py-4 rounded-full hover:border-primary-cyan transition-all"
                >
                  🏠 Voltar ao Início
                </button>
              </div>

              {/* Contato */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <p className="text-gray-400 text-sm mb-4">
                  Se o problema persistir, entre em contato:
                </p>
                <a
                  href={URLS.whatsapp('Olá! Estou tendo problemas técnicos no site.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors"
                >
                  <span className="text-2xl">📱</span>
                  <span className="font-semibold">{COMPANY_INFO.whatsapp.formatted}</span>
                </a>
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="mt-6 text-center text-gray-400 text-sm">
              <p>LT Textil - {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorBoundary
