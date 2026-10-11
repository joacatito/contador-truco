import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import AdBanner from './AdBanner';

export default function SelectManilhaPage() {
  const navigate = useNavigate();
  const [selectedManilha, setSelectedManilha] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedManilha) {
      localStorage.setItem('gameManilha', selectedManilha);
      navigate('/gerenciar-times');
    }
  };

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
        <h1 className="text-2xl text-[#ffd700] ml-4">Novo Jogo - Tipo de Manilha</h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-center p-6 pb-32">
        <div className="max-w-md mx-auto w-full space-y-6">
          <h2 className="text-2xl text-center text-white mb-8">
            Escolha o tipo de manilha:
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => setSelectedManilha('velha')}
              className={`w-full p-6 rounded-xl transition-all ${
                selectedManilha === 'velha'
                  ? 'bg-[#ffd700] text-[#1a5f3a] shadow-lg scale-105'
                  : 'bg-[#2a7f4a] text-white hover:bg-[#3a8f5a]'
              }`}
            >
              <div className="text-3xl">Manilha Velha</div>
              <div className="text-lg mt-1 opacity-80">Até 15 pontos</div>
            </button>

            <button
              onClick={() => setSelectedManilha('paulista')}
              className={`w-full p-6 rounded-xl transition-all ${
                selectedManilha === 'paulista'
                  ? 'bg-[#ffd700] text-[#1a5f3a] shadow-lg scale-105'
                  : 'bg-[#2a7f4a] text-white hover:bg-[#3a8f5a]'
              }`}
            >
              <div className="text-3xl">Manilha Nova / Truco Paulista</div>
              <div className="text-lg mt-1 opacity-80">Até 12 pontos</div>
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedManilha}
            className={`w-full py-4 px-6 rounded-xl text-xl flex items-center justify-center gap-3 transition-colors shadow-lg mt-8 ${
              selectedManilha
                ? 'bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a]'
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
          >
            Próximo
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Banner de anúncio no rodapé */}
      <AdBanner size="320x50" />
    </div>
  );
}