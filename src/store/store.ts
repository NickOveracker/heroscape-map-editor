import { create } from 'zustand'
import createUISlice, { UISlice } from './ui-slice'
import createMapSlice, { MapSlice } from './map-slice'


export type AppState = MapSlice & UISlice

const useBoundStore = create<AppState>()((...a) => ({
    ...createMapSlice(...a),
    ...createUISlice(...a),
}))

export default useBoundStore