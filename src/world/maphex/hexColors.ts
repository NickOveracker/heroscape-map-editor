import { Dictionary } from 'lodash'
import { HexTerrain } from '../../types'

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
  castleFlag: 'rgb(0,100,0)',
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
  ...virtualscapeTileColors,
  [HexTerrain.empty]: '#020300',
  // All these colors below have been verified on coolors: lock a color and explore! https://coolors.co/fcecc9-336aeb-fcb0b3-f93943-355a44
  [HexTerrain.grass]: '#759B1C',
  [HexTerrain.rock]: '#3D6A7B',
  [HexTerrain.sand]: '#B4AD2D',
  [HexTerrain.dirt]: '#C46E71',
  [HexTerrain.tree]: '#355A44',
  treeBase: '#A34C00',
  [HexTerrain.water]: '#336AEB',
  [HexTerrain.wellspringWater]: '#BA70FF',
  [HexTerrain.ruin]: '#A2A0A6',
  [HexTerrain.castle]: '#B6B5BA',
  castleDoor: '#913B3F',
  [HexTerrain.wallWalk]: '#97969C', //same as road
  [HexTerrain.road]: '#97969C',
  [HexTerrain.snow]: '#EEEEFF',
  [HexTerrain.ice]: '#55DBCB',
  [HexTerrain.lavaField]: '#A30029',
  [HexTerrain.lava]: '#FA003F',
  [HexTerrain.asphalt]: '#413370',
  [HexTerrain.concrete]: '#D0D4DC',
  [HexTerrain.dungeon]: '#6E675E',
  [HexTerrain.shadow]: '#362E38',
  [HexTerrain.outcrop]: '#5F5464',
  hiveModel1: '#668958',
  [HexTerrain.swamp]: '#0f4f00',
  [HexTerrain.laurWall]: '#7F7CAF',
  laurModelColor2: '#7774AA',
  [HexTerrain.swampWater]: '#8C6A40',
  [HexTerrain.palm]: '#0f4f00', // only gets used as subterrain color, not in model
  ticallaPalmModel1: '#B07156', // palm trunk
  ticallaPalmModel2: '#45f529', // accompanying brush
  ticallaPalmModel3: '#1A8F00', // palm leaf
  [HexTerrain.brush]: '#0f4f00', // only gets used as subterrain color, not in model
  ticallaBrush1: '#1EA300',
  ticallaBrush2: '#25CC00',
  ticallaBrush3: '#22B800',
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
