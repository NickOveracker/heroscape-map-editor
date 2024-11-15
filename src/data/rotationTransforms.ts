import { CastleObstacles, EdgeAddons, EdgeObstacles, HexObstacles } from "../types"

/* 
    WHAT/WHY
    These were mapped out by placing a tile down in virtualscape 6 times on known hexes. 1 for each rotation.
    So the first placement would mark the "origin" hex, whatever hex goes where you clicked. The tile-templates
    are built from this placement. The origin hex is {0,0,0} and the rest of the tiles for rotation-0 are in the 
    template with coordinates relative to the origin hex.
  
    Now, for each rotation, Virtualscape sometimes moves the origin hex, while still consistently rotating pieces clockwise.
    For instance, when your rotate the 24-hex piece, the origin hex moves a few hexes away from
    the actual hex you clicked.
  
    Here were my findings for all the pieces that are in Virtualscape:
  
    1-hex land tiles: rotation matters little.
    1-hex obstructions: affects model display.
  
    1-hex castle walls/bases: 
    END(=>), STRAIGHT(=) connections to left 
    CORNER(>>) connections left-up & left-down
    All turn CW
  
    1-hex edge pieces: battlements, ladders, flags
    Start facing right-up, CW from there (remember, they are technically placed adjacent to the hex they are modifying)
    
    2-hex tiles have 3 unique orientations that repeat 2-times
  
    3-hex have 2 unique orientations that repeat 3-times
    Glacier-3, however, shows that if each part of the 3-hex is unique, then there is 6 unique orientations
  
    7-hex (rose/circle): rotation does not really matter
  
    All these are similar:
    4-hex: [glacier-4, tree-4]
    EdgeObstacles: [ruins-3, ruins-2, roadwall-4]
    "Long Tiles": [7-hex wallWalk, 9-hex wallWalk, arch-3/archnodoor-3,
    road-5, glacier-6, hive-6, marvelRuin-6, marvelBreakingWall-6]
    They go:
    ($%)--1 Then flip and repeat: (%$)--4
    |  \                          |  \
    3   2                         6   5

*/
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
  // glacier6, hive6
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
  '5': straight5,
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
  [HexObstacles.hive6]: glacier6,
  // EDGE OBSTACLES
  [EdgeObstacles.ruins2]: straight2,
  [EdgeObstacles.ruins3]: straight3,
  // HEX/EDGE
  [EdgeObstacles.marvel6]: marvel6,
  [EdgeObstacles.marvelBroken6]: marvel6,
  // ADDONS
  [EdgeAddons.roadWall4]: straight4,
  // CASTLE
  [CastleObstacles.archDoor3]: straight3,
  [CastleObstacles.archNoDoor3]: straight3,
  [CastleObstacles.wallWalk7]: castle7,
  [CastleObstacles.wallWalk9]: castle9,
  [CastleObstacles.castleBaseCorner]: t1, // THESE FACE LEFT THOUGH!
  [CastleObstacles.castleBaseStraight]: t1, // THESE FACE LEFT THOUGH!
  [CastleObstacles.castleBaseEnd]: t1, // THESE FACE LEFT THOUGH!
  [CastleObstacles.castleWallCorner]: t1, // THESE FACE LEFT THOUGH!
  [CastleObstacles.castleWallStraight]: t1, // THESE FACE LEFT THOUGH!
  [CastleObstacles.castleWallEnd]: t1, // THESE FACE LEFT THOUGH!
}

export default rotationTransforms