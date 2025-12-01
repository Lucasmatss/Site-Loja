# 📦 Como Gerenciar Produtos do Catálogo

## 🔴 Como OCULTAR um Produto (Fora de Estoque)

### Passo 1: Abrir o arquivo
```
C:\Site-Loja\src\data\products.js
```

### Passo 2: Encontrar o produto
Procure pelo nome ou ID do produto. Exemplo:

```javascript
{
  id: 5,
  nome: 'Tecido Linho',
  categoria: 'Tecidos Planos',
  cor: 'Bege',
  composicao: '55% Linho, 45% Viscose',
  gradient: 'from-stone-200 to-stone-400',
  disponivel: true  // ← Está aparecendo no site
}
```

### Passo 3: Marcar como indisponível
Mude `disponivel: true` para `disponivel: false`:

```javascript
{
  id: 5,
  nome: 'Tecido Linho',
  categoria: 'Tecidos Planos',
  cor: 'Bege',
  composicao: '55% Linho, 45% Viscose',
  gradient: 'from-stone-200 to-stone-400',
  disponivel: false  // ← Agora está OCULTO do site
}
```

### Passo 4: Salvar
- Aperte **Ctrl + S**
- Recarregue a página do catálogo
- ✅ O produto sumiu do site!

---

## 🟢 Como REATIVAR um Produto

Basta mudar de volta para `disponivel: true`:

```javascript
disponivel: true  // ← Produto volta a aparecer
```

---

## ➕ Como ADICIONAR um Novo Produto

### Passo 1: Copiar um produto existente
Copie um produto similar como base.

### Passo 2: Editar as informações
```javascript
{
  id: 21,  // ← Próximo número disponível
  nome: 'Malha Jersey',
  categoria: 'Malhas',  // Malhas | Tecidos Planos | Estampados | Lisos
  cor: 'Verde Água',
  composicao: '100% Algodão',
  gradient: 'from-teal-300 to-teal-500',  // Gradient do Tailwind
  disponivel: true
},
```

### Passo 3: Adicionar no final da lista
Cole antes do último `]` do array PRODUCTS.

---

## ❌ Como DELETAR um Produto Permanentemente

**⚠️ CUIDADO: Isso apaga o produto para sempre!**

Delete todo o bloco do produto (desde `{` até `},`).

**RECOMENDAÇÃO:** Ao invés de deletar, use `disponivel: false` para poder reativar depois!

---

## 📋 Lista de Categorias Disponíveis

```
'Malhas'
'Tecidos Planos'
'Estampados'
'Lisos'
```

Para adicionar nova categoria, edite a linha 2 do arquivo:
```javascript
export const CATEGORIES = ['Todos', 'Malhas', 'Tecidos Planos', 'Estampados', 'Lisos', 'Nova Categoria']
```

---

## 🎨 Cores do Gradient (Tailwind)

Exemplos de gradients que você pode usar:

**Cores Escuras:**
- `from-gray-900 to-black` - Preto
- `from-blue-900 to-blue-950` - Azul escuro
- `from-red-900 to-red-950` - Vermelho escuro

**Cores Médias:**
- `from-blue-500 to-blue-700` - Azul médio
- `from-green-500 to-green-700` - Verde médio
- `from-purple-500 to-purple-700` - Roxo médio

**Cores Claras:**
- `from-blue-200 to-blue-400` - Azul claro
- `from-pink-200 to-pink-400` - Rosa claro
- `from-gray-100 to-gray-300` - Cinza claro

Veja todas as cores em: https://tailwindcss.com/docs/customizing-colors

---

## 📊 Resumo Rápido

| Ação | Como Fazer |
|------|-----------|
| Ocultar produto | `disponivel: false` |
| Mostrar produto | `disponivel: true` |
| Adicionar produto | Copiar bloco e editar |
| Deletar produto | Apagar bloco completo (não recomendado) |
| Mudar categoria | Editar campo `categoria` |
| Mudar cor | Editar campo `cor` e `gradient` |

---

## ✅ Checklist Após Editar

- [ ] Salvei o arquivo (Ctrl + S)
- [ ] Recarreguei a página do catálogo
- [ ] Testei a busca se ainda funciona
- [ ] Testei os filtros de categoria
- [ ] Verifiquei se não tem erros no console (F12)

---

## 🆘 Ajuda Rápida

**Erro "Unexpected token":**
- Faltou uma vírgula `,` ou chave `}`
- Use um editor como VS Code que mostra erros

**Produto não aparece:**
- Verifique se `disponivel: true`
- Verifique se a categoria está correta
- Recarregue a página com Ctrl + F5

**Todos os produtos sumiram:**
- Verifique se não deletou o `]` final
- Restaure o arquivo de backup se tiver
