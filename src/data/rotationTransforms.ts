import { Dictionary } from "lodash"
import { Pieces, CubeCoordinate } from "../types"
import { hexUtilsAdd, hexUtilsRotate } from "../utils/hex-utils"
import tileTemplates from "./tileTemplates"

export default function getVSTileTemplate({
  clickedHex,
  rotation,
  template,
  isVsTile,
}: {
  clickedHex: CubeCoordinate
  rotation: number
  template: string
  isVsTile: boolean
}): CubeCoordinate[] {
  const originOfTileTransform =
    rotationTransforms[template][rotation]
  const originOfTile = hexUtilsAdd(clickedHex, originOfTileTransform)
  return tileTemplates[template]
    .map((t) => {
      return hexUtilsRotate(t, origin, rotation)
    })
    .map((t) => isVsTile ? hexUtilsAdd(t, originOfTile) : hexUtilsAdd(t, clickedHex))
}

const origin = { q: 0, r: 0, s: 0 }
const t1 = [origin, origin, origin, origin, origin, origin]
const straight2 = [
  origin,
  origin,
  origin,
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: -1, r: 1, s: 0 },
]
const t3 = [
  // glacier3, outcrop3
  origin,
  origin,
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: -1, r: 1, s: 0 },
]
const t7 = [
  // rose/circle style 7
  origin,
  { q: 1, r: 0, s: -1 },
  { q: 1, r: 1, s: -2 },
  { q: 0, r: 2, s: -2 },
  { q: -1, r: 2, s: -1 },
  { q: -1, r: 1, s: 0 },
]
const t24 = [
  origin,
  { q: 1, r: 0, s: -1 },
  { q: 2, r: 3, s: -5 },
  { q: 2, r: 5, s: -7 },
  { q: -5, r: 7, s: -2 },
  { q: -5, r: 2, s: 3 },
]
const straight3 = [
  // straight3, arch3/door3, ruins3
  origin,
  origin,
  origin,
  { q: 2, r: 0, s: -2 },
  { q: 0, r: 2, s: -2 },
  { q: -2, r: 2, s: 0 },
]
const straight4 = [
  // straight4, roadWall4
  origin,
  origin,
  origin,
  { q: 3, r: 0, s: -3 },
  { q: 0, r: 3, s: -3 },
  { q: -3, r: 3, s: 0 },
]
const straight5 = [
  //  road5: road is the only land tile with a 5-hex piece
  origin,
  origin,
  origin,
  { q: 4, r: 0, s: -4 },
  { q: 0, r: 4, s: -4 },
  { q: -4, r: 4, s: 0 },
]
const glacier6 = [
  // glacier6, hive
  origin,
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: 1, r: 1, s: -2 },
  { q: 0, r: 2, s: -2 },
  { q: -2, r: 2, s: 0 },
]
const glacier4 = [
  // glacier4
  origin,
  origin,
  { q: 1, r: 0, s: -1 },
  { q: 1, r: 1, s: -2 },
  { q: -1, r: 2, s: -1 },
  { q: -1, r: 1, s: 0 },
]
const castle7 = [
  origin,
  origin,
  { q: 1, r: 0, s: -1 },
  { q: 2, r: 1, s: -3 },
  { q: 0, r: 3, s: -3 },
  { q: -3, r: 3, s: 0 },
]
const castle9 = [
  origin,
  origin,
  { q: 1, r: 0, s: -1 },
  { q: 3, r: 1, s: -4 },
  { q: 0, r: 4, s: -4 },
  { q: -4, r: 4, s: 0 },
]
const marvel6 = [
  origin,
  origin,
  { q: 1, r: 0, s: -1 },
  { q: 3, r: 1, s: -4 },
  { q: -1, r: 4, s: -3 },
  { q: -4, r: 3, s: 1 },
]
const rotationTransforms: Dictionary<CubeCoordinate[]> = {
  // land tiles (solid and fluid) will use their size to lookup their rotations
  '1': t1,
  '2': straight2,
  '3': t3,
  '5': straight5, // only road5 uses this
  '7': t7,
  '24': t24,
  // obstacles will use their template name to lookup their rotations
  [Pieces.tree10]: t1,
  [Pieces.tree11]: t1,
  [Pieces.tree12]: t1,
  [Pieces.tree415]: glacier4,
  [Pieces.palm14]: t1,
  [Pieces.palm15]: t1,
  [Pieces.palm16]: t1,
  [Pieces.brush9]: t1,
  [Pieces.outcrop1]: t1,
  [Pieces.outcrop3]: t3,
  [Pieces.glacier1]: t1,
  [Pieces.glacier3]: t3,
  [Pieces.glacier4]: glacier4,
  [Pieces.glacier6]: glacier6,
  [Pieces.hive]: glacier6,
  // EDGE OBSTACLES
  [Pieces.ruins2]: straight2,
  [Pieces.ruins3]: straight3,
  // HEX/EDGE
  [Pieces.marvel]: marvel6,
  [Pieces.marvelBroken]: marvel6,
  // ADDONS
  [Pieces.roadWall]: straight4,
  // CASTLE
  [Pieces.archDoor3]: straight3,
  [Pieces.archNoDoor3]: straight3,
  [Pieces.wallWalk1]: t1,
  [Pieces.wallWalk7]: castle7,
  [Pieces.wallWalk9]: castle9,
  [Pieces.castleBaseCorner]: t1, // THESE FACE LEFT THOUGH!
  [Pieces.castleBaseStraight]: t1, // THESE FACE LEFT THOUGH!
  [Pieces.castleBaseEnd]: t1, // THESE FACE LEFT THOUGH!
  [Pieces.castleWallCorner]: t1, // THESE FACE LEFT THOUGH!
  [Pieces.castleWallStraight]: t1, // THESE FACE LEFT THOUGH!
  [Pieces.castleWallEnd]: t1, // THESE FACE LEFT THOUGH!
}
