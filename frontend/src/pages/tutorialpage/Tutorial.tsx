import React from "react";
import "./Tutorial.css";
import { Home, BookOpen, FileText, User, Bookmark, ExternalLink, Youtube, Award, GraduationCap, Briefcase } from "lucide-react";
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

            <main className="tut-container" style={{ paddingBottom: '100px' }}>
                <div className="tut-page-header" style={{ marginBottom: '24px' }}>
                    <h2 className="tut-main-title">Guia de Carreira & Estudos</h2>
                    <p className="courses-section-subtitle" style={{ margin: 0 }}>
                        Tudo o que você precisa para se preparar para as provas e conquistar sua primeira vaga em TI.
                    </p>
                </div>

                {/* SEÇÃO 1: VESTIBULARES E ENEM */}
                <section className="tut-section" style={{ marginBottom: '40px' }}>
                    <div className="tut-section-header" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <GraduationCap size={24} color="#2563eb" />
                        <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Ingresso na Faculdade (ENEM e Vestibulares)</h3>
                    </div>

                    <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100%, 1fr))', gap: '20px' }}>

                        {/* CARD ENEM */}
                        <div className="courses-card" style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e4e2' }}>
                            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'start', width: '100%' }}>
                                <div style={{ flex: 1 }}>
                                    <span className="details-badge" style={{ background: '#fef3c7', color: '#d97706' }}>Nacional</span>
                                    <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '8px 0' }}>ENEM - Guia Prático de Estudos</h4>
                                    <p className="courses-card-p" style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
                                        O Exame Nacional do Ensino Médio é a maior ferramenta de acesso ao ensino superior no Brasil através do SISU, ProUni e FIES. Entenda o modelo de matriz de competências e como focar sua rotina do absoluto zero.
                                    </p>
                                    <div className="courses-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                        <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>TRI (Teoria de Resposta ao Item)</span>
                                        <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>Redação Nota 1000</span>
                                        <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>Simulados</span>
                                    </div>
                                </div>
                            </div>
                            <a href="https://www.youtube.com/watch?v=EjJqmLGvBlA" target="_blank" rel="noopener noreferrer" className="courses-btn-offwhite" style={{ textDecoration: 'none' }}>
                                <Youtube size={18} color="#dc2626" /> Assistir Guia Completo do ENEM
                            </a>
                        </div>

                        {/* CARD VESTIBULARES PAULISTAS */}
                        <div className="courses-card" style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e4e2' }}>
                            <div>
                                <span className="details-badge" style={{ background: '#ecfdf5', color: '#059669' }}>São Paulo</span>
                                <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '8px 0' }}>Estratégia para Fuvest, Unicamp e Unesp</h4>
                                <p className="courses-card-p" style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
                                    Se o seu objetivo são as universidades públicas do estado de SP (USP, Unicamp e Unesp), você precisa estudar com base em maratonas de questões específicas dessas bancas. Descubra os conteúdos mais incidentes e técnicas de segunda fase.
                                </p>
                                <div className="courses-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                    <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>Fuvest (USP)</span>
                                    <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>Unicamp</span>
                                    <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>Provas Anteriores</span>
                                </div>
                            </div>
                            <a href="https://www.youtube.com/watch?v=9LuKBn3Pr_o" target="_blank" rel="noopener noreferrer" className="courses-btn-offwhite" style={{ textDecoration: 'none' }}>
                                <Youtube size={18} color="#dc2626" /> Ver Maratona de Questões e Dicas
                            </a>
                        </div>

                    </div>
                </section>

                {/* SEÇÃO 2: CURRÍCULO E MERCADO DE TRABALHO */}
                <section className="tut-section">
                    <div className="tut-section-header" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <Briefcase size={24} color="#2563eb" />
                        <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Inserção no Mercado (Currículo e Primeiro Emprego)</h3>
                    </div>

                    <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100%, 1fr))', gap: '20px' }}>

                        {/* CARD CURRICULO COMPLETO */}
                        <div className="courses-card" style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e4e2' }}>
                            <div>
                                <span className="details-badge" style={{ background: '#eff6ff', color: '#2563eb' }}>Carreira</span>
                                <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '8px 0' }}>Currículo do Zero para Jovem Aprendiz e Estágio</h4>
                                <p className="courses-card-p" style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
                                    Não tem experiência profissional anterior? O segredo está em destacar suas qualificações complementares, habilidades humanas, projetos escolares e cursos extracurriculares. Aprenda as formatações limpas (fontes, tamanhos e cores) preferidas pelos recrutadores.
                                </p>
                                <div className="courses-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                    <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>Primeiro Emprego</span>
                                    <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>Modelo Clean</span>
                                    <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>Formação Complementar</span>
                                </div>
                            </div>
                            <a href="https://www.youtube.com/watch?v=PfXB2MIn91k" target="_blank" rel="noopener noreferrer" className="courses-btn-offwhite" style={{ textDecoration: 'none' }}>
                                <Youtube size={18} color="#dc2626" /> Ver Tutorial de Como Montar seu CV
                            </a>
                        </div>

                        {/* CARD FOCO EM TECNOLOGIA */}
                        <div className="courses-card" style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e4e2' }}>
                            <div>
                                <span className="details-badge" style={{ background: '#f5f3ff', color: '#7c3aed' }}>Tecnologia</span>
                                <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '8px 0' }}>Destacando-se na Área de TI sem Experiência</h4>
                                <p className="courses-card-p" style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
                                    Para vagas iniciais de suporte, infraestrutura ou desenvolvimento, o recrutador avalia sua busca por conhecimento. Descubra como inserir certificados de cursos livres presenciais ou digitais (como os do CareerGraph) para construir um portfólio de peso.
                                </p>
                                <div className="courses-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                    <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>Cursos Online</span>
                                    <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>Habilidades de TI</span>
                                    <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>Destaque nos Processos</span>
                                </div>
                            </div>
                            <a href="https://www.youtube.com/watch?v=SvtyU2-xGEs" target="_blank" rel="noopener noreferrer" className="courses-btn-offwhite" style={{ textDecoration: 'none' }}>
                                <Youtube size={18} color="#dc2626" /> Como Destacar Cursos de TI no Word
                            </a>
                        </div>

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