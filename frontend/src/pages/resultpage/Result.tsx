import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PartyPopper, Loader2 } from 'lucide-react';
import AuthModal from "../authenticationpage/AuthModal";
import api from "../../api";
import "./Result.css";

export default function Result() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSendingScores, setIsSendingScores] = useState(false); // Estado para o loading do envio automático
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedScoresString = localStorage.getItem("FinalScores");

    // Se existir um token (usuário logado) e existirem notas salvas do quiz
    if (token && savedScoresString) {
      setIsSendingScores(true);
      const scores = JSON.parse(savedScoresString);

      // Envia via PUT para atualizar o cadastro do usuário atual
      api.put("/profile/scores", scores) // Ajuste a rota para o seu endpoint novo
          .then(() => {
            console.log("Scores sincronizados com sucesso!");
            // Opcional: limpar o FinalScores do localStorage se não for mais usar
            // localStorage.removeItem("FinalScores");

            navigate("/dash"); // Redireciona direto para o painel
          })
          .catch((err) => {
            console.error("Erro ao sincronizar scores:", err);
            // Se der erro no envio automático (token expirado, por exemplo),
            // desativa o loading para o usuário ver a tela e poder tentar logar/cadastrar
            setIsSendingScores(false);
          });
    }
  }, [navigate]);

  const handleAuthSuccess = () => {
    setIsModalOpen(false);
    navigate("/dash");
  };

  // Se estiver enviando os dados em background, mostra uma tela amigável de transição
  if (isSendingScores) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '12px', color: '#666' }}>
          <Loader2 size={32} className="animate-spin" color="#2563eb" />
          <p style={{ fontFamily: 'Inter', fontWeight: 500 }}>Sincronizando suas respostas...</p>
        </div>
    );
  }

  return (
      <div className="result-container">
        <div className="result-content">
          <PartyPopper size={90} strokeWidth={1.5} />

          <h2>Parabéns!</h2>
          <p>Você completou o quiz. Suas recomendações estão prontas!</p>

          <div className="save-results-box">
            <strong>Salve seus resultados</strong>
            <p>
              Crie uma conta para acessar suas recomendações a qualquer momento
              e acompanhar seu progresso.
            </p>

            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
              Criar conta grátis
            </button>
          </div>
        </div>

        {isModalOpen && (
            <AuthModal
                mode="signup"
                onClose={() => setIsModalOpen(false)}
                onSwitchMode={() => {}}
                onSuccess={handleAuthSuccess}
            />
        )}
      </div>
  );
}