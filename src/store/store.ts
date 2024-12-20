/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import createUISlice, { UISlice } from './ui-slice'
import createMapSlice, { MapSlice } from './map-slice'
import { temporal } from 'zundo'


export type AppState = MapSlice & UISlice

const useBoundStore = create<AppState>()(
    temporal(
        (...a) => ({
            ...createMapSlice(...a),
            ...createUISlice(...a),
        }),
        {
            limit: 100,
            partialize: (state) => {
                const { penMode,
                    flatPieceSizes,
                    pieceSize,
                    pieceRotation,
                    isShowStartZones,
                    isTakingPicture,
                    isCameraDisabled, ...rest } = state;
                return rest;
            },
        },

    )
)

export default useBoundStore