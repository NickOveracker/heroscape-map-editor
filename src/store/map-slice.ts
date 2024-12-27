import { StateCreator } from 'zustand'
import { BoardHex, HexTerrain, MapState, Piece, Pieces } from '../types'
import { AppState } from './store'
import { rectangleScenario } from '../utils/map-gen'
import { produce } from 'immer'
import { addLaurPiece } from '../data/addLaurPiece'
import { addPiece } from '../data/addPiece'

export interface MapSlice extends MapState {
  paintTile: (args: PaintTileArgs) => void
  loadMap: (map: MapState) => void
}

type PaintTileArgs = {
  piece: Piece
  clickedHex: BoardHex
  rotation: number
  laurSide?: string
}

const createMapSlice: StateCreator<AppState, [], [], MapSlice> = (set) => ({
  boardHexes: rectangleScenario.boardHexes,
  hexMap: rectangleScenario.hexMap,
  boardPieces: rectangleScenario.boardPieces,
  paintTile: ({ piece, clickedHex, rotation, laurSide }: PaintTileArgs) =>
    set((state) => {
      return produce(state, (draft) => {
        if (piece.terrain === HexTerrain.laurWall &&
          piece.id !== Pieces.laurWallPillar && laurSide) {
          const { newBoardHexes, newBoardPieces } = addLaurPiece({
            piece,
            boardHexes: draft.boardHexes,
            boardPieces: draft.boardPieces,
            clickedHex,
            laurSide: laurSide,
          })
          draft.boardHexes = newBoardHexes
          draft.boardPieces = newBoardPieces
        }
        const { newBoardHexes, newBoardPieces } = addPiece({
          piece,
          boardHexes: draft.boardHexes,
          boardPieces: draft.boardPieces,
          cubeCoords: clickedHex,
          placementAltitude: clickedHex.altitude,
          rotation,
          isVsTile: false,
        })
        draft.boardHexes = newBoardHexes
        draft.boardPieces = newBoardPieces
      })
    }),
  loadMap: (mapState: MapState) =>
    set((state) => {
      return produce(state, (draft) => {
        draft.boardHexes = mapState.boardHexes
        draft.hexMap = mapState.hexMap
        draft.boardPieces = mapState.boardPieces
      })
    }),
})

export default createMapSlice
