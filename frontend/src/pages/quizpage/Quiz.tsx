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
    text: "Gosto de construir interfaces interativas e me importo muito com a experiência visual e a jornada do usuário.",
    impacts: [
      { categoryId: 89, weight: 2.0 }, // DESIGN
      { categoryId: 85, weight: 1.0 }, // DESENVOLVIMENTO (Frontend)
      { categoryId: 84, weight: -0.5 } // DATA
    ]
  },
  {
    id: 2,
    text: "Tenho facilidade em resolver problemas lógicos complexos criando códigos que funcionam 'nos bastidores' das aplicações.",
    impacts: [
      { categoryId: 85, weight: 2.0 }, // DESENVOLVIMENTO (Backend)
      { categoryId: 90, weight: 0.5 }, // INFRA
      { categoryId: 89, weight: -1.0 } // DESIGN (Oposto a perfis puramente visuais)
    ]
  },
  {
    id: 3,
    text: "Prefiro analisar grandes volumes de informações e estatísticas para encontrar padrões que ajudem na tomada de decisão.",
    impacts: [
      { categoryId: 84, weight: 2.0 }, // DATA
      { categoryId: 88, weight: 1.5 }, // IA
      { categoryId: 87, weight: 0.5 }  // GESTAO
    ]
  },
  {
    id: 4,
    text: "Tenho grande interesse em criar e treinar algoritmos para que máquinas aprendam a realizar tarefas de forma autônoma.",
    impacts: [
      { categoryId: 88, weight: 2.0 }, // IA
      { categoryId: 83, weight: 1.0 }, // CLOUD
      { categoryId: 84, weight: 1.0 }  // DATA
    ]
  },
  {
    id: 5,
    text: "Sinto atração pela ideia de investigar vulnerabilidades ou simular ataques cibernéticos para testar a proteção de sistemas corporativos.",
    impacts: [
      { categoryId: 86, weight: 2.0 }, // SEGURANCA
      { categoryId: 90, weight: 1.5 }, // INFRA
      { categoryId: 85, weight: -0.5 } // DESENVOLVIMENTO
    ]
  },
  {
    id: 6,
    text: "Me interessa projetar ambientes virtuais garantindo que dados fiquem disponíveis na internet e protegidos contra vazamentos 24 horas por dia.",
    impacts: [
      { categoryId: 83, weight: 2.0 }, // CLOUD
      { categoryId: 86, weight: 1.5 }, // SEGURANCA
      { categoryId: 84, weight: 0.5 }  // DATA
    ]
  },
  {
    id: 7,
    text: "Gosto de organizar equipes, planejar o produto e garantir que a tecnologia construída resolva as reais necessidades do cliente final.",
    impacts: [
      { categoryId: 87, weight: 2.0 }, // GESTAO (Product Management)
      { categoryId: 89, weight: 1.0 }, // DESIGN
      { categoryId: 85, weight: -0.5 } // DESENVOLVIMENTO
    ]
  },
  {
    id: 8,
    text: "Prefiro definir a arquitetura de uma solução e liderar as pessoas para entregá-la do que passar o dia todo apenas programando.",
    impacts: [
      { categoryId: 87, weight: 1.5 }, // GESTAO (Tech Lead)
      { categoryId: 85, weight: 1.5 }, // DESENVOLVIMENTO
      { categoryId: 90, weight: -0.5 } // INFRA
    ]
  },
  {
    id: 9,
    text: "Gosto de investigar o comportamento humano, criar protótipos e testar a facilidade de uso de aplicativos antes de serem desenvolvidos.",
    impacts: [
      { categoryId: 89, weight: 2.0 }, // DESIGN (UX Research)
      { categoryId: 87, weight: 1.0 }, // GESTAO
      { categoryId: 90, weight: -1.0 } // INFRA
    ]
  },
  {
    id: 10,
    text: "Me empolga usar dados climáticos e mapeamento por satélite para aumentar a produtividade e a sustentabilidade das plantações.",
    impacts: [
      { categoryId: 91, weight: 2.0 }, // AGRO
      { categoryId: 84, weight: 1.5 }, // DATA
      { categoryId: 88, weight: 0.5 }  // IA
    ]
  },
  {
    id: 11,
    text: "Tenho interesse em trabalhar com o maquinário conectado do campo, como configurar drones, sensores de solo e redes rurais.",
    impacts: [
      { categoryId: 91, weight: 2.0 }, // AGRO
      { categoryId: 90, weight: 1.5 }, // INFRA (Hardware/Redes)
      { categoryId: 83, weight: 0.5 }  // CLOUD
    ]
  },
  {
    id: 12,
    text: "Quero trabalhar mantendo a arquitetura de plataformas que atendem milhões de usuários de forma escalável, sem sair do ar.",
    impacts: [
      { categoryId: 83, weight: 2.0 }, // CLOUD
      { categoryId: 85, weight: 1.0 }, // DESENVOLVIMENTO
      { categoryId: 90, weight: 0.5 }  // INFRA
    ]
  },
  {
    id: 13,
    text: "Gosto de lidar com a base da tecnologia, como a configuração de redes complexas, roteadores e servidores físicos ou virtuais.",
    impacts: [
      { categoryId: 90, weight: 2.0 }, // INFRA
      { categoryId: 86, weight: 1.5 }, // SEGURANCA
      { categoryId: 89, weight: -0.5 } // DESIGN
    ]
  },
  {
    id: 14,
    text: "Acho fascinante aplicar visão computacional e câmeras inteligentes para identificar pragas em lavouras ou monitorar o gado automaticamente.",
    impacts: [
      { categoryId: 88, weight: 2.0 }, // IA
      { categoryId: 91, weight: 1.5 }, // AGRO
      { categoryId: 84, weight: 0.5 }  // DATA
    ]
  },
  {
    id: 15,
    text: "Gosto de automatizar o processo de entrega de software, garantindo que o código dos desenvolvedores seja publicado com qualidade e segurança.",
    impacts: [
      { categoryId: 85, weight: 1.5 }, // DESENVOLVIMENTO (DevOps/SecOps)
      { categoryId: 86, weight: 1.0 }, // SEGURANCA
      { categoryId: 87, weight: 0.5 }  // GESTAO
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
        navigate("/register");
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