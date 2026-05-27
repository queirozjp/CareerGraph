import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import { Home, BookOpen, FileText, User, TrendingUp, Book, ChevronRight, Star } from "lucide-react";
import { NavLink, useNavigate } from 'react-router-dom';
import cytoscape from 'cytoscape';
import api from '../../api.ts';

interface NodeDTO {
  id: string;
  name: string;
  type: string;
}

interface EdgeDTO {
  sourceId: string;
  targetId: string;
}

interface RecommendationNode {
  id: string;
  name?: string;
  type?: string;
  [key: string]: unknown;
}

interface GraphDTO {
  nodeCount: number;
  edgeCount: number;
  nodes: NodeDTO[];
  edges: EdgeDTO[];
  isConnected: boolean;
  recommendation: RecommendationNode[];
  recommendedCategories: RecommendationNode[];
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const cyRef = useRef<HTMLDivElement>(null);

  const [graphData, setGraphData] = useState<GraphDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/api/graph")
        .then((res) => {
          setGraphData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao carregar grafo via Axios:", err);
          setError("Não foi possível carregar o mapa de conhecimento.");
          setIsLoading(false);
        });
  }, []);

  useEffect(() => {
    if (!cyRef.current || !graphData) return;

    const recommendedIds = new Set(
        (graphData.recommendation ?? []).map((n) => String(n.id))
    );

    const recommendedCategoryIds = new Set(
        (graphData.recommendedCategories ?? []).map((n) => String(n.id))
    );

    const elements = [
      ...graphData.nodes.map(node => ({
        data: {
          id: String(node.id),
          label: node.name,
          type: node.type,
          recommended: recommendedIds.has(String(node.id)),
          isRecommendedCategory: recommendedCategoryIds.has(String(node.id)),
        }
      })),
      ...graphData.edges.map((edge, index) => ({
        data: {
          id: `e${index}`,
          source: String(edge.sourceId),
          target: String(edge.targetId)
        }
      }))
    ];

    const cy = cytoscape({
      container: cyRef.current,
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#3f3f3f',
            'border-width': 0,
            'label': '',
            'width': 14,
            'height': 14,
            'opacity': 0.35,
          }
        },
        {
          selector: 'node[type="CATEGORY"]',
          style: {
            'background-color': '#6b6b6b',
            'width': 20,
            'height': 20,
            'opacity': 0.45,
          }
        },
        {
          selector: 'node[?recommended]',
          style: {
            'background-color': '#ffffff',
            'border-color': '#000000',
            'border-width': 2,
            'label': 'data(label)',
            'color': '#000000',
            'font-family': 'sans-serif',
            'font-size': '11px',
            'font-weight': 'bold',
            'text-valign': 'bottom',
            'text-margin-y': 7,
            'text-wrap': 'wrap',
            'text-max-width': '110px',
            'text-background-color': '#ffffff',
            'text-background-opacity': 0.9,
            'text-background-padding': '2px',
            'text-background-shape': 'roundrectangle',
            'width': 26,
            'height': 26,
            'opacity': 1,
            'z-index': 10,
          }
        },
        {
          selector: 'node[?isRecommendedCategory]',
          style: {
            'background-color': '#000000',
            'border-color': '#ffffff',
            'border-width': 2,
            'width': 18,
            'height': 18,
            'font-size': '11px',
            'label': 'data(label)',
            'color': '#000000',
            'font-family': 'sans-serif',
            'font-weight': 'bold',
            'text-valign': 'bottom',
            'text-margin-y': 7,
            'text-background-color': '#ffffff',
            'text-background-opacity': 0.9,
            'text-background-padding': '2px',
            'text-background-shape': 'roundrectangle',
            'z-index': 20,
            'opacity': 1,
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 1.2,
            'line-color': '#555555',
            'curve-style': 'bezier',
            'opacity': 0.25,
          }
        },
      ],
      layout: {
        name: 'cose',
        padding: 20,
        animate: false
      }
    });

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const type = node.data('type');
      const id = node.data('id');

      if (type !== 'CATEGORY') {
        navigate(`/courses/${id}`);
      }
    });

    return () => {
      if (cy) cy.destroy();
    };
  }, [graphData, navigate]);

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
              <button className="dash-btn-offwhite" onClick={() => navigate('/quiz')}>
                Começar quiz <ChevronRight size={16} />
              </button>
            </div>

            <div className="dash-card">
              <div className="dash-icon-box dash-yellow">
                <Book size={20} color="#d97706" />
              </div>
              <h3 className="dash-card-title">Explorar Cursos</h3>
              <p className="dash-card-text">Navegue por nossa biblioteca completa de cursos em tecnologia.</p>
              <button className="dash-btn-offwhite" onClick={() => navigate('/courses')}>
                Ver cursos <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {!isLoading && !error && graphData && graphData.recommendation?.length > 0 && (
              <div className="dash-graph-section">
                <h3 className="dash-card-title">Recomendados para você</h3>
                <p className="dash-subtitle" style={{ marginBottom: '16px' }}>
                  Com base no seu perfil, separamos esses cursos para você começar.
                </p>
                <div className="dash-recommendations-list">
                  {graphData.recommendation.map((rec, index) => {
                    const isTop = index === 0;
                    return (
                        <div key={rec.id} className={`dash-rec-list-card ${isTop ? 'dash-rec-top' : ''}`}>
                          <div className="dash-rec-list-left">
                            <div className={`dash-icon-box ${isTop ? 'dash-yellow' : 'dash-blue'}`} style={{ marginBottom: 0 }}>
                              <Star size={20} color={isTop ? "#d97706" : "#2563eb"} />
                            </div>
                            <div className="dash-rec-list-info">
                              <div className="dash-rec-badges">
                                {isTop && <span className="dash-rec-badge dash-badge-top">Top Recomendação</span>}
                                {rec.type && <span className="dash-rec-badge">{rec.type}</span>}
                              </div>
                              <h4 className="dash-rec-list-title">{rec.name ?? `Curso #${rec.id}`}</h4>
                            </div>
                          </div>
                          <button
                              className="dash-btn-offwhite dash-rec-list-btn"
                              onClick={() => navigate(`/courses/${rec.id}`)}
                          >
                            Ver curso <ChevronRight size={14} />
                          </button>
                        </div>
                    );
                  })}
                </div>
              </div>
          )}

          <div className="dash-graph-section">
            <h3 className="dash-card-title">Seu Mapa de Conhecimento</h3>
            <p className="dash-subtitle" style={{ marginBottom: '8px' }}>
              Explore as conexões entre as áreas de tecnologia e os cursos recomendados (clique nos nós destacados para abrir).
            </p>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#555' }}>
                <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: '50%', background: '#ffffff', border: '2px solid #000000' }} />
                Curso recomendado
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#555' }}>
                <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: '50%', background: '#000000', border: '2px solid #ffffff', outline: '1px solid #ccc' }} />
                Categoria recomendada
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#aaa' }}>
                <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: '#3f3f3f' }} />
                Outros cursos/categorias
              </div>
            </div>

            <div className="dash-cy-card">
              {isLoading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', color: '#666' }}>
                    <p>Carregando mapa de conhecimento...</p>
                  </div>
              ) : error ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', color: '#dc2626' }}>
                    <p>{error}</p>
                  </div>
              ) : (
                  <div ref={cyRef} className="dash-cy-container" />
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

export default Dashboard;