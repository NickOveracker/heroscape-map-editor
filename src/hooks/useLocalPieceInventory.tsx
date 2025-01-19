import { useLocalStorage } from '../hooks/useLocalStorage'
import { PieceInventory, Pieces } from '../types'

const blankPieceState: { [key: string]: number } = {
  [Pieces.grass1]: -1,
  [Pieces.grass2]: -1,
  [Pieces.grass3]: -1,
  [Pieces.grass7]: -1,
  [Pieces.grass24]: -1,
  [Pieces.rock1]: -1,
  [Pieces.rock2]: -1,
  [Pieces.rock3]: -1,
  [Pieces.rock7]: -1,
  [Pieces.rock24]: -1,
  [Pieces.sand1]: -1,
  [Pieces.sand2]: -1,
  [Pieces.sand3]: -1,
  [Pieces.sand7]: -1,
  [Pieces.sand24]: -1,
  [Pieces.dungeon1]: -1,
  [Pieces.dungeon2]: -1,
  [Pieces.dungeon3]: -1,
  [Pieces.dungeon7]: -1,
  [Pieces.dungeon24]: -1,
  [Pieces.swamp1]: -1,
  [Pieces.swamp2]: -1,
  [Pieces.swamp3]: -1,
  [Pieces.swamp7]: -1,
  [Pieces.swamp24]: -1,
  [Pieces.snow1]: -1,
  [Pieces.snow2]: -1,
  [Pieces.snow3]: -1,
  [Pieces.snow7]: -1,
  [Pieces.snow24]: -1,
  [Pieces.lavaField1]: -1,
  [Pieces.lavaField2]: -1,
  [Pieces.lavaField7]: -1,
  [Pieces.asphalt1]: -1,
  [Pieces.asphalt2]: -1,
  [Pieces.asphalt7]: -1,
  [Pieces.concrete1]: -1,
  [Pieces.concrete2]: -1,
  [Pieces.concrete7]: -1,
  [Pieces.road1]: -1,
  [Pieces.road2]: -1,
  [Pieces.road5]: -1,
  [Pieces.wellspringWater1]: -1,
  [Pieces.water1]: -1,
  [Pieces.water3]: -1,
  [Pieces.lava1]: -1,
  [Pieces.swampWater1]: -1,
  [Pieces.swampWater3]: -1,
  [Pieces.swampWater6]: -1,
  [Pieces.ice1]: -1,
  [Pieces.ice3]: -1,
  [Pieces.ice4]: -1,
  [Pieces.ice6]: -1,
  [Pieces.shadow1]: -1,
  [Pieces.shadow3]: -1,
  [Pieces.roadWall]: -1,
  [Pieces.laurWallPillar]: -1,
  [Pieces.laurWallShort]: -1,
  [Pieces.laurWallLong]: -1,
  [Pieces.laurWallRuin]: -1,
  [Pieces.snowTree10]: -1,
  [Pieces.snowTree12]: -1,
  [Pieces.tree10]: -1,
  [Pieces.tree11]: -1,
  [Pieces.tree12]: -1,
  [Pieces.tree415]: -1,
  [Pieces.palm14]: -1,
  [Pieces.palm15]: -1,
  [Pieces.palm16]: -1,
  [Pieces.brush9]: -1,
  [Pieces.swampBrush10]: -1,
  [Pieces.laurPalm13]: -1,
  [Pieces.laurPalm14]: -1,
  [Pieces.laurPalm15]: -1,
  [Pieces.laurBrush10]: -1,
  [Pieces.outcrop1]: -1,
  [Pieces.outcrop3]: -1,
  [Pieces.glacier1]: -1,
  [Pieces.glacier3]: -1,
  [Pieces.glacier4]: -1,
  [Pieces.glacier6]: -1,
  [Pieces.hive]: -1,
  [Pieces.ruins2]: -1,
  [Pieces.ruins3]: -1,
  [Pieces.marvel]: -1,
  // [Pieces.marvelBroken]: -1,
  [Pieces.wallWalk1]: -1,
  [Pieces.wallWalk7]: -1,
  [Pieces.wallWalk9]: -1,
  [Pieces.castleBaseCorner]: -1,
  [Pieces.castleBaseStraight]: -1,
  [Pieces.castleBaseEnd]: -1,
  [Pieces.castleWallCorner]: -1,
  [Pieces.castleWallStraight]: -1,
  [Pieces.castleWallEnd]: -1,
  [Pieces.castleArch]: -1,
  // [Pieces.castleArchNoDoor]    : -1,
  [Pieces.battlement]: -1,
  [Pieces.ladder]: -1,
}
export const useLocalPieceInventory = () => {

  const [pieceInventory, setPieceInventory] = useLocalStorage('pieceInventory', blankPieceState)
  const clearPieceInventory = () => {
    setPieceInventory(blankPieceState)
  }
  const addSet = (pieceSet: PieceInventory) => {
    const newPieceInventory = Object.keys(pieceSet).reduce((prev: PieceInventory, curr: string) => {
      const valueToAdd = pieceInventory[curr] === -1 ?
        // bring it to 0 first, then add
        (1 + pieceSet[curr])
        // or if already non-zero, just add
        : (pieceSet[curr])
      return { ...prev, [curr]: pieceInventory[curr] + valueToAdd }
    }, { ...pieceInventory })
    setPieceInventory(newPieceInventory)
  }
  const removeSet = (pieceSet: PieceInventory) => {
    const newPieceInventory = Object.keys(pieceSet).reduce((prev: PieceInventory, curr: string) => {
      return { ...prev, [curr]: Math.max(pieceInventory[curr] - (pieceSet[curr]), 0) }
    }, { ...pieceInventory })
    setPieceInventory(newPieceInventory)
  }
  return {
    pieceInventory,
    addSet,
    removeSet,
    clearPieceInventory,
    setPieceInventory
  }
}
