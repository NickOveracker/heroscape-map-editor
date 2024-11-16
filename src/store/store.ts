import { create, StateCreator } from 'zustand'
import { AppState, BoardHex, BoardHexes, MapState, PenMode, UIState } from '../types'
import { rectangleScenario } from '../utils/map-gen'


const createMapSlice: StateCreator<
    AppState,
    [],
    [],
    MapState
> = (set) => ({
    boardHexes: rectangleScenario.boardHexes,
    hexMap: rectangleScenario.hexMap,
})

const createUISlice: StateCreator<
    AppState,
    [],
    [],
    UIState
> = (set) => ({
    penMode: PenMode.grass,
    pieceSize: 1,
    isShowStartZones: true,
    isTakingPicture: false,
    toggleIsTakingPicture: (newVal: boolean) => set((state) => {
        return { ...state, isTakingPicture: newVal }
    }),
    toggleIsShowStartZones: (newVal: boolean) => set((state) => {
        return { ...state, isShowStartZones: newVal }
    }),
})


const useBoundStore = create<MapState & UIState>()((...a) => ({
    ...createMapSlice(...a),
    ...createUISlice(...a),
}))

export default useBoundStore