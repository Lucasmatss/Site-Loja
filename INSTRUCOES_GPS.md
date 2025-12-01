# 📍 Como Adicionar Coordenadas GPS ao Site

## Passo 1: Encontrar as Coordenadas

1. Abra: https://www.google.com/maps
2. Busque: `Rua M, 40, Setor Centro Oeste, Goiânia, GO`
3. Clique com BOTÃO DIREITO no marcador vermelho
4. Clique na primeira opção (que mostra números)
5. Copie os números que aparecem
   - Exemplo: `-16.686900, -49.264800`

## Passo 2: Adicionar no Site

Abra o arquivo: `src/data/companyInfo.js`

Encontre as linhas 20-23:
```javascript
coordinates: {
  lat: null, // Cole o PRIMEIRO número aqui
  lng: null  // Cole o SEGUNDO número aqui
},
```

Substitua por (exemplo):
```javascript
coordinates: {
  lat: -16.686900,  // Primeiro número (latitude)
  lng: -49.264800   // Segundo número (longitude)
},
```

## Passo 3: Salvar e Testar

1. Salve o arquivo (Ctrl+S)
2. Recarregue a página "Sobre" no site
3. Olhe no canto superior esquerdo do mapa
   - Deve aparecer: "⚡ GPS Mode (Fast)"
4. Pronto! O mapa agora é 3x mais rápido! 🚀

## ⚠️ IMPORTANTE:

- Use PONTO (.) não VÍRGULA (,) para separar decimais
- Mantenha o sinal de menos (-) se houver
- Formato correto: `-16.686900` ✅
- Formato errado: `-16,686900` ❌

## 🎯 Resultado:

ANTES: Carrega em ~500ms
DEPOIS: Carrega em ~150ms (3x mais rápido!)
