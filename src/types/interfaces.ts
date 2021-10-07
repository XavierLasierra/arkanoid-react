/* eslint-disable no-unused-vars */
interface IDohSize {
    width: number,
    height: number,
}

export interface IDohProps {
    positionX: number,
    dohSize: IDohSize,
}

export interface IGameCanvasProps {
    gameMatrix: number[][],
    setGameMatrix: (arg: number[][]) => void,
    canEdit: boolean
}

export interface IBallProps {
    dohCoordinateX: number,
    isGameActive: boolean,
    ballCoordinates: number[]
}

export interface ISmallGameCanvasProps {
  board: number[][],
  currentBoard: number
}

export interface IScoreProps {
  value: number
}

export interface IParticlesProps {
  particlesCoordinates: any,
  setParticlesCoordinates: any,
}
