# Contador de Truco

App mobile nativo em React Native `0.84.0` com TypeScript, React Navigation, AsyncStorage, New Architecture habilitada e Fabric ativo para Android e iOS.

## Stack

- React Native `0.84.0`
- TypeScript
- React Navigation `native-stack`
- AsyncStorage
- `react-native-svg`
- `lucide-react-native`
- New Architecture + Hermes

## Estrutura

```text
src/
  app/             providers e bootstrap
  components/      UI reutilizável
  hooks/           responsividade
  lib/             abstrações de ads
  navigation/      stack e tipos
  screens/         telas do fluxo
  storage/         persistência local
  theme/           tokens centrais
  types/           tipos de domínio
  utils/           lógica testável
```

## Funcionalidades implementadas

- Home com 4 cartas/manilhas desenhadas em SVG nativo
- Sobre, Regras, seleção de manilha, gerenciar times, selecionar times e jogo
- Persistência local de `gameManilha`, `teams`, `currentTeam1`, `currentTeam2` e `ranking`
- Ranking por `id` de time
- Seleção automática dos 2 primeiros times
- Botão `+15` apenas na manilha velha
- Banner fixo placeholder em todas as telas
- Interstitial placeholder com countdown de 3 segundos
- Animação de vencedor com troféu, estrelas e confetes
- Layout adaptado para smartphone e tablet, retrato e paisagem
- Testes unitários para ranking, placar e seleção de times

## Requisitos

- Node `>= 22.11`
- Android Studio com SDK configurado
- Xcode 16+ e CocoaPods no macOS

Documentação oficial de referência:

- React Native setup: https://reactnative.dev/docs/set-up-your-environment

## Rodando o projeto

### 1. Instalar dependências JS

```sh
npm install
```

### 2. iOS: instalar pods

Use o Ruby do Homebrew, não o Ruby 2.6 do sistema (`/usr/bin/ruby`): no SDK do macOS 26 ele não compila gems nativas, e o `bundle install` falha no `json`. Uma vez só:

```sh
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc   # abra um terminal novo depois
```

Depois, a cada mudança de dependências nativas (as versões do CocoaPods ficam no `Gemfile.lock`, as mesmas do CI):

```sh
bundle install
npm run pods
```

Depois disso, você pode abrir [`ios/ContadorDeTrucoNative.xcworkspace`](/Users/joaquimtito/Projetos/contador-truco/ios/ContadorDeTrucoNative.xcworkspace) no Xcode ou rodar:

```sh
npm run ios
```

### 3. Android

```sh
npm start
npm run android
```

## Fabric e New Architecture

- Android: [`android/gradle.properties`](/Users/joaquimtito/Projetos/contador-truco/android/gradle.properties) já está com `newArchEnabled=true` e `hermesEnabled=true`.
- iOS: o `pod install` foi executado com codegen ativo e o log confirmou `Configuring the target with the New Architecture`.

## Verificação executada

```sh
npm test -- --runInBand
npx tsc --noEmit
npm run lint
cd android && ./gradlew help
PATH="$HOME/.gem/ruby/3.4.0/bin:/opt/homebrew/opt/ruby/bin:$PATH" pod install --project-directory=ios
```

## CI/CD

Todo PR para a `main` passa pelo **PR Validation** (typecheck, lint, testes, Gitleaks, auditoria de dependências e build Android). Cada merge na `main` dispara o **Release**, que publica no Google Play e no TestFlight. Secrets, variáveis e passos manuais estão em [`docs/PIPELINE.md`](docs/PIPELINE.md).

A `main` só muda por Pull Request. Ative o hook que bloqueia push direto nela uma vez em cada clone:

```sh
git config core.hooksPath .githooks
```

## Observação

A pasta `design/` foi mantida apenas como referência do app web descrito e está excluída do ciclo de lint e TypeScript do app nativo.
