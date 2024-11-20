import { StateCreator } from "zustand"
import { BoardHex, MapState, Piece } from "../types"
import { AppState } from "./store"
import { rectangleScenario } from "../utils/map-gen"
import { getBoardHexesWithPieceAdded } from "../data/buildupMap"
import { genPieceID } from "../utils/map-utils"

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
        const { newBoardHexes, newPieceID } = getBoardHexesWithPieceAdded({
            piece,
            boardHexes: state.boardHexes,
            cubeCoords: clickedHex,
            placementAltitude: clickedHex.altitude,
            rotation,
        })
        // if the boardHexes check out, then we can consider the piece added
        return { ...state, boardHexes: newBoardHexes, boardPieces: { [newPieceID]: piece.pieceID } }
    }),
    loadMap: (mapState: MapState) => set((state) => {
        return { ...state, boardHexes: mapState.boardHexes, hexMap: mapState.hexMap }
    }),
})

export default createMapSlice