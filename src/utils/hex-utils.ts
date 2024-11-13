import {
  HEXGRID_HEX_RADIUS,
} from './constants'
import {
  HexCoordinates,
} from '../types'

const DIRECTIONS: HexCoordinates[] = [
  { q: 1, r: -1, s: 0 }, // NE +q -r
  { q: 1, r: 0, s: -1 }, // E +q -s
  { q: 0, r: 1, s: -1 }, // SE +r -s
  { q: -1, r: 1, s: 0 }, // SW -q +r
  { q: -1, r: 0, s: 1 }, // W -q +s
  { q: 0, r: -1, s: 1 }, // NW -r +s
]
export const hexUtilsAdd = (
  a: HexCoordinates,
  b: HexCoordinates
): HexCoordinates => {
  return { q: a.q + b.q, r: a.r + b.r, s: a.s + b.s }
}
const hexUtilsSubtract = (
  a: HexCoordinates,
  b: HexCoordinates
): HexCoordinates => {
  return { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s }
}
const hexUtilsLengths = (hex: HexCoordinates): number => {
  return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2
}
export const hexUtilsDistance = (
  a: HexCoordinates,
  b: HexCoordinates
): number => {
  return hexUtilsLengths(hexUtilsSubtract(a, b))
}
const hexUtilsDirection = (direction: number): HexCoordinates => {
  return DIRECTIONS[(6 + (direction % 6)) % 6]
}
export const hexUtilsNeighbor = (
  hex: HexCoordinates,
  direction: number
): HexCoordinates => {
  return hexUtilsAdd(hex, hexUtilsDirection(direction))
}
export const hexUtilsNeighbors = (hex: HexCoordinates): HexCoordinates[] => {
  const array: HexCoordinates[] = []
  for (let i = 0; i < DIRECTIONS.length; i += 1) {
    array.push(hexUtilsNeighbor(hex, i))
  }
  return array
}

export const cubeToPixel = (hex: HexCoordinates) => {
  const x =
    HEXGRID_HEX_RADIUS * (Math.sqrt(3) * hex.q + (Math.sqrt(3) / 2) * hex.r)
  const y = HEXGRID_HEX_RADIUS * ((3 / 2) * hex.r)
  return { x: x, y: y }
}
export function hexUtilsOddRToCube(x: number, y: number) {
  const q = x - (y - (y % 2)) / 2
  return { q, r: y, s: -q - y } // NOTE: Here I discovered JavaScript's negative zero: (-0 - 0)=>(-0) But at least: (-0).toString() => "0"
}
function hexUtilsRotateVector(
  v: HexCoordinates,
  rotation: number
): HexCoordinates {
  switch (rotation % 6) {
    case 1:
      return {
        q: -v.r,
        r: -v.s,
        s: -v.q,
      }
    case 2:
      return {
        q: v.s,
        r: v.q,
        s: v.r,
      }
    case 3:
      return {
        q: -v.q,
        r: -v.r,
        s: -v.s,
      }
    case 4:
      return {
        q: v.r,
        r: v.s,
        s: v.q,
      }
    case 5:
      return {
        q: -v.s,
        r: -v.q,
        s: -v.r,
      }
    case 0:
    default:
      return v
  }
}
/* hexUtilsRotate: not this does not update the IDS of boardHexes */
export function hexUtilsRotate<T extends HexCoordinates>(
  h: T,
  origin: T,
  rotation: number
): T {
  const vector = hexUtilsSubtract(h, origin)
  const rotatedVector = hexUtilsRotateVector(vector, rotation)
  return {
    ...h,
    ...hexUtilsAdd(rotatedVector, origin),
  }
}
export const getDirectionOfNeighbor = (
  hexStart: HexCoordinates,
  neighbor: HexCoordinates
) => {
  const diff = hexUtilsSubtract(hexStart, neighbor)
  const matchedDir = DIRECTIONS.findIndex(
    (d) => d.q === diff.q && d.r === diff.r && d.s === diff.s
  )
  if (matchedDir === -1) return undefined
  if (matchedDir === 1) return 0 // east, E, the base facing of 3d models
  if (matchedDir === 0) return 1 // NE
  if (matchedDir === 5) return 2 // NW
  if (matchedDir === 4) return 3 // W
  if (matchedDir === 3) return 4 // SW
  if (matchedDir === 2) return 5 // SE
}
