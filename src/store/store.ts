import { create } from 'zustand'
import { AppState, BoardHex, PenMode } from '../types'
import { rectangleScenario } from '../utils/map-gen'

const useAppState = create<AppState>()((set) => ({
    boardHexes: rectangleScenario.boardHexes,
    hexMap: rectangleScenario.hexMap,
    uiState: {
        penMode: PenMode.grass,
        pieceSize: 1,
        isShowStartZones: true,
    },
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