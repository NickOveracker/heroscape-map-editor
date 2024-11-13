import { BoardHex, BoardHexes } from "../types"
import { HEXGRID_HEX_APOTHEM, HEXGRID_HEX_RADIUS, HEXGRID_SPACING } from "./constants"
import { cubeToPixel } from "./hex-utils"

type MapDimensions = {
    width: number
    height: number
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
        (hexWidth * HEXGRID_HEX_APOTHEM + 2 * HEXGRID_HEX_APOTHEM) * HEXGRID_SPACING
    // const maxAltitude = Math.max(...Object.keys(boardHexes).map((hexID) => boardHexes[hexID].altitude))
    return { height, width }
}
export const getBoardHex3DCoords = (hex: BoardHex) => {
    const { x, y } = cubeToPixel(hex)
    // DEV NOTE: THIS IS WHERE WE SWITCH Y AND Z (And I am not 100% certain I did it to maintain "y" as altitude, I may have just goofed up and covered it up with this)
    // I think I did it so that in our quadrant, all axes are positive in handy directions
    return {
        x: (x + HEXGRID_HEX_APOTHEM) * HEXGRID_SPACING, // Scootch map right one apothem so that X=0 aligns with the left edge of hexes, not the center. Perhaps unnecessary.
        z: (y + HEXGRID_HEX_RADIUS) * HEXGRID_SPACING, // Scootch map down one radius so that Y=0 aligns with the top edge of hexes, not the center. Perhaps unnecessary.
    }
}