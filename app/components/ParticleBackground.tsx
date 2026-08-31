"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function ParticleBackground() {
  const initEngine = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          smooth: true,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              onClick: {
                enable: true,
                mode: ["push", "repulse"],
              },
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.5,
                  color: "#3d8aff",
                },
              },
              push: {
                quantity: 8,
              },
              repulse: {
                distance: 180,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#1c69d4", "#3d8aff", "#ffffff"],
            },
            links: {
              color: "#1c69d4",
              distance: 120,
              enable: true,
              opacity: 0.25,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
            },
            number: {
              density: {
                enable: true,
                width: 1200,
                height: 800,
              },
              value: 45,
              limit: {
                value: 65,
              },
            },
            opacity: {
              value: { min: 0.3, max: 0.8 },
              animation: {
                enable: true,
                speed: 0.8,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1.5, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </ParticlesProvider>
  );
}
