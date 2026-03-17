import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";
import GraphBackground from "../../components/GraphBackground";

type Question = {
  id: number;
  text: string;
};

const questions: Question[] = [
  { id: 1, text: "Tenho facilidade em resolver problemas usando lógica e raciocínio abstrato." },
  { id: 2, text: "Gosto de entender como as interfaces de aplicativos e sites são construídas." },
  { id: 3, text: "Sinto curiosidade em saber como os dados são armazenados e protegidos na internet." },
  { id: 4, text: "Prefiro trabalhar em projetos que envolvem análise de números e estatísticas." },
  { id: 5, text: "Gosto de automatizar tarefas repetitivas usando ferramentas digitais." },
  { id: 6, text: "Tenho interesse em aprender como funcionam as redes de computadores e servidores." },
  { id: 7, text: "Sinto prazer em organizar informações de forma estruturada e hierárquica." },
  { id: 8, text: "Prefiro criar a parte visual de um projeto do que lidar com regras de banco de dados." },
  { id: 9, text: "Gosto de investigar falhas e bugs para encontrar a solução de um erro técnico." },
  { id: 10, text: "Tenho interesse em como a Inteligência Artificial toma decisões baseada em dados." },
];

const options = [
  { value: 1, label: "Não me identifico" },
  { value: 2, label: "Pouco me identifico" },
  { value: 3, label: "Parcialmente me identifico" },
  { value: 4, label: "Me identifico" },
  { value: 5, label: "Super me identifico" },
];

export default function Quiz() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);

    if (current === questions.length - 1) {
      setTimeout(() => {
        navigate("/login");
      }, 500); 
    } else {

      setTimeout(() => {
        setCurrent(current + 1);
      }, 350);
    }
  };

  const handleBack = () => {
    if (current === 0) {
      navigate("/");
      return;
    }
    setCurrent(current - 1);
  };

  const question = questions[current];

  return (
    <>
      <GraphBackground />

      <div className="background-overlay">
        <div className="quiz-container">
          <button className="back-arrow" onClick={handleBack}>
            ←
          </button>

          <h3>
            Pergunta {current + 1} de {questions.length}
          </h3>

          <h2 className="question">{question.text}</h2>

          <div className="options">
            {options.map((opt) => {
              const selected = answers[current] === opt.value;

              return (
                <button
                  key={opt.value}
                  className={`option-btn ${selected ? "selected" : ""}`}
                  onClick={() => handleAnswer(opt.value)}
                >
                  <span>{opt.label}</span>
                  <div className="option-number">{opt.value}</div>
                </button>
              );
            })}
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}