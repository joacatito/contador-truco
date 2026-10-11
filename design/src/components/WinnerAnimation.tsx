import { useEffect } from 'react';
import { Trophy, Star } from 'lucide-react';

interface WinnerAnimationProps {
  winnerName: string;
  onComplete: () => void;
}

export default function WinnerAnimation({ winnerName, onComplete }: WinnerAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="text-center animate-bounce-in">
        {/* Estrelas decorativas */}
        <div className="flex justify-center gap-8 mb-6">
          <Star size={48} className="text-[#ffd700] animate-pulse" fill="#ffd700" />
          <Star size={64} className="text-[#ffd700] animate-pulse" fill="#ffd700" style={{ animationDelay: '0.2s' }} />
          <Star size={48} className="text-[#ffd700] animate-pulse" fill="#ffd700" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Troféu */}
        <div className="mb-6">
          <Trophy size={120} className="text-[#ffd700] mx-auto animate-pulse" />
        </div>

        {/* Texto de vitória */}
        <div className="space-y-4">
          <h2 className="text-4xl text-white">🎉 Fim de Jogo! 🎉</h2>
          <div className="bg-[#ffd700] text-[#1a5f3a] px-8 py-6 rounded-2xl shadow-2xl mx-auto max-w-md">
            <p className="text-2xl mb-2">Vencedor:</p>
            <p className="text-5xl break-words">{winnerName}</p>
          </div>
        </div>

        {/* Confetes */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                backgroundColor: ['#ffd700', '#ff6b6b', '#4ecdc4', '#95e1d3', '#f38181'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        .animate-confetti {
          animation: confetti linear infinite;
        }
      `}</style>
    </div>
  );
}
