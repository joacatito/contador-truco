import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';
import AdBanner from './AdBanner';
import RankingModal from './RankingModal';
import InterstitialAd from './InterstitialAd';
import WinnerAnimation from './WinnerAnimation';

interface Team {
  id: string;
  name: string;
}

export default function GamePage() {
  const navigate = useNavigate();
  const [team1, setTeam1] = useState<Team | null>(null);
  const [team2, setTeam2] = useState<Team | null>(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [manilhaType, setManilhaType] = useState<string>('');
  const [maxScore, setMaxScore] = useState(12);
  const [showRanking, setShowRanking] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [showWinnerAnimation, setShowWinnerAnimation] = useState(false);
  const [winnerTeam, setWinnerTeam] = useState<Team | null>(null);
  const [buttonClickCount, setButtonClickCount] = useState(0);

  useEffect(() => {
    const savedTeam1 = localStorage.getItem('currentTeam1');
    const savedTeam2 = localStorage.getItem('currentTeam2');
    const savedManilha = localStorage.getItem('gameManilha');

    if (savedTeam1) setTeam1(JSON.parse(savedTeam1));
    if (savedTeam2) setTeam2(JSON.parse(savedTeam2));
    if (savedManilha) {
      setManilhaType(savedManilha);
      setMaxScore(savedManilha === 'velha' ? 15 : 12);
    }

    // Chance de mostrar interstitial ao iniciar o jogo
    const random = Math.floor(Math.random() * 5) + 1;
    if (random === 1) {
      setShowInterstitial(true);
    }
  }, []);

  const handleScoreChange = (teamNumber: 1 | 2, value: string) => {
    const numValue = parseInt(value) || 0;
    const cappedValue = Math.min(numValue, maxScore);
    
    if (teamNumber === 1) {
      setScore1(cappedValue);
    } else {
      setScore2(cappedValue);
    }

    checkWinner(teamNumber === 1 ? cappedValue : score1, teamNumber === 2 ? cappedValue : score2);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permite: backspace, delete, tab, escape, enter, setas
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    
    // Previne entrada de caracteres não numéricos
    if (!allowedKeys.includes(e.key) && (e.key < '0' || e.key > '9')) {
      e.preventDefault();
    }
  };

  const addPoints = (teamNumber: 1 | 2, points: number) => {
    const currentScore = teamNumber === 1 ? score1 : score2;
    const newScore = Math.min(currentScore + points, maxScore);
    
    if (teamNumber === 1) {
      setScore1(newScore);
    } else {
      setScore2(newScore);
    }

    // Incrementa contador de cliques e verifica se deve mostrar interstitial
    const newCount = buttonClickCount + 1;
    setButtonClickCount(newCount);
    
    if (newCount >= 1 && newCount <= 5 && Math.random() < 0.3) {
      setShowInterstitial(true);
      setButtonClickCount(0);
    }

    checkWinner(teamNumber === 1 ? newScore : score1, teamNumber === 2 ? newScore : score2);
  };

  const checkWinner = (s1: number, s2: number) => {
    if (s1 >= maxScore || s2 >= maxScore) {
      const winner = s1 >= maxScore ? team1 : team2;
      if (winner) {
        updateRanking(winner);
        setWinnerTeam(winner);
        setShowWinnerAnimation(true);
      }
    }
  };

  const updateRanking = (winner: Team) => {
    const savedRanking = localStorage.getItem('ranking');
    let ranking: { [key: string]: { name: string; wins: number } } = {};
    
    if (savedRanking) {
      ranking = JSON.parse(savedRanking);
    }

    if (ranking[winner.id]) {
      ranking[winner.id].wins += 1;
    } else {
      ranking[winner.id] = { name: winner.name, wins: 1 };
    }

    localStorage.setItem('ranking', JSON.stringify(ranking));
  };

  if (!team1 || !team2) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a5f3a] text-white">
      {/* Header com botão voltar */}
      <div className="p-4 flex items-center justify-between border-b border-[#2a7f4a]">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/selecionar-times')}
            className="p-2 hover:bg-[#2a7f4a] rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-[#ffd700]" />
          </button>
          <h1 className="text-xl text-[#ffd700] ml-4">
            {manilhaType === 'velha' ? 'Manilha Velha' : manilhaType === 'paulista' ? 'Truco Paulista' : 'Truco Mineiro'}
          </h1>
        </div>
        <button
          onClick={() => setShowRanking(true)}
          className="p-2 hover:bg-[#2a7f4a] rounded-lg transition-colors"
        >
          <Trophy size={24} className="text-[#ffd700]" />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-4 pb-24">
        <div className="h-full grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Time 1 */}
          <div className="flex flex-col bg-[#2a7f4a] rounded-xl p-4">
            <h2 className="text-2xl text-[#ffd700] text-center mb-4 break-words">{team1.name}</h2>
            
            <div className="flex-1 flex flex-col items-center justify-center mb-4">
              <label className="text-lg mb-2">Pontos:</label>
              <input
                type="number"
                value={score1}
                onChange={(e) => handleScoreChange(1, e.target.value)}
                onKeyDown={handleKeyDown}
                min="0"
                max={maxScore}
                className="w-32 h-32 bg-white text-[#1a5f3a] text-6xl rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ffd700] flex items-center justify-center"
                style={{ textAlign: 'center' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addPoints(1, 1)}
                className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-5 rounded-lg text-xl transition-colors"
              >
                +1
              </button>
              <button
                onClick={() => addPoints(1, 3)}
                className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-5 rounded-lg text-xl transition-colors"
              >
                +3
              </button>
              <button
                onClick={() => addPoints(1, 6)}
                className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-5 rounded-lg text-xl transition-colors"
              >
                +6
              </button>
              <button
                onClick={() => addPoints(1, 9)}
                className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-5 rounded-lg text-xl transition-colors"
              >
                +9
              </button>
              <button
                onClick={() => addPoints(1, 12)}
                className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-5 rounded-lg text-xl transition-colors"
              >
                +12
              </button>
              {manilhaType === 'velha' && (
                <button
                  onClick={() => addPoints(1, 15)}
                  className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-5 rounded-lg text-xl transition-colors"
                >
                  +15
                </button>
              )}
            </div>
          </div>

          {/* Time 2 */}
          <div className="flex flex-col bg-[#2a7f4a] rounded-xl p-4">
            <h2 className="text-2xl text-[#ffd700] text-center mb-4 break-words">{team2.name}</h2>
            
            <div className="flex-1 flex flex-col items-center justify-center mb-4">
              <label className="text-lg mb-2">Pontos:</label>
              <input
                type="number"
                value={score2}
                onChange={(e) => handleScoreChange(2, e.target.value)}
                onKeyDown={handleKeyDown}
                min="0"
                max={maxScore}
                className="w-32 h-32 bg-white text-[#1a5f3a] text-6xl rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ffd700]"
                style={{ textAlign: 'center' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addPoints(2, 1)}
                className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-5 rounded-lg text-xl transition-colors"
              >
                +1
              </button>
              <button
                onClick={() => addPoints(2, 3)}
                className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-5 rounded-lg text-xl transition-colors"
              >
                +3
              </button>
              <button
                onClick={() => addPoints(2, 6)}
                className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-5 rounded-lg text-xl transition-colors"
              >
                +6
              </button>
              <button
                onClick={() => addPoints(2, 9)}
                className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-5 rounded-lg text-xl transition-colors"
              >
                +9
              </button>
              <button
                onClick={() => addPoints(2, 12)}
                className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-5 rounded-lg text-xl transition-colors"
              >
                +12
              </button>
              {manilhaType === 'velha' && (
                <button
                  onClick={() => addPoints(2, 15)}
                  className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-5 rounded-lg text-xl transition-colors"
                >
                  +15
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Banner de anúncio no rodapé */}
      <AdBanner size="320x50" />

      {/* Modal de Ranking */}
      {showRanking && <RankingModal onClose={() => setShowRanking(false)} />}

      {/* Interstitial Ad */}
      {showInterstitial && <InterstitialAd onClose={() => setShowInterstitial(false)} />}

      {/* Animação de Vencedor */}
      {showWinnerAnimation && winnerTeam && (
        <WinnerAnimation 
          winnerName={winnerTeam.name} 
          onComplete={() => {
            setShowWinnerAnimation(false);
            setShowInterstitial(true);
            setTimeout(() => {
              navigate('/selecionar-times');
            }, 3000);
          }} 
        />
      )}
    </div>
  );
}