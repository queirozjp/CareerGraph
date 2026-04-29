import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";
import GraphBackground from "../../components/GraphBackground";

export type CategoryId = 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91;

interface QuestionImpact {
  categoryId: CategoryId;
  weight: number;
}

export interface Question {
  id: number;
  text: string;
  impacts: QuestionImpact[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Tenho facilidade em resolver problemas usando lógica e raciocínio abstrato.",
    impacts: [
      { categoryId: 85, weight: 1.5 }, // DESENVOLVIMENTO
      { categoryId: 88, weight: 1.0 }, // IA
      { categoryId: 84, weight: 1.0 }  // DATA
    ]
  },
  {
    id: 2,
    text: "Gosto de entender como as interfaces de aplicativos e sites são construídas.",
    impacts: [
      { categoryId: 89, weight: 2.0 }, // DESIGN
      { categoryId: 85, weight: 1.0 }  // DESENVOLVIMENTO (Frontend)
    ]
  },
  {
    id: 3,
    text: "Sinto curiosidade em saber como os dados são armazenados e protegidos na internet.",
    impacts: [
      { categoryId: 86, weight: 1.5 }, // SEGURANCA
      { categoryId: 84, weight: 1.5 }, // DATA
      { categoryId: 90, weight: 0.5 }  // INFRA
    ]
  },
  {
    id: 4,
    text: "Prefiro trabalhar em projetos que envolvem análise de números e estatísticas.",
    impacts: [
      { categoryId: 84, weight: 2.0 }, // DATA
      { categoryId: 88, weight: 1.5 }, // IA
      { categoryId: 89, weight: -1.0 } // DESIGN (Geralmente oposto a perfis visuais puros)
    ]
  },
  {
    id: 5,
    text: "Gosto de automatizar tarefas repetitivas usando ferramentas digitais.",
    impacts: [
      { categoryId: 85, weight: 1.5 }, // DESENVOLVIMENTO
      { categoryId: 90, weight: 1.0 }, // INFRA (DevOps)
      { categoryId: 83, weight: 1.0 }  // CLOUD
    ]
  },
  {
    id: 6,
    text: "Tenho interesse em aprender como funcionam as redes de computadores e servidores.",
    impacts: [
      { categoryId: 90, weight: 2.0 }, // INFRA
      { categoryId: 83, weight: 1.5 }, // CLOUD
      { categoryId: 86, weight: 1.0 }  // SEGURANCA
    ]
  },
  {
    id: 7,
    text: "Sinto prazer em organizar informações de forma estruturada e hierárquica.",
    impacts: [
      { categoryId: 84, weight: 1.5 }, // DATA
      { categoryId: 87, weight: 1.0 }, // GESTAO
      { categoryId: 89, weight: 0.5 }  // DESIGN (Arquitetura de Informação)
    ]
  },
  {
    id: 8,
    text: "Prefiro criar a parte visual de um projeto do que lidar com regras de banco de dados.",
    impacts: [
      { categoryId: 89, weight: 2.0 }, // DESIGN
      { categoryId: 84, weight: -1.5 },// DATA (Penalidade por rejeitar banco de dados)
      { categoryId: 90, weight: -1.0 } // INFRA
    ]
  },
  {
    id: 9,
    text: "Gosto de investigar falhas e bugs para encontrar a solução de um erro técnico.",
    impacts: [
      { categoryId: 85, weight: 1.5 }, // DESENVOLVIMENTO
      { categoryId: 86, weight: 1.0 }, // SEGURANCA
      { categoryId: 90, weight: 1.0 }  // INFRA
    ]
  },
  {
    id: 10,
    text: "Tenho interesse em como a Inteligência Artificial toma decisões baseada em dados.",
    impacts: [
      { categoryId: 88, weight: 2.0 }, // IA
      { categoryId: 84, weight: 1.5 }  // DATA
    ]
  },
  {
    id: 11,
    text: "Tenho interesse em como a tecnologia (como sensores de solo e drones) pode melhorar a produção de alimentos e a sustentabilidade no campo.",
    impacts: [
      { categoryId: 91, weight: 2.0 }, // AGRO
      { categoryId: 90, weight: 0.5 }  // INFRA (Hardware/IoT)
    ]
  },
  {
    id: 12,
    text: "Gosto de organizar equipes, planejar cronogramas e garantir que um produto tecnológico resolva o problema certo do cliente.",
    impacts: [
      { categoryId: 87, weight: 2.0 }, // GESTAO
      { categoryId: 85, weight: -0.5 } // DESENVOLVIMENTO (Foco no negócio, menos no código em si)
    ]
  },
  {
    id: 13,
    text: "Sinto atração pela ideia de simular ataques cibernéticos para encontrar e corrigir falhas de segurança antes que hackers o façam.",
    impacts: [
      { categoryId: 86, weight: 2.0 }, // SEGURANCA
      { categoryId: 90, weight: 1.0 }, // INFRA
      { categoryId: 83, weight: 0.5 }  // CLOUD
    ]
  },
  {
    id: 14,
    text: "Me interesso em entender como plataformas gigantes (como Netflix ou Uber) conseguem se manter no ar para milhões de usuários simultaneamente.",
    impacts: [
      { categoryId: 83, weight: 2.0 }, // CLOUD
      { categoryId: 90, weight: 1.5 }, // INFRA
      { categoryId: 85, weight: 0.5 }  // DESENVOLVIMENTO (Arquitetura)
    ]
  },
  {
    id: 15,
    text: "Gosto da ideia de traduzir necessidades complexas de negócios em soluções tecnológicas práticas e rentáveis.",
    impacts: [
      { categoryId: 87, weight: 2.0 }, // GESTAO
      { categoryId: 84, weight: 1.0 }, // DATA (Business Intelligence)
      { categoryId: 89, weight: -0.5 } // DESIGN
    ]
  }
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
  const [paused, setPaused] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const userScores: Record<CategoryId, number> = {
    83: 0, 84: 0, 85: 0, 86: 0, 87: 0, 88: 0, 89: 0, 90: 0, 91: 0
  };

  function calculateScores(answers: {questionId: number, answerValue: number}[]) {
    answers.forEach((answer) => {
      const question = questions.find(q => q.id === answer.questionId)
      if (!question) return;

      // Escala de -2 a +2pts
      const scoreMultiplier = answer.answerValue - 3;

      question.impacts.forEach(impact => {
        const points = scoreMultiplier * impact.weight;
        userScores[impact.categoryId] += points;
      })
    })
    return userScores;
  }


  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);

    if (current === questions.length - 1) {
      const formattedAnswers = newAnswers.map((value, index) => ({
        questionId: questions[index].id,
        answerValue: value
      }))

      const finalScores = calculateScores(formattedAnswers);

      localStorage.setItem('FinalScores', JSON.stringify(finalScores));

      setTimeout(() => {
        navigate("/login");
      }, 500);
    } else {

      setTimeout(() => {
        setCurrent((prev) => prev + 1);
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
      <GraphBackground paused={paused} />

      <div className="background-overlay">
        <div className="quiz-container">
          <button className="back-arrow" onClick={handleBack}>
            ←
          </button>
          <button
            className="toggle-animation"
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Ativar animação" : "Desativar animação"}
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