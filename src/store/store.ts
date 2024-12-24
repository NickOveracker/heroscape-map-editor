import { create } from 'zustand'
import createUISlice, { UISlice } from './ui-slice'
import createMapSlice, { MapSlice } from './map-slice'
import { temporal } from 'zundo'
import { isEqual } from 'lodash'

export type AppState = MapSlice & UISlice

const useBoundStore = create<AppState>()(
  temporal(
    (...a) => ({
      ...createMapSlice(...a),
      ...createUISlice(...a),
    }),
    {
      limit: 100,
      // onSave: (state) => console.log('saved', state),
      partialize: (state) => {
        return {
          boardHexes: state.boardHexes,
          boardPieces: state.boardPieces,
          hexMap: state.hexMap,
        }
      },
      equality: (pastState, currentState) =>
        isEqual(pastState.boardHexes, currentState.boardHexes) &&
        isEqual(pastState.boardPieces, currentState.boardPieces) &&
        isEqual(pastState.hexMap, currentState.hexMap),
    },
  ),
)

export default useBoundStore
