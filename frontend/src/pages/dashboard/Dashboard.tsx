import React from "react";
import "./Dashboard.css";
import { Home, BookOpen, FileText, User, TrendingUp, Book, ChevronRight } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="dash-page-wrapper">
      <header className="dash-topbar">
        <div className="dash-container dash-topbar-inner">
          <div className="dash-logo-group">
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 8L12 20V44L32 56L52 44V20L32 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M32 32V56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M32 32L12 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M32 32L52 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="32" cy="32" r="4" fill="currentColor"/>
            </svg>
            <span className="dash-app-name">CareerGraph</span>
          </div>
        </div>
      </header>

      <main className="dash-container">
        <div className="dash-welcome">
          <h2 className="dash-title">Bem-vindo de volta!</h2>
          <p className="dash-subtitle">Continue sua jornada de aprendizado</p>
        </div>

        <div className="dash-grid">
          <div className="dash-card">
            <div className="dash-icon-box dash-blue">
              <TrendingUp size={20} color="#2563eb" />
            </div>
            <h3 className="dash-card-title">Refazer Questionário</h3>
            <p className="dash-card-text">Atualize suas preferências e obtenha novas recomendações personalizadas.</p>
            <button className="dash-btn-offwhite">
              Começar quiz <ChevronRight size={16} />
            </button>
          </div>

          <div className="dash-card">
            <div className="dash-icon-box dash-yellow">
              <Book size={20} color="#d97706" />
            </div>
            <h3 className="dash-card-title">Explorar Cursos</h3>
            <p className="dash-card-text">Navegue por nossa biblioteca completa de cursos em tecnologia.</p>
            <button className="dash-btn-offwhite">
              Ver cursos <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>

      <nav className="dash-bottom-nav">
        <div className="dash-nav-item dash-active"><Home size={20}/> <span>Home</span></div>
        <div className="dash-nav-item"><BookOpen size={20}/> <span>Cursos</span></div>
        <div className="dash-nav-item"><FileText size={20}/> <span>Tutoriais</span></div>
        <div className="dash-nav-item"><User size={20}/> <span>Perfil</span></div>
      </nav>
    </div>
  );
};

export default Dashboard;