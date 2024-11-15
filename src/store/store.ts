import { create } from 'zustand'
import { AppState, BoardHex } from '../types'
import initialState from './initialBoardHexes'

const useAppState = create<AppState>()((set) => ({
    boardHexes: initialState.boardHexes,
    hexMap: initialState.hexMap,
    paintHex: (hex: BoardHex) => set((state) => {
        const newBoardHexes = {
            ...state.boardHexes,
            [hex.id]: hex
        }
        return ({ boardHexes: newBoardHexes })
    }),

    // const paintGrassTile = (
    //     { G, ctx: _ctx },
    //     { hexIDArr, altitude }: { hexIDArr: string[]; altitude: number }
    //   ) => {
    //     hexIDArr.forEach((hexID) => {
    //       if (G.boardHexes[hexID]) {
    //         G.boardHexes[hexID].terrain = HexTerrain.grass
    //         G.boardHexes[hexID].subTerrain = HexTerrain.grass
    //         G.boardHexes[hexID].altitude = altitude + 1
    //       }
    //     })
    //   }



}))

export default useAppState