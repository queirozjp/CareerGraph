import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { ChevronLeft, Home, BookOpen, FileText, User, MapPin, Loader2 } from "lucide-react";
import api from "../../api";
import "./CourseDetails.css"; // 1. ALTERADO: Agora aponta exclusivamente para o CSS de detalhes

interface EducationalInstitution {
    id: number;
    name: string;
    email: string;
    description: string;
}

interface CourseDetailsData {
    id: number;
    name: string;
    shortDescription: string;
    description: string;
    educationalInstitution?: EducationalInstitution[];
}

const CourseDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [course, setCourse] = useState<CourseDetailsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        api.get(`/courses/${id}`)
            .then(res => {
                setCourse(res.data);
            })
            .catch(err => {
                console.error("Erro ao carregar detalhes do curso:", err);
                setError(err.response?.data?.message || "Não foi possível carregar os detalhes do curso.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="details-loading-wrapper">
                <Loader2 size={32} className="animate-spin" color="#2563eb" />
                <p>Carregando informações do curso...</p>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="details-error-wrapper">
                <p>{error || "Curso não encontrado."}</p>
                <button className="courses-btn-offwhite" onClick={() => navigate("/courses")}>
                    <ChevronLeft size={16} /> Voltar para lista
                </button>
            </div>
        );
    }

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

            <main className="courses-container" style={{ paddingBottom: '100px' }}>
                {/* Botão de voltar usando classe limpa */}
                <button className="details-back-btn" onClick={() => navigate("/courses")}>
                    <ChevronLeft size={18} /> Voltar para a lista
                </button>

                {/* Informações Gerais do Curso */}
                <div className="details-main-card">
                    <span className="details-badge">Curso</span>
                    <h2 className="details-course-title">{course.name}</h2>
                    <p className="details-course-short">{course.shortDescription}</p>
                    <hr className="details-divider" />
                    <h3 className="details-section-title">Sobre o que você vai estudar</h3>
                    <p className="details-course-description">{course.description}</p>
                </div>

                {/* Onde Estudar (Dados reais cruzados do seu script) */}
                <div className="details-institutions-section">
                    <h3 className="details-section-title">Onde estudar em São Paulo</h3>
                    <p className="courses-section-subtitle">Instituições mapeadas para esta formação:</p>

                    <div className="details-institutions-grid">
                        {course.educationalInstitution && course.educationalInstitution.length > 0 ? (
                            course.educationalInstitution.map((inst) => (
                                <div key={inst.id} className="details-inst-card">
                                    <div className="details-inst-header">
                                        <div className="details-inst-icon-box">
                                            <MapPin size={16} color="#2563eb" />
                                        </div>
                                        <h4>{inst.name}</h4>
                                    </div>
                                    <p className="details-inst-desc">{inst.description}</p>
                                    <span className="details-inst-email">{inst.email}</span>
                                </div>
                            ))
                        ) : (
                            <p className="details-no-inst">Nenhuma instituição vinculada a este curso no momento.</p>
                        )}
                    </div>
                </div>
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

export default CourseDetails;