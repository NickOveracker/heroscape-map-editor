export type AppState = MapState & {
    uiState: {
        penMode: PenMode
        pieceSize: number
        isShowStartZones: boolean
    },
}
export type MapState = {
    boardHexes: BoardHexes
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
export type CubeCoordinate = {
    q: number
    r: number
    s: number
}
export interface BoardHex extends CubeCoordinate {
    id: string
    altitude: number
    terrain: string
    tileID: string // tileID=qraID + pieceID
}
export type BoardHexes = {
    [qraID: string]: BoardHex
}
export type StartZones = {
    [playerID: string]: string[] // boardHex IDs
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
    // hex obstacle
    tree = 'tree',
    palm = 'palm',
    brush = 'brush',
    outcrop = 'outcrop',
    glacier = 'glacier',
    hive = 'hive',
    // edge obstacle
    ruin = 'ruin',
    marvelRuin = 'marvelRuin',
    // edge addon
    roadWall = 'roadWall',
    battlement = 'battlement',
    castleFlag = 'castleFlag',
    ladder = 'ladder',
    // castle
    castle = 'castle',
    wallWalk = 'wallWalk',
    // other
    glyph = 'glyph',
    _vsPersonal = '_vsPersonal',
    _vsFigure = '_vsFigure',
}
export enum NonHexTerrain {
    // castleFlag = 'castleFlag',
}
export enum EdgeAddons {
    roadWall = 'roadWall',
    battlement = 'battlement',
    flag = 'castleFlag',
    ladder = 'ladder',
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
    hive = 'hive',
}
export enum EdgeObstacles {
    ruins2 = 'ruins2',
    ruins3 = 'ruins3',
    marvel = 'marvel',
    marvelBroken = 'marvelBroken',
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

export enum PenMode {
    none = 'none',
    eraserStartZone = 'eraserStartZone',
    eraser = HexTerrain.empty,
    water = HexTerrain.water,
    grass = HexTerrain.grass,
    sand = HexTerrain.sand,
    rock = HexTerrain.rock,
    startZone0 = 'startZone0',
    startZone1 = 'startZone1',
    startZone2 = 'startZone2',
    // startZone3 = 'startZone3',
    // startZone4 = 'startZone4',
    // startZone5 = 'startZone5',
}

export type VirtualScapeMap = {
    version: number
    name: string
    author: string
    playerNumber: string
    scenario: string
    levelPerPage: number
    printingTransparency: number
    printingGrid: boolean
    printTileNumber: boolean
    printStartAreaAsLevel: boolean
    tileCount: number
    tiles: VirtualScapeTile[]
}
export type VirtualScapeTile = {
    type: number
    version: number
    rotation: number
    posX: number
    posY: number
    posZ: number
    glyphLetter: string
    glyphName: string
    startName: string
    colorf: number
    isFigureTile: boolean
    figure: {
        name: string
        name2: string
    },
    isPersonalTile: boolean
    personal: {
        pieceSize: number
        textureTop: string
        textureSide: string
        letter: string
        name: string
    },
}