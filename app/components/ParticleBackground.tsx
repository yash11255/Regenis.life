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
          fpsLimit: 120,
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
                distance: 180,
                links: {
                  opacity: 0.45,
                  color: "#3d8aff",
                },
              },
              push: {
                quantity: 18,
              },
              repulse: {
                distance: 260,
                duration: 0.5,
              },
            },
          },
          particles: {
            color: {
              value: ["#1c69d4", "#3d8aff", "#ffffff"],
            },
            links: {
              color: "#1c69d4",
              distance: 140,
              enable: true,
              opacity: 0.22,
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
              value: 65,
            },
            opacity: {
              value: { min: 0.25, max: 0.75 },
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
              value: { min: 1.5, max: 3.5 },
            },
          },
          detectRetina: true,
        }}
      />
    </ParticlesProvider>
  );
}
