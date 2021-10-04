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
    setGameMatrix: any
}

export interface IBallProps {
    dohCoordinateX: number,
    isGameActive: boolean,
    ballCoordinates: number[]
}
