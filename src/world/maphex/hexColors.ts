import { Dictionary } from "lodash";
import { HexTerrain } from "../../types";

const virtualscapeTileColors: Dictionary<string> = {
    [HexTerrain.grass]: 'rgb(0,160,0)',
    [HexTerrain.rock]: 'rgb(170, 170, 170)',
    [HexTerrain.sand]: 'rgb(206,172,40)',
    [HexTerrain.road]: 'rgb(160, 160, 160)',
    [HexTerrain.lavaField]: 'rgb(160,32,32)',
    [HexTerrain.asphalt]: 'rgb(120, 120, 120)',
    [HexTerrain.concrete]: 'rgb(220, 220, 220)',
    [HexTerrain.swamp]: 'rgb(111,105,21)',
    [HexTerrain.dungeon]: 'rgb(220, 220, 220)',
    [HexTerrain.snow]: 'rgb(255, 255, 255)',
    [HexTerrain.water]: 'rgb(55, 148, 253)',
    [HexTerrain.ice]: 'rgb(180,180,255)',
    [HexTerrain.lava]: 'rgb(255,64,64)',
    [HexTerrain.shadow]: 'rgb(0, 0, 0)',
    [HexTerrain.swampWater]: 'rgb(222,210,42)',
    [HexTerrain.glyph]: 'rgb(64,0,0)',
    [HexTerrain.ruin]: 'rgb(160, 0, 0)',
    [HexTerrain.roadWall]: 'rgb(120, 120, 120)',
    [HexTerrain.marvelRuin]: 'rgb(220, 220, 220)',
    [HexTerrain.outcrop]: 'rgb(180,180,180)',
    [HexTerrain.wallWalk]: 'rgb(190,190,190)',
    [HexTerrain.castle]: 'rgb(220, 220, 220)',
    castle2: 'rgb(50, 50, 50)', // Castle tiles in virtualscape have a second color for some reason
    [HexTerrain.battlement]: 'rgb(80, 80, 80)',
    [HexTerrain.castleFlag]: 'rgb(0,100,0)',
    [HexTerrain.palm]: 'rgb(120,255,120)',
    [HexTerrain.brush]: 'rgb(255,255,0)',
    [HexTerrain.tree]: 'rgb(0,85,0)',
    [HexTerrain.ladder]: 'rgb(255,20,00)',
    [HexTerrain.glacier]: 'rgb(180,180,255)',
    [HexTerrain.hive]: 'rgb(193,121,65)',
    [HexTerrain._vsFigure]: 'rgb(255, 255, 255)',
    [HexTerrain._vsPersonal]: 'rgb(160, 160, 160)',
}

export const hexTerrainColor: Dictionary<string> = {
    [HexTerrain.empty]: '#040404',
    [HexTerrain.dirt]: '#5B3734',
    [HexTerrain.tree]: '#003a0f',
    'treeBase': '#944c00', // unused?
    [HexTerrain.jungle]: '#50d373',
    [HexTerrain.ruin]: '#98abbc',
    // LAND
    [HexTerrain.grass]: '#60840d',
    [HexTerrain.rock]: '#475776',
    [HexTerrain.sand]: 'rgb(206,172,40)',
    [HexTerrain.road]: '#868686',
    [HexTerrain.wallWalk]: '#868686',
    [HexTerrain.snow]: '#fff', // "snow" from https://www.colorhexa.com/color-names
    [HexTerrain.lavaField]: virtualscapeTileColors[HexTerrain.lavaField],
    [HexTerrain.swamp]: virtualscapeTileColors[HexTerrain.swamp],
    [HexTerrain.asphalt]: virtualscapeTileColors[HexTerrain.asphalt],
    [HexTerrain.concrete]: virtualscapeTileColors[HexTerrain.concrete],
    [HexTerrain.dungeon]: '#3A2B2B', // https://www.color-hex.com/color/3a2b2b
    [HexTerrain.water]: '#3794fd', // "sea blue":#006994,"pacific blue":#1ca9c9,"oceanboat blue":#0077be,"ultramarine blue":#4166f5
    [HexTerrain.ice]: '#86D6D8', // https://www.color-hex.com/color/86d6d8
    [HexTerrain.lava]: virtualscapeTileColors[HexTerrain.lava],
    [HexTerrain.swampWater]: virtualscapeTileColors[HexTerrain.swampWater],
    [HexTerrain.shadow]: virtualscapeTileColors[HexTerrain.shadow],
}
// const hsColors = {
//     // selected by color picker on webp image of renegade paint set, so probably horrible
//     utgarRed: '#b13e3f',
//     aquillaYellow: '#daa040',
//     jandarBlue: '#2d72b8',
//     einarPurple: '#6c4496',
//     vydarGray: '#4f5264',
//     ullarGreen: '#7eb24b',
//     revnaOchre: '#676345',
//     valkrill: '#89845d', // this one, from "Tainted Gold" is a gradient and could be way off
// }

