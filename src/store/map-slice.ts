import { StateCreator } from 'zustand'
import { BoardHex, MapState, Piece } from '../types'
import { AppState } from './store'
import { rectangleScenario } from '../utils/map-gen'
import { getBoardHexesWithPieceAdded } from '../data/buildupMap'
import { produce } from 'immer'

export interface MapSlice extends MapState {
  paintTile: (args: PaintTileArgs) => void
  loadMap: (map: MapState) => void
}

type PaintTileArgs = {
  piece: Piece
  clickedHex: BoardHex
  rotation: number
}

const createMapSlice: StateCreator<AppState, [], [], MapSlice> = (set) => ({
  boardHexes: rectangleScenario.boardHexes,
  hexMap: rectangleScenario.hexMap,
  boardPieces: rectangleScenario.boardPieces,
  paintTile: ({ piece, clickedHex, rotation }: PaintTileArgs) =>
    set((state) => {
      return produce(state, (draft) => {
        const { newBoardHexes, newBoardPieces } = getBoardHexesWithPieceAdded({
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
