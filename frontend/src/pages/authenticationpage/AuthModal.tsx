import { useState, useEffect } from "react";
import api  from "../../api";

type AuthModalProps = {
  mode: "login" | "signup";
  onClose: () => void;
  onSwitchMode: (mode: "login" | "signup") => void;
  onSuccess: () => void; 
};

export default function AuthModal({ mode, onClose, onSwitchMode, onSuccess }: AuthModalProps) { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    if (mode === "signup") {
      register();
    } else {
      login();
    }
  };

  async function login(){
    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });
      const token = response.data.token
      localStorage.setItem("token", token)
      setMessage(response.data.message);
      setMessageType("success")

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    }
    catch (error : any) {
      setMessage(error.response?.data?.message)
      setMessageType("error")
    }
  }

  async function register(){
    const savedScoresString = localStorage.getItem('FinalScores');

    const scores = savedScoresString ? JSON.parse(savedScoresString) : {};

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        scores
      });
      const token = response.data.token
      localStorage.setItem("token", token)
      setMessage(response.data.message);
      setMessageType("success");

      setTimeout(() => {   // ✅ Aguarda 1.5s antes de fechar
        onSuccess();
        onClose();
      }, 1500);
    }
    catch (error : any) {
      setMessage(error.response?.data?.message || "Erro ao criar conta!")
      setMessageType("error");
    }
  }

  return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>

          <h3>{mode === "login" ? "Fazer login" : "Criar conta"}</h3>

          {/* Mensagem de Erro ou Sucesso Visual na tela */}
          {message && (
              <div className={`message-box ${messageType}`}>
                {message}
              </div>
          )}

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
                <label>
                  Nome
                  <input
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoFocus
                  />
                </label>
            )}

            <label>
              E-mail
              <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus={mode === "login"}
              />
            </label>

            <label>
              Senha
              <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
              />
            </label>

            <button type="submit" className="btn-primary">
              {mode === "login" ? "Entrar" : "Cadastrar"}
            </button>
            {message && <p className={`message ${messageType}`}>{message}</p>}
          </form>

          {mode === "login" ? (
              <p className="modal-switch">
                Não tem uma conta?{" "}
                <button
                    type="button"
                    onClick={() => onSwitchMode("signup")}
                >
                  Criar conta
                </button>
              </p>
          ) : (
              <p className="modal-switch">
                Já tem conta?{" "}
                <button
                    type="button"
                    onClick={() => onSwitchMode("login")}
                >
                  Fazer login
                </button>
              </p>
          )}
        </div>
      </div>
  );
}