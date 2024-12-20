/* eslint-disable @typescript-eslint/no-unused-vars */
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
            partialize: (state) => {
                // each new property that is NOT undoable has to be listed here
                const {
                    // ui state
                    penMode,
                    flatPieceSizes,
                    pieceSize,
                    pieceRotation,
                    isShowStartZones,
                    isTakingPicture,
                    isCameraDisabled,
                    // ui fns
                    togglePenMode,
                    togglePieceSize,
                    togglePieceRotation,
                    toggleIsShowStartZones,
                    toggleIsTakingPicture,
                    toggleIsCameraDisabled,
                    // map fns
                    paintTile,
                    loadMap,
                    ...rest
                } = state;
                return rest;
            },
            equality: (pastState, currentState) =>
                isEqual(pastState.boardHexes, currentState.boardHexes) &&
                isEqual(pastState.boardPieces, currentState.boardPieces)
        },


    )
)

export default useBoundStore