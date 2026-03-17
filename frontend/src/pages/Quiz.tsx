import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Quiz.css";
import GraphBackground from "../components/GraphBackground";

type Question = {
  id: number;
  text: string;
};

const questions: Question[] = [
  { id: 1, text: "Gosto de resolver problemas usando lógica e programação" },
  { id: 2, text: "Prefiro trabalhar com tecnologia do que com pessoas" },
];

export default function Quiz() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
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
          {/* voltar */}
          <button className="back-arrow" onClick={handleBack}>
            ←
          </button>

          <h3>
            Pergunta {current + 1} de {questions.length}
          </h3>

          <h2 className="question">{question.text}</h2>

          <div className="options">
            {[1, 2, 3, 4, 5].map((num) => {
              const selected = answers[current] === num;

              return (
                <button
                  key={num}
                  className={`option-btn ${selected ? "selected" : ""}`}
                  onClick={() => handleAnswer(num)}
                >
                  {num}
                </button>
              );
            })}
          </div>
          <div className="labels">
            <p>Nada</p>
            <p>Parcialmente</p>
            <p>Muito</p>
          </div>

          {/* progress bar */}
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
