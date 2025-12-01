# LT Textil - Site Institucional

Site desenvolvido para **LT Textil** (Matos e Oliveira Comércio de Tecidos), uma empresa de comércio de tecidos e malhas em Goiânia - GO.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para criação de interfaces
- **Vite** - Build tool rápida e moderna
- **React Router** - Navegação entre páginas
- **Tailwind CSS** - Framework CSS utilitário
- **JavaScript (ES6+)**

## 📋 Funcionalidades

### Páginas Implementadas:

1. **Home**
   - Banner principal com chamada para ação
   - Apresentação das categorias de produtos
   - Diferenciais da empresa
   - CTA para contato

2. **Catálogo**
   - Grade de produtos com informações detalhadas
   - Sistema de filtros por categoria
   - Busca por nome e cor
   - Botão de interesse que redireciona para WhatsApp
   - **Nota:** Imagens dos produtos podem ser adicionadas posteriormente

3. **Sobre**
   - História e apresentação da empresa
   - Valores da empresa
   - Informações de localização
   - CTA para contato

4. **Contato**
   - Formulário de contato integrado com WhatsApp
   - Informações de contato direto
   - Horário de atendimento
   - Mapa de localização (placeholder para integração futura)

### Componentes:

- **Header** - Navegação responsiva com menu mobile
- **Footer** - Informações da empresa e links rápidos

## 🎨 Identidade Visual

O site segue a paleta de cores da logo da LT Textil:
- Azul Ciano: `#00d4ff`
- Roxo: `#6b4dff`
- Fundo Escuro: `#0a0a0a`
- Fundo Secundário: `#1a1a1a`

## 📦 Como Executar o Projeto

### Pré-requisitos:
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação e Execução:

1. As dependências já estão instaladas. Para rodar o projeto:

```bash
npm run dev
```

2. Abra o navegador e acesse:
```
http://localhost:5173
```

### Comandos Disponíveis:

```bash
# Executar em modo desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Visualizar build de produção
npm run preview
```

## 📁 Estrutura do Projeto

```
Site-Loja/
├── public/
│   └── logo loja.jpeg          # Logo da empresa
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Cabeçalho com navegação
│   │   └── Footer.jsx          # Rodapé
│   ├── pages/
│   │   ├── Home.jsx            # Página inicial
│   │   ├── Catalogo.jsx        # Catálogo de produtos
│   │   ├── Sobre.jsx           # Sobre a empresa
│   │   └── Contato.jsx         # Página de contato
│   ├── App.jsx                 # Componente principal
│   ├── main.jsx                # Entry point
│   └── index.css               # Estilos globais (Tailwind)
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔄 Próximos Passos / Melhorias Futuras

### Para adicionar as fotos dos produtos:

1. Adicione as imagens na pasta `public/produtos/`
2. No arquivo `src/pages/Catalogo.jsx`, atualize o array de produtos:
   ```javascript
   const produtos = [
     {
       id: 1,
       nome: 'Malha Cotton',
       imagem: '/produtos/malha-cotton.jpg', // <-- adicione o caminho
       // ... resto das propriedades
     },
   ]
   ```
3. A imagem será exibida automaticamente no lugar do placeholder

### Implementação de E-commerce (Futura):

Quando quiser adicionar funcionalidades de e-commerce:

- Sistema de carrinho de compras
- Integração com gateway de pagamento
- Gestão de estoque
- Painel administrativo
- Sistema de pedidos

O código atual está estruturado para facilitar essa expansão!

## 📞 Informações de Contato

- **Empresa:** Matos e Oliveira Comércio de Tecidos
- **Nome Fantasia:** LT Textil
- **WhatsApp:** (62) 98251-7417
- **E-mail:** Matoseoliveiratextil@hotmail.com
- **Endereço:** Rua M, N°40 - Setor Centro Oeste - Goiânia/GO

## 📱 Recursos Mobile

O site é 100% responsivo e otimizado para:
- Smartphones
- Tablets
- Desktops

## 🤝 Integração WhatsApp

Todos os botões de contato e formulários estão integrados com WhatsApp:
- Botão no Header
- Formulário de Contato
- Botões "Tenho Interesse" nos produtos
- Links no Footer

## 📝 Licença

Este projeto foi desenvolvido para uso exclusivo da LT Textil.

---

Desenvolvido com ❤️ para LT Textil
