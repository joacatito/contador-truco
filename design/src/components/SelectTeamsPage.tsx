import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import AdBanner from './AdBanner';
import RankingModal from './RankingModal';

interface Team {
  id: string;
  name: string;
}

export default function SelectTeamsPage() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam1, setSelectedTeam1] = useState<Team | null>(null);
  const [selectedTeam2, setSelectedTeam2] = useState<Team | null>(null);
  const [showRanking, setShowRanking] = useState(false);

  useEffect(() => {
    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) {
      const parsedTeams = JSON.parse(savedTeams);
      setTeams(parsedTeams);
      // Seleciona os dois primeiros por padrão
      if (parsedTeams.length >= 2) {
        setSelectedTeam1(parsedTeams[0]);
        setSelectedTeam2(parsedTeams[1]);
      }
    } else {
      // Se não houver times salvos, cria times padrão
      const defaultTeams = [
        { id: '1', name: 'Time 1' },
        { id: '2', name: 'Time 2' },
      ];
      setTeams(defaultTeams);
      setSelectedTeam1(defaultTeams[0]);
      setSelectedTeam2(defaultTeams[1]);
      localStorage.setItem('teams', JSON.stringify(defaultTeams));
    }
  }, []);

  const handleSelectTeam1 = (team: Team) => {
    if (selectedTeam1?.id === team.id) {
      setSelectedTeam1(null);
    } else {
      setSelectedTeam1(team);
      if (selectedTeam2?.id === team.id) {
        setSelectedTeam2(null);
      }
    }
  };

  const handleSelectTeam2 = (team: Team) => {
    if (selectedTeam2?.id === team.id) {
      setSelectedTeam2(null);
    } else {
      setSelectedTeam2(team);
      if (selectedTeam1?.id === team.id) {
        setSelectedTeam1(null);
      }
    }
  };

  const handleNext = () => {
    if (selectedTeam1 && selectedTeam2) {
      localStorage.setItem('currentTeam1', JSON.stringify(selectedTeam1));
      localStorage.setItem('currentTeam2', JSON.stringify(selectedTeam2));
      navigate('/jogo');
    }
  };

  const getAvailableTeamsForColumn = (column: 1 | 2) => {
    if (column === 1) {
      return teams.filter(team => team.id !== selectedTeam2?.id);
    } else {
      return teams.filter(team => team.id !== selectedTeam1?.id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1a5f3a] text-white">
      {/* Header com botão voltar */}
      <div className="p-4 flex items-center justify-between border-b border-[#2a7f4a]">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/gerenciar-times')}
            className="p-2 hover:bg-[#2a7f4a] rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-[#ffd700]" />
          </button>
          <h1 className="text-2xl text-[#ffd700] ml-4">Selecionar Times</h1>
        </div>
        <button
          onClick={() => setShowRanking(true)}
          className="p-2 hover:bg-[#2a7f4a] rounded-lg transition-colors"
        >
          <Trophy size={24} className="text-[#ffd700]" />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-xl text-center text-white mb-6">
            Escolha os dois times que vão jogar:
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Coluna Time 1 */}
            <div>
              <h3 className="text-lg text-[#ffd700] mb-3 text-center">Time 1</h3>
              <div className="space-y-2">
                {getAvailableTeamsForColumn(1).map((team) => (
                  <button
                    key={team.id}
                    onClick={() => handleSelectTeam1(team)}
                    className={`w-full p-4 rounded-lg text-lg transition-all ${
                      selectedTeam1?.id === team.id
                        ? 'bg-[#ffd700] text-[#1a5f3a] shadow-lg scale-105'
                        : 'bg-[#2a7f4a] text-white hover:bg-[#3a8f5a]'
                    }`}
                  >
                    {team.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Coluna Time 2 */}
            <div>
              <h3 className="text-lg text-[#ffd700] mb-3 text-center">Time 2</h3>
              <div className="space-y-2">
                {getAvailableTeamsForColumn(2).map((team) => (
                  <button
                    key={team.id}
                    onClick={() => handleSelectTeam2(team)}
                    className={`w-full p-4 rounded-lg text-lg transition-all ${
                      selectedTeam2?.id === team.id
                        ? 'bg-[#ffd700] text-[#1a5f3a] shadow-lg scale-105'
                        : 'bg-[#2a7f4a] text-white hover:bg-[#3a8f5a]'
                    }`}
                  >
                    {team.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedTeam1 || !selectedTeam2}
            className={`w-full py-4 px-6 rounded-xl text-xl flex items-center justify-center gap-3 transition-colors shadow-lg ${
              selectedTeam1 && selectedTeam2
                ? 'bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a]'
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
          >
            Iniciar Jogo
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Banner de anúncio no rodapé */}
      <AdBanner size="320x50" />

      {/* Modal de Ranking */}
      {showRanking && <RankingModal onClose={() => setShowRanking(false)} />}
    </div>
  );
}