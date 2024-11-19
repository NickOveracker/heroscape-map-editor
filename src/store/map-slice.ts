import { StateCreator } from "zustand"
import { HexTerrain, MapState } from "../types"
import { AppState } from "./store"
import { rectangleScenario } from "../utils/map-gen"
import { produce } from "immer"

export interface MapSlice extends MapState {
    paintGrassTile: (boardHexID: string) => void
    loadMap: (map: MapState) => void
}

const createMapSlice: StateCreator<
    AppState,
    [],
    [],
    MapSlice
> = (set) => ({
    boardHexes: rectangleScenario.boardHexes,
    hexMap: rectangleScenario.hexMap,
    paintGrassTile: (boardHexID: string) => set(produce((state) => {
        state.boardHexes[boardHexID].terrain = HexTerrain.grass
        state.boardHexes[boardHexID].altitude += 1
        // produce
        // return {
        //     ...state,
        //     [boardHexID]: {
        //         ...state[boardHexID],
        //         terrain: HexTerrain.grass,
        //         altitude: state[boardHexID].altitude + 1
        //     }
        // }
    })),
    loadMap: (mapState: MapState) => set((state) => {
        return { ...state, boardHexes: mapState.boardHexes, hexMap: mapState.hexMap }
    }),
})

const initialHexes = {
    "1,0,0": {
        "id": "1,0,0",
        "q": 0,
        "r": 0,
        "s": 0,
        "altitude": 1,
        "terrain": "grass",
        "pieceID": "1,0,0,grass1",
        "isCap": false,
        "baseHexID": "1,0,0"
    },
    "1,1,0": {
        "id": "1,1,0",
        "q": 1,
        "r": 0,
        "s": -1,
        "altitude": 1,
        "terrain": "water",
        "pieceID": "1,1,0,water1",
        "isCap": true,
        "baseHexID": "1,1,0"
    },
    "2,0,0": {
        "id": "2,0,0",
        "q": 0,
        "r": 0,
        "s": 0,
        "altitude": 2,
        "terrain": "grass",
        "pieceID": "2,0,0,grass3",
        "isCap": false,
        "baseHexID": "1,0,0"
    },
    "2,1,0": {
        "id": "2,1,0",
        "q": 1,
        "r": 0,
        "s": -1,
        "altitude": 2,
        "terrain": "grass",
        "pieceID": "2,1,0,grass3",
        "isCap": true,
        "baseHexID": "2,1,0"
    },
    "2,0,1": {
        "id": "2,0,1",
        "q": 0,
        "r": 1,
        "s": -1,
        "altitude": 2,
        "terrain": "grass",
        "pieceID": "2,0,1,grass3",
        "isCap": true,
        "baseHexID": "2,0,1"
    },
    "3,0,0": {
        "id": "3,0,0",
        "q": 0,
        "r": 0,
        "s": 0,
        "altitude": 3,
        "terrain": "grass",
        "pieceID": "3,0,0,grass1",
        "isCap": false,
        "baseHexID": "1,0,0"
    },
    "4,0,0": {
        "id": "4,0,0",
        "q": 0,
        "r": 0,
        "s": 0,
        "altitude": 4,
        "terrain": "grass",
        "pieceID": "4,0,0,grass1",
        "isCap": false,
        "baseHexID": "1,0,0"
    },
    "5,0,0": {
        "id": "5,0,0",
        "q": 0,
        "r": 0,
        "s": 0,
        "altitude": 5,
        "terrain": "grass",
        "pieceID": "5,0,0,grass2",
        "isCap": true,
        "baseHexID": "1,0,0"
    },
    "5,1,0": {
        "id": "5,1,0",
        "q": 1,
        "r": 0,
        "s": -1,
        "altitude": 5,
        "terrain": "grass",
        "pieceID": "5,1,0,grass2",
        "isCap": true,
        "baseHexID": "5,1,0"
    }
}

export default createMapSlice