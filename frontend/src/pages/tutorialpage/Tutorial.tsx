import React from "react";
import "./Tutorial.css";
import { Home, BookOpen, FileText, User, Bookmark, ExternalLink } from "lucide-react";
import { NavLink } from 'react-router-dom';

const Tutorial: React.FC = () => {
  return (
    <div className="tut-page-wrapper">
      <header className="tut-topbar">
        <div className="tut-container tut-topbar-inner">
          <div className="tut-logo-group">
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 8L12 20V44L32 56L52 44V20L32 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M32 32V56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M32 32L12 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M32 32L52 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="32" cy="32" r="4" fill="currentColor"/>
            </svg>
            <span className="tut-app-name">CareerGraph</span>
          </div>
        </div>
      </header>

      <main className="tut-container">
        <h2 className="tut-main-title">Tutoriais</h2>
        <section className="tut-section">
          <div className="tut-section-header">
            <Bookmark size={20} className="tut-icon-blue" />
            <h3>Informações sobre Vestibular</h3>
          </div>

          <div className="tut-card">
            <h4 className="tut-card-title">ENEM</h4>
            <p className="tut-card-text">Exame Nacional do Ensino Médio - Principal porta de entrada para universidades federais.</p>
            <div className="tut-tag-group">
              <span className="tut-tag">Linguagens</span>
              <span className="tut-tag">Matemática</span>
              <span className="tut-tag">Ciências Humanas</span>
              <span className="tut-tag">Ciências da Natureza</span>
              <span className="tut-tag">Redação</span>
            </div>
          </div>

          <div className="tut-card">
            <h4 className="tut-card-title">Vestibulares Tradicionais</h4>
            <p className="tut-card-text">Processos seletivos específicos de cada universidade.</p>
            <div className="tut-tag-group">
              <span className="tut-tag">FUVEST (USP)</span>
              <span className="tut-tag">UNICAMP</span>
              <span className="tut-tag">UNESP</span>
              <span className="tut-tag">PUC</span>
            </div>
          </div>
        </section>

        <section className="tut-section">
          <div className="tut-section-header">
            <FileText size={20} className="tut-icon-blue" />
            <h3>Como Criar seu Currículo (CV)</h3>
          </div>
          
          <div className="tut-card-links">
             <p className="tut-intro-text">Um bom currículo é essencial para conseguir entrevistas. Confira nossos recursos:</p>
             
             <a href="#" className="tut-link-item">
                <div className="tut-link-icon"><ExternalLink size={18} /></div>
                <div className="tut-link-content">
                    <span className="tut-link-title">Como Fazer um Currículo Profissional</span>
                    <span className="tut-link-desc">Guia completo com templates no Canva</span>
                </div>
             </a>

             <a href="#" className="tut-link-item">
                <div className="tut-link-icon"><ExternalLink size={18} /></div>
                <div className="tut-link-content">
                    <span className="tut-link-title">Currículo para Área de Tecnologia</span>
                    <span className="tut-link-desc">Dicas específicas para profissionais de TI</span>
                </div>
             </a>
          </div>
        </section>
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

export default Tutorial;