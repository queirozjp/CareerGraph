import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function GraphBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        background: {
          color: {
            value: "#f8fafc"
          }
        },
        particles: {
          number: {
            value: 80
          },
          color: {
            value: "#000000"
          },
          links: {
            enable: true,
            color: "#000000",
            distance: 150,
            opacity: 0.4
          },
          move: {
            enable: true,
            speed: 1
          },
          size: {
            value: { min: 2, max: 4 }
          }
        }
      }}
    />
  );
}