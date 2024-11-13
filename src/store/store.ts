import { create } from 'zustand'
import { AppState, HexTerrain } from '../types'
import initialState from './initialBoardHexes'

const useAppState = create<AppState>()((set) => ({
    boardHexes: initialState.boardHexes,
    hexMap: initialState.hexMap,
    //   boardHexes: 0,
    increase: (hexID: string) => set((state) => {
        const newBoardHexes = {
            ...state.boardHexes,
            [hexID]: {
                ...state.boardHexes[hexID],
                terrain: HexTerrain.grass,
                altitude: 1
            }
        }
        return ({ boardHexes: newBoardHexes })
    }),
}))

export default useAppState