import React, { useEffect } from "react";
import { IParticlesProps } from "../../types/interfaces";

import "./particles.styles.scss";

export default function Particles({
  particlesCoordinates,
  setParticlesCoordinates,
}: IParticlesProps) {
  const PARTICLES_RANDOM_RANGE = 40;
  const NUMBER_OF_PARTICLES = 5;

  function clearParticle() {
    return particlesCoordinates.length > 0 && setParticlesCoordinates([]);
  }

  useEffect(() => {
    setTimeout(clearParticle, 250);
  }, [particlesCoordinates]);

  function setPosition(coordX: number, coordY: number) {
    return `translate(${coordX}px, ${coordY}px)`;
  }

  function generateRandomParticlesPositions(
    numberOfParticles: number,
    range: number
  ) {
    const randomParticlesCoordinates = [];
    for (let i = 0; i < numberOfParticles; i += 1) {
      const randomNumberX = Math.floor(Math.random() * range) - range / 2;
      const randomNumberY = Math.floor(Math.random() * range) - range / 2;

      randomParticlesCoordinates.push(
        `translate( ${randomNumberX}px, ${randomNumberY}px)`
      );
    }
    return randomParticlesCoordinates;
  }

  return (
    <>
      {particlesCoordinates.map(({ coordX, coordY }: any) => (
        <ul
          key={`particle-${coordX}-${coordY}`}
          className="particle"
          style={{ transform: setPosition(coordX, coordY) }}
        >
          {generateRandomParticlesPositions(
            NUMBER_OF_PARTICLES,
            PARTICLES_RANDOM_RANGE
          ).map((transform, index) => (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={`particle-${index}`}
              className="particle__small"
              style={{
                transform,
              }}
            />
          ))}
        </ul>
      ))}
    </>
  );
}
