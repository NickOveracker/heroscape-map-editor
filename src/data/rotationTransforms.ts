import { CastleObstacles, CubeCoordinate, EdgeAddons, EdgeObstacles, HexObstacles } from "../types"
import { hexUtilsAdd, hexUtilsRotate } from "../utils/hex-utils"
import tileTemplates from "./tileTemplates"

export default function getVSTileTemplate({
  clickedHex,
  rotation,
  template,
}: {
  clickedHex: CubeCoordinate
  rotation: number
  template: string
}): CubeCoordinate[] {
  const originOfTileTransform =
    rotationTransforms[template][rotation]
  const originOfTile = hexUtilsAdd(clickedHex, originOfTileTransform)
  return tileTemplates[template]
    .map((t) => {
      return hexUtilsRotate(t, origin, rotation)
    })
    .map((t) => hexUtilsAdd(t, originOfTile))
}

const origin = { q: 0, r: 0, s: 0 }
const t1 = [origin, origin, origin, origin, origin, origin]
const straight2 = [
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: -1, r: 1, s: 0 },
]
const t3 = [
  // glacier3, outcrop3
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: -1, r: 1, s: 0 },
]
const t7 = [
  // rose/circle style 7
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 1, r: 1, s: -2 },
  { q: 0, r: 2, s: -2 },
  { q: -1, r: 2, s: -1 },
  { q: -1, r: 1, s: 0 },
]
const t24 = [
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 2, r: 3, s: -5 },
  { q: 2, r: 5, s: -7 },
  { q: -5, r: 7, s: -2 },
  { q: -5, r: 2, s: 3 },
]
const straight3 = [
  // straight3, arch3/door3
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 2, r: 0, s: -2 },
  { q: 0, r: 2, s: -2 },
  { q: -2, r: 2, s: 0 },
]
const straight4 = [
  // straight4, roadWall4
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 3, r: 0, s: -3 },
  { q: 0, r: 3, s: -3 },
  { q: -3, r: 3, s: 0 },
]
const straight5 = [
  //  road5: road is the only land tile with a 5-hex piece
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 4, r: 0, s: -4 },
  { q: 0, r: 4, s: -4 },
  { q: -4, r: 4, s: 0 },
]
const glacier6 = [
  // glacier6, hive
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: 1, r: 1, s: -2 },
  { q: 0, r: 2, s: -2 },
  { q: -2, r: 2, s: 0 },
]
const glacier4 = [
  // glacier4
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 1, r: 1, s: -2 },
  { q: -1, r: 2, s: -1 },
  { q: -1, r: 1, s: 0 },
]
const castle7 = [
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 2, r: 1, s: -3 },
  { q: 0, r: 3, s: -3 },
  { q: -3, r: 3, s: 0 },
]
const castle9 = [
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 3, r: 1, s: -4 },
  { q: 0, r: 4, s: -4 },
  { q: -4, r: 4, s: 0 },
]
const marvel6 = [
  { q: 0, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 3, r: 1, s: -4 },
  { q: -1, r: 4, s: -3 },
  { q: -4, r: 3, s: 1 },
]
const rotationTransforms = {
  // land tiles (solid and fluid) will use their size to lookup their rotations
  '1': t1,
  '2': straight2,
  '3': t3,
  '5': straight5, // only road5 uses this
  '7': t7,
  '24': t24,
  // obstacles will use their template name to lookup their rotations
  [HexObstacles.tree10]: t1,
  [HexObstacles.tree11]: t1,
  [HexObstacles.tree12]: t1,
  [HexObstacles.tree415]: glacier4,
  [HexObstacles.palm14]: t1,
  [HexObstacles.palm15]: t1,
  [HexObstacles.palm16]: t1,
  [HexObstacles.brush9]: t1,
  [HexObstacles.outcrop1]: t1,
  [HexObstacles.outcrop3]: t3,
  [HexObstacles.glacier1]: t1,
  [HexObstacles.glacier3]: t3,
  [HexObstacles.glacier4]: glacier4,
  [HexObstacles.glacier6]: glacier6,
  [HexObstacles.hive]: glacier6,
  // EDGE OBSTACLES
  [EdgeObstacles.ruins2]: straight2,
  [EdgeObstacles.ruins3]: straight3,
  // HEX/EDGE
  [EdgeObstacles.marvel]: marvel6,
  [EdgeObstacles.marvelBroken]: marvel6,
  // ADDONS
  [EdgeAddons.roadWall]: straight4,
  // CASTLE
  [CastleObstacles.archDoor3]: straight3,
  [CastleObstacles.archNoDoor3]: straight3,
  [CastleObstacles.wallWalk1]: t1,
  [CastleObstacles.wallWalk7]: castle7,
  [CastleObstacles.wallWalk9]: castle9,
  [CastleObstacles.castleBaseCorner]: t1, // THESE FACE LEFT THOUGH!
  [CastleObstacles.castleBaseStraight]: t1, // THESE FACE LEFT THOUGH!
  [CastleObstacles.castleBaseEnd]: t1, // THESE FACE LEFT THOUGH!
  [CastleObstacles.castleWallCorner]: t1, // THESE FACE LEFT THOUGH!
  [CastleObstacles.castleWallStraight]: t1, // THESE FACE LEFT THOUGH!
  [CastleObstacles.castleWallEnd]: t1, // THESE FACE LEFT THOUGH!
}
