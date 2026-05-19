import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Home, BookOpen, FileText, User, Mail, UserCircle, Lock, ChevronRight, Loader2 } from "lucide-react";
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../../api.ts'; // Lembre-se de ajustar o caminho se necessário

// Interface espelhando o record ProfileDTO do backend
interface ProfileDTO {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate(); // <-- Inicia o hook de navegação

  // Estados para gerenciar os dados, o carregamento e possíveis erros
  const [profile, setProfile] = useState<ProfileDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito executado assim que a página é carregada
  useEffect(() => {
    // Certifique-se de que a rota corresponde ao seu Spring Boot
    api.get("/profile")
        .then((response) => {
          setProfile(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar dados do perfil:", err);
          setError("Não foi possível carregar as informações do perfil.");
          setIsLoading(false);
        });
  }, []);

  // Função para lidar com o logout
  const handleLogout = () => {
    // 1. Apaga o token do armazenamento local
    localStorage.removeItem('token');

    // 2. Redireciona o usuário de volta para a tela de login
    navigate('/login');
  };

  return (
      <div className="prof-page-wrapper">
        <header className="prof-topbar">
          <div className="prof-container prof-topbar-inner">
            <div className="prof-logo-group">
              <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 8L12 20V44L32 56L52 44V20L32 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M32 32V56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M32 32L12 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M32 32L52 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="32" cy="32" r="4" fill="currentColor"/>
              </svg>
              <span className="prof-app-name">CareerGraph</span>
            </div>
          </div>
        </header>

        <main className="prof-container">
          <section className="prof-card">
            <div className="prof-card-header">
              <h2 className="prof-section-title">Informações Pessoais</h2>
              <button className="prof-btn-offwhite-sm" disabled={isLoading}>
                Editar perfil
              </button>
            </div>

            <div className="prof-info-list">
              <div className="prof-info-item">
                <label className="prof-label">
                  <UserCircle size={16} /> Nome completo
                </label>
                <div className="prof-display-field">
                  {isLoading ? (
                      <span style={{ color: '#999', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Loader2 size={16} className="animate-spin" /> Carregando...
                  </span>
                  ) : error ? (
                      <span style={{ color: '#dc2626' }}>{error}</span>
                  ) : (
                      profile?.name
                  )}
                </div>
              </div>

              <div className="prof-info-item">
                <label className="prof-label">
                  <Mail size={16} /> E-mail
                </label>
                <div className="prof-display-field">
                  {isLoading ? (
                      <span style={{ color: '#999' }}>...</span>
                  ) : error ? (
                      <span style={{ color: '#dc2626' }}>Erro</span>
                  ) : (
                      profile?.email
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="prof-card">
            <h2 className="prof-section-title">Segurança</h2>
            <div className="prof-options-list">
              <button className="prof-option-button">
                <div className="prof-option-content">
                  <Lock size={18} />
                  <span>Alterar senha</span>
                </div>
                <ChevronRight size={18} color="#999" />
              </button>
            </div>
          </section>

          {/* O BOTÃO AGORA ESTÁ CONECTADO À FUNÇÃO! */}
          <button className="prof-btn-logout" onClick={handleLogout}>
            Sair da conta
          </button>
        </main>

        <nav className="dash-bottom-nav">
          <NavLink to="/dash" className={({ isActive }) => isActive ? "dash-nav-item dash-active" : "dash-nav-item"}>
            <Home size={20}/> <span>Home</span>
          </NavLink>

          <NavLink to="/courses" className={({ isActive }) => isActive ? "dash-nav-item dash-active" : "dash-nav-item"}>
            <BookOpen size={20}/> <span>Cursos</span>
          </NavLink>

          <NavLink to="/tutorial" className={({ isActive }) => isActive ? "dash-nav-item dash-active" : "dash-nav-item"}>
            <FileText size={20}/> <span>Tutoriais</span>
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) => isActive ? "dash-nav-item dash-active" : "dash-nav-item"}>
            <User size={20}/> <span>Perfil</span>
          </NavLink>
        </nav>
      </div>
  );
};

export default Profile;