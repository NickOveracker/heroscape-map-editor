import { Dictionary } from "lodash";
import { HexTerrain } from "../types";

export const hexTerrainColor: Dictionary<string> = {
    [HexTerrain.empty]: '#040404',
    [HexTerrain.grass]: '#60840d',
    [HexTerrain.rock]: '#475776',
    [HexTerrain.sand]: '#ab8e10',
    [HexTerrain.road]: '#868686',
    [HexTerrain.water]: '#3794fd',
}