#!/usr/bin/env bash
# Refuses a store build that would show Google's test ads or no ads at all:
# the platform's AdMob App ID in app.json must be a real one, and no test ad unit may be hard-coded in src/.
# Usage: check-admob.sh android|ios
set -euo pipefail

platform="$1"
test_publisher='ca-app-pub-3940256099942544'

app_id=$(node -p "(require('./app.json')['react-native-google-mobile-ads'] || {})['${platform}_app_id'] || ''")
if [ -z "$app_id" ]; then
  echo "::error title=AdMob::app.json não tem react-native-google-mobile-ads.${platform}_app_id. Coloque o App ID real (AdMob → Apps → Configurações do app)."
  exit 1
fi
if [[ "$app_id" == "$test_publisher"* ]]; then
  echo "::error title=AdMob::app.json ainda tem o App ID de teste do Google para ${platform}. Coloque o App ID real (AdMob → Apps → Configurações do app)."
  exit 1
fi

if grep -rln "$test_publisher" src/; then
  echo "::error title=AdMob::Os arquivos acima têm um bloco de anúncios de teste do Google escrito direto no código. Use TestIds só atrás de __DEV__."
  exit 1
fi
echo "AdMob ($platform): App ID real $app_id e nenhum bloco de teste no código."
