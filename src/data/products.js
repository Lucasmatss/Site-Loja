// Categorias disponíveis
export const CATEGORIES = ['Todos', 'Malhas', 'Tecidos Planos', 'Estampados', 'Lisos']

// Dados dos produtos
// NOTA: Para ocultar um produto do catálogo, mude 'disponivel: true' para 'disponivel: false'
export const PRODUCTS = [
  {
    id: 1,
    nome: 'Malha Cotton',
    categoria: 'Malhas',
    cor: 'Branco',
    composicao: '100% Algodão',
    gradient: 'from-gray-100 to-gray-300',
    disponivel: true,
  },
  {
    id: 2,
    nome: 'Malha Viscolycra',
    categoria: 'Malhas',
    cor: 'Preto',
    composicao: '95% Viscose, 5% Elastano',
    gradient: 'from-gray-800 to-gray-950',
    disponivel: true,
  },
  {
    id: 3,
    nome: 'Tecido Oxford',
    categoria: 'Tecidos Planos',
    cor: 'Azul Marinho',
    composicao: '100% Poliéster',
    gradient: 'from-blue-700 to-blue-900',
    disponivel: true,
  },
  {
    id: 4,
    nome: 'Malha Estampada Floral',
    categoria: 'Estampados',
    cor: 'Colorido',
    composicao: '100% Poliéster',
    gradient: 'from-primary-cyan to-blue-400',
    disponivel: true,
  },
  {
    id: 5,
    nome: 'Tecido Linho',
    categoria: 'Tecidos Planos',
    cor: 'Bege',
    composicao: '55% Linho, 45% Viscose',
    gradient: 'from-stone-200 to-stone-400',
    disponivel: false, // ← PRODUTO OCULTO (fora de estoque)
  },
  {
    id: 6,
    nome: 'Malha Ribana',
    categoria: 'Malhas',
    cor: 'Cinza',
    composicao: '100% Algodão',
    gradient: 'from-gray-400 to-gray-600',
    disponivel: true,
  },
  {
    id: 7,
    nome: 'Malha Estampada Geométrica',
    categoria: 'Estampados',
    cor: 'Colorido',
    composicao: '100% Poliéster',
    gradient: 'from-primary-blue to-blue-600',
    disponivel: true,
  },
  {
    id: 8,
    nome: 'Tecido Crepe',
    categoria: 'Tecidos Planos',
    cor: 'Rosa Claro',
    composicao: '100% Poliéster',
    gradient: 'from-slate-200 to-slate-400',
    disponivel: true,
  },
  {
    id: 9,
    nome: 'Malha Helanca',
    categoria: 'Malhas',
    cor: 'Azul Escuro',
    composicao: '92% Poliamida, 8% Elastano',
    gradient: 'from-slate-600 to-slate-800',
    disponivel: true,
  },
  {
    id: 10,
    nome: 'Tecido Jacquard',
    categoria: 'Tecidos Planos',
    cor: 'Creme',
    composicao: '100% Poliéster',
    gradient: 'from-stone-100 to-stone-300',
    disponivel: true,
  },
  {
    id: 11,
    nome: 'Malha Piquet',
    categoria: 'Malhas',
    cor: 'Azul Claro',
    composicao: '100% Algodão',
    gradient: 'from-blue-300 to-blue-500',
    disponivel: true,
  },
  {
    id: 12,
    nome: 'Malha Estampada Animal Print',
    categoria: 'Estampados',
    cor: 'Mix',
    composicao: '100% Poliéster',
    gradient: 'from-primary-indigo to-blue-700',
    disponivel: true,
  },
  {
    id: 13,
    nome: 'Malha Cotton Preto',
    categoria: 'Lisos',
    cor: 'Preto',
    composicao: '100% Algodão',
    gradient: 'from-gray-900 to-black',
    disponivel: true,
  },
  {
    id: 14,
    nome: 'Malha Cotton Azul Marinho',
    categoria: 'Lisos',
    cor: 'Azul Marinho',
    composicao: '100% Algodão',
    gradient: 'from-blue-900 to-blue-950',
    disponivel: true,
  },
  {
    id: 15,
    nome: 'Tecido Poliéster Vermelho',
    categoria: 'Lisos',
    cor: 'Vermelho',
    composicao: '100% Poliéster',
    gradient: 'from-red-600 to-red-800',
    disponivel: true,
  },
  {
    id: 16,
    nome: 'Tecido Poliéster Verde',
    categoria: 'Lisos',
    cor: 'Verde',
    composicao: '100% Poliéster',
    gradient: 'from-green-600 to-green-800',
    disponivel: true,
  },
  {
    id: 17,
    nome: 'Malha Viscolycra Roxo',
    categoria: 'Lisos',
    cor: 'Roxo',
    composicao: '95% Viscose, 5% Elastano',
    gradient: 'from-purple-600 to-purple-900',
    disponivel: true,
  },
  {
    id: 18,
    nome: 'Tecido Poliéster Amarelo',
    categoria: 'Lisos',
    cor: 'Amarelo',
    composicao: '100% Poliéster',
    gradient: 'from-yellow-500 to-yellow-700',
    disponivel: true,
  },
  {
    id: 19,
    nome: 'Malha Cotton Rosa',
    categoria: 'Lisos',
    cor: 'Rosa',
    composicao: '100% Algodão',
    gradient: 'from-pink-400 to-pink-600',
    disponivel: true,
  },
  {
    id: 20,
    nome: 'Tecido Poliéster Laranja',
    categoria: 'Lisos',
    cor: 'Laranja',
    composicao: '100% Poliéster',
    gradient: 'from-orange-500 to-orange-700',
    disponivel: true,
  },
]

// Função auxiliar para filtrar produtos
export const filterProducts = (products, categoria, busca) => {
  return products.filter((produto) => {
    // Filtrar apenas produtos disponíveis
    if (!produto.disponivel) return false

    const filtroCategoriaPassa = categoria === 'Todos' || produto.categoria === categoria
    const filtroBuscaPassa =
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.cor.toLowerCase().includes(busca.toLowerCase())
    return filtroCategoriaPassa && filtroBuscaPassa
  })
}
