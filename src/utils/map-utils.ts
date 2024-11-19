import { BoardHexes, CubeCoordinate } from "../types"
import { HEXGRID_HEX_APOTHEM, HEXGRID_HEX_HEIGHT, HEXGRID_HEX_RADIUS, HEXGRID_SPACING } from "./constants"
import { cubeToPixel } from "./hex-utils"

type MapDimensions = {
    width: number
    height: number
    apex: number
}

export const getBoardHexesRectangularMapDimensions = (
    boardHexes: BoardHexes
): MapDimensions => {

    // Gets the top-most, bottom-most, left-most, and right-most hexes, then calculates the difference for the map width and height
    const qPlusSMax = Math.max(
        ...Object.keys(boardHexes).map(
            (hexID) => boardHexes[hexID].q + boardHexes[hexID].s
        )
    )
    const qPlusSMin = Math.min(
        ...Object.keys(boardHexes).map(
            (hexID) => boardHexes[hexID].q + boardHexes[hexID].s
        )
    )
    const sMinusQMax = Math.max(
        ...Object.keys(boardHexes).map(
            (hexID) => boardHexes[hexID].s - boardHexes[hexID].q
        )
    )
    const sMinusQMin = Math.min(
        ...Object.keys(boardHexes).map(
            (hexID) => boardHexes[hexID].s - boardHexes[hexID].q
        )
    )
    const hexHeight = qPlusSMax - qPlusSMin
    const height = (hexHeight * 1.5 + 2 * HEXGRID_HEX_RADIUS) * HEXGRID_SPACING
    const hexWidth = sMinusQMax - sMinusQMin
    const width =
        (hexWidth + 2) * HEXGRID_HEX_APOTHEM * HEXGRID_SPACING
    const apex = Math.max(...Object.values(boardHexes).map((hex) => hex.altitude)) * HEXGRID_HEX_HEIGHT
    return { height, width, apex }
}
export const getBoardHex3DCoords = (hex: CubeCoordinate & { altitude: number }) => {
    return {
        x: cubeToPixel(hex).x * HEXGRID_SPACING,
        y: hex.altitude * HEXGRID_HEX_HEIGHT,
        z: cubeToPixel(hex).y * HEXGRID_SPACING,
    }
}

export function genPieceID(qraID: string, pieceID: string) {
    return `${qraID},${pieceID}`
}
export function genBoardHexID(hex: CubeCoordinate & { altitude: number }) {
    /* Hex world global coords (q,r,altitude) => (x,y,z)
    1. In cube coords, "s" in (qrs) is redundant for cartesian (xy) calculation
    2. Only one hex can exist per global coordinate
    */
    return `${hex.altitude},${hex.q},${hex.r}`
}