import { useState, useEffect } from "react";

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
      console.log(`Cadastrar: ${name}`);
    } else {
      console.log(`Login: ${email}`);
    }

    onSuccess(); 
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h3>{mode === "login" ? "Fazer login" : "Criar conta"}</h3>

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