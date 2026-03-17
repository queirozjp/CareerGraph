import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import {Crosshair, Zap, Rocket, Target} from "lucide-react"
import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz");
  };

  return (
    
    <div className={styles.container}>
      <div className={styles.content}>

        {/* Logo */}
        <div className={styles.logo}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M32 8L12 20V44L32 56L52 44V20L32 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M32 32V56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M32 32L12 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M32 32L52 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="32" cy="32" r="4" fill="currentColor"/>
          </svg>
        </div>

        <h1 className={styles.title}>CareerGraph</h1>
        <p className={styles.text}>
          Descubra cursos personalizados para impulsionar sua carreira em tecnologia
        </p>

        {/* CTA Button */}
        <div className={styles.cta}>
          <Link to="/quiz">
          <Button onClick={handleStart} className={styles.ctaButton}>
            Começar agora
          </Button>
          </Link>
          <p className="text-sm text-[#57606a]">
            Apenas 3 perguntas · 1 minuto
          </p>
        </div>

        {/* Features */}
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <div className="text-2xl"><Target size={18} color="black" /></div>
            Personalizado
          </div>
          <div className={styles.featureItem}>
            <div className="text-2xl"><Zap size={18} color="black" /></div>
            Rápido
          </div>
          <div className={styles.featureItem}>
            <div className="text-2xl"><Rocket size={18} color="black" /></div>
            Eficaz
          </div>
        </div>
      </div>
    </div>
  );
}