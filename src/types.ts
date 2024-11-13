export type AppState = {
    boardHexes: BoardHexes
    hexMap: HexMap
}
export type GameMap = {
    boardHexes: BoardHexes
    startZones: StartZones
    hexMap: HexMap
}
export type HexMap = {
    id: string
    name: string
    shape: string // 'hexagon' | 'rectangle'
    glyphs: Glyphs
    size?: number // for hexagon shaped maps
    height?: number // for rectangle shaped maps
    width?: number // for rectangle shaped maps
}
export type Glyphs = {
    [boardHexID: string]: Glyph
}
export type Glyph = {
    hexID: string
    glyphID: string
    isRevealed: boolean
}
export type Point = {
    x: number
    y: number
}
export type HexCoordinates = {
    q: number
    r: number
    s: number
}
export enum HexTerrain {
    empty = 'empty',
    // solid
    grass = 'grass',
    rock = 'rock',
    sand = 'sand',
    road = 'road',
    snow = 'snow',
    lavaField = 'lavaField',
    swamp = 'swamp',
    asphalt = 'asphalt',
    concrete = 'concrete',
    dungeon = 'dungeon',
    // fluid
    water = 'water',
    lava = 'lava',
    ice = 'ice',
    swampWater = 'swampWater',
    shadow = 'shadow',
}
export enum HexObstacles {
    tree10 = 'tree10',
    tree11 = 'tree11',
    tree12 = 'tree12',
    tree415 = 'tree415',
    palm14 = 'palm14',
    palm15 = 'palm15',
    palm16 = 'palm16',
    brush9 = 'brush9',
    outcrop1 = 'outcrop1',
    outcrop3 = 'outcrop3',
    glacier1 = 'glacier1',
    glacier3 = 'glacier3',
    glacier4 = 'glacier4',
    glacier6 = 'glacier6',
    hive6 = 'hive6',
}
export enum EdgeObstacles {
    ruins2 = 'ruins2',
    ruins3 = 'ruins3',
    marvel6 = 'marvel6',
    marvelBroken6 = 'marvelBroken6',
}
export enum EdgeAddons {
    roadWall4 = 'roadWall4',
    battlement = 'battlement',
    flag = 'castleFlag',
    ladder = 'ladder',
}
export enum CastleObstacles {
    wallWalk1 = 'wallWalk1',
    wallWalk7 = 'wallWalk7',
    wallWalk9 = 'wallWalk9',
    archDoor3 = 'archDoor3',
    archNoDoor3 = 'archNoDoor3',
    castleBaseCorner = 'castleBaseCorner',
    castleBaseStraight = 'castleBaseStraight',
    castleBaseEnd = 'castleBaseEnd',
    castleWallCorner = 'castleWallCorner',
    castleWallStraight = 'castleWallStraight',
    castleWallEnd = 'castleWallEnd',
}
export interface BoardHex extends HexCoordinates {
    id: string
    occupyingUnitID: string
    isUnitTail: boolean
    altitude: number
    startzonePlayerIDs: string[]
    terrain: string
    subTerrain?: string
}
export type BoardHexes = {
    [key: string]: BoardHex
}
export type EditingBoardHexes = {
    [boardHexId: string]: HexCoordinates & {
        id: string
        occupyingUnitID: string
        isUnitTail: boolean
    }
}
export type StartZones = {
    [playerID: string]: string[] // boardHex IDs
}