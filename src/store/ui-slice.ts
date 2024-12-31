import { StateCreator } from 'zustand'
import { HexTerrain, PenMode } from '../types'
import { AppState } from './store'
import { produce } from 'immer'
import { Dictionary } from 'lodash'

export interface UISlice {
  selectedPieceID: string
  setSelectedPieceID: (id: string) => void
  hoveredPieceID: string
  setHoveredPieceID: (id: string) => void
  penMode: PenMode
  togglePenMode: (mode: PenMode) => void
  pieceRotation: number
  togglePieceRotation: (s: number) => void
  pieceSize: number
  togglePieceSize: (s: number) => void
  flatPieceSizes: number[]
  isShowStartZones: boolean
  toggleIsShowStartZones: (s: boolean) => void
  isTakingPicture: boolean
  toggleIsTakingPicture: (s: boolean) => void
  isCameraDisabled: false
  toggleIsCameraDisabled: (b: boolean) => void
  isOrthoCam: false
  toggleIsOrthoCam: (b: boolean) => void
  isNewMapDialogOpen: false
  toggleIsNewMapDialogOpen: (b: boolean) => void
  isEditMapDialogOpen: false
  toggleIsEditMapDialogOpen: (b: boolean) => void
  viewingLevel: number
  toggleViewingLevel: (level: number) => void
}

const initialPenMode = PenMode.select

const createUISlice: StateCreator<
  // https://immerjs.github.io/immer/#with-immer
  AppState,
  [],
  [],
  UISlice
> = (set) => ({
  selectedPieceID: '',
  setSelectedPieceID: (pieceID: string) =>
    set(
      produce((state) => {
        state.selectedPieceID = pieceID
      }),
    ),
  hoveredPieceID: '',
  setHoveredPieceID: (pieceID: string) =>
    set(
      produce((state) => {
        state.hoveredPieceID = pieceID
      }),
    ),
  penMode: initialPenMode,
  togglePenMode: (mode: PenMode) =>
    set(
      produce((state) => {
        // when we switch terrains, we have different size options available and must update smartly
        const { newSize, newSizes } = getNewPieceSizeForPenMode(
          mode,
          state.penMode,
          state.pieceSize,
        )
        state.penMode = mode
        state.pieceSize = newSize
        state.flatPieceSizes = newSizes
      }),
    ),
  flatPieceSizes: landSizes?.[initialPenMode] ?? [],
  pieceSize: 1,
  togglePieceSize: (n: number) =>
    set(
      produce((s) => {
        s.pieceSize = n
      }),
    ),
  pieceRotation: 0,
  togglePieceRotation: (n: number) =>
    set(
      produce((s) => {
        s.pieceRotation = n
      }),
    ),
  isShowStartZones: true,
  toggleIsShowStartZones: (b: boolean) =>
    set(
      produce((s) => {
        s.isShowStartZones = b
      }),
    ),
  isTakingPicture: false,
  toggleIsTakingPicture: (b: boolean) =>
    set(
      produce((s) => {
        s.isTakingPicture = b
      }),
    ),
  isCameraDisabled: false,
  toggleIsCameraDisabled: (b: boolean) =>
    set(
      produce((s) => {
        s.isCameraDisabled = b
      }),
    ),
  isOrthoCam: false,
  toggleIsOrthoCam: (b: boolean) =>
    set(
      produce((s) => {
        s.isOrthoCam = b
      }),
    ),
  isNewMapDialogOpen: false,
  toggleIsNewMapDialogOpen: (b: boolean) =>
    set(
      produce((s) => {
        s.isNewMapDialogOpen = b
      }),
    ),
  isEditMapDialogOpen: false,
  toggleIsEditMapDialogOpen: (b: boolean) =>
    set(
      produce((s) => {
        s.isEditMapDialogOpen = b
      }),
    ),
  viewingLevel: 0,
  toggleViewingLevel: (level: number) =>
    set(
      produce((s) => {
        s.viewingLevel = level
      }),
    ),
})
const landSizes: Dictionary<number[]> = {
  // This should be derived, it is duplicate data
  // solid terrain below
  [HexTerrain.grass]: [1, 2, 3, 7, 24],
  [HexTerrain.rock]: [1, 2, 3, 7, 24],
  [HexTerrain.sand]: [1, 2, 3, 7, 24],
  [HexTerrain.swamp]: [1, 2, 3, 7, 24],
  [HexTerrain.dungeon]: [1, 2, 3, 7, 24],
  [HexTerrain.lavaField]: [1, 2, 7],
  [HexTerrain.concrete]: [1, 2, 7],
  [HexTerrain.asphalt]: [1, 2, 7],
  [HexTerrain.road]: [1, 2, 5],
  [HexTerrain.snow]: [1, 2],
  // fluid terrain below
  [HexTerrain.water]: [1, 3],
  [HexTerrain.wellspringWater]: [1],
  [HexTerrain.swampWater]: [1],
  [HexTerrain.lava]: [1],
  [HexTerrain.ice]: [1, 3, 4, 6],
  [HexTerrain.shadow]: [1, 3],
}
const getNewPieceSizeForPenMode = (
  newMode: string,
  oldMode: string,
  oldPieceSize: number,
): { newSize: number; newSizes: number[] } => {
  const terrainsWithFlatPieceSizes = Object.keys(landSizes).filter((t) => {
    return landSizes[t].length > 0
  })
  const newPieceSizes = terrainsWithFlatPieceSizes.includes(newMode)
    ? landSizes[newMode]
    : []
  if (!(newPieceSizes.length > 0)) {
    return { newSize: 1, newSizes: [] }
  }
  if (newPieceSizes.includes(oldPieceSize)) {
    return { newSize: oldPieceSize, newSizes: newPieceSizes }
  } else {
    const oldIndex = landSizes[oldMode].indexOf(oldPieceSize)
    return {
      newSize: newPieceSizes?.[oldIndex] ?? newPieceSizes[0],
      newSizes: newPieceSizes,
    }
  }
}

export default createUISlice
