import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import RulesPage from './components/RulesPage';
import SelectManilhaPage from './components/SelectManilhaPage';
import ManageTeamsPage from './components/ManageTeamsPage';
import SelectTeamsPage from './components/SelectTeamsPage';
import GamePage from './components/GamePage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1a5f3a]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/regras" element={<RulesPage />} />
          <Route path="/novo-jogo" element={<SelectManilhaPage />} />
          <Route path="/gerenciar-times" element={<ManageTeamsPage />} />
          <Route path="/selecionar-times" element={<SelectTeamsPage />} />
          <Route path="/jogo" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
}
