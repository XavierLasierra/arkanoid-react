import React, { useEffect } from 'react';
import { IParticlesProps } from '../../types/interfaces';

import './particles.styles.scss';

export default function Particles({
  particlesCoordinates,
  setParticlesCoordinates,
}: IParticlesProps) {
  function clearParticle() {
    if (particlesCoordinates.length <= 0) return;
    setParticlesCoordinates(particlesCoordinates
      .filter((particle: any, index: number) => index !== 0));
  }
  useEffect(() => {
    setTimeout(clearParticle, 250);
  }, [particlesCoordinates]);

  function setPosition(coordX: number, coordY: number) {
    return `translate(${coordX}px, ${coordY}px)`;
  }
  return (
    <>
      {
      particlesCoordinates.map(({ coordX, coordY }: any) => (
        <div key={`particle-${coordX}-${coordY}`} className="particle" style={{ transform: setPosition(coordX, coordY) }}>
          <div className="particle__small" style={{ transform: `translate( ${Math.floor(Math.random() * 40) - 20}px, ${Math.floor(Math.random() * 40) - 20}px)` }} />
          <div className="particle__small" style={{ transform: `translate( ${Math.floor(Math.random() * 40) - 20}px, ${Math.floor(Math.random() * 40) - 20}px)` }} />
          <div className="particle__small" style={{ transform: `translate( ${Math.floor(Math.random() * 40) - 20}px, ${Math.floor(Math.random() * 40) - 20}px)` }} />
          <div className="particle__small" style={{ transform: `translate( ${Math.floor(Math.random() * 40) - 20}px, ${Math.floor(Math.random() * 40) - 20}px)` }} />
        </div>
      ))
    }
    </>
  );
}
