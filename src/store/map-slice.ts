import { StateCreator } from 'zustand'
import { BoardHex, MapState, Piece } from '../types'
import { AppState } from './store'
import { produce } from 'immer'
import { addPiece } from '../data/addPiece'

export interface MapSlice extends MapState {
  paintTile: (args: PaintTileArgs) => void
  loadMap: (map: MapState) => void
  changeMapName: (mapName: string) => void
}

type PaintTileArgs = {
  piece: Piece
  clickedHex: BoardHex
  rotation: number
  laurSide?: string
}

const createMapSlice: StateCreator<AppState, [], [], MapSlice> = (set) => ({
  boardHexes: {},
  hexMap: { id: '', name: '', shape: 'hexagon', width: 1, height: 1 },
  boardPieces: {},
  paintTile: ({ piece, clickedHex, rotation }: PaintTileArgs) =>
    set((state) => {
      return produce(state, (draft) => {
        const { newBoardHexes, newBoardPieces } = addPiece({
          piece,
          boardHexes: draft.boardHexes,
          boardPieces: draft.boardPieces,
          pieceCoords: clickedHex,
          placementAltitude: clickedHex.altitude,
          rotation,
          isVsTile: false,
        })
        draft.boardHexes = newBoardHexes
        draft.boardPieces = newBoardPieces
      })
    }),
  changeMapName: (mapName: string) =>
    set((state) => {
      return produce(state, (draft) => {
        draft.hexMap.name = mapName
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
