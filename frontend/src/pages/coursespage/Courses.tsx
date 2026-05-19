import React, { useState, useEffect } from "react";
import "./Courses.css";
import { Search, ChevronRight, Home, BookOpen, FileText, User } from "lucide-react";
import { NavLink, useNavigate } from 'react-router-dom'; // 1. IMPORTADO O useNavigate
import api from "../../api";

interface Course {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
}

const Courses: React.FC = () => {
  const navigate = useNavigate(); // 2. INICIALIZADO O HOOK
  const [courses, setCourses] = useState<Course[]>([]);
  const [filtered, setFiltered] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/courses")
        .then(res => {
          setCourses(res.data);
          setFiltered(res.data);
        })
        .catch(err => {
          setError(err.response?.data?.message || "Erro ao buscar cursos");
        })
        .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
        courses.filter(c =>
            c.name.toLowerCase().includes(term) ||
            (c.shortDescription && c.shortDescription.toLowerCase().includes(term))
        )
    );
  }, [search, courses]);

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
              <input
                  placeholder="Buscar cursos..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <h3 className="courses-section-subtitle">
            {loading ? "Carregando..." : `${filtered.length} cursos encontrados`}
          </h3>

          {error && (
              <p style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>{error}</p>
          )}

          <div className="courses-grid">
            {filtered.map(course => (
                <div className="courses-card" key={course.id}>
                  <div className="courses-card-content">
                    <h4>{course.name}</h4>
                    <p>{course.shortDescription}</p>
                  </div>
                  {/* 3. ATUALIZADO: O botão agora redireciona passando o ID do curso */}
                  <button
                      className="courses-btn-offwhite"
                      onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    Ver detalhes <ChevronRight size={16} />
                  </button>
                </div>
            ))}
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

export default Courses;