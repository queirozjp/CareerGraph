import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { PartyPopper } from 'lucide-react';
import AuthModal from "../authenticationpage/AuthModal"; 
import "./Result.css";

export default function Result() {
  const [modalMode, setModalMode] = useState<"login" | "signup" | null>(null);
  const navigate = useNavigate(); 

  const openModal = (mode: "login" | "signup") => {
    setModalMode(mode);
  };

  const closeModal = () => {
    setModalMode(null);
  };

  const switchModalMode = (mode: "login" | "signup") => {
    setModalMode(mode);
  };

  const handleAuthSuccess = () => {
    closeModal();
    navigate("/dash"); 
  };

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

          <button className="btn-primary" onClick={() => openModal("signup")}>
            Criar conta grátis
          </button>

          <button className="btn-secondary" onClick={() => openModal("login")}>
            Fazer login
          </button>
        </div>
      </div>

      {modalMode && (
        <AuthModal
          mode={modalMode}
          onClose={closeModal}
          onSwitchMode={switchModalMode}
          onSuccess={handleAuthSuccess} 
        />
      )}
    </div>
  );
}