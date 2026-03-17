import React from "react";
import "./Courses.css";
import { Search, Clock, ChevronRight,  Home, BookOpen, FileText, User } from "lucide-react";

const Courses: React.FC = () => {
  return (
    <div className="courses-page-wrapper">
      <header className="courses-topbar">
        <div className="courses-container courses-topbar-inner">
          <div className="courses-logo-group">
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 8L12 20V44L32 56L52 44V20L32 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M32 32V56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M32 32L12 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M32 32L52 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="32" cy="32" r="4" fill="currentColor"/>
            </svg>
            <span className="courses-app-name">CareerGraph</span>
          </div>
        </div>
      </header>

      <main className="courses-container">
        <div className="courses-page-header">
          <h2 className="courses-main-title">Cursos</h2>
          <div className="courses-search-box">
            <Search size={18} color="#888" />
            <input placeholder="Buscar cursos..." />
          </div>
        </div>

        <h3 className="courses-section-subtitle">Todos os cursos</h3>
        
        <div className="courses-grid">
          <div className="courses-card">
            <div className="courses-card-content">
              <h4>Fundamentos de Python</h4>
              <p>Aprenda os fundamentos da programação com Python, uma das linguagens mais populares do mercado.</p>

              <div className="courses-meta">
                <span className="courses-duration"><Clock size={14}/> 8 semanas</span>
                <span className="courses-level">Iniciante</span>
              </div>

              <div className="courses-tags">
                <span>python</span>
                <span>backend</span>
              </div>
            </div>
            <button className="courses-btn-offwhite">
              Ver detalhes <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="courses-card">
            <div className="courses-card-content">
              <h4 className="courses-highlight">React & Frontend</h4>
              <p>Domine React e construa interfaces modernas e responsivas para aplicações web de alto nível.</p>

              <div className="courses-meta">
                <span className="courses-duration"><Clock size={14}/> 10 semanas</span>
                <span className="courses-level">Intermediário</span>
              </div>

              <div className="courses-tags">
                <span>react</span>
                <span>frontend</span>
              </div>
            </div>
            <button className="courses-btn-offwhite">
              Ver detalhes <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>
      <nav className="dash-bottom-nav">
        <div className="dash-nav-item"><Home size={20}/> <span>Home</span></div>
        <div className="dash-nav-item dash-active"><BookOpen size={20}/> <span>Cursos</span></div>
        <div className="dash-nav-item"><FileText size={20}/> <span>Tutoriais</span></div>
        <div className="dash-nav-item"><User size={20}/> <span>Perfil</span></div>
      </nav>
    </div>
  );
};

export default Courses;