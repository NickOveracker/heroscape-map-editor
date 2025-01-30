import { Dictionary } from "lodash";
import { PiecePrefixes } from "../types";

const landSizes: Dictionary<number[]> = {
  // This should be derived, it is duplicate data
  // solid terrain below
  [PiecePrefixes.grass]: [1, 2, 3, 7, 24],
  [PiecePrefixes.rock]: [1, 2, 3, 7, 24],
  [PiecePrefixes.sand]: [1, 2, 3, 7, 24],
  [PiecePrefixes.swamp]: [1, 2, 3, 7, 24],
  [PiecePrefixes.dungeon]: [1, 2, 3, 7, 24],
  [PiecePrefixes.snow]: [1, 2, 3, 7, 24],
  [PiecePrefixes.lavaField]: [1, 2, 7],
  [PiecePrefixes.concrete]: [1, 2, 7],
  [PiecePrefixes.asphalt]: [1, 2, 7],
  [PiecePrefixes.road]: [1, 2, 5],
  // fluid terrain below
  [PiecePrefixes.water]: [1, 3],
  [PiecePrefixes.wellspringWater]: [1],
  [PiecePrefixes.swampWater]: [1, 3, 6],
  [PiecePrefixes.lava]: [1],
  [PiecePrefixes.ice]: [1, 3, 4, 6],
  [PiecePrefixes.shadow]: [1, 3],
}
export const getNewPieceSizeForPenMode = (
  newMode: string,
  oldMode: string,
  oldPieceSize: number,
): { newSize: number; newSizes: number[] } => {
  /*
    Returns a new piece size, and an array of piece sizes 
    OR
    a piece size of ZERO, and an empty array 
  */
  const terrainsWithFlatPieceSizes = Object.keys(landSizes).filter((t) => {
    return landSizes[t].length > 0
  })
  const newPieceSizes = terrainsWithFlatPieceSizes.includes(newMode)
    ? landSizes[newMode]
    : []
  if (!(newPieceSizes.length > 0)) {
    return { newSize: 0, newSizes: [] }
  }
  if (newPieceSizes.includes(oldPieceSize)) {
    return { newSize: oldPieceSize, newSizes: newPieceSizes }
  } else {
    const oldIndex = landSizes?.[oldMode]?.indexOf(oldPieceSize)
    return {
      newSize: newPieceSizes?.[oldIndex] ?? newPieceSizes[0],
      newSizes: newPieceSizes,
    }
  }
}
