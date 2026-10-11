import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import AdBanner from './AdBanner';

interface Team {
  id: string;
  name: string;
}

export default function ManageTeamsPage() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    } else {
      // Times padrão
      setTeams([
        { id: '1', name: 'Time 1' },
        { id: '2', name: 'Time 2' },
      ]);
    }
  }, []);

  const saveTeams = (newTeams: Team[]) => {
    setTeams(newTeams);
    localStorage.setItem('teams', JSON.stringify(newTeams));
  };

  const handleAddTeam = () => {
    const newTeam: Team = {
      id: Date.now().toString(),
      name: `Time ${teams.length + 1}`,
    };
    saveTeams([...teams, newTeam]);
  };

  const handleRemoveTeam = (id: string) => {
    if (teams.length > 2) {
      saveTeams(teams.filter(team => team.id !== id));
    }
  };

  const handleTeamNameChange = (id: string, name: string) => {
    saveTeams(teams.map(team => team.id === id ? { ...team, name } : team));
  };

  const handleNext = () => {
    navigate('/selecionar-times');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1a5f3a] text-white">
      {/* Header com botão voltar */}
      <div className="p-4 flex items-center border-b border-[#2a7f4a]">
        <button
          onClick={() => navigate('/novo-jogo')}
          className="p-2 hover:bg-[#2a7f4a] rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-[#ffd700]" />
        </button>
        <h1 className="text-2xl text-[#ffd700] ml-4">Gerenciar Times</h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-xl text-center text-white mb-6">
            Cadastre seus times ou duplas:
          </h2>

          <div className="space-y-3 mb-6">
            {teams.map((team) => (
              <div key={team.id} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="flex-1 bg-white text-[#1a5f3a] px-4 py-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                  placeholder="Nome do time"
                />
                {teams.length > 2 && (
                  <button
                    onClick={() => handleRemoveTeam(team.id)}
                    className="p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleAddTeam}
            className="w-full bg-[#2a7f4a] hover:bg-[#3a8f5a] text-white py-3 px-4 rounded-lg text-lg flex items-center justify-center gap-2 transition-colors mb-6"
          >
            <Plus size={20} />
            Adicionar Time
          </button>

          <div className="bg-[#2a7f4a] p-4 rounded-lg text-sm text-[#e0e0e0] mb-6">
            <p>
              <strong className="text-[#ffd700]">Nota:</strong> Chamamos de "times" pois podem 
              ser duplas ou trios. Cadastre todos os times que costumam jogar juntos, 
              e na próxima tela você escolhe quais dois times vão jogar esta partida.
            </p>
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-[#ffd700] hover:bg-[#ffed4e] text-[#1a5f3a] py-4 px-6 rounded-xl text-xl flex items-center justify-center gap-3 transition-colors shadow-lg"
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
