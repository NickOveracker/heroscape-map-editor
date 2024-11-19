import { StateCreator } from "zustand"
import { BoardHex, MapState, Piece } from "../types"
import { AppState } from "./store"
import { rectangleScenario } from "../utils/map-gen"
import { getBoardHexesWithPieceAdded } from "../data/buildupMap"

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
    paintTile: ({
        piece,
        clickedHex,
        rotation,
    }: PaintTileArgs) => set((state) => {
        const newBoardHexes = getBoardHexesWithPieceAdded({
            piece,
            boardHexes: state.boardHexes,
            cubeCoords: clickedHex,
            altitude: clickedHex.altitude,
            rotation,
        })
        return { ...state, boardHexes: newBoardHexes }
    }),
    loadMap: (mapState: MapState) => set((state) => {
        return { ...state, boardHexes: mapState.boardHexes, hexMap: mapState.hexMap }
    }),
})

export default createMapSlice