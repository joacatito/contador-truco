import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import AdBanner from './AdBanner';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#1a5f3a] text-white">
      {/* Header com botão voltar */}
      <div className="p-4 flex items-center border-b border-[#2a7f4a]">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-[#2a7f4a] rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-[#ffd700]" />
        </button>
        <h1 className="text-2xl text-[#ffd700] ml-4">Sobre</h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto p-6 pb-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <section>
            <h2 className="text-xl text-[#ffd700] mb-3">Sobre o App</h2>
            <p className="text-[#e0e0e0] leading-relaxed">
              O Contador de Truco é um aplicativo simples e prático para você e seus amigos 
              contarem os pontos durante as partidas de truco. Desenvolvido pensando na 
              simplicidade e facilidade de uso, perfeito para usar no boteco!
            </p>
          </section>

          <section>
            <h2 className="text-xl text-[#ffd700] mb-3">O que é Truco?</h2>
            <p className="text-[#e0e0e0] leading-relaxed mb-3">
              O Truco é um dos jogos de cartas mais populares do Brasil. Jogado com baralho 
              espanhol (ou comum sem 8, 9 e 10), o jogo combina estratégia, blefe e muita 
              diversão entre amigos.
            </p>
            <p className="text-[#e0e0e0] leading-relaxed">
              O objetivo é fazer pontos vencendo as rodadas (ou "mãos") e ser o primeiro 
              a chegar a 12 pontos (ou 15 na manilha velha).
            </p>
          </section>

          <section>
            <h2 className="text-xl text-[#ffd700] mb-3">História do Truco</h2>
            <p className="text-[#e0e0e0] leading-relaxed">
              De origem espanhola, o Truco chegou ao Brasil através dos imigrantes e se 
              tornou parte da cultura popular, especialmente no Sul e Sudeste. Cada região 
              desenvolveu suas próprias variações e regras, tornando o jogo ainda mais rico.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-[#ffd700] mb-3">Diferenças: SP vs MG</h2>
            <div className="space-y-4">
              <div className="bg-[#2a7f4a] p-4 rounded-lg">
                <h3 className="text-lg text-[#ffd700] mb-2">São Paulo</h3>
                <p className="text-[#e0e0e0]">
                  Em SP, o mais comum é o Truco Paulista com manilha "nova" (vira). 
                  A carta virada determina as manilhas. Jogo vai até 12 pontos.
                </p>
              </div>
              <div className="bg-[#2a7f4a] p-4 rounded-lg">
                <h3 className="text-lg text-[#ffd700] mb-2">Minas Gerais</h3>
                <p className="text-[#e0e0e0]">
                  Em MG, é mais comum o Truco Mineiro com manilhas fixas. 
                  O jogo costuma ser mais "mentiroso" e vai até 12 pontos também.
                </p>
              </div>
            </div>
          </section>

          {/* Botão para Regras */}
          <button
            onClick={() => navigate('/regras')}
            className="w-full bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-4 px-6 rounded-xl text-xl flex items-center justify-center gap-3 transition-colors shadow-lg"
          >
            <BookOpen size={24} />
            Ver Regras Completas
          </button>
        </div>
      </div>

      {/* Banner de anúncio no rodapé */}
      <AdBanner size="320x50" />
    </div>
  );
}
