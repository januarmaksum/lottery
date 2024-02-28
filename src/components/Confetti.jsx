import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { Fireworks } from "./Fireworks";

export default function Confetti({ run }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      {init && run && (
        <div className="bg-gray-900 fixed inset-0 z-50 opacity-95">
          <Particles id="tsparticles" options={Fireworks} />
        </div>
      )}
    </>
  );
}
