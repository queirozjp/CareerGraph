import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import { Home, BookOpen, FileText, User, TrendingUp, Book, ChevronRight } from "lucide-react";
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

interface GraphDTO {
  nodeCount: number;
  edgeCount: number;
  nodes: NodeDTO[];
  edges: EdgeDTO[];
  isConnected: boolean;
}

const Dashboard: React.FC = () => {
  const cyRef = useRef<HTMLDivElement>(null);

  // Estados para lidar com os dados da API e carregamento
  const [graphData, setGraphData] = useState<GraphDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para buscar os dados na API
  useEffect(() => {
    // Usando o Axios através do seu arquivo api.ts
    api.get("/api/graph")
        .then((res) => {
          // O Axios automaticamente converte o JSON e o coloca dentro de res.data
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

    // Converte os DTOs para o formato esperado pelo Cytoscape
    const elements = [
      ...graphData.nodes.map(node => ({
        data: {
          id: node.id,
          label: node.name,
          type: node.type
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
        {
          selector: 'node',
          style: {
            'background-color': '#2563eb', // dash-blue
            'label': 'data(label)',
            'color': '#1a1a1a',
            'font-family': 'sans-serif',
            'font-size': '10px',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'text-wrap': 'wrap',
            'text-max-width': '100px',
            'width': 20,
            'height': 20,
          }
        },
        {
          selector: 'node[type="CATEGORY"]',
          style: {
            'background-color': '#d97706', // dash-yellow
            'width': 35,
            'height': 35,
            'font-weight': 'bold',
            'font-size': '12px',
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#e5e4e2',
            'curve-style': 'bezier',
            'opacity': 0.6
          }
        }
      ],
      layout: {
        name: 'cose',
        padding: 20,
        animate: false
      }
    });

    return () => {
      if (cy) cy.destroy();
    };
  }, [graphData]); // Recarrega se o graphData mudar

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

          {/* Mapa de Conhecimento (Grafo) */}
          <div className="dash-graph-section">
            <h3 className="dash-card-title">Seu Mapa de Conhecimento</h3>
            <p className="dash-subtitle" style={{ marginBottom: '16px' }}>
              Explore as conexões entre as áreas de tecnologia e os cursos recomendados.
            </p>
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