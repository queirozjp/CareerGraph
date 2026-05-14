import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import { Home, BookOpen, FileText, User, TrendingUp, Book, ChevronRight, Star } from "lucide-react";
import { NavLink } from 'react-router-dom';
import cytoscape from 'cytoscape';
import api from '../../api.ts'; // Importando sua instância do Axios

// Interfaces baseadas no DTO do seu backend Spring Boot
interface NodeDTO {
  id: string;
  name: string;
  type: string;
}

interface EdgeDTO {
  sourceId: string;
  targetId: string;
}

// Interface para os nós de recomendação vindos do backend (domínio Node)
interface RecommendationNode {
  id: string;
  name?: string;
  [key: string]: unknown;
}

interface GraphDTO {
  nodeCount: number;
  edgeCount: number;
  nodes: NodeDTO[];
  edges: EdgeDTO[];
  isConnected: boolean;
  recommendation: RecommendationNode[];
}

const Dashboard: React.FC = () => {
  const cyRef = useRef<HTMLDivElement>(null);

  // Estados para lidar com os dados da API e carregamento
  const [graphData, setGraphData] = useState<GraphDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para buscar os dados na API
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

  // Efeito para renderizar o Cytoscape quando os dados chegarem
  useEffect(() => {
    if (!cyRef.current || !graphData) return;

    // Cria um Set com os IDs dos nós recomendados para lookup O(1)
    const recommendedIds = new Set(
        (graphData.recommendation ?? []).map((n) => String(n.id))
    );

    // Converte os DTOs para o formato esperado pelo Cytoscape,
    // marcando cada nó como recomendado ou não
    const elements = [
      ...graphData.nodes.map(node => ({
        data: {
          id: node.id,
          label: node.name,
          type: node.type,
          recommended: recommendedIds.has(String(node.id)),
        }
      })),
      ...graphData.edges.map((edge, index) => ({
        data: {
          id: `e${index}`,
          source: edge.sourceId,
          target: edge.targetId
        }
      }))
    ];

    const cy = cytoscape({
      container: cyRef.current,
      elements: elements,
      style: [
        // --- Nós padrão (não recomendados) ---
        {
          selector: 'node',
          style: {
            'background-color': '#cbd5e1',       // cinza-azulado discreto
            'border-width': 0,
            'label': '',                          // sem label por padrão
            'width': 14,
            'height': 14,
            'opacity': 0.45,
          }
        },

        // --- Nós do tipo CATEGORY (não recomendados) ---
        {
          selector: 'node[type="CATEGORY"]',
          style: {
            'background-color': '#fbbf24',
            'width': 26,
            'height': 26,
            'opacity': 0.5,
          }
        },

        // --- Nós RECOMENDADOS (qualquer tipo) ---
        {
          selector: 'node[?recommended]',
          style: {
            'background-color': '#2563eb',        // azul destaque
            'border-color': '#1d4ed8',
            'border-width': 2,
            'label': 'data(label)',               // exibe o nome apenas aqui
            'color': '#1a1a1a',
            'font-family': 'sans-serif',
            'font-size': '11px',
            'font-weight': 'bold',
            'text-valign': 'bottom',
            'text-margin-y': 7,
            'text-wrap': 'wrap',
            'text-max-width': '110px',
            'text-background-color': '#ffffff',
            'text-background-opacity': 0.75,
            'text-background-padding': '2px',
            'text-background-shape': 'roundrectangle',
            'width': 26,
            'height': 26,
            'opacity': 1,
            'z-index': 10,
          }
        },

        // --- Nós RECOMENDADOS do tipo CATEGORY ---
        {
          selector: 'node[?recommended][type="CATEGORY"]',
          style: {
            'background-color': '#d97706',
            'border-color': '#b45309',
            'border-width': 3,
            'width': 38,
            'height': 38,
            'font-size': '13px',
            'z-index': 20,
          }
        },

        // --- Arestas conectadas a nós recomendados ---
        {
          selector: 'edge[source != ""]',       // todas as arestas, estilo base
          style: {
            'width': 1.5,
            'line-color': '#e2e8f0',
            'curve-style': 'bezier',
            'opacity': 0.35,
          }
        },
      ],
      layout: {
        name: 'cose',
        padding: 20,
        animate: false
      }
    });

    // Após o layout, destaca as arestas que ligam nós recomendados
    cy.ready(() => {
      cy.edges().forEach((edge) => {
        const srcRecommended = edge.source().data('recommended');
        const tgtRecommended = edge.target().data('recommended');
        if (srcRecommended || tgtRecommended) {
          edge.style({
            'line-color': '#93c5fd',
            'width': 2.5,
            'opacity': 0.7,
          });
        }
      });
    });

    return () => {
      if (cy) cy.destroy();
    };
  }, [graphData]);

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

          {/* Cards de Cursos Recomendados */}
          {!isLoading && !error && graphData && graphData.recommendation?.length > 0 && (
              <div className="dash-graph-section">
                <h3 className="dash-card-title">Recomendados para você</h3>
                <p className="dash-subtitle" style={{ marginBottom: '16px' }}>
                  Com base no seu perfil, separamos esses cursos para você começar.
                </p>
                <div className="dash-recommendations-scroll">
                  {graphData.recommendation.map((rec) => (
                      <div key={rec.id} className="dash-rec-card">
                        <div className="dash-rec-card-header">
                          <div className="dash-icon-box dash-blue" style={{ marginBottom: 0 }}>
                            <Star size={18} color="#2563eb" />
                          </div>
                          {rec.type && (
                              <span className="dash-rec-badge">
                          {rec.type}
                        </span>
                          )}
                        </div>
                        <h4 className="dash-rec-card-title">{rec.name ?? `Curso #${rec.id}`}</h4>
                        <button className="dash-btn-offwhite dash-rec-btn">
                          Ver curso <ChevronRight size={14} />
                        </button>
                      </div>
                  ))}
                </div>
              </div>
          )}

          {/* Mapa de Conhecimento (Grafo) */}
          <div className="dash-graph-section">
            <h3 className="dash-card-title">Seu Mapa de Conhecimento</h3>
            <p className="dash-subtitle" style={{ marginBottom: '8px' }}>
              Explore as conexões entre as áreas de tecnologia e os cursos recomendados.
            </p>

            {/* Legenda */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#555' }}>
                <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: '50%', background: '#2563eb', border: '2px solid #1d4ed8' }} />
                Curso recomendado
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#555' }}>
                <span style={{ display: 'inline-block', width: 20, height: 20, borderRadius: '50%', background: '#d97706', border: '3px solid #b45309' }} />
                Categoria recomendada
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#aaa' }}>
                <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: '#cbd5e1' }} />
                Outros nós
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