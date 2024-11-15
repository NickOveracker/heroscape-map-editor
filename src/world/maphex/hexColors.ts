import { Dictionary } from "lodash";
import { HexTerrain } from "../../types";
import virtualscapeTileColors from "../../data/virtualscapeTileColors";

export const hexTerrainColor: Dictionary<string> = {
    [HexTerrain.empty]: '#040404',
    [HexTerrain.grass]: '#60840d',
    [HexTerrain.rock]: '#475776',
    [HexTerrain.sand]: '#ab8e10',
    [HexTerrain.road]: '#868686',
    [HexTerrain.snow]: '#fffafa', // "snow" from https://www.colorhexa.com/color-names
    [HexTerrain.water]: '#3794fd', // "sea blue":#006994,"pacific blue":#1ca9c9,"oceanboat blue":#0077be,"ultramarine blue":#4166f5
    // for below, just using Virtualscape colors
    [HexTerrain.lavaField]: virtualscapeTileColors[HexTerrain.lavaField],
    [HexTerrain.swamp]: virtualscapeTileColors[HexTerrain.swamp],
    [HexTerrain.asphalt]: virtualscapeTileColors[HexTerrain.asphalt],
    [HexTerrain.concrete]: virtualscapeTileColors[HexTerrain.concrete],
    [HexTerrain.dungeon]: virtualscapeTileColors[HexTerrain.dungeon],
    [HexTerrain.lava]: virtualscapeTileColors[HexTerrain.lava],
    [HexTerrain.ice]: virtualscapeTileColors[HexTerrain.ice],
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

