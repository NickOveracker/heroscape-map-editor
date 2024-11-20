import { StateCreator } from "zustand"
import { BoardHex, MapState, Piece, Pieces } from "../types"
import { AppState } from "./store"
import { rectangleScenario } from "../utils/map-gen"
import { getBoardHexesWithPieceAdded } from "../data/buildupMap"
import { genPieceID } from "../utils/map-utils"
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
    // boardHexes: {
    //     "0,0,0": {
    //         "q": 0,
    //         "r": 0,
    //         "s": 0,
    //         "id": "0,0,0",
    //         "terrain": "empty",
    //         "altitude": 0,
    //         "pieceID": "",
    //         "isCap": false,
    //         "baseHexID": "0,0,0"
    //     },
    //     "0,1,0": {
    //         "q": 1,
    //         "r": 0,
    //         "s": -1,
    //         "id": "0,1,0",
    //         "terrain": "empty",
    //         "altitude": 0,
    //         "pieceID": "",
    //         "isCap": false,
    //         "baseHexID": "0,1,0"
    //     },
    //     "1,0,0": {
    //         "id": "1,0,0",
    //         "q": 0,
    //         "r": 0,
    //         "s": 0,
    //         "altitude": 1,
    //         "terrain": "water",
    //         "pieceID": "1,0,0,water1",
    //         "isCap": true,
    //         "baseHexID": "0,0,0"
    //     },
    //     "1,1,0": {
    //         "id": "1,1,0",
    //         "q": 1,
    //         "r": 0,
    //         "s": -1,
    //         "altitude": 1,
    //         "terrain": "asphalt",
    //         "pieceID": "1,1,0,asphalt1",
    //         "isCap": false,
    //         "baseHexID": "0,1,0"
    //     },
    //     "2,1,0": {
    //         "id": "2,1,0",
    //         "q": 1,
    //         "r": 0,
    //         "s": -1,
    //         "altitude": 2,
    //         "terrain": "grass",
    //         "pieceID": "1,1,0,grass1",
    //         "isCap": true,
    //         "baseHexID": "0,1,0"
    //     },
    // },
    hexMap: rectangleScenario.hexMap,
    // boardPieces: {
    //     ["1,0,0,water1"]: Pieces.water1,
    //     ["1,1,0,asphalt1"]: Pieces.asphalt1,
    //     ["2,1,0,grass1"]: Pieces.grass1,
    // },
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
            })
            draft.boardHexes = newBoardHexes
            draft.boardPieces[newPieceID] = piece.pieceID
            // if the boardHexes check out, then we can consider the piece added
            // return { ...state, boardHexes: newBoardHexes, boardPieces: { [newPieceID]: piece.pieceID } }
        })
    }),
    loadMap: (mapState: MapState) => set((state) => {
        return { ...state, boardHexes: mapState.boardHexes, hexMap: mapState.hexMap }
    }),
})

export default createMapSlice