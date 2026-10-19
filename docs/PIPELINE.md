# Pipeline de CI/CD (GitHub Actions)

Guia do pipeline do Contador de Truco: o que ele faz, quais dados sensíveis ele usa e como cadastrá-los.

| | |
|---|---|
| Repositório | `joacatito/contador-truco` (privado, plano gratuito) |
| Package Android / Bundle ID iOS | `com.joaquimtito.games.contadordetruco` |
| Projeto iOS | `ios/ContadorDeTrucoNative.xcworkspace`, scheme `ContadorDeTrucoNative` |
| Gerenciador de pacotes | **npm** (`package-lock.json`) |

## 1. Como funciona

```
 sua branch ──► Pull Request para main ──► PR Validation (automático)
                         │                    • typecheck, lint, testes
                         │                    • busca de segredos vazados (Gitleaks)
                         │                    • auditoria de dependências
                         │                    • build Android (debug)
                         ▼
                 você clica em "Merge"
                         │
                         ▼
                main ──► Release (automático)
                          1. Origem e versão: confirma que veio de um PR mesclado
                          2. Qualidade: roda os mesmos checks de novo
                          3. Android → build assinado → Google Play     ┐ em
                          4. iOS     → build assinado → TestFlight      ┘ paralelo
```

| Arquivo | Papel |
|---|---|
| `.github/workflows/pr-validation.yml` | Validação de todo PR para a `main` |
| `.github/workflows/release.yml` | Build e publicação, só a partir da `main` |
| `.github/workflows/checks.yml` | Checks de qualidade usados pelos dois acima |
| `.github/scripts/require-env.sh` | Lista os secrets e variáveis que faltam, dizendo em qual aba cadastrar cada um |
| `.github/scripts/check-admob.sh` | Recusa o release com IDs de teste do AdMob |
| `.github/scripts/ios-configure-release.rb` | Aplica assinatura manual e versão só no target do app iOS |
| `.github/dependabot.yml` | Um PR mensal agrupado com atualização de dependências e outro com as actions |
| `.githooks/pre-push` | Bloqueia `git push` direto na `main` na sua máquina |
| `.gitleaks.toml` | Regras do Gitleaks (padrão + exceções para lockfiles gerados) |

### Equivalências com o Azure DevOps Server

| Azure DevOps | GitHub |
|---|---|
| Pipeline (YAML) | Workflow (`.github/workflows/*.yml`) |
| Template de pipeline (`template:`) | Workflow reutilizável (`on: workflow_call`, chamado com `uses:`) |
| Build Validation da branch policy | Workflow com `on: pull_request` |
| Trigger CI na `main` | Workflow com `on: push: branches: [main]` |
| Agent pool / agente | Runner (`runs-on: ubuntu-latest`, `macos-15`) |
| Stage / Job / Task | Job / Job / Step |
| `dependsOn` | `needs` |
| Variable Group com valores secretos | **Secrets** do repositório |
| Variable Group com valores comuns | **Variables** do repositório |
| Secure Files (keystore, certificados) | Secret com o arquivo em **base64** |
| Pipeline Artifacts | Artifacts (aba Summary da execução) |
| Aba Pipelines | Aba **Actions** do repositório |
| Pull Request + Approve + Complete | Pull Request + **Merge** |

## 2. Proteção da `main`

O repositório é **privado** e está no **plano gratuito**. Nesse plano, o GitHub deixa configurar a proteção de branch, mas **não aplica** a regra em repositórios privados. Por isso a regra "a main só muda por PR" fica garantida em duas camadas:

1. **Na sua máquina:** o hook `.githooks/pre-push` recusa qualquer `git push` para a `main`. Ative uma vez em cada clone:
   ```bash
   git config core.hooksPath .githooks
   ```
2. **No pipeline:** o job **Origem e versão** pergunta ao GitHub se o commit veio de um PR mesclado na `main`. Se não veio (push direto, edição pelo site etc.), o Release falha e **nada é publicado**.

**Aprovação do PR:** o GitHub não deixa o autor aprovar o próprio PR. Trabalhando sozinho, o equivalente ao "Approve + Complete" do ADO é **revisar o PR, conferir que os checks ficaram verdes e clicar em Merge**.

Se um dia você assinar o GitHub Pro (US$ 4/mês), dá para ligar a proteção real em **Settings → Rules → Rulesets**, exigindo PR e o check **PR Validation**.

## 3. Quais dados sensíveis proteger

Estes itens **nunca** podem ir para o repositório. Eles ficam só em **Secrets**, onde o GitHub os guarda criptografados e esconde o valor nos logs. O `.gitignore` já ignora `*.keystore`, `*.jks`, `*.p12`, `*.p8`, `*.mobileprovision` e JSONs de conta de serviço, mas guarde esses arquivos **fora** da pasta do projeto mesmo assim.

### Android (aba **Secrets**)

| Secret | O que é | Risco se vazar |
|---|---|---|
| `ANDROID_KEYSTORE_BASE64` | Arquivo `.keystore` da **upload key** deste app, em base64 | Alguém poderia enviar versões do app no seu nome. **Se perder o arquivo, você não consegue mais atualizar o app sem pedir reset ao Google.** |
| `ANDROID_KEYSTORE_PASSWORD` | Senha do keystore | Libera o uso do keystore |
| `ANDROID_KEY_ALIAS` | Nome (alias) da chave dentro do keystore | Baixo sozinho, mas faz parte da credencial |
| `ANDROID_KEY_PASSWORD` | Senha da chave | Libera o uso da chave |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | Conteúdo do JSON da conta de serviço do Google Play | Permite publicar e alterar apps na sua conta do Play Console |

### iOS / Apple (aba **Secrets**)

| Secret | O que é | Risco se vazar |
|---|---|---|
| `IOS_DIST_CERT_P12_BASE64` | Certificado **Apple Distribution** + chave privada (`.p12`), em base64 | Permite assinar apps como se fossem da sua conta |
| `IOS_DIST_CERT_PASSWORD` | Senha usada ao exportar o `.p12` | Libera o certificado |
| `IOS_PROVISIONING_PROFILE_BASE64` | Perfil **App Store** deste app (`.mobileprovision`), em base64 | Baixo sozinho. Fica como secret por ser um arquivo de assinatura. |
| `APPSTORE_API_KEY_ID` | ID da chave de API do App Store Connect | Faz parte da credencial |
| `APPSTORE_API_ISSUER_ID` | Issuer ID da sua conta no App Store Connect | Faz parte da credencial |
| `APPSTORE_API_PRIVATE_KEY` | Conteúdo do arquivo `AuthKey_XXXX.p8` | Acesso à sua conta do App Store Connect com o papel da chave. **O arquivo só pode ser baixado uma vez.** |

### Não são secretos (aba **Variables**)

| Variable | Valor | Para quê |
|---|---|---|
| `IOS_TEAM_ID` | Team ID da sua conta Apple (10 caracteres) | Assinatura iOS. **Não é segredo**: aparece em todo app assinado. Cadastre em Variables, não em Secrets. |
| `PLAY_TRACK` | `internal` (padrão), `alpha`, `beta` ou `production` | Faixa do Google Play que recebe o build |
| `PLAY_RELEASE_STATUS` | `completed` (padrão) ou `draft` | Use `draft` enquanto o app nunca tiver sido publicado no Play |

Também **não são secretos**, e por isso ficam no código: o package/bundle ID, os App IDs do AdMob (`app.json`) e os IDs dos blocos de anúncios (`src/lib/adUnits.ts`). Todos vão dentro do app publicado.

### O que pode ser reaproveitado do Heads-UP

| Item | Reaproveita? |
|---|---|
| Conta de serviço do Google Play (`GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`) | **Sim.** Basta dar a ela permissão também neste app (passo 4 da seção 4). |
| Chave de API do App Store Connect (`APPSTORE_API_*`) | **Sim.** Vale para o time inteiro. |
| Certificado Apple Distribution (`IOS_DIST_CERT_*`) | **Sim.** Vale para o time inteiro. Use o mesmo `.p12` e a mesma senha. |
| `IOS_TEAM_ID` | **Sim.** Mesmo time. |
| Keystore Android (`ANDROID_KEY*`) | **Não.** É por app. Crie um novo. |
| Provisioning profile (`IOS_PROVISIONING_PROFILE_BASE64`) | **Não.** É por app. Crie um novo. |

Os secrets ficam em cada repositório. Os que forem reaproveitados precisam ser cadastrados de novo **aqui**, com o mesmo valor.

### Outros cuidados

- Guarde **cópias de segurança** do keystore Android, do `.p12` e do `.p8` num lugar seguro **fora** do repositório, por exemplo um gerenciador de senhas. O GitHub não deixa ler um secret depois de salvo.
- Se algo vazar: troque a senha ou revogue a chave no console correspondente e atualize o secret no GitHub.

## 4. Como gerar cada item

Os comandos abaixo são para o Terminal do Mac. O `pbcopy` copia o resultado direto para a área de transferência, pronto para colar no GitHub, sem passar por nenhum arquivo ou chat.

### Android: keystore (upload key)

O app vai usar **Play App Signing**: o Google guarda a chave final, e você assina com a **upload key**. Como o app nunca foi publicado, crie uma upload key nova, só dele, fora da pasta do projeto:

```bash
mkdir -p ~/Projetos/chaves
keytool -genkeypair -v -keystore ~/Projetos/chaves/contador-truco-upload.keystore \
  -alias upload -keyalg RSA -keysize 2048 -validity 10000
```

O `keytool` pede uma senha para o keystore e os dados do certificado. Anote:
- a senha → `ANDROID_KEYSTORE_PASSWORD` e também `ANDROID_KEY_PASSWORD` (o `keytool` atual usa a mesma senha para os dois);
- o alias, `upload` → `ANDROID_KEY_ALIAS`.

Gere o base64:

```bash
base64 -i ~/Projetos/chaves/contador-truco-upload.keystore | pbcopy     # → ANDROID_KEYSTORE_BASE64
```

Ao enviar o primeiro AAB (seção 6), o Play Console registra essa chave como a **chave de upload** do app.

### Android: conta de serviço do Google Play

Se já existe a conta de serviço do Heads-UP, **reaproveite**: pule para o passo 4 e use o mesmo JSON.

1. **Google Cloud Console** → crie (ou escolha) um projeto → *IAM e administrador → Contas de serviço → Criar conta de serviço*.
2. Na conta criada: *Chaves → Adicionar chave → JSON*. Um arquivo `.json` é baixado.
3. Ative a **Google Play Android Developer API** nesse projeto (*APIs e serviços → Biblioteca*). Sem ela, o upload falha.
4. **Play Console** → *Usuários e permissões* → encontre o e-mail da conta de serviço (ou *Convidar novos usuários* e cole o e-mail) → *Permissões do app → Adicionar app* → **Contador de Truco**. Marque:
   - **Ver informações do app** (somente leitura);
   - **Lançar apps em faixas de teste** e **Gerenciar faixas de teste**;
   - **Lançar na produção**, quando for publicar em produção pelo pipeline.

   Sem isso, o upload falha com *"The caller does not have permission"*. A permissão pode levar **até 24 horas** para valer.
5. Copie **todo** o conteúdo do `.json` para `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`:
   ```bash
   pbcopy < ~/Projetos/chaves/play-service-account.json      # ajuste o caminho
   ```

### iOS: certificado Apple Distribution (.p12)

O certificado vale para o time inteiro. Se já tem o `.p12` do Heads-UP, **reaproveite** o mesmo arquivo e a mesma senha.

Se não tiver:
1. No Mac, abra o **Acesso às Chaves** (Keychain Access) → *Meus Certificados*.
2. Se não houver um **Apple Distribution: …**, crie pelo Xcode: *Settings → Accounts → sua conta → Manage Certificates → + → Apple Distribution*.
3. Clique com o botão direito no certificado → **Exportar** → formato `.p12` → defina uma senha. Essa é a `IOS_DIST_CERT_PASSWORD`.

Gere o base64:
```bash
base64 -i ~/Projetos/chaves/apple-distribution.p12 | pbcopy     # → IOS_DIST_CERT_P12_BASE64
```

### iOS: provisioning profile App Store

O perfil é **por app**: este precisa ser novo.

1. **developer.apple.com** → *Certificates, IDs & Profiles → Identifiers → +* → *App IDs → App* → Bundle ID **Explicit** `com.joaquimtito.games.contadordetruco`, descrição `Contador de Truco`. Nenhuma capability extra é necessária.
2. *Profiles → +* → **App Store Connect** (Distribution) → App ID `com.joaquimtito.games.contadordetruco` → escolha o certificado Apple Distribution → nome, por exemplo `ContadorTruco AppStore` → baixe o arquivo.
3. Gere o base64:
   ```bash
   base64 -i ~/Projetos/chaves/ContadorTruco_AppStore.mobileprovision | pbcopy   # → IOS_PROVISIONING_PROFILE_BASE64
   ```

O perfil **vence em 1 ano**, junto com o certificado. Quando vencer, gere de novo e atualize os secrets.

### iOS: chave de API do App Store Connect

Vale para o time inteiro. Se já existe a chave `GitHub Actions` do Heads-UP, **reaproveite** o Key ID, o Issuer ID e o conteúdo do mesmo `.p8`.

Se não tiver:
1. **App Store Connect** → *Usuários e Acesso → Integrações → App Store Connect API → Chaves da equipe → +*.
2. Nome: `GitHub Actions`; acesso: **App Manager**.
3. Anote o **Issuer ID** (no topo da página) → `APPSTORE_API_ISSUER_ID`.
4. Anote o **Key ID** da chave criada → `APPSTORE_API_KEY_ID`.
5. Baixe o `AuthKey_XXXXXX.p8`. **Só dá para baixar uma vez.** Copie o conteúdo:
   ```bash
   pbcopy < ~/Projetos/chaves/AuthKey_XXXXXX.p8           # → APPSTORE_API_PRIVATE_KEY
   ```

### Team ID

**developer.apple.com → Account → Membership details → Team ID** → `IOS_TEAM_ID` (aba **Variables**).

## 5. Como cadastrar no GitHub

1. Abra o repositório `joacatito/contador-truco` no GitHub → **Settings** (engrenagem no topo).
2. Menu lateral: **Secrets and variables → Actions**.
3. Aba **Secrets** → **New repository secret** → em *Name*, coloque o nome **exatamente** como na tabela (ex.: `ANDROID_KEYSTORE_PASSWORD`) → cole o valor em *Secret* → **Add secret**. Repita para os 11 secrets.
4. Aba **Variables** → **New repository variable** → mesmo processo para `IOS_TEAM_ID`, `PLAY_TRACK` e `PLAY_RELEASE_STATUS`.

Depois de salvo, o GitHub não mostra mais o valor de um secret, só deixa substituir.

Se faltar algum item, o job de publicação falha logo no primeiro passo (**Check required secrets and variables**) e lista o nome exato do que falta e **em qual aba** cadastrá-lo.

**Valores iniciais das Variables para este app:**

| Variable | Valor inicial |
|---|---|
| `IOS_TEAM_ID` | seu Team ID |
| `PLAY_TRACK` | `internal` |
| `PLAY_RELEASE_STATUS` | `draft` |

## 6. Primeira publicação: passos manuais obrigatórios

As lojas exigem algumas ações manuais antes que qualquer pipeline consiga publicar.

### Google Play (conta pessoal criada depois de 13/11/2023)

1. **Crie o app** no Play Console (*Criar app*), nome `Contador de Truco`, gratuito, tipo **App**.
2. Preencha *Painel → Configurar o app*: política de privacidade (obrigatória para app com anúncios), **Contém anúncios = sim**, acesso ao app, classificação de conteúdo, público-alvo e **Segurança dos dados** (o SDK do AdMob coleta identificadores do dispositivo e dados de uso para publicidade).
3. **Rode o Release uma vez** (mescle um PR). Com o app ainda vazio, o passo *Upload to Google Play* falha. Isso é esperado.
4. Baixe o AAB em *Actions → execução do Release → Artifacts → android-aab-N* e envie **manualmente** em *Testar e lançar → Testes → Teste interno → Criar versão*. A API do Google não aceita o primeiro envio de um app. Nesse momento, aceite o **Play App Signing**.
5. Dê à conta de serviço a permissão neste app (seção 4) e espere ela valer (até 24 h).
6. A partir daí, o pipeline publica sozinho em `PLAY_TRACK`, como `draft`, e você libera a versão no Play Console.

**Teste fechado e os 14 dias:** em conta pessoal nova, o Google só libera a produção depois de um **teste fechado** com **pelo menos 12 testadores** inscritos por **14 dias seguidos**. O teste fechado é a faixa **`alpha`** (*Teste fechado → Alpha*), e é ela que conta para os 14 dias. O teste interno **não conta**.
- Crie a lista de testadores em *Teste fechado → Alpha → Testadores* e envie o link de inscrição.
- Mude `PLAY_TRACK` para `alpha` para que cada merge vá direto para o teste fechado.
- Depois que a primeira versão do teste fechado for aprovada pelo Google, mude `PLAY_RELEASE_STATUS` para `completed`: cada merge passa a chegar aos testadores sem você liberar à mão.
- Passados os 14 dias, peça acesso à produção no Painel do Play Console. Com o acesso liberado, mude `PLAY_TRACK` para `production` quando quiser publicar direto.

### App Store

1. Registre o App ID e crie o provisioning profile (seção 4).
2. Crie o app no **App Store Connect** (*Apps → + → Novo app*): plataforma iOS, nome `Contador de Truco`, idioma principal Português (Brasil), bundle ID `com.joaquimtito.games.contadordetruco`, SKU (ex.: `contador-truco`).
3. Mescle um PR. O pipeline envia o build para o **TestFlight**. O processamento da Apple leva de 10 a 30 minutos.
4. Para ir à **App Store**, abra o App Store Connect → seu app → versão `1.0.0` → selecione o build → **Enviar para revisão**. Isso continua manual: a Apple exige textos, capturas, política de privacidade, a seção **Privacidade do app** (declarando os dados que o AdMob coleta) e respostas de conformidade de exportação.

O app roda no iPad e só em retrato. Por isso o `Info.plist` tem `UIRequiresFullScreen = true`; sem ele, o upload é recusado com o erro de **iPad multitasking**. O teste `__tests__/appConfig.test.ts` impede que isso seja removido sem querer.

### AdMob

O release recusa publicar (`check-admob.sh`) se:
- o `app.json` não tiver `react-native-google-mobile-ads.android_app_id` / `ios_app_id`;
- algum deles for o ID de teste do Google (`ca-app-pub-3940256099942544~...`);
- houver um bloco de anúncio de teste do Google escrito direto em `src/`.

Os anúncios de teste em desenvolvimento vêm de `TestIds`, atrás de `__DEV__` (`src/lib/adUnits.ts`), e isso continua permitido. Os testes unitários fazem as mesmas verificações, então o problema já aparece no PR.

### Número de build

É automático: são os minutos corridos desde 1º/01/2020 UTC, o mesmo número no Android e no iOS. Não há nada a configurar.

## 7. Dia a dia: como publicar uma versão

1. Crie uma branch: `git switch -c feature/minha-mudanca origin/main --no-track`.
2. Faça as mudanças e os commits. Se for uma **nova versão** para as lojas, aumente a versão (ex.: `1.0.0` → `1.1.0`) com:
   ```bash
   npm version minor --no-git-tag-version     # ou patch / major
   ```
   O comando atualiza o `package.json` e o `package-lock.json` juntos.
3. Antes do primeiro push, confira se nenhum segredo entrou nos commits da branch:
   ```bash
   gitleaks git --log-opts="origin/main..HEAD" .
   ```
4. `git push -u origin feature/minha-mudanca`.
5. No GitHub, clique em **Compare & pull request** → base `main` → **Create pull request**.
6. Espere o **PR Validation** ficar verde na própria página do PR.
7. Clique em **Merge pull request** → **Confirm merge**.
8. Acompanhe a publicação na aba **Actions → Release**. Ao terminar:
   - Android: o build aparece na faixa definida em `PLAY_TRACK`.
   - iOS: o build aparece no TestFlight após o processamento da Apple, que leva de 10 a 30 minutos.

A versão mostrada nas lojas vem do `version` do `package.json`. O número de build é automático. Se você não mudar a versão, o merge publica um build novo da mesma versão, o que é normal para testes.

### Rodar localmente o mesmo que o PR roda

```bash
npm ci
npm run typecheck
npm run lint
npm run test:ci
cd android && ./gradlew app:assembleDebug -PreactNativeArchitectures=arm64-v8a
```

## 8. Custos (plano gratuito, repositório privado)

- São **2.000 minutos por mês**, somando todos os repositórios privados da conta (inclusive o Heads-UP). Runners Linux contam 1×, e **runners macOS contam 10×**.
- Um PR consome uns 15 a 20 minutos (tudo em Linux). O build Android do PR compila só `arm64-v8a` para ser mais rápido.
- Um Release consome uns 20 a 30 minutos de Linux mais 30 a 40 minutos de macOS, que contam como 300 a 400. Isso dá uns **4 a 5 releases por mês**, somando os dois apps, com folga para PRs.
- O primeiro build Android é o mais lento. O cache do Gradle só é salvo quando o job termina com sucesso.
- Merges que só mexem em `docs/`, `design/`, `store-assets/`, arquivos `.md`, no hook local ou na configuração do Dependabot **não disparam o Release**.
- PRs do Dependabot rodam qualidade e segurança, mas **pulam o build Android**. O Dependabot abre no máximo um PR agrupado por mês para dependências e outro para as actions.
- Acompanhe em **Settings (da sua conta) → Billing and licensing → Usage**.

### Como garantir que nunca haverá cobrança

Em **Settings (da sua conta) → Billing and licensing → Budgets and alerts**, confira o orçamento do **Actions**: valor **US$ 0** com **"Stop usage when budget limit is reached"** marcado. Assim, quando os 2.000 minutos acabarem, os workflows param até o mês seguinte, em vez de gerar cobrança. Se não houver forma de pagamento cadastrada, o GitHub já bloqueia o uso extra.

## 9. Ferramentas gratuitas usadas

| Ferramenta | O que verifica |
|---|---|
| TypeScript (`npm run typecheck`) | Erros de tipo |
| ESLint (`npm run lint`) | Padrões e problemas de código |
| Jest (`npm run test:ci`) | Testes automatizados, inclusive a configuração do app (`appConfig.test.ts`) |
| Gitleaks | Senhas, chaves e tokens commitados por engano, em todo o histórico |
| `npm audit` | Vulnerabilidades conhecidas nas dependências de produção: **crítica bloqueia** o PR, **alta** gera aviso |
| Dependabot | Abre PRs com atualizações de dependências e de actions |
| actionlint | Valida os workflows (rode localmente: `actionlint`) |

O **CodeQL** (análise de segurança do próprio GitHub) só é gratuito em repositórios públicos, por isso não está incluído.
