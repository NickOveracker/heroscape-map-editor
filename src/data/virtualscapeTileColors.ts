import { Dictionary } from 'lodash'
import { HexTerrain } from '../types'
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
  glyph: 'rgb(64,0,0)',
  ruin: 'rgb(160, 0, 0)',
  roadWall: 'rgb(120, 120, 120)',
  marvelWall: 'rgb(220, 220, 220)',
  outcrop: 'rgb(180,180,180)',
  castleGround: 'rgb(190,190,190)',
  castle: 'rgb(220, 220, 220)',
  castleSecondary: 'rgb(50, 50, 50)', // Castle tiles in virtualscape have a second color for some reason
  battlement: 'rgb(80, 80, 80)',
  flag: 'rgb(0,100,0)',
  palm: 'rgb(120,255,120)',
  brush: 'rgb(255,255,0)',
  tree: 'rgb(0,85,0)',
  ladder: 'rgb(255,20,00)',
  glacier: 'rgb(180,180,255)',
  hive: 'rgb(193,121,65)',
  figure: 'rgb(255, 255, 255)',
  personal: 'rgb(160, 160, 160)',
}

export default virtualscapeTileColors