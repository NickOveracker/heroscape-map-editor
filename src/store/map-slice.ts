import { StateCreator } from "zustand"
import { BoardHex, MapState, Piece } from "../types"
import { AppState } from "./store"
import { rectangleScenario } from "../utils/map-gen"
import { getBoardHexesWithPieceAdded } from "../data/buildupMap"
import { produce } from "immer"

export interface MapSlice extends MapState {
    paintTile: (args: PaintTileArgs) => void
    loadMap: (map: MapState) => void
}

type PaintTileArgs = {
    piece: Piece,
    clickedHex: BoardHex,
    rotation: number,
}

const createMapSlice: StateCreator<
    AppState,
    [],
    [],
    MapSlice
> = (set) => ({
    boardHexes: rectangleScenario.boardHexes,
    hexMap: rectangleScenario.hexMap,
    boardPieces: rectangleScenario.boardPieces,
    paintTile: ({
        piece,
        clickedHex,
        rotation,
    }: PaintTileArgs) => set((state) => {
        return produce(state, draft => {
            const { newBoardHexes, newPieceID } = getBoardHexesWithPieceAdded({
                piece,
                boardHexes: draft.boardHexes,
                cubeCoords: clickedHex,
                placementAltitude: clickedHex.altitude,
                rotation,
                isVsTile: false
            })
            draft.boardHexes = newBoardHexes
            draft.boardPieces[newPieceID] = piece.inventoryID
        })
    }),
    loadMap: (mapState: MapState) => set((state) => {
        return { ...state, boardHexes: mapState.boardHexes, hexMap: mapState.hexMap, boardPieces: mapState.boardPieces }
    }),
})

export default createMapSlice