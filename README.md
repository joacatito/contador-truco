# Contador de Truco

Aplicativo React Native (0.82.1) simples e direto para controlar partidas de truco em mesas de bar. Permite configurar a manilha (velha ou nova), cadastrar vários times, escolher quem joga cada rodada, registrar os pontos e manter um ranking de vitórias. Todo o fluxo está otimizado para Android e iOS usando Yarn.

## Requisitos

- Node 20+ (conferido no `package.json`)
- Yarn 1.22+
- Xcode + CocoaPods para builds iOS (`bundle install && bundle exec pod install` dentro de `ios`)
- Android SDK/NDK configurado (Android Studio)

## Instalação e primeiros passos

```bash
yarn install
# iOS: uma única vez ou sempre que atualizar dependências nativas
cd ios && bundle install && bundle exec pod install && cd ..
```

## Execução

```bash
# 1. iniciar o Metro
yarn start

# 2a. rodar no Android (em outro terminal)
yarn android

# 2b. rodar no iOS
yarn ios
```

### Testes e checagens

```bash
yarn test     # jest
yarn lint     # eslint
yarn tsc --noEmit
```

## Estrutura principal

```
src/
 ├─ components/        # Botões, banner e modal de interstitial fictício
 ├─ config/            # IDs de anúncios (teste e produção) em `ads.ts`
 ├─ context/           # Estado global do jogo e dos interstitials
 ├─ navigation/        # Stack principal (React Navigation Native Stack)
 ├─ screens/           # Telas (Home, Sobre, Regras, fluxo de jogo, ranking)
 ├─ theme/             # Paleta e espaçamentos (5% da largura do device)
 └─ utils/             # Funções utilitárias (ex.: randomThreshold)
```

## Fluxo do app

1. **Home** – mostra o logo em verde feltro, botões "Novo Jogo" e "Sobre" e um banner fixo.
2. **Sobre** – conta rapidamente a história do truco em SP x MG e leva para a tela de regras.
3. **Regras** – lista boas práticas, explica a ordem das manilhas e abre as telas detalhadas:
   - Manilha Velha (Truco Mineiro)
   - Manilha Nova (Truco Paulista com 4,5,6,7)
   - Manilha Nova Limpa (sem 4,5,6,7)
4. **Configurações do jogo** – ordem exigida pelo enunciado:
   - Seleção da manilha (nova/velha) com atalhos para as telas de explicação
   - Cadastro de times (inputs com `selectTextOnFocus` e botão de adicionar)
   - Escolha dos dois times (duas colunas independentes, com botão de ranking)
   - Placar (colunas lado a lado, inputs numéricos e botões +1, +3, +6, +9, +12 e +15 – este último só aparece na manilha velha). Ao atingir 12 ou 15 pontos o app registra a vitória, mostra alerta e retorna automaticamente para a tela anterior.
5. **Ranking (modal)** – lista de times ordenada por número de vitórias, acessível tanto da seleção quanto do placar.

Todos os botões de voltar ficam no rodapé direito, logo acima do banner, conforme pedido. O fundo é verde de feltro e os botões usam tons quentes (amarelo/laranja) para garantir contraste mesmo em ambientes claros ou escuros.

## Monetização (placeholders)

Os componentes `BannerAd` e `InterstitialModal` simulam os espaços de anúncio. Configure os IDs reais editando `src/config/ads.ts`, que já separa valores de teste e produção (Android/iOS). A lógica dos interstitials funciona assim:

- Um contador randômico (1–5) dispara ao tocar nos botões de pontos. Ao zerar, abre o modal de interstitial.
- Outro contador (1–5) dispara a cada ida para o placar – representa início de partida.
- Sempre que um time vence (chega a 12 ou 15 pontos) o interstitial é exibido automaticamente.

Substitua o modal pela SDK do fornecedor quando tiver os IDs valendo – os pontos de gatilho já estão centralizados no `InterstitialContext`.

## Ícones

Foram gerados ícones novos baseados no visual do app (quatro manilhas e a palavra TRUCO):

- Base em `assets/icon-base.png` (1024×1024) – pode ser editada no futuro.
- iOS: arquivos dentro de `ios/ContadorTruco/Images.xcassets/AppIcon.appiconset/` (de 20×20@2x até 1024×1024) com `Contents.json` atualizado.
- Android: substituição dos `ic_launcher.png` e `ic_launcher_round.png` em `android/app/src/main/res/mipmap-*`.

Se quiser recriar os tamanhos, basta editar `assets/icon-base.png` e rodar novamente o script em `README` (ou repetir o passo descrito no histórico com Pillow).

## Customizações importantes

- IDs de anúncio: `src/config/ads.ts`
- Paleta ou espaçamentos: `src/theme/colors.ts`
- Estado global dos times e ranking: `src/context/GameContext.tsx`
- Lógica de interstitials: `src/context/InterstitialContext.tsx`

Qualquer dúvida sobre o fluxo (nova regra, novas telas ou ajustes de layout) pode ser tratada olhando os componentes individuais dentro de `src/screens/`.
