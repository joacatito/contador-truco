import { useNavigate } from 'react-router-dom';
import { Gamepad2, Info } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import AdBanner from './AdBanner';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#1a5f3a]">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full p-6">
        {/* Logo e Título */}
        <div className="text-center mb-12">
          {/* As 4 Manilhas */}
          <div className="mb-8 flex justify-center items-center gap-4">
            {/* 4 de Paus (Zap) */}
            <div className="transform -rotate-12" style={{ transformOrigin: 'center' }}>
              <svg width="92" height="129" viewBox="0 0 92 129" className="drop-shadow-2xl">
                <rect x="2" y="2" width="88" height="125" rx="6" fill="white" stroke="#333" strokeWidth="2"/>
                {/* Canto superior esquerdo */}
                <text x="7" y="20" style={{ fontSize: '18px', fontWeight: 'bold', fill: '#000' }}>4</text>
                <text x="6" y="36" style={{ fontSize: '20px', fill: '#000' }}>♣</text>
                {/* Centro - 4 paus em formato 2x2 centralizado */}
                <text x="26" y="60" style={{ fontSize: '26px', fill: '#000' }}>♣</text>
                <text x="48" y="60" style={{ fontSize: '26px', fill: '#000' }}>♣</text>
                <text x="26" y="82" style={{ fontSize: '26px', fill: '#000' }}>♣</text>
                <text x="48" y="82" style={{ fontSize: '26px', fill: '#000' }}>♣</text>
                {/* Canto inferior direito invertido */}
                <g transform="rotate(180 46 65.5)">
                  <text x="7" y="20" style={{ fontSize: '18px', fontWeight: 'bold', fill: '#000' }}>4</text>
                  <text x="6" y="36" style={{ fontSize: '20px', fill: '#000' }}>♣</text>
                </g>
              </svg>
            </div>

            {/* 7 de Copas */}
            <div className="transform -rotate-3" style={{ transformOrigin: 'center' }}>
              <svg width="92" height="129" viewBox="0 0 92 129" className="drop-shadow-2xl">
                <rect x="2" y="2" width="88" height="125" rx="6" fill="white" stroke="#333" strokeWidth="2"/>
                {/* Canto superior esquerdo */}
                <text x="7" y="20" style={{ fontSize: '18px', fontWeight: 'bold', fill: '#DC2626' }}>7</text>
                <text x="5" y="36" style={{ fontSize: '18px', fill: '#DC2626' }}>♥</text>
                {/* Centro - 7 copas: padrão 2-1-2-2 com espaçamento correto e centralizado */}
                <text x="27" y="44" style={{ fontSize: '22px', fill: '#DC2626' }}>♥</text>
                <text x="49" y="44" style={{ fontSize: '22px', fill: '#DC2626' }}>♥</text>
                <text x="38" y="60" style={{ fontSize: '22px', fill: '#DC2626' }}>♥</text>
                <text x="27" y="76" style={{ fontSize: '22px', fill: '#DC2626' }}>♥</text>
                <text x="49" y="76" style={{ fontSize: '22px', fill: '#DC2626' }}>♥</text>
                <text x="27" y="94" style={{ fontSize: '22px', fill: '#DC2626' }}>♥</text>
                <text x="49" y="94" style={{ fontSize: '22px', fill: '#DC2626' }}>♥</text>
                {/* Canto inferior direito invertido */}
                <g transform="rotate(180 46 65.5)">
                  <text x="7" y="20" style={{ fontSize: '18px', fontWeight: 'bold', fill: '#DC2626' }}>7</text>
                  <text x="5" y="36" style={{ fontSize: '18px', fill: '#DC2626' }}>♥</text>
                </g>
              </svg>
            </div>

            {/* Ás de Espadas (Espadilha) */}
            <div className="transform rotate-3" style={{ transformOrigin: 'center' }}>
              <svg width="92" height="129" viewBox="0 0 92 129" className="drop-shadow-2xl">
                <rect x="2" y="2" width="88" height="125" rx="6" fill="white" stroke="#333" strokeWidth="2"/>
                {/* Canto superior esquerdo */}
                <text x="7" y="20" style={{ fontSize: '18px', fontWeight: 'bold', fill: '#000' }}>A</text>
                <text x="5" y="36" style={{ fontSize: '20px', fill: '#000' }}>♠</text>
                {/* Centro - Ás grande centralizado */}
                <text x="24" y="82" style={{ fontSize: '52px', fill: '#000' }}>♠</text>
                {/* Canto inferior direito invertido */}
                <g transform="rotate(180 46 65.5)">
                  <text x="7" y="20" style={{ fontSize: '18px', fontWeight: 'bold', fill: '#000' }}>A</text>
                  <text x="5" y="36" style={{ fontSize: '20px', fill: '#000' }}>♠</text>
                </g>
              </svg>
            </div>

            {/* 7 de Ouros */}
            <div className="transform rotate-12" style={{ transformOrigin: 'center' }}>
              <svg width="92" height="129" viewBox="0 0 92 129" className="drop-shadow-2xl">
                <rect x="2" y="2" width="88" height="125" rx="6" fill="white" stroke="#333" strokeWidth="2"/>
                {/* Canto superior esquerdo */}
                <text x="7" y="20" style={{ fontSize: '18px', fontWeight: 'bold', fill: '#DC2626' }}>7</text>
                <text x="5" y="36" style={{ fontSize: '20px', fill: '#DC2626' }}>♦</text>
                {/* Centro - 7 ouros: padrão 2-1-2-2 centralizado */}
                <text x="27" y="44" style={{ fontSize: '22px', fill: '#DC2626' }}>♦</text>
                <text x="49" y="44" style={{ fontSize: '22px', fill: '#DC2626' }}>♦</text>
                <text x="38" y="60" style={{ fontSize: '22px', fill: '#DC2626' }}>♦</text>
                <text x="27" y="76" style={{ fontSize: '22px', fill: '#DC2626' }}>♦</text>
                <text x="49" y="76" style={{ fontSize: '22px', fill: '#DC2626' }}>♦</text>
                <text x="27" y="96" style={{ fontSize: '22px', fill: '#DC2626' }}>♦</text>
                <text x="49" y="96" style={{ fontSize: '22px', fill: '#DC2626' }}>♦</text>
                {/* Canto inferior direito invertido */}
                <g transform="rotate(180 46 65.5)">
                  <text x="7" y="20" style={{ fontSize: '18px', fontWeight: 'bold', fill: '#DC2626' }}>7</text>
                  <text x="5" y="36" style={{ fontSize: '20px', fill: '#DC2626' }}>♦</text>
                </g>
              </svg>
            </div>
          </div>

          <h1 className="text-6xl text-[#ffd700] mb-4 drop-shadow-lg">Contador de Truco</h1>
          <p className="text-[#90ee90] text-2xl">O melhor app para suas partidas!</p>
          <p className="text-white text-lg mt-2">🃏 Jogue com seus amigos!</p>
        </div>

        {/* Botões principais */}
        <div className="w-full space-y-4">
          <button
            onClick={() => navigate('/novo-jogo')}
            className="w-full bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-6 px-8 rounded-xl text-3xl flex items-center justify-center gap-3 transition-all shadow-2xl hover:scale-105 hover:shadow-3xl"
          >
            <Gamepad2 size={36} />
            Novo Jogo
          </button>

          <button
            onClick={() => navigate('/sobre')}
            className="w-full bg-[#daa520] hover:bg-[#f0b840] text-white py-5 px-8 rounded-xl text-2xl flex items-center justify-center gap-3 transition-all shadow-lg hover:scale-105"
          >
            <Info size={28} />
            Sobre
          </button>
        </div>
      </div>

      {/* Banner de anúncio no rodapé */}
      <AdBanner size="320x50" />
    </div>
  );
}