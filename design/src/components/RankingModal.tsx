import { useEffect, useState } from 'react';
import { X, Trophy } from 'lucide-react';

interface RankingEntry {
  id: string;
  name: string;
  wins: number;
}

interface RankingModalProps {
  onClose: () => void;
}

export default function RankingModal({ onClose }: RankingModalProps) {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  useEffect(() => {
    const savedRanking = localStorage.getItem('ranking');
    if (savedRanking) {
      const rankingObj = JSON.parse(savedRanking);
      const rankingArray: RankingEntry[] = Object.keys(rankingObj).map(id => ({
        id,
        name: rankingObj[id].name,
        wins: rankingObj[id].wins,
      }));
      
      // Ordenar por vitórias decrescente
      rankingArray.sort((a, b) => b.wins - a.wins);
      setRanking(rankingArray);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a5f3a] border-4 border-[#ffd700] rounded-xl max-w-md w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a7f4a]">
          <div className="flex items-center gap-3">
            <Trophy size={28} className="text-[#ffd700]" />
            <h2 className="text-2xl text-[#ffd700]">Ranking</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2a7f4a] rounded-lg transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {ranking.length === 0 ? (
            <p className="text-center text-white text-lg py-8">
              Nenhuma partida jogada ainda.
            </p>
          ) : (
            <div className="space-y-2">
              {ranking.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    index === 0
                      ? 'bg-[#ffd700] text-[#1a5f3a]'
                      : 'bg-[#2a7f4a] text-white'
                  }`}
                >
                  <div className={`text-2xl min-w-[40px] text-center ${
                    index === 0 ? 'text-[#1a5f3a]' : 'text-[#ffd700]'
                  }`}>
                    {index + 1}º
                  </div>
                  <div className="flex-1">
                    <div className="text-xl break-words">{entry.name}</div>
                  </div>
                  <div className="text-2xl">
                    {entry.wins} {entry.wins === 1 ? 'vitória' : 'vitórias'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2a7f4a]">
          <button
            onClick={onClose}
            className="w-full bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-3 px-6 rounded-lg text-xl transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
