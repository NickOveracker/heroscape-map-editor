import { Vector3 } from 'three'
import { BoardHex, BoardHexes, BoardPieces, CubeCoordinate } from '../types'
import {
  HEXGRID_HEX_APOTHEM,
  HEXGRID_HEX_HEIGHT,
  HEXGRID_HEX_RADIUS,
  HEXGRID_SPACING,
  HEXGRID_HEXCAP_FLUID_HEIGHT,
} from './constants'
import { cubeToPixel, hexUtilsAdd, hexUtilsGetNeighborForRotation, hexUtilsGetRadialFarNeighborForRotation } from './hex-utils'

type MapDimensions = {
  width: number
  height: number
  apex: number
}

export const getBoardHexesRectangularMapDimensions = (
  boardHexes: BoardHexes,
): MapDimensions & {
  hexHeight: number
  hexWidth: number
} => {
  // Gets the top-most, bottom-most, left-most, and right-most hexes, then calculates the difference for the map width and height
  const qPlusSMax = Math.max(
    ...Object.keys(boardHexes).map(
      (hexID) => boardHexes[hexID].q + boardHexes[hexID].s,
    ),
  )
  const qPlusSMin = Math.min(
    ...Object.keys(boardHexes).map(
      (hexID) => boardHexes[hexID].q + boardHexes[hexID].s,
    ),
  )
  const sMinusQMax = Math.max(
    ...Object.keys(boardHexes).map(
      (hexID) => boardHexes[hexID].s - boardHexes[hexID].q,
    ),
  )
  const sMinusQMin = Math.min(
    ...Object.keys(boardHexes).map(
      (hexID) => boardHexes[hexID].s - boardHexes[hexID].q,
    ),
  )
  const hexHeight = qPlusSMax - qPlusSMin + 1
  const height = (hexHeight * 1.5 + 2 * HEXGRID_HEX_RADIUS) * HEXGRID_SPACING
  const hexWidth = sMinusQMax - sMinusQMin / 2 + 1
  const width = (hexWidth + 2) * HEXGRID_HEX_APOTHEM * HEXGRID_SPACING
  const apex =
    Math.max(...Object.values(boardHexes).map((hex) => hex.altitude)) *
    HEXGRID_HEX_HEIGHT
  return { height, width, apex, hexHeight, hexWidth }
}
export const getBoardHex3DCoords = (
  hex: CubeCoordinate & { altitude: number },
) => {
  const altitude = hex?.altitude ?? 0
  const x = cubeToPixel(hex).x * HEXGRID_SPACING
  const y = altitude * HEXGRID_HEX_HEIGHT
  const z = cubeToPixel(hex).y * HEXGRID_SPACING
  const yBaseCap = y - HEXGRID_HEX_HEIGHT
  const yWithBase = yBaseCap + HEXGRID_HEXCAP_FLUID_HEIGHT / 2
  const yBase = yBaseCap + HEXGRID_HEXCAP_FLUID_HEIGHT / 2
  return {
    x,
    y,
    z,
    yBaseCap,
    yWithBase,
    yBase,
  }
}
export const getHexNeighborByRotAlt = (
  hex: BoardHex,
  boardHexes: BoardHexes,
  rotation: number,
  altitudeDelta?: number
) => {
  let neighborCoord: CubeCoordinate
  if (Number.isInteger(rotation)) {
    neighborCoord = hexUtilsAdd({ q: hex.q, r: hex.r, s: hex.s }, hexUtilsGetNeighborForRotation(rotation))
  } else {
    neighborCoord = hexUtilsAdd({ q: hex.q, r: hex.r, s: hex.s }, hexUtilsGetRadialFarNeighborForRotation(rotation))
  }
  // main thing is the lower altitude of 1, otherwise this would work for regular land hexes too
  return boardHexes[genBoardHexID({ ...neighborCoord, altitude: hex.altitude + (altitudeDelta ?? 0) })]
}
export const getHexNearNeighborByRotation = (
  hex: BoardHex,
  boardHexes: BoardHexes,
  rotation: number
) => {
  return boardHexes[genBoardHexID({ ...hexUtilsAdd({ q: hex.q, r: hex.r, s: hex.s }, hexUtilsGetNeighborForRotation(rotation)), altitude: hex.altitude })]
}
const halfASideLength = HEXGRID_HEX_RADIUS / 2
export const hexPointsFromCenter = {
  topRight: new Vector3(HEXGRID_HEX_APOTHEM, 0, halfASideLength), // top-right
  bottomRight: new Vector3(HEXGRID_HEX_APOTHEM, 0, -halfASideLength), // bottom-right
  bottom: new Vector3(0, 0, -HEXGRID_HEX_RADIUS), // bottom
  bottomLeft: new Vector3(-HEXGRID_HEX_APOTHEM, 0, -halfASideLength), // bottom-left
  topLeft: new Vector3(-HEXGRID_HEX_APOTHEM, 0, halfASideLength), // top-left
  top: new Vector3(0, 0, HEXGRID_HEX_RADIUS), // top
}
export const pillarSideRotations = [0, 1.5, 3, 4.5]
export const pillarSideRotationsFlip: { [rotation: number]: number } = {
  [0]: 3,
  [1.5]: 4.5,
  [3]: 0,
  [4.5]: 1.5,
}
export function encodeFilename(str: string) {
  return str.replace(/[^\w]/g, '_')
}
export function genPieceID(
  boardHexID: string,
  pieceID: string,
  rotation: number,
) {
  return `${boardHexID}~${rotation}~${pieceID}`
}
export function decodePieceID(aqrrID: string) {
  const parsed = aqrrID.split('~')
  const altitude = parseInt(parsed[0])
  const q = parseInt(parsed[1])
  const r = parseInt(parsed[2])
  const s = -q - r
  const rotation = parseFloat(parsed[3])
  const pieceID = parsed[4]
  const pieceCoords = { q, r, s }
  return {
    pieceID,
    altitude,
    rotation,
    boardHexID: genBoardHexID({ ...pieceCoords, altitude }),
    pieceCoords
  }
}
export function genBoardHexID(hex: CubeCoordinate & { altitude: number }) {
  /* Hex world global coords (q,r,altitude) => (x,y,z)
    1. In cube coords, "s" in (qrs) is redundant for cartesian (xy) calculation
    2. Only one hex can exist per global coordinate
    */
  return `${hex.altitude}~${hex.q}~${hex.r}`
}
export const getBoardPiecesMaxLevel = (boardPieces: BoardPieces) => {
  const maxLevel = 1 + Object.keys(boardPieces)
    .map(bp => decodePieceID(bp).altitude) // get their altitudes
    .sort((a, b) => b - a)[0] // sort them high to low and grab the first
  return Number.isNaN(maxLevel) ? 0 : maxLevel
}