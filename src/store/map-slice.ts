import { StateCreator } from "zustand"
import { HexTerrain, MapState } from "../types"
import { AppState } from "./store"
import { rectangleScenario } from "../utils/map-gen"

export interface MapSlice extends MapState {
    paintGrassTile: (boardHexID: string) => void
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
        return { ...state, [boardHexID]: { ...state[boardHexID], terrain: HexTerrain.grass, altitude: state[boardHexID].altitude + 1 } }
    }),
})

export default createMapSlice