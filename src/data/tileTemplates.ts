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
export const verticalObstructionTemplates: Dictionary<number[]> = {
  /* 
   The order really matters here.
   These number arrays' indices must line up with the templates' indices, as each hex in a terrain model might have a different height.
   And WORSE, we shifted left one hex up there ^^^ in the tile templates, so keep it straight that the
   height arrays are "starting" from the first "9" on line 2 of each comment-template below
  */
  [Pieces.ruins2]: [
    // Played with this in virtualscape, and here's how much I think each hex in the template requires for clearance:
    /* Ruins2, 10 on line 2 is the origin for rotation=0
    the X's mark Critical support hexes, these must be supported by solid underneath
    --3--
    9--10x--7x---4
   --10--10x--7--
    */
    // first the basic3
    9, 10, 10,
    // then the two to the right
    7, 4,
    // then the two down to the right
    10, 7,
    // then the extra back hex
    3
  ],
  [Pieces.ruins3]: [
    /* Ruins3, second 9 on line 2 is the origin for rotation=0
    the X's mark Critical support hexes, these must be supported by solid underneath
    --3--
    9---9x----8x---7---3
    ---9---8x---8---7--
    */
    // so first the basic-3
    9, 9, 9,
    // then the two to the right
    8, 7,
    // then the two down to the right
    8, 8,
    // then the far right and far down-right of wallWalk9
    3, 7,
    // then the extra back hex
    3
  ]
}
export const verticalSupportTemplates: Dictionary<number[]> = {
  /* 
   The order really matters here.
   These number arrays' indices must line up with the templates' indices, much like the verticalObstructionTemplates and implemented shortly after them.
  */
  [Pieces.ruins2]: [
    // Eyeballed this and performed a physical thought experiment remembering all the times I built a map with ruins and how the middle just needed to be supported
    /* Ruins2, 10 on line 2 is the origin for rotation=0
    the X's mark Critical support hexes, these must be supported by solid underneath
    --3--
    9--10x--7x---4
   --10--10x--7--
    */
    // first the basic3
    0, 1, 0,
    // then the two to the right
    1, 0,
    // then the two down to the right
    1, 0,
    // then the extra back hex
    0
  ],
  [Pieces.ruins3]: [
    /* Ruins3, second 9 on line 2 is the origin for rotation=0
    the X's mark Critical support hexes, these must be supported by solid underneath
    --3--
    9---9x----8x---7---3
    ---9---8x---8---7--
    */
    // so first the basic-3
    0, 1, 0,
    // then the two to the right
    1, 0,
    // then the two down to the right
    1, 0,
    // then the far right and far down-right of wallWalk9
    0, 0,
    // then the extra back hex
    0
  ]
}
export const interiorHexTemplates: Dictionary<number[]> = {
  /* 
   The order really matters here.
   These number arrays' indices must line up with the templates' indices, much like the verticalObstructionTemplates and implemented shortly after them.
  */
  [Pieces.ruins2]: [
    /* the i's mark the interior hexes
    --3--
    9--10i--7i---4
   --10--10--7--
    */
    // first the basic3
    0, 2, 0,
    // then the two to the right
    1, 0,
    // then the two down to the right
    0, 0,
    // then the extra back hex
    0
  ],
  [Pieces.ruins3]: [
    /* the i's mark the interior hexes
    --3--
    9---9i----8i---7i---3
    ---9---8---8---7--
    */
    // so first the basic-3
    0, 2, 0,
    // then the two to the right
    1, 1,
    // then the two down to the right
    0, 0,
    // then the far right and far down-right of wallWalk9
    0, 0,
    // then the extra back hex
    0
  ]
}
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
  [Pieces.archDoor3]: straight3,
  [Pieces.archNoDoor3]: straight3,
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
