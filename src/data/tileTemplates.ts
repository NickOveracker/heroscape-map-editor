import { Dictionary } from 'lodash'
import { CastleObstacles, EdgeAddons, EdgeObstacles, CubeCoordinate, HexObstacles } from '../types'



const origin = { q: 0, r: 0, s: 0 }
const basic1 = [origin]
const basic2 = [
  origin,
  {
    q: 1,
    r: 0,
    s: -1,
  },
]
const basic3 = [
  ...basic2,
  {
    q: 0,
    r: 1,
    s: -1,
  },
]
const basic7 = [
  ...basic3,
  {
    q: -1,
    r: 1,
    s: 0,
  },
  {
    q: 1,
    r: 1,
    s: -2,
  },
  {
    q: -1,
    r: 2,
    s: -1,
  },
  {
    q: 0,
    r: 2,
    s: -2,
  },
]
const basic24 = [
  ...basic7,
  {
    q: 1,
    r: 2,
    s: -3,
  },
  {
    q: -2,
    r: 3,
    s: -1,
  },
  {
    q: -1,
    r: 3,
    s: -2,
  },
  {
    q: 0,
    r: 3,
    s: -3,
  },
  {
    q: 1,
    r: 3,
    s: -4,
  },
  {
    q: 2,
    r: 3,
    s: -5,
  },
  {
    q: -2,
    r: 4,
    s: -2,
  },
  {
    q: -1,
    r: 4,
    s: -3,
  },
  {
    q: 0,
    r: 4,
    s: -4,
  },
  {
    q: 1,
    r: 4,
    s: -5,
  },
  {
    q: 2,
    r: 4,
    s: -6,
  },
  {
    q: -3,
    r: 5,
    s: -2,
  },
  {
    q: -2,
    r: 5,
    s: -3,
  },
  {
    q: -1,
    r: 5,
    s: -4,
  },
  {
    q: 0,
    r: 5,
    s: -5,
  },
  {
    q: 1,
    r: 5,
    s: -6,
  },
  {
    q: 2,
    r: 5,
    s: -7,
  },
]
const straight3 = [
  ...basic2,
  {
    q: 2,
    r: 0,
    s: -2,
  },
]
const straight4 = [ // roadwall4
  ...straight3,
  {
    q: 3,
    r: 0,
    s: -3,
  },
]
const straight5 = [
  ...straight4,
  {
    q: 4,
    r: 0,
    s: -4,
  },
]
const glacier4 = [
  // glacier4, tree4
  ...basic3,
  {
    q: 1,
    r: 1,
    s: -2,
  },
]
const glacier6 = [
  // marro hive, glacier-6
  ...basic3,
  {
    q: -1,
    r: 1,
    s: 0,
  },
  {
    q: 2,
    r: 0,
    s: -2,
  },
  {
    q: 1,
    r: 1,
    s: -2,
  },
]
const marvel6 = [
  ...glacier4,
  {
    q: 2,
    r: 1,
    s: -3,
  },
  {
    q: 3,
    r: 1,
    s: -4,
  },
]
const wallWalk7 = [
  ...basic3,
  {
    q: 2,
    r: 0,
    s: -2,
  },
  {
    q: 3,
    r: 0,
    s: -3,
  },
  {
    q: 1,
    r: 1,
    s: -2,
  },
  {
    q: 2,
    r: 1,
    s: -3,
  },
]
const wallWalk9 = [
  ...wallWalk7,
  {
    q: 4,
    r: 0,
    s: -4,
  },
  {
    q: 3,
    r: 1,
    s: -4,
  },
]

const tileTemplates: Dictionary<CubeCoordinate[]> = {
  ' 1': basic1,
  ' 2': basic2,
  ' 3': basic3,
  ' 5': straight5, // currently, road is only land with a 5-hex
  ' 7': basic7,
  '24': basic24,
  // hex obstructions below
  [HexObstacles.tree10]: basic1,
  [HexObstacles.tree11]: basic1,
  [HexObstacles.tree12]: basic1,
  [HexObstacles.tree415]: glacier4,
  [HexObstacles.palm14]: basic1,
  [HexObstacles.palm15]: basic1,
  [HexObstacles.palm16]: basic1,
  [HexObstacles.brush9]: basic1,
  [HexObstacles.outcrop1]: basic1,
  [HexObstacles.outcrop3]: basic3,
  [HexObstacles.glacier1]: basic1,
  [HexObstacles.glacier3]: basic3,
  [HexObstacles.glacier4]: glacier4,
  [HexObstacles.glacier6]: glacier6,
  [HexObstacles.hive]: glacier6,

  // edge stuff below
  [EdgeObstacles.ruins2]: basic2,
  [EdgeObstacles.ruins3]: straight3,
  [EdgeObstacles.marvel]: marvel6,
  [EdgeObstacles.marvelBroken]: marvel6,
  // castle
  [CastleObstacles.wallWalk1]: basic1,
  [CastleObstacles.wallWalk7]: wallWalk7,
  [CastleObstacles.wallWalk9]: wallWalk9,
  [CastleObstacles.archDoor3]: straight3,
  [CastleObstacles.archNoDoor3]: straight3,
  [CastleObstacles.castleBaseCorner]: basic1,
  [CastleObstacles.castleBaseStraight]: basic1,
  [CastleObstacles.castleBaseEnd]: basic1,
  [CastleObstacles.castleWallCorner]: basic1,
  [CastleObstacles.castleWallStraight]: basic1,
  [CastleObstacles.castleWallEnd]: basic1,

  [EdgeAddons.roadWall]: straight4,
  // TODO
  // start zone
  // glyph
  // ladder: basic1,
  // battlement: basic1,
  // flag: basic1,
}

export default tileTemplates 
