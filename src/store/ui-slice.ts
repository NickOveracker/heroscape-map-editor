import { StateCreator } from 'zustand'
import { PiecePrefixes } from '../types'
import { AppState } from './store'
import { produce } from 'immer'
import { Dictionary } from 'lodash'

export interface UISlice {
  penMode: string
  togglePenMode: (mode: string) => void
  pieceRotation: number
  togglePieceRotation: (s: number) => void
  pieceSize: number
  togglePieceSize: (s: number) => void
  flatPieceSizes: number[]
  isNewMapDialogOpen: boolean
  toggleIsNewMapDialogOpen: (b: boolean) => void
  isEditMapDialogOpen: boolean
  toggleIsEditMapDialogOpen: (b: boolean) => void
  // WORLD STATE
  selectedPieceID: string
  toggleSelectedPieceID: (id: string) => void
  hoveredPieceID: string
  toggleHoveredPieceID: (id: string) => void
  isShowStartZones: boolean
  toggleIsShowStartZones: (s: boolean) => void
  isTakingPicture: boolean
  toggleIsTakingPicture: (s: boolean) => void
  isCameraDisabled: boolean
  toggleIsCameraDisabled: (b: boolean) => void
  isOrthoCam: boolean
  toggleIsOrthoCam: (b: boolean) => void
  viewingLevel: number
  toggleViewingLevel: (level: number) => void
}

const initialPenMode = 'select'

const createUISlice: StateCreator<
  // https://immerjs.github.io/immer/#with-immer
  AppState,
  [],
  [],
  UISlice
> = (set) => ({
  selectedPieceID: '',
  toggleSelectedPieceID: (pieceID: string) =>
    set(
      produce((state) => {
        state.selectedPieceID = pieceID
      }),
    ),
  hoveredPieceID: '',
  toggleHoveredPieceID: (pieceID: string) =>
    set(
      produce((state) => {
        state.hoveredPieceID = pieceID
      }),
    ),
  penMode: initialPenMode,
  togglePenMode: (mode: string) =>
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

export default createUISlice
