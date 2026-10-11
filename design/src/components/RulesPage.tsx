import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AdBanner from './AdBanner';

export default function RulesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#1a5f3a] text-white">
      {/* Header com botão voltar */}
      <div className="p-4 flex items-center border-b border-[#2a7f4a]">
        <button
          onClick={() => navigate('/sobre')}
          className="p-2 hover:bg-[#2a7f4a] rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-[#ffd700]" />
        </button>
        <h1 className="text-2xl text-[#ffd700] ml-4">Regras do Truco</h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto p-6 pb-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <section>
            <h2 className="text-xl text-[#ffd700] mb-3">Regras Principais</h2>
            <ul className="space-y-3 text-[#e0e0e0]">
              <li className="flex gap-3">
                <span className="text-[#ffd700]">•</span>
                <span>A primeira carta é sempre para o "mão" (quem começa a rodada)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffd700]">•</span>
                <span>A última carta é sempre para o "pé" (último a receber)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffd700]">•</span>
                <span>Se for cortar (dividir o baralho), não pode embaralhar mais de 3 vezes</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffd700]">•</span>
                <span>Cada jogador recebe 3 cartas</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffd700]">•</span>
                <span>Quem vence 2 das 3 rodadas ganha a mão e marca ponto</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffd700]">•</span>
                <span>Se empatar a primeira, quem ganhar a segunda leva</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffd700]">•</span>
                <span>Pode-se "trucar" (aumentar a aposta) durante a rodada</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-[#ffd700] mb-3">Valores das Cartas (menor para maior)</h2>
            <p className="text-[#e0e0e0] mb-2">Ordem crescente de força:</p>
            <p className="text-[#e0e0e0] bg-[#2a7f4a] p-3 rounded-lg">
              4 &lt; 5 &lt; 6 &lt; 7 &lt; Q (dama) &lt; J (valete) &lt; K (rei) &lt; A (ás) &lt; 2 &lt; 3
            </p>
          </section>

          <section>
            <h2 className="text-xl text-[#ffd700] mb-3">Manilhas</h2>
            <p className="text-[#e0e0e0] mb-4">
              As manilhas são as cartas mais fortes do jogo. Existem dois tipos:
            </p>

            <div className="space-y-4">
              <div className="bg-[#2a7f4a] p-4 rounded-lg">
                <h3 className="text-lg text-[#ffd700] mb-2">Manilha Velha (Fixa)</h3>
                <p className="text-[#e0e0e0] mb-3">
                  As manilhas são sempre as mesmas, nesta ordem de força:
                </p>
                <ol className="space-y-2 text-[#e0e0e0]">
                  <li><span className="text-[#ffd700]">1º</span> 4 de Paus (Zap)</li>
                  <li><span className="text-[#ffd700]">2º</span> 7 de Copas</li>
                  <li><span className="text-[#ffd700]">3º</span> Ás de Espadas (Espadilha)</li>
                  <li><span className="text-[#ffd700]">4º</span> 7 de Ouros</li>
                </ol>
                <p className="text-[#90ee90] mt-3 text-sm">Jogo vai até 15 pontos</p>
              </div>

              <div className="bg-[#2a7f4a] p-4 rounded-lg">
                <h3 className="text-lg text-[#ffd700] mb-2">Truco Paulista (com 4, 5, 6 e 7)</h3>
                <p className="text-[#e0e0e0] mb-3">
                  Uma carta é virada e a carta seguinte vira manilha. Por exemplo, 
                  se virar um 5, o 6 vira manilha. Ordem de naipes:
                </p>
                <ol className="space-y-2 text-[#e0e0e0]">
                  <li><span className="text-[#ffd700]">1º</span> Paus (Zap)</li>
                  <li><span className="text-[#ffd700]">2º</span> Copas</li>
                  <li><span className="text-[#ffd700]">3º</span> Espadas (Espadilha)</li>
                  <li><span className="text-[#ffd700]">4º</span> Ouros</li>
                </ol>
                <p className="text-[#90ee90] mt-3 text-sm">Jogo vai até 12 pontos</p>
              </div>

              <div className="bg-[#2a7f4a] p-4 rounded-lg">
                <h3 className="text-lg text-[#ffd700] mb-2">Truco Mineiro (sem 4, 5, 6 e 7)</h3>
                <p className="text-[#e0e0e0] mb-3">
                  Jogado com baralho espanhol (sem 8, 9, 10 e sem 4, 5, 6, 7). 
                  Uma carta é virada e a seguinte vira manilha. Mesma ordem de naipes:
                </p>
                <ol className="space-y-2 text-[#e0e0e0]">
                  <li><span className="text-[#ffd700]">1º</span> Paus (Zap)</li>
                  <li><span className="text-[#ffd700]">2º</span> Copas</li>
                  <li><span className="text-[#ffd700]">3º</span> Espadas (Espadilha)</li>
                  <li><span className="text-[#ffd700]">4º</span> Ouros</li>
                </ol>
                <p className="text-[#90ee90] mt-3 text-sm">Jogo vai até 12 pontos</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl text-[#ffd700] mb-3">Sistema de Truco</h2>
            <ul className="space-y-3 text-[#e0e0e0]">
              <li className="flex gap-3">
                <span className="text-[#ffd700]">•</span>
                <span><strong>Truco (3 pontos):</strong> Primeira provocação</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffd700]">•</span>
                <span><strong>Seis (6 pontos):</strong> Resposta ao truco</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffd700]">•</span>
                <span><strong>Nove (9 pontos):</strong> Resposta ao seis</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffd700]">•</span>
                <span><strong>Doze (12 pontos):</strong> Resposta final</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffd700]">•</span>
                <span className="text-sm">
                  (Na manilha velha ainda existe o "Quinze" - 15 pontos)
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* Banner de anúncio no rodapé */}
      <AdBanner size="320x50" />
    </div>
  );
}