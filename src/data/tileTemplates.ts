import { Dictionary } from 'lodash'
import { CubeCoordinate, Pieces } from '../types'
import { hexUtilsAdd } from '../utils/hex-utils'



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

const ruinsExtraBackHex = {
  q: 0,
  r: -1,
  s: 1,
}
const ruins2 = [ // the ruins have one extra hex at the end of their short leg that is blocked for a few hexes vertically and ASSUMED to require flat ground
  ...wallWalk7.map(c => hexUtilsAdd(c, { q: -1, r: 0, s: 1 })), // the ruins template is shifted one hex to the left
  ruinsExtraBackHex
]
const ruins3 = [ // the ruins have one extra hex at the end of their short leg that is blocked for a few hexes vertically and ASSUMED to require flat ground
  ...wallWalk9.map(c => hexUtilsAdd(c, { q: -1, r: 0, s: 1 })), // the ruins template is shifted one hex to the left
  ruinsExtraBackHex
]
const tileTemplates: Dictionary<CubeCoordinate[]> = {
  '1': basic1,
  '2': basic2,
  '3': basic3,
  '5': straight5, // currently, road is only land with a 5-hex
  '7': basic7,
  '24': basic24,
  // hex obstructions below
  [Pieces.tree10]: basic1,
  [Pieces.tree11]: basic1,
  [Pieces.tree12]: basic1,
  [Pieces.tree415]: glacier4,
  [Pieces.palm14]: basic1,
  [Pieces.palm15]: basic1,
  [Pieces.palm16]: basic1,
  [Pieces.brush9]: basic1,
  [Pieces.outcrop1]: basic1,
  [Pieces.outcrop3]: basic3,
  [Pieces.glacier1]: basic1,
  [Pieces.glacier3]: basic3,
  [Pieces.glacier4]: glacier4,
  [Pieces.glacier6]: glacier6,
  [Pieces.hive]: glacier6,
  // edge stuff below
  [Pieces.ruins2]: ruins2,
  [Pieces.ruins3]: ruins3,
  [Pieces.marvel]: marvel6,
  [Pieces.marvelBroken]: marvel6,
  // castle
  [Pieces.wallWalk1]: basic1,
  [Pieces.wallWalk7]: wallWalk7,
  [Pieces.wallWalk9]: wallWalk9,
  [Pieces.castleArch]: straight3,
  [Pieces.castleBaseCorner]: basic1,
  [Pieces.castleBaseStraight]: basic1,
  [Pieces.castleBaseEnd]: basic1,
  [Pieces.castleWallCorner]: basic1,
  [Pieces.castleWallStraight]: basic1,
  [Pieces.castleWallEnd]: basic1,

  [Pieces.roadWall]: straight4,
  // TODO
  // start zone
  // glyph
  // ladder: basic1,
  // battlement: basic1,
  // flag: basic1,
}

export default tileTemplates 
