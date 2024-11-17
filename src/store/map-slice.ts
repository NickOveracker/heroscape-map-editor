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
    paintGrassTile: (boardHexID: string) => set((state) => {
        // produce
        return { ...state, [boardHexID]: { ...state[boardHexID], terrain: HexTerrain.grass, altitude: state[boardHexID].altitude + 1 } }
    }),
    loadMap: (mapState: MapState) => set((state) => {
        return { ...state, boardHexes: mapState.boardHexes, hexMap: mapState.hexMap }
    }),
})

export default createMapSlice