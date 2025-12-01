import { memo } from 'react'
import { Link } from 'react-router-dom'
import ContactInfo from './ContactInfo'
import { COMPANY_INFO } from '../data/companyInfo'
import { ASSETS } from '../constants/constants'

const Footer = memo(function Footer() {
  return (
    <footer className="bg-dark-secondary border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div>
            <img
              src={ASSETS.LOGO}
              alt={`${COMPANY_INFO.name} - Loja de tecidos e malhas de qualidade`}
              className="h-20 w-20 mb-4 rounded-full border-2 border-primary-cyan/30"
              width={80}
              height={80}
              loading="lazy"
            />
            <h3 className="text-xl font-bold mb-2">{COMPANY_INFO.name}</h3>
            <p className="text-gray-400 text-sm">
              Tecidos e Malhas de qualidade para sua confecção.
            </p>
            <p className="text-gray-400 text-xs mt-2">{COMPANY_INFO.fullName}</p>
            <p className="text-gray-400 text-xs mt-1">CNPJ: {COMPANY_INFO.cnpj}</p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-cyan">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-cyan transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogo"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-cyan">Contato</h4>
            <ContactInfo variant="footer" />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p className="mb-1">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name} - Todos os direitos reservados.
          </p>
          <p className="text-xs">
            {COMPANY_INFO.fullName} - CNPJ: {COMPANY_INFO.cnpj}
          </p>
        </div>
      </div>
    </footer>
  )
})

export default Footer
